import { useContext } from 'react';
import { AuthContext } from '@/contexts/auth';

export const useAuthContext = () => useContext(AuthContext);
