import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddTaskComponent} from './add-task.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ListTodoModule} from '../list-todo.module';
import {EventAddTask, EventEnumAddTask} from '../../../models/EventAddTask';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ListTodoModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a Cancel Event', () => {
    component.eventEmitterTask.subscribe((event: EventAddTask) => {
      expect(event.type).toEqual(EventEnumAddTask.CANCEL);
    });

    component.cancel();
  });

  it('form invalid when empty', () => {
    expect(component.taskForm.valid).toBeFalsy();
  });

  it('form valid when title is set and should emit a Add Event', () => {
    expect(component.taskForm.valid).toBeFalsy();

    const title = 'Title 1';
    component.taskForm.controls.title.setValue(title);

    expect(component.taskForm.valid).toBeTruthy();

    component.eventEmitterTask.subscribe((event: EventAddTask) => {
      expect(event.type).toEqual(EventEnumAddTask.ADD_TASK);
      expect(event.iAddTaskPayload.title).toEqual(title);
      expect(event.iAddTaskPayload.description).toEqual('');
    });

    component.addTask();
  });
});
