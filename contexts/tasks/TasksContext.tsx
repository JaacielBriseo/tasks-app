import { Task } from '@/types';
import { createContext } from 'react';

interface ContextProps {
  //* Properties
	tasks: Task[];
	isAddingTask: boolean;

  //* Methods
	toggleAddingTask: () => void;
}

export const TasksContext = createContext({} as ContextProps);
