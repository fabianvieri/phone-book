import { Action, ActionType, ContactGQL } from '../types';

export function reducer(state: ContactGQL[], action: Action) {
	const { type, payload } = action;

	switch (type) {
		case ActionType.SET_CONTACTS:
			return payload;
		case ActionType.ADD_CONTACT:
			return [...state, payload];
		case ActionType.EDIT_CONTACT:
			return state.map((contact) => {
				if (contact.id === payload.id) return { ...contact, ...payload };
				return contact;
			});
		case ActionType.DELETE_CONTACT:
			return state.filter((contact) => contact.id !== payload.id);
		default:
			return state;
	}
}
