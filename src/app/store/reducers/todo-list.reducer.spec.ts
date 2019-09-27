import {todoListReducer, initialTodoListState, ITodoListState} from './todo-list.reducer';
import * as TodoListPageActions from '../actions/todo-list.actions';
import {ITask} from '../../models/ITask';
import {ITasksPayload} from '../actions/todo-list.actions';

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
          done: true
        }
      ];

      const iTasksPayload: ITasksPayload = {
        payload: fakeTasks
      };

      const expectedState: ITodoListState = {
        tasks: fakeTasks,
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
        loading: false,
        success: false
      };

      const action = TodoListPageActions.todoListLoadedErrorAction();

      const result = todoListReducer(expectedState, action);

      expect(result).toEqual(expectedState);
    });

  });
});
