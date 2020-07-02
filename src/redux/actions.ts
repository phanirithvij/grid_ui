import { ADD_TODO, TOGGLE_TODO, SET_FILTER } from "./actionTypes";

let nextTodoId = 0;

export const addTodo = (content: string) => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const toggleTodo = (id: string) => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const setFilter = (filter: string) => ({ type: SET_FILTER, payload: { filter } });
