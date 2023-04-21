import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { stocksReducer } from './store/slice';
import './index.css';
import { App } from './component/App';


const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
    reducer: stocksReducer
});
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

