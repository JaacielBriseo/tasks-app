import { NextRequest, NextResponse } from 'next/server';
import { getSessionToken } from './libs/getSessionToken';

export const middleware = async (req: NextRequest) => {
	const user = await getSessionToken(req);
	const path = req.nextUrl.pathname;

	//* Si no hay usuario con sesión activa , prevenir que acceda a dashboard
	if (path.startsWith('/dashboard') && !user) {
		return NextResponse.redirect(new URL('/auth/login', req.url));
	}

	//* Prevenir que el usuario vuelva a iniciar sesión si su token de acceso aun es valido
	if ((path.startsWith('/auth') || path === '/') && user) {
		return NextResponse.redirect(new URL('/dashboard', req.url));
	}

	return NextResponse.next();
};
