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
        done: true,
        description: 'Create the amazing app for TODO !!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
          'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
          'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu ' +
          'fugiat nulla pariatur.'
      },
      {
        id: 2,
        title: 'Add new Http request',
        done: false,
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem ' +
          'aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam' +
          ' voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem ' +
          'sequi nesciunt.'
      },
      {
        id: 3,
        title: 'Update the CSS',
        done: true,
        description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque ' +
          'corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui ' +
          'officia deserunt mollitia animi, id est laborum et dolorum fuga.'
      },
      {
        id: 4,
        title: 'Development of components',
        done: false,
        description: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio' +
          ' cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.'
      },
      {
        id: 5,
        title: 'UT of components',
        done: false,
        description: 'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut' +
          ' perferendis doloribus asperiores repellat.'
      }
    ];
    return {tasks};
  }
}
