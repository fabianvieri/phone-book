import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';

import { ActionType, ContactGQL, APIAddResponse } from '../types';

import { ADD_CONTACT } from '../gql/queries';
import { useContactsContext } from './useContactsContext';

export function useAddContact() {
	const { dispatch } = useContactsContext();
	const [addQuery, { loading, error, data }] = useMutation<APIAddResponse>(
		ADD_CONTACT,
		{
			onCompleted: (data) => {
				dispatch({
					type: ActionType.ADD_CONTACT,
					payload: data.insert_contact.returning,
				});
				toast.success('Success add contact');
			},
		}
	);

	useEffect(() => {
		if (data) {
		}
		if (error) toast.error('Error add contact');
	}, [data, error, dispatch]);

	return {
		loading,
		addQuery,
	};
}
