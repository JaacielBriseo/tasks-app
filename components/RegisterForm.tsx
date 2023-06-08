'use client';

import { useForm } from '@/hooks/useForm';
import { Button, TextField } from '@mui/material';

interface RegisterForm {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

//* Variable declarada fuera del componente para evitar que se vuelva a computar en cada render
const initialForm: RegisterForm = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
};

export const RegisterForm = () => {
	const { email, firstName, lastName, password, onInputChange } = useForm(initialForm);
	return (
		<>
			<TextField
				fullWidth
				sx={{ marginTop: 2, marginBottom: 1 }}
				placeholder='Juan'
				autoFocus
				label='Nombre'
				variant='standard'
				name='firstName'
				value={firstName}
				onChange={onInputChange}
			/>
			<TextField
				fullWidth
				sx={{ marginTop: 2, marginBottom: 1 }}
				placeholder='Perez'
				autoFocus
				label='Apellido'
				variant='standard'
				name='lastName'
				value={lastName}
				onChange={onInputChange}
			/>
			<TextField
				fullWidth
				sx={{ marginTop: 2, marginBottom: 1 }}
				placeholder='juanperez@google.com'
				autoFocus
				label='Email'
				variant='standard'
				name='email'
				value={email}
				onChange={onInputChange}
			/>
			<TextField
				fullWidth
				sx={{ marginTop: 2, marginBottom: 1 }}
				placeholder='*********'
				autoFocus
				label='Contraseña'
				variant='standard'
				name='password'
				value={password}
				onChange={onInputChange}
			/>

			<Button variant='contained' color='info' sx={{ mt: 3, py: 1.3, color: 'whitesmoke' }} fullWidth>
				Registrarme
			</Button>
		</>
	);
};
