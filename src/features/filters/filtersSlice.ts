const initialState = {
  status: 'all',
  colors: []
}

export default function filtersReducer(state = initialState, action: { type: string, payload: any }) {
  switch (action.type) {
    case 'filters/statusFilterChanged': {
      return {
        ...state,
        status: action.payload
      }
    }
    default:
      return state
  }
}