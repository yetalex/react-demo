import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import { Provider } from 'react-redux'
import store from './store'
import { router } from './routes'

// store.dispatch({ type: 'todos/todoAdded', payload: { id: 1, text: 'Learn Redux', completed: false } })
// console.log('current state:', store.getState())

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
