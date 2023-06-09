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
			tasks {
				items {
					id
					description
					completed
					createdAt
					assignedTo {
						items {
							firstName
							lastName
							email
							id
						}
					}
				}
			}
		}
	}
`;

export const CREATE_TASK_MUTATION = gql`
	mutation TaskCreate($description: String!, $userEmail: String!) {
		taskCreate(data: { description: $description, userTasks: { connect: { email: $userEmail } } }) {
			id
			description
			completed
			createdAt
			assignedTo {
				items {
					email
					firstName
					lastName
					id
				}
			}
		}
	}
`;

export const UPDATE_TASK_MUTATION_WITH_ASSIGN = gql`
	mutation TaskUpdate($taskId: ID!, $completed: Boolean!, $description: String!, $email: String) {
		taskUpdate(
			filter: { id: $taskId }
			data: { completed: $completed, description: $description, assignedTo: { connect: { email: $email } } }
		) {
			id
			createdAt
			description
			completed
			assignedTo {
				items {
					id
					firstName
					lastName
					email
				}
			}
		}
	}
`;

export const UPDATE_TASK_MUTATION = gql`
	mutation TaskUpdate($taskId: ID!, $completed: Boolean!, $description: String!) {
		taskUpdate(filter: { id: $taskId }, data: { completed: $completed, description: $description }) {
			id
			createdAt
			description
			completed
			assignedTo {
				items {
					id
					firstName
					lastName
					email
				}
			}
		}
	}
`;

export const DELETE_TASK_MUTATION = gql`
	mutation TaskDelete($taskId: ID!) {
		taskDelete(filter: { id: $taskId }) {
			success
		}
	}
`;
