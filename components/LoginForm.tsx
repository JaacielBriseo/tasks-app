'use client';
import { useRouter } from 'next/navigation';
import { Button, Link, TextField } from '@mui/material';
import { useForm } from '@/hooks/useForm';
import { useAuthContext } from '@/hooks/useAuthContext';
import { LoginDTO } from '@/types';
import NextLink from 'next/link';

const initialForm: LoginDTO = {
	email: '',
	password: '',
};

export const LoginForm = () => {
	const router = useRouter();
	const { email, onInputChange, password } = useForm(initialForm);
	const { handleLogin, isLoading } = useAuthContext();

	const onLogin = async () => {
		const { ok } = await handleLogin({ email, password });
		if (ok) {
			router.push('/dashboard');
		}
	};

	return (
		<>
			<TextField
				fullWidth
				sx={{ marginTop: 2, marginBottom: 1 }}
				placeholder='correo@google.com'
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
				placeholder='******'
				autoFocus
				label='Contraseña'
				variant='standard'
				name='password'
				type='password'
				value={password}
				onChange={onInputChange}
			/>
			<Button
				disabled={isLoading}
				onClick={onLogin}
				variant='contained'
				color='info'
				sx={{ mt: 3, mb: 3, py: 1.3, color: 'whitesmoke' }}
				fullWidth>
				Iniciar Sesión
			</Button>
			<NextLink href={'/auth/register'} passHref legacyBehavior>
				<Link variant='subtitle2' sx={{ float: 'right' }} color='#FFFF'>
					Aun no tienes una cuenta ? Registrate
				</Link>
			</NextLink>
		</>
	);
};
