import { User } from '@/types';
import { AuthState } from './AuthProvider';
type AuthActionType = { type: '[Auth] - Login'; payload: User } | { type: '[Auth] - Logout' };
export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {
	switch (action.type) {
		case '[Auth] - Login':
			return {
				...state,
				user: action.payload,
			};
		case '[Auth] - Logout':
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
};
export default authReducer;
