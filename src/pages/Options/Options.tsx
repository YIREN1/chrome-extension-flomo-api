import React, { useState, useEffect } from 'react';
import './Options.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { chromeLocalSet, getOptions } from '../utils';
import { sendNotification } from '../utils/notifications';
interface Props {
  title: string;
}

interface MessageResponse {
  message: string;
}

const Options: React.FC<Props> = ({ title }: Props) => {
  const [api, setApi] = useState('');

  useEffect(() => {
    const ready = async () => {
      const { FLOMO_API } = await getOptions(['FLOMO_API']);
      setApi(FLOMO_API);
    };
    ready();
  }, []);
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setApi(e.target.value);
  }

  function handleClick(e: React.MouseEvent) {
    chrome.runtime.sendMessage(
      {
        api,
      },
      {},
      handleResponse
    );
    function handleResponse(res: MessageResponse) {
      sendNotification(res.message);
    }
    chromeLocalSet({ FLOMO_API: api });
  }

  return (
    <div className="OptionsContainer flex-column">
      <div className="d-flex flex-column bd-highlight mb-3 gap-3">
        <h2>Flomo Extension</h2>
        <button className="btn btn-primary" onClick={handleClick}>
          Save API
        </button>
        <div className="form-floating mb-3 d-flex form-group ">
          <input
            type="text"
            className="form-control"
            id="api"
            value={api}
            onChange={handleChange}
            placeholder="https://flomoapp.com/iwh/"
          />
          <label htmlFor="floatingInput">Flomo API</label>
        </div>
        <a
          className="btn btn-primary"
          href="https://github.com/YIREN1/chrome-extension-flomo-api"
          target="_blank"
        >
          Github
        </a>

        <a
          className="btn btn-primary"
          href="https://flomoapp.com/register2/?ODMzNw"
          target="_blank"
        >
          Sign up flomo
        </a>
        <a
          className="btn btn-primary"
          href="https://flomoapp.com/"
          target="_blank"
        >
          Flomo Website
        </a>
        <a
          className="btn btn-primary"
          href="https://web.okjike.com/u/6bf03e77-2010-4633-9003-2a1bf95c4c41"
          target="_blank"
        >
          Follow me on jike
        </a>
      </div>
    </div>
  );
};

export default Options;
