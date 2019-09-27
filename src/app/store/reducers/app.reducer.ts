import {ActionReducerMap} from '@ngrx/store';
import {initialTodoListState, ITodoListState, todoListReducer} from './todo-list.reducer';

/**
 * IAppState the model of the main state of app.
 */
export interface IAppState {
  todoState: ITodoListState;
}

/**
 * appReducers the map of all reducers in the app.
 */
export const appReducers: ActionReducerMap<IAppState, any> = {
  todoState: todoListReducer
};
