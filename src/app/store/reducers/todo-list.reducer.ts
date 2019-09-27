import * as TodoListPageActions from '../actions/todo-list.actions';
import {createReducer, on} from '@ngrx/store';
import {ITask} from '../../models/ITask';

/**
 * ITodoListState the model of the state of TodoList.
 */
export interface ITodoListState {
  tasks: Array<ITask>;
  loading: boolean;
  success: boolean;
}

/**
 * initialTodoListState the initial state of ITodoListState.
 */
export const initialTodoListState: ITodoListState = {
  tasks: [],
  loading: false,
  success: true
};

/**
 * todoListReducer the reducers of ITodoListState.
 */
export const todoListReducer = createReducer(
  initialTodoListState,
  on(TodoListPageActions.loadTodoListAction, (state: ITodoListState) => ({...state, loading: true})),
  on(TodoListPageActions.todoListLoadedSuccessAction, (state: ITodoListState, action) => (
    {...state, tasks: action.payload, loading: false, success: true}
  )),
  on(TodoListPageActions.todoListLoadedErrorAction, (state: ITodoListState) => ({tasks: [], loading: false, success: false}))
);
