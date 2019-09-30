import {ITask} from './ITask';
import {IAddTaskPayload} from '../store/actions/todo-list.actions';

export enum EventEnumAddTask {
  CANCEL,
  ADD_TASK
}

export interface EventAddTask {
  type: EventEnumAddTask;
  iAddTaskPayload: IAddTaskPayload;
}
