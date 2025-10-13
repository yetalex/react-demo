import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer'
import { print1, print2 } from './exampleAddons/middleware'

let preloadedState  // 初始化数据
const persistedTodosString = localStorage.getItem('todos')

if (persistedTodosString) {
  preloadedState = {
    todos: JSON.parse(persistedTodosString)
  }
}

const middlewareEnhancer = applyMiddleware(print1, print2)

const store = createStore(rootReducer, preloadedState, middlewareEnhancer)

// const store = createStore(rootReducer)

export default store
