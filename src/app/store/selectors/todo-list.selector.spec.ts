import * as fromSelector from './todo-list.selector';
import {IAppState} from '../reducers/app.reducer';
import {ITask} from '../../models/ITask';
import {ITodoListState} from '../reducers/todo-list.reducer';


describe('TodoList Selectors', () => {

  const mainExpectedTasks: Array<ITask> = [
    {
      id: 1,
      title: 'Fake data',
      done: true
    }
  ];

  const expectedLoading = false;

  const expectedSuccess = true;

  const iTodoListState: ITodoListState = {
    tasks: mainExpectedTasks,
    loading: expectedLoading,
    success: expectedSuccess
  };

  const iAppState: IAppState = {
    todoState: iTodoListState
  };

  it('should return the ITodoListState from IAppState', () => {
    expect(fromSelector.selectTodoState(iAppState)).toEqual(iTodoListState);
  });

  it('should return tasks of ITodoListState with the first task on DONE status', () => {
    const initTasks: Array<ITask> = [
      {
        id: 2,
        title: 'Fake data 2',
        done: true
      },
      {
        id: 3,
        title: 'Fake data 3',
        done: true
      },
      {
        id: 1,
        title: 'Fake data',
        done: false
      }
    ];

    const iInitTodoListState: ITodoListState = {
      tasks: initTasks,
      loading: expectedLoading,
      success: expectedSuccess
    };

    const expectedTasks: Array<ITask> = [
      {
        id: 1,
        title: 'Fake data',
        done: false
      },
      {
        id: 2,
        title: 'Fake data 2',
        done: true
      },
      {
        id: 3,
        title: 'Fake data 3',
        done: true
      }
    ];

    expect(fromSelector.selectTasks.projector(iInitTodoListState)).toEqual(expectedTasks);
  });

  it('should return tasks of ITodoListState with the first task on UNDONE status', () => {
    const initTasks: Array<ITask> = [
      {
        id: 2,
        title: 'Fake data 2',
        done: false
      },
      {
        id: 3,
        title: 'Fake data 3',
        done: true
      },
      {
        id: 1,
        title: 'Fake data',
        done: false
      }
    ];

    const iInitTodoListState: ITodoListState = {
      tasks: initTasks,
      loading: expectedLoading,
      success: expectedSuccess
    };

    const expectedTasks: Array<ITask> = [
      {
        id: 2,
        title: 'Fake data 2',
        done: false
      },
      {
        id: 1,
        title: 'Fake data',
        done: false
      },
      {
        id: 3,
        title: 'Fake data 3',
        done: true
      }
    ];

    expect(fromSelector.selectTasks.projector(iInitTodoListState)).toEqual(expectedTasks);
  });

  it('should return the loading status of ITodoListState', () => {
    expect(fromSelector.isTodoListLoaded.projector(iTodoListState)).toEqual(expectedLoading);
  });

  it('should return the error status of ITodoListState', () => {
    expect(fromSelector.isTodoListSuccess.projector(iTodoListState)).toEqual(expectedSuccess);
  });

});
