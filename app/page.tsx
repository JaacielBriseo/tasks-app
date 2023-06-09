'use client'
import NextLink from 'next/link';
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material';

export default function Home() {
	return (
		<Box
			display={'flex'}
			flexDirection={'column'}
			justifyContent={'center'}
			alignItems={'center'}
			sx={{ minHeight: '100vh' }}>
			<Card sx={{ width: '375px', height: '200px' }}>
				<CardContent>
					<CardHeader sx={{ textAlign: 'center' }} title='Inicia sesión o registrate para continuar' />
					<Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={3}>
						<NextLink href={'/auth/login'}>
							<Button color='secondary' variant='contained'>
								Iniciar Sesión
							</Button>
						</NextLink>
						<NextLink href={'/auth/register'}>
							<Button color='warning' variant='outlined'>
								Registrarme
							</Button>
						</NextLink>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
}
