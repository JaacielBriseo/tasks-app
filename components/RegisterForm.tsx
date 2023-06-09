import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { Button, Link, TextField } from '@mui/material';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useForm } from '@/hooks/useForm';
import { RegisterDTO } from '@/types';

//* Variable declarada fuera del componente para evitar que se vuelva a computar en cada render
const initialForm: RegisterDTO = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
};
//TODO: Validar password minimo de 9 caracters para evitar error
//TODO: Validar formato email

export const RegisterForm = () => {
	const router = useRouter();
	const { handleSignUp, isLoading } = useAuthContext();
	const { email, firstName, lastName, password, onInputChange } = useForm(initialForm);

	const onSignUp = async () => {
		const { ok, msg } = await handleSignUp({ email, firstName, lastName, password });
		if (ok) {
			router.push('/dashboard');
		}
	};

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
				type='password'
				name='password'
				value={password}
				onChange={onInputChange}
			/>

			<Button
				disabled={isLoading}
				onClick={onSignUp}
				variant='contained'
				color='info'
				sx={{ mt: 3, mb: 3, py: 1.3, color: 'whitesmoke' }}
				fullWidth>
				Registrarme
			</Button>
			<NextLink href={'/auth/login'} passHref legacyBehavior>
				<Link variant='subtitle2' sx={{ float: 'right' }} color='#FFFF'>
					Ya tienes una cuenta ? Inicia sesión
				</Link>
			</NextLink>
		</>
	);
};
