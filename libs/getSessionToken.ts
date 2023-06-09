import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';
import { NextRequest } from 'next/server';
export const getSessionToken = async (req: NextRequest) => {
	const idToken = req.cookies.get('idToken')?.value;

	if (!idToken) {
		return false;
	}

	const decoded = decodeJwt(idToken);
	const { email } = decoded as any;
	Cookies.set('userEmail', email);
	return true;
};
