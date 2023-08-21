import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';

import { ActionType, APIEditResponse } from '../types';

import { useContactsContext } from './useContactsContext';
import { EDIT_CONTACT, GET_CONTACTS } from '../gql/queries';

export function useEditContact() {
	const { dispatch } = useContactsContext();
	const [editQuery, { loading, error, data }] = useMutation<APIEditResponse>(
		EDIT_CONTACT,
		{
			refetchQueries: [GET_CONTACTS, 'GetContactList'],
		}
	);

	useEffect(() => {
		if (data) {
			dispatch({
				type: ActionType.EDIT_CONTACT,
				payload: data.update_contact_by_pk,
			});
			toast.success('Success edit contact');
		}
		if (error) toast.error('Error edit contact');
	}, [data, error, dispatch]);

	return {
		loading,
		editQuery,
	};
}
