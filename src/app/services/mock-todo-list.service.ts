import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {ITask} from '../models/ITask';

/**
 * MockTodoListService the service to mock the TodoListService in development environment.
 */
@Injectable({
  providedIn: 'root'
})
export class MockTodoListService implements InMemoryDbService {

  /**
   * Constructor of MockTodoListService.
   */
  constructor() {
  }

  /**
   * Create the fake Database based on the ITask model.
   */
  createDb() {
    const tasks: Array<ITask> = [
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
    return {tasks};
  }
}
