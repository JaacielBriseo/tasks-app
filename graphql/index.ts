import { gql } from '@apollo/client';

export const SIGN_UP_MUTATION = gql`
	mutation SignUpMutation(
		$email: String!
		$firstName: String!
		$lastName: String!
		$password: String!
		$authProfileId: ID!
	) {
		userSignUpWithPassword(
			user: { email: $email, firstName: $firstName, lastName: $lastName }
			password: $password
			authProfileId: $authProfileId
		) {
			email
			firstName
		}
	}
`;

export const LOGIN_MUTATION = gql`
	mutation userLogin($email: String!, $password: String!, $authProfileId: ID!) {
		userLogin(data: { email: $email, password: $password, authProfileId: $authProfileId }) {
			auth {
				idToken
				accessToken
			}
		}
	}
`;

export const USER_QUERY = gql`
	query User($email: String!) {
		user(email: $email) {
			firstName
			lastName
			id
			email
		}
	}
`;

export const GET_TASKS_QUERY = gql`
	query User($email: String!) {
		user(email: $email) {
			userTasks {
				items {
					id
					description
					completed
					assignedTo {
						items {
							firstName
						}
					}
				}
			}
		}
	}
`;
