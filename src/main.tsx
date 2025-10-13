import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import store from './store'

store.dispatch({ type: 'todos/todoAdded', payload: { id: 1, text: 'Learn Redux', completed: false } })
console.log('current state:', store.getState())

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
