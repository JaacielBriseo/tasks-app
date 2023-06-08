'use client';
import { LoginForm } from '@/components/LoginForm';
import { Box, Card, CardHeader } from '@mui/material';

const LoginPage = () => {
	return (
		<Box
			display={'flex'}
			flexDirection={'column'}
			justifyContent={'center'}
			alignItems={'center'}
			sx={{ minHeight: '100vh' }}>
			<Card sx={{ width: '375px', padding: 2 }}>
				<CardHeader sx={{ textAlign: 'center' }} title='Inicia Sesión' />
				<LoginForm />
			</Card>
		</Box>
	);
};
export default LoginPage;
