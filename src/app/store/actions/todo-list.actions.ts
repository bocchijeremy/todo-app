import {createAction, props} from '@ngrx/store';
import {ITask} from '../../models/ITask';

/**
 * ITasksPayload the payload of ITasks array.
 */
export interface ITasksPayload {
  payload: Array<ITask>;
}

/**
 * ITaskPayload the payload of ITask.
 */
export interface ITaskPayload {
  payload: ITask;
}

/**
 * IIdTaskPayload the payload of id task.
 */
export interface IIdTaskPayload {
  payload: number;
}

export interface IAddTaskPayload {
  title: string;
  description: string;
}

/**
 * TodoListActionTypes the list of actions for TODOlist.
 */
export enum TodoListActionTypes {
  // Load the tasks
  LoadTodoList = '[TodoList] Load TodoList',
  todoListLoadedSuccess = '[TodoList] TodoList Loaded Success',
  todoListLoadedError = '[TodoList] TodoList Loaded Error',
  // Update the status of the task done/undone
  tryToggleTaskStatus = '[TodoList] TodoList try to toggle task status',
  toggleTaskStatusSuccess = '[TodoList] TodoList toggle task status success',
  // Load only one task
  loadTask = '[TodoList] TodoList load task',
  taskLoadedSuccess = '[TodoList] TodoList task Loaded Success',
  taskLoadedError = '[TodoList] TodoList task Loaded Error',
  // Add task ACTION
  tryAddTask = '[TodoList] TodoList try to add task',
  taskAddedSuccess = '[TodoList] TodoList task added with Success',
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
 * tryToggleTaskStatusAction the action to try toggle the status of the task.
 */
export const tryToggleTaskStatusAction = createAction(
  TodoListActionTypes.tryToggleTaskStatus, props<ITaskPayload>()
);

/**
 * toggleTaskStatusSuccessAction the action to toggle the status of the task.
 */
export const toggleTaskStatusSuccessAction = createAction(
  TodoListActionTypes.toggleTaskStatusSuccess, props<IIdTaskPayload>()
);

/**
 * loadTaskAction the action to initialize the loading of the task.
 */
export const loadTaskAction = createAction(
  TodoListActionTypes.loadTask
);

/**
 * taskLoadedSuccessAction the action to get the task when API backend is success.
 */
export const taskLoadedSuccessAction = createAction(
  TodoListActionTypes.taskLoadedSuccess, props<ITaskPayload>()
);

/**
 * taskLoadedErrorAction the action to get the task when API backend is error.
 */
export const taskLoadedErrorAction = createAction(
  TodoListActionTypes.taskLoadedError
);

/**
 * tryAddTaskAction the action to add task.
 */
export const tryAddTaskAction = createAction(
  TodoListActionTypes.tryAddTask, props<IAddTaskPayload>()
);

/**
 * taskAddedSuccessAction the action when task has been added with success.
 */
export const taskAddedSuccessAction = createAction(
  TodoListActionTypes.taskAddedSuccess, props<ITaskPayload>()
);
