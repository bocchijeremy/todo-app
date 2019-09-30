/**
 * ITask the model of task.
 */
export interface ITask {
  /** The unique credential of task. */
  id: number;

  /** The title of task. */
  title: string;

  /** the status of task. */
  done: boolean;

  /** the description of task. */
  description: string;
}
