import { createContext } from 'react';
import { Task } from '@/types';

interface ContextProps {
  //* Properties
	tasks: Task[];
	isAddingTask: boolean;
	isLoadingTasks:boolean;
	error:null | string

  //* Methods
	toggleAddingTask: () => void;
	startAddingNewTask: (description: string) => Promise<void>
}

export const TasksContext = createContext({} as ContextProps);
