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
  const [location, setLocation] = useState();
  const [tabId, setTabId] = useState();
  useEffect(() => {
    const ready = async () => {
      const curTabId = await getCurrentTabId();
      const curLocation = await getTabLocation(curTabId);
      const { FLOMO_API } = await getOptions('FLOMO_API');

      setApi(FLOMO_API);
      setTabId(curTabId);
      setLocation(curLocation);
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
      const tabId = await getCurrentTabId();
      if (!enabledForCurPage) {
        // todo duplicate
        // excludeDomains = excludeDomains.filter((domain) => domain !== host);
        excludeDomains.splice(excludeDomains.indexOf(host), 1);
      } else {
        excludeDomains.push(host);
      }

      await chromeLocalSet({ excludeDomains });

      // todo might need change current enabledForCurPage is old value,
      chromeTabsSendMessage(tabId, {
        name: 'change_enable',
        enable: !enabledForCurPage,
      });
      setEnabledForCurPage(!enabledForCurPage);
    } catch (error) {
      console.log(error);
    }
  };
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
            {enabledForCurPage ? 'Enabled' : 'Disabled'} for current domain
          </label>
        </div>
      </div>
    </div>
  );
};

export default Popup;
