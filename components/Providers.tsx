'use client';
import { PropsWithChildren } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@/theme';
import { ApolloWrapper } from '@/libs/apollo-wrapper';
import { AuthProvider } from '@/contexts/auth';
import { TasksProvider } from '@/contexts/tasks';
import { SnackbarProvider } from 'notistack';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<SnackbarProvider>
				<ApolloWrapper>
					<AuthProvider>
						<TasksProvider>
							<ThemeProvider theme={theme}>
								<CssBaseline />
								{children}
							</ThemeProvider>
						</TasksProvider>
					</AuthProvider>
				</ApolloWrapper>
			</SnackbarProvider>
		</>
	);
};
