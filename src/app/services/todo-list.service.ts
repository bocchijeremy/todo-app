import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ITask} from '../models/ITask';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {switchMap} from 'rxjs/operators';

const cudOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

/**
 * TodoListService the Http client service to request the tasks with CRUD actions.
 */
@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  /** the url of the backend API. */
  private urlApi = 'api/tasks';

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
    return this.httpClient.get<Array<ITask>>(this.urlApi);
  }

  /**
   * Get task from backend by this id.
   * @param id the id of the task.
   */
  getTask(id: number): Observable<ITask> {
    const url = `${this.urlApi}/${id}`;
    return this.httpClient.get<ITask>(url);
  }

  /**
   * Update the task and return this in success API.
   * @param task the task to update.
   */
  updateTask(task: ITask): Observable<ITask> {
    return this.httpClient.put<ITask>(this.urlApi, task, cudOptions).pipe(
      switchMap(() => of(task))
    );
  }

}
