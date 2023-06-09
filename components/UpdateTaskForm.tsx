'use client';

import { useTasksContext } from '@/hooks/useTasksContext';
import { formatDateFromNow } from '@/utils/date-functions';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Modal,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material';
import { notFound } from 'next/navigation';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { DeleteOutlined } from '@mui/icons-material';
import { useTaskUpdate } from '@/hooks/useTaskUpdate';
interface Props {
	taskId: string;
}
export const UpdateTaskForm: React.FC<Props> = ({ taskId }) => {
	const { tasks, handleDelete, isDeleteModalOpen, handleCloseDeleteModal, handleOpenDeleteModal } = useTasksContext();
	const task = tasks.find(task => task.id === taskId);
	if (!task) {
		notFound();
	}
	/**
	 * Decidí hacer toda la logica del update
	 * fuera del TaskContext debido a que es mucho codigo
	 * y a mi parecer es mas legible verlo de esta manera
	 */
	const {
		//* Properties
		descriptionValue,
		isNotValid,
		userEmailToAssign,
		status,
		//* Methods
		onStatusChanged,
		onInputChange,
		onSave,
		setTouched,
	} = useTaskUpdate(task);
	return (
		<>
			<Grid container justifyContent='center' sx={{ marginTop: 2 }}>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardHeader title={`Tarea: ${task.description}`} subheader={formatDateFromNow(task.createdAt)} />

						<CardContent>
							<TextField
								sx={{ marginTop: 2, marginBottom: 1 }}
								fullWidth
								placeholder='Editar Tarea'
								autoFocus
								multiline
								label='Editar Tarea'
								name='descriptionValue'
								value={descriptionValue}
								onBlur={() => setTouched(true)}
								onChange={onInputChange}
								helperText={isNotValid && 'Ingrese un valor'}
								error={isNotValid}
							/>

							<TextField
								sx={{ marginTop: 2, marginBottom: 1 }}
								fullWidth
								placeholder='Asignar tarea a un usuario con su email'
								autoFocus
								multiline
								label='Asignar tarea'
								name='userEmailToAssign'
								value={userEmailToAssign}
								onBlur={() => setTouched(true)}
								onChange={onInputChange}
								helperText={isNotValid && 'Ingrese un valor'}
								error={isNotValid}
							/>

							<FormControl>
								<FormLabel>Estado:</FormLabel>
								<RadioGroup row name='status' value={status ? 'completed' : 'not-completed'} onChange={onStatusChanged}>
									<FormControlLabel value={'completed'} control={<Radio />} label={'Completado'} />
									<FormControlLabel value={'not-completed'} control={<Radio />} label={'No Completado'} />
								</RadioGroup>
							</FormControl>
							<Box>
								<Typography variant='h6'>Usuarios asignados:</Typography>
								<List>
									{task.assignedTo.items.length === 0 ? (
										<ListItem>
											<ListItemText primary='No hay usuarios asignados' />
										</ListItem>
									) : (
										task.assignedTo.items.map(user => (
											<ListItem key={user.id}>
												<ListItemText primary={`${user.firstName} ${user.lastName} - ${user.email}`} />
											</ListItem>
										))
									)}
								</List>
							</Box>
						</CardContent>

						<CardActions>
							<Button
								startIcon={<SaveOutlinedIcon />}
								variant='contained'
								fullWidth
								onClick={onSave}
								disabled={descriptionValue.length <= 0}>
								Save
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
			<IconButton
				onClick={handleOpenDeleteModal}
				sx={{
					position: 'fixed',
					bottom: 30,
					right: 30,
					backgroundColor: 'error.dark',
				}}>
				<DeleteOutlined />
			</IconButton>
			<Modal
				open={isDeleteModalOpen}
				onClose={handleCloseDeleteModal}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						bgcolor: 'grey',
						border: '2px solid #000',
						boxShadow: 24,
						p: 4,
					}}>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						Estas seguro que quieres eliminar esta tarea?
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						Este proceso no puede ser revertido
					</Typography>
					<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
						<Button fullWidth variant='outlined' color='info'>
							Cancelar
						</Button>
						<Button
							onClick={() => {
								handleDelete(task.id);
								handleCloseDeleteModal();
							}}
							fullWidth
							variant='contained'
							color='error'>
							Eliminar
						</Button>
					</Box>
				</Box>
			</Modal>
		</>
	);
};
