import React, { createElement } from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <h1> Robot Chef </h1>
        <h1> Robot Chef-new </h1>
    </React.StrictMode>


)