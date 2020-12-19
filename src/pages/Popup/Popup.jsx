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
import { get } from 'jquery';
const Popup = () => {
  const [api, setApi] = useState('');
  const [enabledForCurPage, setEnabledForCurPage] = useState(true);
  const [location, setLocation] = useState();
  useEffect(() => {
    const ready = async () => {
      const curLocation = await getTabLocation();
      setLocation(curLocation);
      if (curLocation) {
        const enable = await isHostEnabled(location);
        setEnabledForCurPage(enable);
      }
    };
    ready();
  }, []);
  function handleClick(e) {
    chrome.runtime.sendMessage({
      api,
    });
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
    <div className="App">
      <form>
        <div className="form-group">
          your flomo api
          <input id="api_input" value={api} onChange={handleChange} />
          <button
            type="button"
            className="btn btn-primary"
            id="confirmBtn"
            onClick={handleClick}
          >
            confirm
          </button>
        </div>

        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            checked={enabledForCurPage}
            onChange={handleToggleEnable}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            {enabledForCurPage ? 'enabled' : 'disabled'} for current page
          </label>
        </div>
      </form>
    </div>
  );
};

export default Popup;
