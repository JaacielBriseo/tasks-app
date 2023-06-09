import { DecodedPayload } from '@/types';
import Cookies from 'js-cookie';
import { decode } from 'jsonwebtoken';
import { NextRequest } from 'next/server';
export const getSessionToken = async (req: NextRequest) => {
	const idToken = req.cookies.get('idToken')?.value;

	if (!idToken) {
		return null;
	}

	const decoded = decode(idToken);
	const { email, family_name, name } = decoded as DecodedPayload;
	Cookies.set('userEmail', email);
	return {
		email,
		fullName: `${name} ${family_name}`,
	};
};
