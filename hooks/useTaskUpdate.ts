import { ChangeEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { UPDATE_TASK_MUTATION, UPDATE_TASK_MUTATION_WITH_ASSIGN } from '@/graphql';
import { Task } from '@/types';
import { useForm } from './useForm';
import { useTasksContext } from './useTasksContext';

export const useTaskUpdate = (task: Task) => {
	const router = useRouter();
	const { refetchTasks } = useTasksContext();
	const { enqueueSnackbar } = useSnackbar();
	const { descriptionValue, onInputChange, userEmailToAssign } = useForm({
		descriptionValue: task.description,
		userEmailToAssign: '',
	});
	const [updateTaskMutationWithAssign] = useMutation(UPDATE_TASK_MUTATION_WITH_ASSIGN);
	const [updateTaskMutation] = useMutation(UPDATE_TASK_MUTATION);
	const [status, setStatus] = useState(task.completed);
	const [touched, setTouched] = useState(false);

	const isNotValid = useMemo(() => descriptionValue.length <= 0 && touched, [descriptionValue, touched]);

	const onStatusChanged = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const newStatus = target.value === 'completed';
		setStatus(newStatus);
	};

	const onSave = async () => {
		if (descriptionValue.trim().length === 0) return;

		const variables: { completed: boolean; description: string; taskId: string; email?: string } = {
			completed: status,
			description: descriptionValue,
			taskId: task.id,
		};
		try {
			/**
			 * Si el usuario escribe algo sobre el input del email
			 * cae en esta validacion y hace la mutation
			 * que incluye el update del campo assignedTo
			 * que representa la coleccion de usuarios a los que se les asigno la tarea
			 */
			if (userEmailToAssign.trim().length > 5 && userEmailToAssign.includes('@')) {
				variables.email = userEmailToAssign;
				await updateTaskMutationWithAssign({ variables });
			} else {
				await updateTaskMutation({ variables });
			}
			/**
			 * Si el usuario no escribe en el input del email
			 * significa que solo quiere actualizar la descripción
			 * o el status de la tarea
			 * entonces cae en esta mutacion
			 */
			await refetchTasks();
			enqueueSnackbar('Tarea actualizada', {
				variant: 'success',
				autoHideDuration: 1500,
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			});
			router.push('/dashboard');
		} catch (error) {
			enqueueSnackbar(error instanceof Error ? error.message : 'Ocurrio algun error, intente mas tarde', {
				variant: 'error',
				autoHideDuration: 4500,
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			});
			console.error(error);
		}
	};

	return {
		//* Properties
		descriptionValue,
		status,
		userEmailToAssign,
		touched,
		isNotValid,
		//* Methods
		onInputChange,
		onStatusChanged,
		setTouched,
		onSave,
	};
};
