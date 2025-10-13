import { UnknownAction } from "redux";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  color?: string;
}

// --- Start: Moved from middleware.ts ---

// 定义一个更具体的 Action 类型
export interface TodoAddedAction extends UnknownAction {
  type: 'todos/todoAdded';
  payload: string; // 假设 payload 是字符串
}

// 创建一个类型守卫 (Type Guard)
export function isTodoAddedAction(action: unknown): action is TodoAddedAction {
  return (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    (action as { type: unknown }).type === 'todos/todoAdded'
  );
}

// --- End: Moved from middleware.ts ---

const initialState: Todo[] = []

function nextTodoId(todos: Todo[]) {
  const maxId = todos.reduce((maxId, todo) => Math.max(maxId, todo.id), -1)
  return maxId + 1
}

export default function todosReducer(state= initialState, action: UnknownAction) {
  switch (action.type) {
    case 'todos/todoAdded': {
      // 使用类型守卫来确保 action 的类型
      if (isTodoAddedAction(action)) {
        return [
          ...state, 
          {
            id: nextTodoId(state),
            text: action.payload, // 现在可以安全地访问
            completed: false
          }
        ]
      }
      return state; // 如果类型不匹配，返回原 state
    }
    case 'todos/todoToggled': {
      return state.map(todo => {
        if (todo.id !== action.payload) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed
        }
      })
    }
    default:
      return state
  }
}