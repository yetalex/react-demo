import type { Middleware, MiddlewareAPI, Dispatch } from 'redux'
import type { RootState } from '../reducer'
// 从 slice 文件导入类型定义和类型守卫
import { isTodoAddedAction } from '../features/todos/todosSlice'

// ✅ 推荐写法：使用箭头函数 + 类型标注，自动推导参数类型
export const print1: Middleware<{}, RootState> = (_storeAPI) => (next) => (action) => {
  console.log('print1', action)
  return next(action)
}

// ✅ 另一种写法：如果需要使用 storeAPI
export const print2: Middleware<{}, RootState> = (_storeAPI) => (next) => (action) => {
  // 3. 在 if 语句中使用类型守卫
  if (isTodoAddedAction(action)) {
    // 在这个代码块中，TypeScript 知道 action 是 TodoAddedAction 类型
    setTimeout(() => {
      // ✅ 现在可以安全地访问 payload
      console.log('Added a new todo: ', action.payload)
    }, 1000)
  }
  return next(action)
}

export const loggerMiddleware: Middleware<{}, RootState> = (storeAPI) => (next) => (action) => {
  console.log('dispatching ', action)
  let result = next(action)
  console.log('next state:', storeAPI.getState())
  return result
}

// ❌ 问题写法：函数声明无法自动推导类型
// function exampleMiddlewareBad(storeAPI) {
//   return function wrapDispatch(next) {
//     return function handleAction(action) {
//       // storeAPI, next, action 都是 any 类型，没有类型提示
//       return next(action)
//     }
//   }
// }

// ✅ 解决方案1：手动标注所有参数类型
export function exampleMiddlewareGood1(
  storeAPI: MiddlewareAPI<Dispatch, RootState>
) {
  return function wrapDispatch(next: Dispatch) {
    return function handleAction(action: any) {
      console.log('exampleMiddlewareGood1', action)
      // 现在有完整的类型提示了
      const state = storeAPI.getState() // state 类型是 RootState
      console.log('state from good1:', state)
      return next(action)
    }
  }
}

// ✅ 解决方案2：函数声明 + 返回类型标注
export function exampleMiddlewareGood2(
  storeAPI: MiddlewareAPI<Dispatch, RootState>
): Middleware<{}, RootState> {
  return (_api) => (next) => (action) => {
    console.log('exampleMiddlewareGood2', action)
    // TypeScript 可以从返回类型推导出参数类型
    const state = storeAPI.getState()
    console.log('state from good2:', state)
    return next(action)
  }
}