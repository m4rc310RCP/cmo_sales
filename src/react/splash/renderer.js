import React from 'react'
import {createRoot} from 'react-dom/client';
import AppSplash from '.'; './index';


const root = document.getElementById('root');
createRoot(root).render(
    <AppSplash/>
);