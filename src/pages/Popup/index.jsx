import React from 'react';
import { render } from 'react-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Popup from './Popup';
import './index.css';

render(<Popup />, window.document.querySelector('#app-container'));
