import { useContext } from 'react';
import { ContactsContext } from '../context/context';

export function useContactsContext() {
	const context = useContext(ContactsContext);
	if (!context) {
		throw new Error(
			'ContactsContext must be use within ContactsContextProvider'
		);
	}
	return context;
}
