import { TasksState } from '.';
type TaskActionType = { type: '[Task] - Toggle Add Task' };
export const tasksReducer = (state: TasksState, action: TaskActionType): TasksState => {
	switch (action.type) {
		case '[Task] - Toggle Add Task':
			return {
				...state,
				isAddingTask: !state.isAddingTask,
			};

		default:
			return state;
	}
};
