'use client';

import { PropsWithChildren } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@/theme';
import { ApolloWrapper } from '@/libs/apollo-wrapper';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<ApolloWrapper>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					{children}
				</ThemeProvider>
			</ApolloWrapper>
		</>
	);
};
