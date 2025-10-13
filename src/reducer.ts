import { combineReducers } from 'redux'
import filtersReducer from './features/filters/filtersSlice'
import todosReducer from './features/todos/todosSlice'

const rootReducer = combineReducers({
  filters: filtersReducer,
  todos: todosReducer
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>