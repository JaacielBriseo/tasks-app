import { PropsWithChildren, useReducer, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { decode } from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { DecodedPayload, LoginDTO, LoginResponse, RegisterDTO, User } from '@/types';
import { LOGIN_MUTATION, SIGN_UP_MUTATION, USER_QUERY } from '@/graphql';
import { AuthContext, authReducer } from '.';

export interface AuthState {
	user: User | null;
}

const Auth_INITIAL_STATE: AuthState = {
	user: null,
};
export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);
	const [isLoading, setIsLoading] = useState(false);
	const [loginMutation] = useMutation(LOGIN_MUTATION);
	const [signUpMutation] = useMutation(SIGN_UP_MUTATION);
	const { refetch } = useQuery(USER_QUERY);

	const handleSignUp = async ({ email, firstName, lastName, password }: RegisterDTO) => {
		setIsLoading(true);
		try {
			await signUpMutation({
				variables: {
					email,
					firstName,
					lastName,
					password,
					authProfileId: process.env.NEXT_PUBLIC_DB_AUTH,
				},
			});
			await handleLogin({ email, password });
			return {
				ok: true,
			};
		} catch (error) {
			console.error(error);
			handleLogout();
			return {
				ok: false,
				msg: 'Ocurrio algun error, intente de nuevo mas tarde',
			};
		} finally {
			setIsLoading(false);
		}
	};

	const handleLogin = async ({ email, password }: LoginDTO) => {
		setIsLoading(true);
		try {
			const response = await loginMutation({
				variables: {
					email,
					password,
					authProfileId: process.env.NEXT_PUBLIC_DB_AUTH,
				},
			});
			const {
				data: {
					userLogin: {
						auth: { idToken },
					},
				},
			} = response as LoginResponse;
			Cookies.set('idToken', idToken);
			const decoded = decode(idToken);
			const { email: decodedEmail } = decoded as DecodedPayload;
			Cookies.set('userEmail', decodedEmail);
			if (decodedEmail !== email) {
				handleLogout();
				return {
					ok: false,
					msg: 'El email no coincide con el token',
				};
			}

			const { data } = await refetch({ email });
			const { user } = data;
			dispatch({ type: '[Auth] - Login', payload: user });
			return {
				ok: true,
			};
		} catch (error) {
			console.error(error);
			handleLogout();
			return {
				ok: false,
				msg: 'Ocurrió algun error, contacte a un administrador',
			};
		} finally {
			setIsLoading(false);
		}
	};

	const handleLogout = () => {
		Cookies.remove('idToken');
		Cookies.remove('userEmail');
		dispatch({ type: '[Auth] - Logout' });
	};

	return (
		<AuthContext.Provider
			value={{
				//* Properties
				...state,
				isLoading,

				//* Methods
				handleLogin,
				handleSignUp,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
