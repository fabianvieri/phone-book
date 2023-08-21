import { Contact, Action, ActionType } from "../types";

export function reducer(state: Contact[], action: Action) {
  const { type, payload } = action;

  switch (type) {
    case ActionType.SET_CONTACTS:
      return payload;
    case ActionType.TOGGLE_FAVORITE:
      return state.map((contact) => {
        if (contact.id === payload.id)
          return { ...contact, isFavorite: !contact.isFavorite };
        return contact;
      });
    case ActionType.ADD_CONTACT:
      return [...state, { ...payload, isFavorite: false }];
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
