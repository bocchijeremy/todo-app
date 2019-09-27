import {TestBed} from '@angular/core/testing';

import {MockTodoListService} from './mock-todo-list.service';
import {ITask} from '../models/ITask';

describe('MockTodoListService', () => {
  let service: MockTodoListService;

  beforeEach(() => {
      TestBed.configureTestingModule({});

      service = TestBed.get(MockTodoListService);
    }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a valid data for TodoList', () => {
    const expectedTasks: Array<ITask> = [
      {
        id: 1,
        title: 'Create app',
        done: true
      },
      {
        id: 2,
        title: 'Add new Http request',
        done: false
      },
      {
        id: 3,
        title: 'Update the CSS',
        done: true
      },
      {
        id: 4,
        title: 'Development of components',
        done: false
      },
      {
        id: 5,
        title: 'UT of components',
        done: false
      }
    ];

    expect(service.createDb()).toEqual({tasks: expectedTasks});
  });

});
