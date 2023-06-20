import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from "./dashboard/dashboard.page";
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";

moment().locale('de-ch')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Dashboard />
  </>
);
