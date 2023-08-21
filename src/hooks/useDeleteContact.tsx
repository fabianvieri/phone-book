import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';

import { ActionType, APIDeleteResponse } from '../types';

import { DELETE_CONTACT } from '../gql/queries';
import { useContactsContext } from './useContactsContext';

export function useDeleteContact() {
	const { dispatch } = useContactsContext();
	const [deleteQuery, { loading }] = useMutation<APIDeleteResponse>(
		DELETE_CONTACT,
		{
			update(cache, { data }) {
				if (data) {
					cache.evict({ id: `contact:${data.delete_contact_by_pk.id}` });
				}
			},
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
