'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_TASKS_QUERY } from '@/graphql';
import Cookies from 'js-cookie';
import { Card, CardHeader, Grid } from '@mui/material';
import { Task } from '@/types';
import { NewTask } from './NewTask';
import { TasksList } from './TasksList';

export const UserDashboard = () => {
	const router = useRouter();
	const email = Cookies.get('userEmail');
	const idToken = Cookies.get('idToken');
	const { data, loading, error } = useQuery(GET_TASKS_QUERY, {
		variables: { email },
		context: {
			headers: {
				Authorization: `Bearer ${idToken}`,
			},
		},
	});
	if (loading) return <h1>Loading...</h1>;
	if (error) return <h1>Error...</h1>;
	const tasks = data.user.userTasks.items as Task[];
	console.log({ tasks });
	return (
		<>
			<Grid container spacing={4} sx={{ p: 4 }}>
				<Grid item xs={12} sm={6}>
					<Card sx={{ height: 'calc(100vh - 100px )' }}>
						<CardHeader title='Pendientes' />

						{/* Agregar una nueva entrada */}
						{/* Listado de las entradas */}
						<NewTask />
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
