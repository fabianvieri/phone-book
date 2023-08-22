import React, {
	createContext,
	ReactNode,
	useReducer,
	useState,
	useEffect,
} from 'react';
import { reducer } from './reducer';
import { Action, ActionType, ContactGQL } from '../types';

type ContactsContextProps = {
	children: ReactNode;
};

type ContactsContextType = {
	contacts: ContactGQL[];
	favorites: ContactGQL[];
	dispatch: React.Dispatch<Action>;
	addFavorites: (id: number) => void;
	removeFavorites: (id: number) => void;
};

export const ContactsContext = createContext<ContactsContextType | null>(null);

export default function ContactsContextProvider({
	children,
}: ContactsContextProps) {
	const [contacts, dispatch] = useReducer(reducer, []);
	const [favorites, setFavorites] = useState<ContactGQL[]>([]);

	const addFavorites = (id: number) => {
		const storage = localStorage.getItem('favorites');
		if (storage) {
			const data: ContactGQL[] = JSON.parse(storage);
			const newFavs = contacts.find((c) => c.id === id);
			if (newFavs) {
				const saved = [...data, newFavs];
				localStorage.setItem('favorites', JSON.stringify(saved));
				setFavorites(saved);
				dispatch({
					type: ActionType.DELETE_CONTACT,
					payload: { id },
				});
			}
		}
	};

	const removeFavorites = (id: number) => {
		const storage = localStorage.getItem('favorites');
		if (storage) {
			const removed = favorites.find((f) => f.id === id);
			if (removed) {
				const newFavs = favorites.filter((f) => f.id !== id);
				localStorage.setItem('favorites', JSON.stringify(newFavs));
				setFavorites(newFavs);
				dispatch({
					type: ActionType.ADD_CONTACT,
					payload: removed,
				});
			}
		}
	};

	useEffect(() => {
		const storage = localStorage.getItem('favorites');
		if (storage) {
			const data: ContactGQL[] = JSON.parse(storage);
			setFavorites(data);
			return;
		}

		localStorage.setItem('favorites', JSON.stringify([]));
	}, []);

	return (
		<ContactsContext.Provider
			value={{
				contacts,
				favorites,
				dispatch,
				addFavorites,
				removeFavorites,
			}}
		>
			{children}
		</ContactsContext.Provider>
	);
}
