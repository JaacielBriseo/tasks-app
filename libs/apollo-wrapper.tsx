'use client';

import { ApolloClient, ApolloLink, HttpLink, SuspenseCache } from '@apollo/client';
import {
	ApolloNextAppProvider,
	NextSSRInMemoryCache,
	SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

function makeClient() {
	const httpLink = new HttpLink({
		uri: 'https://api.8base.com/cliouei6v005d08lc3kq130yd',
	});

	return new ApolloClient({
		cache: new NextSSRInMemoryCache(),
		link:
			typeof window === 'undefined'
				? ApolloLink.from([
						new SSRMultipartLink({
							stripDefer: true,
						}),
						httpLink,
				  ])
				: httpLink,
	});
}

function makeSuspenseCache() {
	return new SuspenseCache();
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
	return (
		<ApolloNextAppProvider makeClient={makeClient} makeSuspenseCache={makeSuspenseCache}>
			{children}
		</ApolloNextAppProvider>
	);
}
