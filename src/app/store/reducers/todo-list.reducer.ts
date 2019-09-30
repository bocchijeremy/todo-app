import * as TodoListPageActions from '../actions/todo-list.actions';
import {createReducer, on} from '@ngrx/store';
import {ITask} from '../../models/ITask';
import {IIdTaskPayload, ITaskPayload, ITasksPayload} from '../actions/todo-list.actions';

/**
 * ITodoListState the model of the state of TodoList.
 */
export interface ITodoListState {
  tasks: Array<ITask>;
  selectedTask: ITaskState;
  loading: boolean;
  success: boolean;
}

/**
 * initialTodoListState the initial state of ITodoListState.
 */
export const initialTodoListState: ITodoListState = {
  tasks: [],
  selectedTask: {
    task: null,
    loading: false,
    success: true
  },
  loading: false,
  success: true
};

/**
 * ITodoListState the model of the state of TodoList.
 */
export interface ITaskState {
  task: ITask;
  loading: boolean;
  success: boolean;
}

/**
 * Get the new tasks updated.
 * @param tasks the initial tasks.
 * @param id the id of task to update.
 */
function getUpdatesTasks(tasks: Array<ITask>, id: number) {
  const indexTaskToUpdate: number = tasks.findIndex((task: ITask) => task.id === id);

  tasks[indexTaskToUpdate] = {...tasks[indexTaskToUpdate], done: !tasks[indexTaskToUpdate].done};
  return tasks;
}

/**
 * todoListReducer the reducers of ITodoListState.
 */
export const todoListReducer = createReducer(
  initialTodoListState,
  on(TodoListPageActions.loadTodoListAction, (state: ITodoListState) => ({...state, loading: true})),
  on(TodoListPageActions.todoListLoadedSuccessAction, (state: ITodoListState, action: ITasksPayload) => (
    {...state, tasks: action.payload, loading: false, success: true}
  )),
  on(TodoListPageActions.todoListLoadedErrorAction, (state: ITodoListState) => ({...state, tasks: [], loading: false, success: false})),
  on(TodoListPageActions.tryToggleTaskStatusAction, (state) => ({...state})),
  on(TodoListPageActions.toggleTaskStatusSuccessAction, (state: ITodoListState, action: IIdTaskPayload) => ({
    ...state,
    tasks: getUpdatesTasks(state.tasks, action.payload)
  })),
  on(TodoListPageActions.loadTaskAction, (state: ITodoListState) => ({
    ...state,
    selectedTask: {
      task: null,
      loading: true,
      success: true
    }
  })),
  on(TodoListPageActions.taskLoadedSuccessAction, (state: ITodoListState, action: ITaskPayload) => ({
    ...state,
    selectedTask: {
      task: action.payload,
      loading: false,
      success: true
    }
  })),
  on(TodoListPageActions.taskLoadedErrorAction, (state: ITodoListState) => ({
    ...state,
    selectedTask: {
      task: null,
      loading: false,
      success: false
    }
  }))
);
