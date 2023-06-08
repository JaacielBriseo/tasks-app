'use client';

import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useQuery } from '@apollo/client';
import { GET_TASKS_QUERY } from '@/graphql';
import { Task } from '@/types';

export const UserDashboard = () => {
	const router = useRouter();
	const { user } = useAuthContext();
	if (!user) {
		router.push('/auth/login');
	}
	const { email } = user!;
	const { data, loading, error } = useQuery(GET_TASKS_QUERY, {
		variables: { email },
	});
	console.log(email);
	console.log({ data, loading, error });
	if (loading) return <h1>Loading...</h1>;
	if (error) return <h1>Error...</h1>;
	console.log(data);
	return <div>aver</div>;
};
