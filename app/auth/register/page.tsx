'use client';
import { RegisterForm } from '@/components/RegisterForm';
import { Box, Card, CardHeader } from '@mui/material';

const RegisterPage = () => {
	return (
		<Box
			display={'flex'}
			flexDirection={'column'}
			justifyContent={'center'}
			alignItems={'center'}
			sx={{ minHeight: '100vh' }}>
			<Card sx={{ width: '375px', padding: 2 }}>
				<CardHeader sx={{ textAlign: 'center' }} title='Registrate' />
				<RegisterForm />
			</Card>
		</Box>
	);
};
export default RegisterPage;
