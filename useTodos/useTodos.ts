import { useEffect, useReducer } from 'react';
import { TodoHookState, todoReducer } from '../08-useReducer/todoReducer';

export const useTodos = () => {
  const init = () => {
    const prevTodos = localStorage.getItem('todos');

    if (prevTodos) return JSON.parse(prevTodos);
    return [];
  };

  const [todos, dispatch] = useReducer(todoReducer, [], init);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo: TodoHookState) => {
    const action = {
      type: '[TODO] Add Todo',
      payload: todo,
    };

    dispatch(action);
  };

  const handleDeleteTodo = (todo: TodoHookState) => {
    dispatch({
      type: '[TODO] Remove Todo',
      payload: todo,
    });
  };

  const handleToggleTodo = (todo: TodoHookState) => {
    dispatch({
      type: '[TODO] Toggle Todo',
      payload: todo,
    });
  };

  const todosCount = todos.length;
  const pendingTodosCount = todos.filter((todo) => !todo.done).length;

  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todosCount,
    pendingTodosCount,
  };
};
