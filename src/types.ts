export type Phone = {
	number: string;
};

export type ContactGQL = {
	id: number;
	first_name: string;
	last_name: string;
	phones: Phone[];
};

export type Contact = ContactGQL & { isFavorite: boolean };

export type APIResponse = {
	contact: ContactGQL[];
};

export enum ActionType {
	SET_CONTACTS,
	DELETE_CONTACT,
	TOGGLE_FAVORITE,
}

type SetContacts = {
	type: ActionType.SET_CONTACTS;
	payload: Contact[];
};

type SetContactById = {
	type: ActionType.TOGGLE_FAVORITE | ActionType.DELETE_CONTACT;
	payload: { id: number };
};

export type Action = SetContacts | SetContactById;
