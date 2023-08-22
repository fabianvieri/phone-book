import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';

import { ActionType, APIDeleteResponse } from '../types';

import { useContactsContext } from './useContactsContext';
import { DELETE_CONTACT, GET_CONTACTS } from '../gql/queries';

export function useDeleteContact() {
	const { dispatch } = useContactsContext();
	const [deleteQuery, { loading }] = useMutation<APIDeleteResponse>(
		DELETE_CONTACT,
		{
			refetchQueries: [GET_CONTACTS, 'GetContactList'],
			onCompleted: (data) => {
				dispatch({
					type: ActionType.DELETE_CONTACT,
					payload: { id: data.delete_contact_by_pk.id },
				});
				toast.success('Success delete contact');
			},
			onError: () => toast.error('Error delete contact'),
		}
	);

	return {
		loading,
		deleteQuery,
	};
}
