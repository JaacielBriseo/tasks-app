'use client';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import { Button, Chip, Link, TextField } from '@mui/material';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useForm } from '@/hooks/useForm';
import { LoginDTO } from '@/types';
import { useEffect, useState } from 'react';

const initialForm: LoginDTO = {
	email: '',
	password: '',
};

export const LoginForm = () => {
	const router = useRouter();
	const { email, onInputChange, password } = useForm(initialForm);
	const [error, setError] = useState<undefined | string>(undefined);
	const { handleLogin, isLoading } = useAuthContext();

	const onLogin = async () => {
		const { ok, msg } = await handleLogin({ email, password });
		if (ok) {
			router.push('/dashboard');
		}
		if (!ok) {
			setError(msg);
		}
	};

	useEffect(() => {
		if (!error) return;
		const timeout = setTimeout(() => {
			setError(undefined);
		}, 5000);
		return () => {
			clearTimeout(timeout);
		};
	}, [error]);

	return (
		<>
			{error && (
				<Chip
					sx={{
						height: 'auto',
						'& .MuiChip-label': {
							display: 'block',
							whiteSpace: 'normal',
						},
					}}
					label={error}
					color='error'
				/>
			)}
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
