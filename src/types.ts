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
  ADD_CONTACT,
  EDIT_CONTACT,
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

type AddEditContact = {
  type: ActionType.ADD_CONTACT | ActionType.EDIT_CONTACT;
  payload: ContactGQL;
};

export type Action = SetContacts | SetContactById | AddEditContact;
