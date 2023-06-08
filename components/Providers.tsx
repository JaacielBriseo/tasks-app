'use client';

import { PropsWithChildren } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@/theme';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</>
	);
};
