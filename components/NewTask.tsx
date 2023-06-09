import { useState } from 'react';
import { useTasksContext } from '@/hooks/useTasksContext';
import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const NewTask = () => {
	const { isAddingTask, toggleAddingTask } = useTasksContext();

	const [inputValue, setInputValue] = useState('');
	const [touched, setTouched] = useState(false);

	const onSave = () => {
		if (inputValue.length === 0) return;
		console.log({ inputValue });
		toggleAddingTask();
		setInputValue('');
		setTouched(false);
	};
	return (
		<Box sx={{ marginBottom: 2, paddingX: 2 }}>
			{isAddingTask ? (
				<>
					<TextField
						fullWidth
						sx={{ marginTop: 2, marginBottom: 1 }}
						placeholder='Nueva entrada'
						autoFocus
						multiline
						label='Nueva entrada'
						helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
						error={inputValue.length <= 0 && touched}
						value={inputValue}
						onChange={e => setInputValue(e.target.value)}
						onBlur={() => setTouched(true)}
					/>

					<Box display='flex' justifyContent='space-between'>
						<Button
							variant='text'
							onClick={() => {
								toggleAddingTask();
								setTouched(false);
							}}>
							Cancelar
						</Button>

						<Button variant='outlined' color='secondary' endIcon={<SaveOutlinedIcon />} onClick={onSave}>
							Guardar
						</Button>
					</Box>
				</>
			) : (
				<Button startIcon={<AddCircleOutlineOutlinedIcon />} fullWidth variant='outlined' onClick={toggleAddingTask}>
					Agregar Tarea
				</Button>
			)}
		</Box>
	);
};
