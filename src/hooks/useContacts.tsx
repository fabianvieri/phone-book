import toast from 'react-hot-toast';
import { gql, useApolloClient, useQuery } from '@apollo/client';

import { APIResponse, ActionType, ContactCache, Contact } from '../types';

import { GET_CONTACTS } from '../gql/queries';
import { useContactsContext } from './useContactsContext';

export function useContacts() {
	const client = useApolloClient();
	const { loading, error } = useQuery<APIResponse>(GET_CONTACTS, {
		onCompleted: (data) => {
			const cacheData = client.cache.extract() as ContactCache;
			console.log(cacheData);

			const transformContacts = Object.keys(cacheData).map((key) => {
				const contact: Contact | null = client.readFragment({
					id: key,
					fragment: gql`
						fragment Read on contact {
							first_name
							last_name
							created_at
							phones {
								number
							}
						}
					`,
				});

				if (contact) {
					if (!contact.isFavorite) {
						client.writeFragment({
							id: key,
							fragment: gql`
								fragment Write on contact {
									first_name
									last_name
									created_at
									phones {
										number
									}
								}
							`,
							data: {
								isFavorite: false,
							},
						});
					}
					return contact;
				}
				return contact;
			});

			console.log(test);

			// dispatch({ type: ActionType.SET_CONTACTS, payload: transformContacts });
		},
		onError: () => {
			toast.error('Error loading contact list');
		},
	});

	const { contacts, dispatch } = useContactsContext();

	const favoriteContacts = contacts.filter(
		(contact) => contact.isFavorite === true
	);

	const regularContacts = contacts.filter(
		(contact) => contact.isFavorite === false
	);

	return {
		error,
		loading,
		regularContacts,
		favoriteContacts,
	};
}
