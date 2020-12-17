import React, { useState } from 'react';
import './Popup.css';
import secrets from 'secrets';
import { getOptions } from '../utils';
import { get } from 'jquery';
const Popup = () => {
  const [api, setApi] = useState(secrets.FLOMO_API || '');
  const [enabledForCurPage, setEnabledForCurPage] = useState(true);
  console.log(api);

  function handleClick(e) {
    chrome.runtime.sendMessage({
      api,
    });
  }
  const handleToggleEnable = async (e) => {
    try {
      const res = await getOptions('excludeDomains');
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    console.log(e.target.value);
    setEnabledForCurPage(Boolean(e.target.value));
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
            value={enabledForCurPage}
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
