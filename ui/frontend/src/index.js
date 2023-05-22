import React from 'react';
import {createRoot} from 'react-dom/client';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root"))
    .render(<BrowserRouter>
                <App />
            </BrowserRouter>);