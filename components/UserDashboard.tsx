import { Card, CardHeader, Chip, Grid } from '@mui/material';
import { useTasksContext } from '@/hooks/useTasksContext';
import { NewTask, TasksList } from '.';
import { useAuthContext } from '@/hooks/useAuthContext';

export const UserDashboard = () => {
	const { tasks, isLoadingTasks } = useTasksContext();
	const { handleLogout } = useAuthContext();
	if (isLoadingTasks) return <h1>Loading...</h1>;

	return (
		<>
			<Chip
				onClick={handleLogout}
				label='Cerrar Sesión'
				sx={{ p: 1, mt: 2, mr: 4, float: 'right', cursor: 'pointer' }}
				color='error'
			/>
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
