import React, { createContext, ReactNode, useReducer } from 'react';
import { reducer } from './reducer';
import { Contact, Action } from '../types';

type ContactsContextProps = {
	children: ReactNode;
};

type ContactsContextType = {
	contacts: Contact[];
	dispatch: React.Dispatch<Action>;
};

export const ContactsContext = createContext<ContactsContextType | null>(null);

export default function ContactsContextProvider({
	children,
}: ContactsContextProps) {
	const [contacts, dispatch] = useReducer(reducer, []);

	return (
		<ContactsContext.Provider value={{ contacts, dispatch }}>
			{children}
		</ContactsContext.Provider>
	);
}
