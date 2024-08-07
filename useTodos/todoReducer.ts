export interface TodoHookState {
  id: number;
  description: string;
  done: boolean;
}

interface Action {
  type: string;
  payload?: TodoHookState;
}

export const todoReducer = (
  initialState: TodoHookState[],
  action: Action
): TodoHookState[] => {
  switch (action.type) {
    case '[TODO] Add Todo':
      if (action.payload) {
        return [...initialState, action.payload];
      }
      return initialState;
    case '[TODO] Remove Todo':
      return initialState.filter((todo) => todo.id !== action.payload?.id);
    case '[TODO] Toggle Todo':
      return initialState.map((todo) => {
        if (todo.id === action.payload?.id) {
          return {
            ...todo,
            done: !todo.done,
          };
        }
        return todo;
      });
    default:
      return initialState;
  }
};
