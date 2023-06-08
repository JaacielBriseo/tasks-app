import { gql } from "@apollo/client";

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