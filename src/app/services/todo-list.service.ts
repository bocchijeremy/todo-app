import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ITask} from '../models/ITask';
import {HttpClient} from '@angular/common/http';

/**
 * TodoListService the Http client service to request the tasks with CRUD actions.
 */
@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  /**
   * Constructor of TodoListService.
   * @param httpClient the dependency to run HTTP requests.
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Get tasks from backend.
   */
  getTasks(): Observable<Array<ITask>> {
    return this.httpClient.get<Array<ITask>>('api/tasks');
  }

}
