import { useMemo } from 'react';
import { List, Paper } from '@mui/material';
import { Task } from '@/types';
import { TaskCard } from './';
import { useTasksContext } from '@/hooks/useTasksContext';
import styles from './TasksList.module.css';
interface Props {
	tasks: Task[];
	completedStatus: boolean;
}

export const TasksList: React.FC<Props> = ({ tasks, completedStatus }) => {
	const { isDragging, endDragging, startChangingTaskCompletedStatus } = useTasksContext();
	//* useMemo para evitar volver a computar las entradas por cada render
	const tasksByStatus = useMemo(
		() => tasks.filter(task => task.completed === completedStatus),
		[tasks, completedStatus]
	);

	const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const onDropTask = async (event: React.DragEvent<HTMLDivElement>) => {
		const id = event.dataTransfer.getData('text');
		const task = tasks.find(task => task.id === id)!;
		task.completed = completedStatus;
		await startChangingTaskCompletedStatus(task.id, task.completed);
		endDragging();
	};

	return (
		<div onDrop={onDropTask} onDragOver={allowDrop} className={isDragging ? styles.dragging : ''}>
			<Paper
				sx={{
					height: 'calc(100vh - 100px)',
					overflow: 'auto',
					backgroundColor: 'transparent',
					'&::-webkit-scrollbar': { display: 'none' },
					padding: '1px 5px',
				}}>
				<List sx={{ opacity: 1, transition: 'all .3s' }}>
					{tasksByStatus.map(task => (
						<TaskCard key={task.id} task={task} />
					))}
				</List>
			</Paper>
		</div>
	);
};
