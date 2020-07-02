import { VISIBILITY_FILTERS } from "./constants";

export const getTodosState = (store: { todos: any }) => store.todos;

export const getTodoList = (store: { todos: any }) =>
	getTodosState(store) ? getTodosState(store).allIds : [];

export const getTodoById = (store: { todos: any }, id: string | number) =>
	getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {};

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getTodos = (store: { todos: any }) =>
	getTodoList(store).map((id: string | number) => getTodoById(store, id));

export const getTodosByVisibilityFilter = (
	store: { todos: any[] },
	visibilityFilter: string
) => {
	const allTodos = getTodos(store);
	switch (visibilityFilter) {
		case VISIBILITY_FILTERS.COMPLETED:
			return allTodos.filter((todo: { completed: boolean }) => todo.completed);
		case VISIBILITY_FILTERS.INCOMPLETE:
			return allTodos.filter((todo: { completed: boolean }) => !todo.completed);
		case VISIBILITY_FILTERS.ALL:
		default:
			return allTodos;
	}
};
