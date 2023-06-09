import { PropsWithChildren, useCallback, useEffect, useReducer } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import { CREATE_TASK_MUTATION, GET_TASKS_QUERY } from '@/graphql';
import { Task } from '@/types';
import { TasksContext, tasksReducer } from '.';

export interface TasksState {
	tasks: Task[];
	isAddingTask: boolean;
	isLoadingTasks: boolean;
	error: null | string;
}

const Tasks_INITIAL_STATE: TasksState = {
	tasks: [],
	isAddingTask: false,
	error: null,
	/**
	 * El loading state en este caso inicia en true
	 * para evitar problemas de UI al momento de hacer la
	 * carga inicial de las tareas.
	 * El estado pasa a 'false' cuando las tareas terminan de ser cargadas
	 */
	isLoadingTasks: true,
};
//TODO: Manejar errores
export const TasksProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(tasksReducer, Tasks_INITIAL_STATE);
	const [createTaskMutation] = useMutation(CREATE_TASK_MUTATION);
	const email = Cookies.get('userEmail');
	const idToken = Cookies.get('idToken');
	const { data: tasksData, error: errorTasks } = useQuery(GET_TASKS_QUERY, {
		variables: { email },
		context: {
			headers: {
				Authorization: `Bearer ${idToken}`,
			},
		},
	});

	const loadInitialTasks = useCallback(() => {
		if (errorTasks) {
			dispatch({ type: '[Task] - Set Error', payload: errorTasks.message });
		}
		if (!tasksData) return;
		const tasks = tasksData.user.userTasks.items as Task[];
		dispatch({ type: '[Task] - Load Initial Tasks', payload: tasks });
	}, [tasksData, errorTasks]);

	const startAddingNewTask = async (description: string) => {
		try {
			const response = await createTaskMutation({ variables: { description, userEmail: email } });
			const newTask = response.data.taskCreate;
			dispatch({ type: '[Task] - Add New Task', payload: newTask });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		loadInitialTasks();
	}, [loadInitialTasks]);

	const toggleAddingTask = () => dispatch({ type: '[Task] - Toggle Add Task' });

	return (
		<TasksContext.Provider value={{ ...state, toggleAddingTask, startAddingNewTask }}>{children}</TasksContext.Provider>
	);
};
