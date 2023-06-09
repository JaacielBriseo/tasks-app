import { useRouter } from 'next/navigation';
import { Card, CardHeader, Grid } from '@mui/material';
import { useTasksContext } from '@/hooks/useTasksContext';
import { NewTask, TasksList } from '.';

export const UserDashboard = () => {
	const router = useRouter();
	const { tasks, isLoadingTasks } = useTasksContext();
	if (isLoadingTasks) return <h1>Loading...</h1>;

	return (
		<>
			<Grid container spacing={4} sx={{ p: 4 }}>
				<Grid item xs={12} sm={6}>
					<Card sx={{ minHeight: 'calc(100vh - 100px )' }}>
						<CardHeader title='Pendientes' />

						{/* Agregar una nueva tarea */}
						<NewTask />

						{/* Listado de las tareas */}
						<TasksList tasks={tasks} completedStatus={false} />
					</Card>
				</Grid>

				<Grid item xs={12} sm={6}>
					<Card sx={{ height: 'calc(100vh - 100px )' }}>
						<CardHeader title='Completadas' />
						<TasksList tasks={tasks} completedStatus />
					</Card>
				</Grid>
			</Grid>
		</>
	);
};
