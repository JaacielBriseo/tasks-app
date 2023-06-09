import { Task } from '@/types';
import { TasksState } from '.';
type TaskActionType =
	| { type: '[Task] - Toggle Add Task' }
	| { type: '[Task] - Load Initial Tasks'; payload: Task[] }
	| { type: '[Task] - Set Loading State'; payload: boolean }
	| { type: '[Task] - Add New Task'; payload: Task }
	| { type: '[Task] - Set Error'; payload: string };
export const tasksReducer = (state: TasksState, action: TaskActionType): TasksState => {
	switch (action.type) {
		case '[Task] - Toggle Add Task':
			return {
				...state,
				isAddingTask: !state.isAddingTask,
			};
		case '[Task] - Load Initial Tasks':
			return {
				...state,
				tasks: action.payload,
				isLoadingTasks: false,
			};
		case '[Task] - Set Loading State':
			return {
				...state,
				isLoadingTasks: action.payload,
			};
		case '[Task] - Add New Task':
			return {
				...state,
				tasks: [...state.tasks, action.payload],
			};
		case '[Task] - Set Error':
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
