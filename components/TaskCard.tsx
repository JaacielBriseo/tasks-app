'use client';
import { Task } from '@/types';
import { formatDateFromNow } from '@/utils/date-functions';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

interface Props {
	task: Task;
}
export const TaskCard: React.FC<Props> = ({ task }) => {
	const router = useRouter();
	return (
		<Card
			onClick={() => router.push(`/tasks/${task.id}`)}
			sx={{ marginBottom: 1 }}
			// Eventos de drag
			draggable
			// onDragStart={ onDragStart }
			// onDragEnd={ onDragEnd }
		>
			<CardActionArea>
				<CardContent>
					<Typography sx={{ whiteSpace: 'pre-line' }}>{task.description}</Typography>
				</CardContent>

				<CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
					<Typography variant='body2'>{formatDateFromNow(task.createdAt)}</Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	);
};
