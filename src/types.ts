export type Phone = {
	number: string;
};

export type ContactGQL = {
	id: number;
	first_name: string;
	last_name: string;
	created_at: string;
	phones: Phone[];
};

export type APIResponse = {
	contact: ContactGQL[];
};

export type APIAddResponse = {
	insert_contact: {
		returning: ContactGQL[];
	};
};
export type APIEditResponse = {
	update_contact_by_pk: ContactGQL;
};

export type APIDeleteResponse = {
	delete_contact_by_pk: ContactGQL;
};

export enum ActionType {
	SET_CONTACTS,
	ADD_CONTACT,
	EDIT_CONTACT,
	DELETE_CONTACT,
}

type SetContacts = {
	type: ActionType.SET_CONTACTS;
	payload: ContactGQL[];
};

type SetContactById = {
	type: ActionType.DELETE_CONTACT;
	payload: { id: number };
};

type AddEditContact = {
	type: ActionType.ADD_CONTACT | ActionType.EDIT_CONTACT;
	payload: ContactGQL;
};

export type Action = SetContacts | SetContactById | AddEditContact;
