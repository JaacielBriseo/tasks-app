import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('idToken');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

export const { getClient } = registerApolloClient(() => {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			// https://studio.apollographql.com/public/spacex-l4uc6p/
			uri: 'https://api.8base.com/climlydnx000c08l1982m06xj',
			// you can disable result caching here if you want to
			// (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
			// fetchOptions: { cache: "no-store" },
		}).concat(authLink),
	});
});
