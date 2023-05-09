import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App'
import { createStore } from './store/createStore'
import { Provider } from 'react-redux'
import history from './utils/history'

const store = createStore()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Router history={history}>
        <Provider store={store}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Provider>
    </Router>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
