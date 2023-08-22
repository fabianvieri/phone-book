import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';

import { ActionType, APIAddResponse } from '../types';

import { ADD_CONTACT, GET_CONTACTS } from '../gql/queries';
import { useContactsContext } from './useContactsContext';

export function useAddContact() {
	const { dispatch } = useContactsContext();
	const [addQuery, { loading }] = useMutation<APIAddResponse>(ADD_CONTACT, {
		refetchQueries: [GET_CONTACTS, 'GetContactList'],
		onCompleted: (data) => {
			dispatch({
				type: ActionType.ADD_CONTACT,
				payload: data.insert_contact.returning[0],
			});
			toast.success('Success add contact');
		},
		onError: () => toast.error('Error add contact'),
	});

	return {
		loading,
		addQuery,
	};
}
