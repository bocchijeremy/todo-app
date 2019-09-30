import {todoListReducer, initialTodoListState, ITodoListState, ITaskState} from './todo-list.reducer';
import * as TodoListPageActions from '../actions/todo-list.actions';
import {ITask} from '../../models/ITask';
import {IIdTaskPayload, ITasksPayload} from '../actions/todo-list.actions';

describe('TodoList Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = todoListReducer(initialTodoListState, action);

      expect(result).toBe(initialTodoListState);
    });

    it('should return the loadTodoListAction', () => {
      const expectedState: ITodoListState = {
        tasks: [],
        selectedTask: {
          task: null,
          loading: false,
          success: true
        },
        loading: true,
        success: true
      };

      const action = TodoListPageActions.loadTodoListAction();

      const result = todoListReducer(initialTodoListState, action);

      expect(result).toEqual(expectedState);
    });

    it('should return the todoListLoadedSuccessAction', () => {
      const fakeTasks: Array<ITask> = [
        {
          id: 1,
          title: 'Fake data',
          done: true,
          description: ''
        }
      ];

      const iTasksPayload: ITasksPayload = {
        payload: fakeTasks
      };

      const expectedState: ITodoListState = {
        tasks: fakeTasks,
        selectedTask: null,
        loading: false,
        success: true
      };

      const action = TodoListPageActions.todoListLoadedSuccessAction(iTasksPayload);

      const result = todoListReducer(expectedState, action);

      expect(result).toEqual(expectedState);
    });

    it('should return the todoListLoadedErrorAction', () => {
      const fakeTasks: Array<ITask> = [];

      const expectedState: ITodoListState = {
        tasks: fakeTasks,
        selectedTask: null,
        loading: false,
        success: false
      };

      const action = TodoListPageActions.todoListLoadedErrorAction();

      const result = todoListReducer(expectedState, action);

      expect(result).toEqual(expectedState);
    });

    it('should return the toggleTaskStatusAction', () => {
      const fakeTasks: Array<ITask> = [
        {
          id: 1,
          title: 'Fake data',
          done: false,
          description: ''
        },
        {
          id: 2,
          title: 'Fake data 2',
          done: true,
          description: ''
        }
      ];

      const initState: ITodoListState = {
        tasks: fakeTasks,
        selectedTask: null,
        loading: false,
        success: false
      };

      const iIdTaskPayload: IIdTaskPayload = {
        payload: 1
      };

      const action = TodoListPageActions.toggleTaskStatusSuccessAction(iIdTaskPayload);

      const result = todoListReducer(initState, action);

      expect(result.tasks[0].done).toEqual(true);
    });

    it('should return the tryToggleTaskStatusAction', () => {
      const initState: ITodoListState = {
        tasks: [],
        selectedTask: null,
        loading: false,
        success: false
      };

      const action = TodoListPageActions.tryToggleTaskStatusAction(null);

      const result = todoListReducer(initState, action);

      expect(result).toEqual(initState);
    });

    it('should return the loadTaskAction', () => {
      const initState: ITodoListState = {
        tasks: [],
        selectedTask: null,
        loading: false,
        success: false
      };

      const action = TodoListPageActions.loadTaskAction();

      const result = todoListReducer(initState, action);

      expect(result.selectedTask.task).toBeNull();
      expect(result.selectedTask.loading).toBeTruthy();
      expect(result.selectedTask.success).toBeTruthy();
    });

    it('should return the taskLoadedSuccessAction', () => {
      const initState: ITodoListState = {
        tasks: [],
        selectedTask: null,
        loading: false,
        success: false
      };

      const expectedTask: ITask = {
        id: 1,
        title: 'title',
        done: true,
        description: ''
      };

      const action = TodoListPageActions.taskLoadedSuccessAction({payload: expectedTask});

      const result = todoListReducer(initState, action);

      expect(result.selectedTask.task).toEqual(expectedTask);
      expect(result.selectedTask.loading).toBeFalsy();
      expect(result.selectedTask.success).toBeTruthy();
    });

    it('should return the taskLoadedErrorAction', () => {
      const initState: ITodoListState = {
        tasks: [],
        selectedTask: null,
        loading: true,
        success: true
      };

      const action = TodoListPageActions.taskLoadedErrorAction();

      const result = todoListReducer(initState, action);

      expect(result.selectedTask.task).toBeNull();
      expect(result.selectedTask.loading).toBeFalsy();
      expect(result.selectedTask.success).toBeFalsy();
    });

  });
});
