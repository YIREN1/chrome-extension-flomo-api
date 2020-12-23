import React, { useState, useEffect } from 'react';
import './Popup.css';
// import secrets from 'secrets'.;
import {
  getOptions,
  isHostEnabled,
  getTabLocation,
  getCurrentTabId,
  chromeLocalSet,
  chromeTabsSendMessage,
} from '../utils';

const Popup = () => {
  const [api, setApi] = useState('');
  const [enabledForCurPage, setEnabledForCurPage] = useState(true);
  const [enabledAllSites, setEnabledAllSites] = useState(true);
  const [location, setLocation] = useState();
  const [tabId, setTabId] = useState();

  useEffect(() => {
    const ready = async () => {
      
      // todo consider add excludeddomains as well
      const { FLOMO_API, enabledAllSites } = await getOptions([
        'FLOMO_API',
        'enabledAllSites',
      ]);
      const curTabId = await getCurrentTabId();
      const curLocation = await getTabLocation(curTabId);

      setApi(FLOMO_API);
      setTabId(curTabId);
      setLocation(curLocation);
      setEnabledAllSites(enabledAllSites);
      if (curLocation) {
        const enable = await isHostEnabled(location);
        setEnabledForCurPage(enable);
      }
    };
    ready();
  }, []);
  function handleClick(e) {
    chrome.runtime.sendMessage(
      {
        api,
      },
      handleResponse
    );
    function handleResponse(res) {
      console.log(res);
      chromeTabsSendMessage(tabId, {
        name: 'notif',
        message: 'Flomo api received',
      });
    }
    chromeLocalSet({ FLOMO_API: api });
  }
  const handleToggleEnable = async (e) => {
    try {
      let { excludeDomains } = await getOptions('excludeDomains');
      const { host } = location;
      // const tabId = await getCurrentTabId();
      if (!enabledForCurPage) {
        // todo duplicate
        // excludeDomains = excludeDomains.filter((domain) => domain !== host);
        excludeDomains.splice(excludeDomains.indexOf(host), 1);
      } else {
        excludeDomains.push(host);
      }

      await chromeLocalSet({ excludeDomains });

      // todo might need change current enabledForCurPage is old value,
      // todo find a new way to do this, currently each time we change the value for enabledForCurPage
      // we send a message to the tab, it's best to have a watcher
      // chromeTabsSendMessage(tabId, {
      //   name: 'change_enable',
      //   enable: !enabledForCurPage,
      // });
      setEnabledForCurPage(!enabledForCurPage);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleToggleEnableAllSites() {
    try {
      await chromeLocalSet({ enabledAllSites: !enabledAllSites });
      setEnabledAllSites(!enabledAllSites);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChange(e) {
    setApi(e.target.value);
  }
  return (
    <div className="">
      <form className="row mb-3">
        <div className="form-group col-md-6">
          <div className="form-floating mb-3 d-flex justify-content-center align-items-center">
            <input
              type="text"
              className="form-control"
              id="api"
              value={api}
              onChange={handleChange}
              placeholder="https://flomoapp.com/iwh/"
            />
            <label htmlFor="floatingInput">Flomo API</label>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              id="confirmBtn"
              onClick={handleClick}
            >
              save
            </button>
          </div>
        </div>
      </form>
      <div className="row mb-3 form-check form-switch">
        <div className="">
          <input
            className="form-check-input col-auto"
            type="checkbox"
            id="flexSwitchCheckDefault"
            checked={enabledForCurPage}
            onChange={handleToggleEnable}
          />
          <label
            className="form-check-label col-auto"
            htmlFor="flexSwitchCheckDefault"
          >
            <small>
              {enabledForCurPage ? 'Enabled' : 'Disabled'} current site
            </small>
          </label>
        </div>
      </div>
      <div className="row mb-3 form-check form-switch">
        <div className="">
          <input
            className="form-check-input col-auto"
            type="checkbox"
            id="flexSwitchCheckDefault"
            checked={enabledAllSites}
            onChange={handleToggleEnableAllSites}
          />
          <label
            className="form-check-label col-auto"
            htmlFor="flexSwitchCheckDefault"
          >
            <small>extension {enabledAllSites ? 'enabled' : 'disabled'} </small>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Popup;
