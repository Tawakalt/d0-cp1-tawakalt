import React from 'react';
import { render } from 'react-dom';
import Request from 'superagent';
import _ from 'lodash';
import Header from './components/Header.jsx';
import './css/main.scss';

// Render Header Component to page
render(<Header />, window.document.getElementById('app'));
