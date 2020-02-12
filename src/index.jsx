import { hot } from 'react-hot-loader/root';
import React from 'react';
import { render } from 'react-dom';
import App from './js/app';

// Styles
import 'macian';
import './css/styles.css';

const Hot = hot(App);

render(<Hot />, document.getElementById("app"))
