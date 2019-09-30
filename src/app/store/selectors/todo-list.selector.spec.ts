import * as fromSelector from './todo-list.selector';
import {IAppState} from '../reducers/app.reducer';
import {ITask} from '../../models/ITask';
import {ITodoListState} from '../reducers/todo-list.reducer';
import {IRouterStateUrl} from '../../route-serializer';
import {RouterReducerState} from '@ngrx/router-store';


describe('TodoList Selectors', () => {

  const mainExpectedTasks: Array<ITask> = [
    {
      id: 1,
      title: 'Fake data',
      done: true,
      description: ''
    }
  ];

  const expectedLoading = false;

  const expectedSuccess = true;

  const iTodoListState: ITodoListState = {
    tasks: mainExpectedTasks,
    selectedTask: null,
    loading: expectedLoading,
    success: expectedSuccess
  };

  const router: IRouterStateUrl = {
    url: 'test',
    params: {
      id: 1
    },
    queryParams: {
      test: 'test'
    }
  };

  const routerState: RouterReducerState<IRouterStateUrl> = {
    state: router,
    navigationId: 1
  };

  const iAppState: IAppState = {
    todoState: iTodoListState,
    router: routerState
  };

  it('should return the ITodoListState from IAppState', () => {
    expect(fromSelector.selectTodoState(iAppState)).toEqual(iTodoListState);
  });

  it('should return the RouterReducerState IRouterStateUrl from IAppState', () => {
    expect(fromSelector.selectRouterState(iAppState)).toEqual(routerState);
  });

  it('should return the RouterReducerState IRouterStateUrl from IAppState', () => {
    expect(fromSelector.selectRouter.projector(routerState)).toEqual(routerState);
  });

  it('should return tasks of ITodoListState with the first task on DONE status', () => {
    const initTasks: Array<ITask> = [
      {
        id: 2,
        title: 'Fake data 2',
        done: true,
        description: ''
      },
      {
        id: 3,
        title: 'Fake data 3',
        done: true,
        description: ''
      },
      {
        id: 1,
        title: 'Fake data',
        done: false,
        description: ''
      }
    ];

    const iInitTodoListState: ITodoListState = {
      tasks: initTasks,
      selectedTask: null,
      loading: expectedLoading,
      success: expectedSuccess
    };

    const expectedTasks: Array<ITask> = [
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
      },
      {
        id: 3,
        title: 'Fake data 3',
        done: true,
        description: ''
      }
    ];

    expect(fromSelector.selectTasks.projector(iInitTodoListState)).toEqual(expectedTasks);
  });

  it('should return tasks of ITodoListState with the first task on UNDONE status', () => {
    const initTasks: Array<ITask> = [
      {
        id: 2,
        title: 'Fake data 2',
        done: false,
        description: ''
      },
      {
        id: 3,
        title: 'Fake data 3',
        done: true,
        description: ''
      },
      {
        id: 1,
        title: 'Fake data',
        done: false,
        description: ''
      }
    ];

    const iInitTodoListState: ITodoListState = {
      tasks: initTasks,
      selectedTask: null,
      loading: expectedLoading,
      success: expectedSuccess
    };

    const expectedTasks: Array<ITask> = [
      {
        id: 2,
        title: 'Fake data 2',
        done: false,
        description: ''
      },
      {
        id: 1,
        title: 'Fake data',
        done: false,
        description: ''
      },
      {
        id: 3,
        title: 'Fake data 3',
        done: true,
        description: ''
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
