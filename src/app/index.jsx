import React from 'react';
import { render } from 'react-dom';
import Request from 'superagent';
import Header from './components/Header.jsx';
import './css/main.scss';
import 'react-select/scss/default.scss';

render(<Header />, window.document.getElementById('app'));
