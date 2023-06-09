'use client';

import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

export const NewTask = () => {
	const [isAddingTask, setIsAddingTask] = useState(false);
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
						// helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor' }
						// error={ inputValue.length <= 0 && touched }
						// value={ inputValue }
						// onChange={ onTextFieldChanged }
						// onBlur={ () => setTouched( true ) }
					/>

					<Box display='flex' justifyContent='space-between'>
						<Button
							variant='text'
							// onClick={() => setIsAddingEntry( false ) }
						>
							Cancelar
						</Button>

						<Button
							variant='outlined'
							color='secondary'
							// endIcon={ <SaveOutlinedIcon /> }
							// onClick={ onSave }
						>
							Guardar
						</Button>
					</Box>
				</>
			) : (
				<Button
					// startIcon={ <AddIcon /> }
					fullWidth
					variant='outlined'
					// onClick={() => setIsAddingEntry( true ) }
				>
					Agregar Tarea
				</Button>
			)}
		</Box>
	);
};
