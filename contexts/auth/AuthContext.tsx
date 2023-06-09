import { createContext } from 'react';
import { LoginDTO, RegisterDTO, User } from '@/types';

interface ContextProps {
	user: User | null;
	isLoading: boolean;
	handleLogout: () => void;
	handleLogin: (args: LoginDTO) => Promise<{
		ok: boolean;
		msg?: string;
	}>;
	handleSignUp: (args: RegisterDTO) => Promise<{
		ok: boolean;
		msg?: string;
	}>;
}

export const AuthContext = createContext({} as ContextProps);
