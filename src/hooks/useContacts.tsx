import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { GET_CONTACTS } from '../gql/queries';
import { APIResponse, Contact, ActionType } from '../types';
import { useContactsContext } from './useContactsContext';

export function useContacts() {
	const { contacts, dispatch } = useContactsContext();
	const [getContacts, { loading, error, data }] = useLazyQuery<APIResponse>(
		GET_CONTACTS,
		{
			variables: {
				where: {
					first_name: { _like: '%' },
				},
				order_by: [{ created_at: 'desc' }],
			},
		}
	);

	const favoriteContacts = contacts.filter(
		(contact) => contact.isFavorite === true
	);

	const regularContacts = contacts.filter(
		(contact) => contact.isFavorite === false
	);

	useEffect(() => {
		const storage = localStorage.getItem('contacts');

		if (!storage) {
			getContacts();
			return;
		}

		const contactData: Contact[] = JSON.parse(storage);
		dispatch({ type: ActionType.SET_CONTACTS, payload: contactData });
	}, [getContacts, dispatch]);

	useEffect(() => {
		if (data) {
			const transformContacts = data.contact.map((contact) => ({
				...contact,
				isFavorite: false,
			}));
			const contactsJSON = JSON.stringify(transformContacts);
			localStorage.setItem('contacts', contactsJSON);
			dispatch({ type: ActionType.SET_CONTACTS, payload: transformContacts });
		}
	}, [data, dispatch]);

	return {
		error,
		loading,
		regularContacts,
		favoriteContacts,
	};
}
