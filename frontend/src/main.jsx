import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // 🟢 Redux ke liye
import store from './redux/Store.js'; // 🟢 apne banaye store ka import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>         {/* Redux Provider */}
      <BrowserRouter>                {/* Routing */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
