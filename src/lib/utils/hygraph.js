import { VITE_HYGRAPH_KEY, HYGRAPH_URL } from '$env/static/private';

import { GraphQLClient } from 'graphql-request';

export const hygraph = new GraphQLClient(HYGRAPH_URL, {
	headers: {
		Authorization: `Bearer ${VITE_HYGRAPH_KEY}`
	}
});
