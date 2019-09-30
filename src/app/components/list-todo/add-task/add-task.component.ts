import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EventAddTask, EventEnumAddTask} from '../../../models/EventAddTask';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

/**
 * The AddTaskComponent display the form to add a task.
 */
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  /** The EventEmitter of EventAddTask to notify the parent component with a new task. */
  @Output() eventEmitterTask: EventEmitter<EventAddTask> = new EventEmitter<EventAddTask>();

  /** The FormGroup of the task. */
  taskForm: FormGroup;

  /**
   * The Constructor of AddTaskComponent.
   * @param fb the FormBuilder of the task with the title required and the optional description.
   */
  constructor(fb: FormBuilder) {
    this.taskForm = fb.group({
      title: fb.control('', Validators.required),
      description: fb.control('')
    });
  }

  ngOnInit() {
  }

  /**
   * Emit the new task created to the parent component.
   */
  addTask() {
    this.eventEmitterTask.emit({
      type: EventEnumAddTask.ADD_TASK,
      iAddTaskPayload: {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description
      }
    });
  }

  /**
   * Cancel the operation to add a task.
   */
  cancel() {
    this.eventEmitterTask.emit({
      type: EventEnumAddTask.CANCEL,
      iAddTaskPayload: null
    });
  }
}
