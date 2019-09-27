import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of} from 'rxjs';

import {TodoListEffects} from './todo-list.effects';
import {TodoListService} from '../../services/todo-list.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ITasksPayload, loadTodoListAction, todoListLoadedErrorAction, todoListLoadedSuccessAction} from '../actions/todo-list.actions';
import {ITask} from '../../models/ITask';

describe('TodoListEffects', () => {
  let actions$: Observable<any>;
  let effects: TodoListEffects;

  let todoListService: TodoListService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TodoListEffects,
        provideMockActions(() => actions$),
        TodoListService
      ]
    });

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
        done: true
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
    req.flush(fakeTasks);
  });

  it('should notify the store to get all tasks for TODO list when the API "api/tasks" is error', () => {
    actions$ = of(loadTodoListAction);

    const expectedTodoListLoadedErrorAction = todoListLoadedErrorAction();

    effects.loadTodos$.subscribe(action => {
      expect(action).toEqual(expectedTodoListLoadedErrorAction);
    });

    const req = httpTestingController.expectOne('api/tasks');
    req.error(new ErrorEvent('error 500'));
  });

});
