import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';

import { ActionType } from '../types';
import { DELETE_CONTACT } from '../gql/queries';
import { useContactsContext } from './useContactsContext';

export function useDeleteContact(id: number) {
	const { dispatch } = useContactsContext();
	const [deleteQuery, { loading, error, data }] = useMutation(DELETE_CONTACT, {
		variables: {
			id,
		},
	});

	useEffect(() => {
		if (data) {
			dispatch({ type: ActionType.DELETE_CONTACT, payload: { id } });
			toast.success('Success delete contact');
		}
		if (error) toast.error('Error deleting contact');
	}, [data, error, id, dispatch]);

	return {
		loading,
		deleteQuery,
	};
}
