import { PropsWithChildren, useReducer } from 'react';
import { TasksContext, tasksReducer } from '.';
import { Task } from '@/types';

export interface TasksState {
	tasks: Task[];
	isAddingTask: boolean;
}

const Tasks_INITIAL_STATE: TasksState = {
	tasks: [],
	isAddingTask: false,
};
export const TasksProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(tasksReducer, Tasks_INITIAL_STATE);

	const toggleAddingTask = () => dispatch({ type: '[Task] - Toggle Add Task' });

	return <TasksContext.Provider value={{ ...state, toggleAddingTask }}>{children}</TasksContext.Provider>;
};
