import React from 'react';
import ReactDOM from 'react-dom/client';
import {Toaster} from "sonner"
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
        <Toaster richColors position="top-center"/>
    </React.StrictMode>,
)

