import {TestBed} from '@angular/core/testing';

import {TodoListService} from './todo-list.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ITask} from '../models/ITask';

describe('TodoListService Http Client', () => {
  let service: TodoListService;
  let httpTestingController: HttpTestingController;

  const testData: Array<ITask> = [
    {
      id: 1,
      title: 'Create app mock test',
      done: true,
      description: ''
    },
    {
      id: 2,
      title: 'Add new Http request mock test',
      done: false,
      description: ''
    }
  ];

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
    expect(service).toBeTruthy();

    service.getTasks().subscribe(tasks => expect(tasks).toEqual(testData));

    const req = httpTestingController.expectOne('api/tasks');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);

    httpTestingController.verify();
  });

  it('can test TodoListService.getTask', () => {
    service.getTask(1).subscribe(task => expect(task).toEqual(testData[0]));

    const req = httpTestingController.expectOne('api/tasks/1');
    expect(req.request.method).toEqual('GET');
    req.flush(testData[0]);

    httpTestingController.verify();
  });

  it('can test TodoListService.updateTask', () => {
    const task: ITask = {
      id: 1,
      title: 'Create app UPDATE DATA TEST',
      done: false,
      description: ''
    };

    service.updateTask(task).subscribe(t => expect(t).toEqual(task));

    const req = httpTestingController.expectOne('api/tasks');
    expect(req.request.method).toEqual('PUT');
    req.flush(task);

    httpTestingController.verify();
  });

  it('can test TodoListService.addTask', () => {
    const titleValue = 'Create app ADD DATA TEST';
    const descriptionValue = 'Description add';
    const task: ITask = {
      id: 1,
      title: titleValue,
      done: false,
      description: descriptionValue
    };

    service.addTask(titleValue, descriptionValue).subscribe(t => expect(t).toEqual(task));

    const req = httpTestingController.expectOne('api/tasks');
    expect(req.request.method).toEqual('POST');
    req.flush(task);

    httpTestingController.verify();
  });

});
