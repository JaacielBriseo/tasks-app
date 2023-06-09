import { Task } from '@/types';
import { createContext } from 'react';

interface ContextProps {
  //* Properties
	tasks: Task[];
	isAddingTask: boolean;
	isLoadingTasks:boolean;

  //* Methods
	toggleAddingTask: () => void;
	startAddingNewTask: (description: string) => Promise<void>
}

export const TasksContext = createContext({} as ContextProps);
