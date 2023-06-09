import { DecodedPayload } from '@/types';
import Cookies from 'js-cookie';
import { decode } from 'jsonwebtoken';
import { NextRequest } from 'next/server';
export const getSessionToken = async (req: NextRequest) => {
	const idToken = req.cookies.get('idToken')?.value;

	if (!idToken) {
		return false;
	}

	const decoded = decode(idToken);
	const { email } = decoded as DecodedPayload;
	Cookies.set('userEmail', email);
	return true;
};
