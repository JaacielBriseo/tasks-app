import { Task } from '@/types';
import { TasksState } from '.';
type TaskActionType =
	| { type: '[Task] - Toggle Add Task' }
	| { type: '[Task] - Load Initial Tasks'; payload: Task[] }
	| { type: '[Task] - Set Loading State'; payload: boolean }
	| { type: '[Task] - Add New Task'; payload: Task }
	| { type: '[Task] - Set Error'; payload: string }
	| { type: '[Task] - Delete Task'; payload: string }
	| { type: '[Task] - Start Dragging Task' }
	| { type: '[Task] - End Dragging Task' }
	| { type: '[Task] - Change Task Completed Status'; payload: { taskId: string; completed: boolean } };
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
				error: null,
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
		case '[Task] - Delete Task':
			return {
				...state,
				tasks: state.tasks.filter(task => task.id !== action.payload),
			};
		case '[Task] - Start Dragging Task':
			return {
				...state,
				isDragging: true,
			};

		case '[Task] - End Dragging Task':
			return {
				...state,
				isDragging: false,
			};
		case '[Task] - Change Task Completed Status':
			return {
				...state,
				tasks: state.tasks.map(task => {
					if (task.id === action.payload.taskId) {
						task.completed = action.payload.completed;
					}
					return task;
				}),
			};
		default:
			return state;
	}
};
