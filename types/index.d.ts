export type RegisterDTO = {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
};

export type LoginDTO = {
	email: string;
	password: string;
};

export interface UserResponse {
	user: User;
}

interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
}

export interface Task {
	id: string;
	description: string;
	completed: boolean;
	assignedTo: {
		items: User[];
	};
}

export interface DecodedPayload {
	email: string;
	family_name: string;
	name: string;
}

// Generated by https://quicktype.io

export interface LoginResponse {
	data: Data;
}

export interface Data {
	userLogin: UserLogin;
}

export interface UserLogin {
	auth: Auth;
}

export interface Auth {
	idToken: string;
	accessToken: string;
}
