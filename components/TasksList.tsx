import { useMemo } from 'react';
import { List, Paper } from '@mui/material';
import { Task } from '@/types';
import { TaskCard } from './';

interface Props {
	tasks: Task[];
	completedStatus: boolean;
}

export const TasksList: React.FC<Props> = ({ tasks, completedStatus }) => {
	//* useMemo para evitar volver a computar las entradas por cada render
	const tasksByStatus = useMemo(
		() => tasks.filter(task => task.completed === completedStatus),
		[tasks, completedStatus]
	);
	return (
		<div
		// onDrop={ onDropEntry }
		// onDragOver={ allowDrop }
		// className={ isDragging ? styles.dragging : '' }
		>
			<Paper
				sx={{
					height: 'calc(100vh - 100px)',
					overflow: 'scroll',
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
