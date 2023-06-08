import { useCallback, useState } from 'react';

export const useForm = <T>(initialForm: T) => {
	const [formState, setFormState] = useState(initialForm);

	const onInputChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setFormState(currentForm => ({
			...currentForm,
			[target.name]: target.value,
		}));
	}, []);

	return {
		...formState,
		formState,
		onInputChange,
	};
};
