import * as fromSelector from './todo-list.selector';
import {IAppState} from '../reducers/app.reducer';
import {ITask} from '../../models/ITask';
import {ITodoListState} from '../reducers/todo-list.reducer';


describe('TodoList Selectors', () => {

  const expectedTasks: Array<ITask> = [
    {
      id: 1,
      title: 'Fake data',
      done: true
    }
  ];

  const expectedLoading = false;

  const expectedSuccess = true;

  const iTodoListState: ITodoListState = {
    tasks: expectedTasks,
    loading: expectedLoading,
    success: expectedSuccess
  };

  const iAppState: IAppState = {
    todoState: iTodoListState
  };

  it('should return the ITodoListState from IAppState', () => {
    expect(fromSelector.selectTodoState(iAppState)).toEqual(iTodoListState);
  });

  it('should return tasks of ITodoListState', () => {
    expect(fromSelector.selectTasks.projector(iTodoListState)).toEqual(expectedTasks);
  });

  it('should return the loading status of ITodoListState', () => {
    expect(fromSelector.isTodoListLoaded.projector(iTodoListState)).toEqual(expectedLoading);
  });

  it('should return the error status of ITodoListState', () => {
    expect(fromSelector.isTodoListSuccess.projector(iTodoListState)).toEqual(expectedSuccess);
  });

});
