import {TestBed} from '@angular/core/testing';

import {TodoListService} from './todo-list.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ITask} from '../models/ITask';

describe('TodoListService Http Client', () => {
  let service: TodoListService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });

      service = TestBed.get(TodoListService);
      httpTestingController = TestBed.get(HttpTestingController);
    }
  );

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('can test TodoListService.getTasks', () => {
    const testData: Array<ITask> = [
      {
        id: 1,
        title: 'Create app mock test',
        done: true
      },
      {
        id: 2,
        title: 'Add new Http request mock test',
        done: false
      }
    ];

    expect(service).toBeTruthy();

    service.getTasks().subscribe(tasks => expect(tasks).toEqual(testData));

    const req = httpTestingController.expectOne('api/tasks');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);

    httpTestingController.verify();
  });
});
