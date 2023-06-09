import { createContext } from 'react';
import { Task } from '@/types';

interface ContextProps {
	//* Properties
	tasks: Task[];
	isAddingTask: boolean;
	isLoadingTasks: boolean;
	error: null | string;
	isDeleteModalOpen: boolean;
	isDragging:boolean;

	//* Methods
	toggleAddingTask: () => void;
	startAddingNewTask: (description: string) => Promise<void>;
	handleDelete: (taskId: string) => Promise<void>;
	handleCloseDeleteModal: () => void;
	handleOpenDeleteModal: () => void;
	refetchTasks: () => Promise<void>;
	endDragging: () => void;
	startDragging: () => void;
	startChangingTaskCompletedStatus: (taskId: string, completed: boolean) => Promise<any>
}

export const TasksContext = createContext({} as ContextProps);

export default TasksContext