import { Task } from '@/types';
import { formatDateFromNow } from '@/utils/date-functions';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

interface Props {
	task: Task;
}
export const TaskCard: React.FC<Props> = ({ task }) => {
	return (
		<Card
			// onClick={ onClick }
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
