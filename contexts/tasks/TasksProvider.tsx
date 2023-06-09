import { PropsWithChildren, useCallback, useEffect, useReducer, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import { CREATE_TASK_MUTATION, DELETE_TASK_MUTATION, GET_TASKS_QUERY } from '@/graphql';
import { Task } from '@/types';
import { TasksContext, tasksReducer } from '.';
export interface TasksState {
	tasks: Task[];
	isAddingTask: boolean;
	isLoadingTasks: boolean;
	error: null | string;
	isDragging: boolean;
}

const Tasks_INITIAL_STATE: TasksState = {
	tasks: [],
	isAddingTask: false,
	error: null,
	isDragging: false,
	/**
	 * El loading state en este caso inicia en true
	 * para evitar problemas de UI al momento de hacer la
	 * carga inicial de las tareas.
	 * El estado pasa a 'false' cuando las tareas terminan de ser cargadas
	 */
	isLoadingTasks: true,
};
export const TasksProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(tasksReducer, Tasks_INITIAL_STATE);
	const { enqueueSnackbar } = useSnackbar();
	const [createTaskMutation] = useMutation(CREATE_TASK_MUTATION);
	const [deleteTaskMutation] = useMutation(DELETE_TASK_MUTATION);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const email = Cookies.get('userEmail');
	const idToken = Cookies.get('idToken');
	const {
		data: tasksData,
		error: errorTasks,
		refetch,
	} = useQuery(GET_TASKS_QUERY, {
		variables: { email },
		context: {
			headers: {
				Authorization: `Bearer ${idToken}`,
			},
		},
	});

	const refetchTasks = async () => {
		const { data } = await refetch();
		dispatch({ type: '[Task] - Load Initial Tasks', payload: data.user.userTasks.items });
	};
	const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
	const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

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
			console.error(error);
			dispatch({ type: '[Task] - Set Error', payload: 'Ocurrio algun error, intenta de nuevo mas tarde' });
		}
	};

	const handleDelete = async (taskId: string) => {
		try {
			const { data } = await deleteTaskMutation({ variables: { taskId } });
			const { taskDelete } = data;
			const { success } = taskDelete;
			enqueueSnackbar(success ? 'Tarea eliminada' : 'Hubo un problema al eliminar la tarea', {
				variant: success ? 'success' : 'error',
				autoHideDuration: 1500,
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			});
			dispatch({ type: '[Task] - Delete Task', payload: taskId });
		} catch (error) {
			console.error(error);
			dispatch({ type: '[Task] - Set Error', payload: 'Ocurrio algun error, intenta de nuevo mas tarde' });
		}
	};

	useEffect(() => {
		loadInitialTasks();
	}, [loadInitialTasks, tasksData]);

	const toggleAddingTask = () => dispatch({ type: '[Task] - Toggle Add Task' });
	const startDragging = () => {
		dispatch({ type: '[Task] - Start Dragging Task' });
	};

	const endDragging = () => {
		dispatch({ type: '[Task] - End Dragging Task' });
	};

	const startChangingTaskCompletedStatus = async (taskId: string, completed: boolean) => {
		try {
			const resp = await fetch('https://api.8base.com/climlydnx000c08l1982m06xj/webhook/toggleTaskCompleted', {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: JSON.stringify({
					taskId,
					completed,
				}),
			});
			dispatch({ type: '[Task] - Change Task Completed Status', payload: { taskId, completed } });
		} catch (error) {
			console.error(error);
			dispatch({ type: '[Task] - Set Error', payload: 'Ocurrio algun error, intenta de nuevo mas tarde' });
		}
	};

	return (
		<TasksContext.Provider
			value={{
				//* Properties
				...state,
				isDeleteModalOpen,

				//* Methods
				handleOpenDeleteModal,
				handleCloseDeleteModal,
				toggleAddingTask,
				startAddingNewTask,
				handleDelete,
				refetchTasks,
				startDragging,
				endDragging,
				startChangingTaskCompletedStatus,
			}}>
			{children}
		</TasksContext.Provider>
	);
};
