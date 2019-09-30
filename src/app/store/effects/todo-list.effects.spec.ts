import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of} from 'rxjs';

import {TodoListEffects} from './todo-list.effects';
import {TodoListService} from '../../services/todo-list.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {
  ITasksPayload,
  loadTodoListAction,
  todoListLoadedErrorAction,
  todoListLoadedSuccessAction
} from '../actions/todo-list.actions';
import {ITask} from '../../models/ITask';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {IAppState} from '../reducers/app.reducer';
import {Store} from '@ngrx/store';

describe('TodoListEffects', () => {
  let actions$: Observable<any>;
  let effects: TodoListEffects;

  let todoListService: TodoListService;
  let httpTestingController: HttpTestingController;

  let store: MockStore<IAppState>;
  const initialState: IAppState = {
    todoState: {
      tasks: [],
      selectedTask: null,
      loading: false,
      success: true
    },
    router: null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TodoListEffects,
        provideMockActions(() => actions$),
        provideMockStore({initialState}),
        TodoListService
      ]
    });

    store = TestBed.get<Store<IAppState>>(Store);
    effects = TestBed.get<TodoListEffects>(TodoListEffects);
    todoListService = TestBed.get(TodoListService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should notify the store to get all tasks for TODO list when the API "api/tasks" is success', () => {
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

    actions$ = of(loadTodoListAction);

    const expectedTodoListLoadedSuccessAction = todoListLoadedSuccessAction(iTasksPayload);

    effects.loadTodos$.subscribe(action => {
      expect(action).toEqual(expectedTodoListLoadedSuccessAction);
    });

    const req = httpTestingController.expectOne('api/tasks');
    expect(req.request.method).toEqual('GET');
    req.flush(fakeTasks);

    httpTestingController.verify();
  });

  it('should notify the store to get all tasks for TODO list when the API "api/tasks" is error', () => {
    actions$ = of(loadTodoListAction);

    const expectedTodoListLoadedErrorAction = todoListLoadedErrorAction();

    effects.loadTodos$.subscribe(action => {
      expect(action).toEqual(expectedTodoListLoadedErrorAction);
    });

    const req = httpTestingController.expectOne('api/tasks');
    expect(req.request.method).toEqual('GET');
    req.error(new ErrorEvent('error 500'));

    httpTestingController.verify();
  });

  /*
  it('should notify the store to update the status of a task', () => {
    actions$ = of(tryToggleTaskStatusAction);

    const fakeTask: ITask = {
      id: 1,
      title: 'Fake data',
      done: true,
      description: ''
    };

    const expectedToggleTaskStatusSuccessAction = toggleTaskStatusSuccessAction({payload: 1});

    effects.updateTodo$.subscribe(action => {
      expect(action).toEqual(expectedToggleTaskStatusSuccessAction);
    });

    const req = httpTestingController.expectOne('api/tasks');
    expect(req.request.method).toEqual('PUT');
    req.flush(fakeTask);

    httpTestingController.verify();
  });

  it('should notify the store to get task by id when the API is success', () => {
    const fakeTask: ITask = {
      id: 1,
      title: 'Fake data',
      done: true,
      description: ''
    };

    const iTaskPayload: ITaskPayload = {
      payload: fakeTask
    };

    actions$ = of(loadTaskAction);

    const expectedTaskLoadedSuccessAction = taskLoadedSuccessAction(iTaskPayload);

    effects.loadTask$.subscribe(action => {
      // expect(action).toEqual(expectedTaskLoadedSuccessAction);
    });

    const req = httpTestingController.expectOne('api/tasks/2');
    expect(req.request.method).toEqual('GET');
    req.flush(fakeTask);

    httpTestingController.verify();
  });
  */

});
