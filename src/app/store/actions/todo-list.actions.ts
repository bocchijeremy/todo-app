import {createAction, props} from '@ngrx/store';
import {ITask} from '../../models/ITask';

/**
 * ITasksPayload the payload of ITasks array.
 */
export interface ITasksPayload {
  payload: Array<ITask>;
}

/**
 * IIdTaskPayload the payload of id task.
 */
export interface IIdTaskPayload {
  payload: number;
}

/**
 * TodoListActionTypes the list of actions for TODOlist.
 */
export enum TodoListActionTypes {
  LoadTodoList = '[TodoList] Load TodoList',
  todoListLoadedSuccess = '[TodoList] TodoList Loaded Success',
  todoListLoadedError = '[TodoList] TodoList Loaded Error',
  toggleTaskStatus = '[TodoList] TodoList toggle task status'
}

/**
 * loadTodoListAction the action to init the loading of tasks.
 */
export const loadTodoListAction = createAction(
  TodoListActionTypes.LoadTodoList
);

/**
 * todoListLoadedSuccessAction the action when tasks from API server is success.
 */
export const todoListLoadedSuccessAction = createAction(
  TodoListActionTypes.todoListLoadedSuccess, props<ITasksPayload>()
);

/**
 * todoListLoadedErrorAction the action when tasks from API server is failed.
 */
export const todoListLoadedErrorAction = createAction(
  TodoListActionTypes.todoListLoadedError
);

/**
 * toggleTaskStatusAction the action to toggle the status of the task.
 */
export const toggleTaskStatusAction = createAction(
  TodoListActionTypes.toggleTaskStatus, props<IIdTaskPayload>()
);
