import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//路由组件 BrowserRouter
import { BrowserRouter } from "react-router-dom";
/*
StrictMode 是一个用来突出显示应用程序中潜在问题的工具
StrictMode 不会渲染任何可见的 UI。它为其后代元素触发额外的检查和警告。
*/
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <BrowserRouter>
          <App />
      </BrowserRouter>
);