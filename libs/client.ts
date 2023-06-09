import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

export const { getClient } = registerApolloClient(() => {
	return new ApolloClient({
		cache: new InMemoryCache(),
		link: new HttpLink({
			uri: 'https://api.8base.com/cliouei6v005d08lc3kq130yd',
		}),
	});
});
