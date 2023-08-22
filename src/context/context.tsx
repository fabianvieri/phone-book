import React, {
  createContext,
  ReactNode,
  useReducer,
  useState,
  useEffect,
} from "react";
import { reducer } from "./reducer";
import { Action, ContactGQL } from "../types";

type ContactsContextProps = {
  children: ReactNode;
};

type ContactsContextType = {
  page: number;
  contacts: ContactGQL[];
  favorites: ContactGQL[];
  dispatch: React.Dispatch<Action>;
  addFavorites: (id: number) => void;
  removeFavorites: (id: number) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const ContactsContext = createContext<ContactsContextType | null>(null);

export default function ContactsContextProvider({
  children,
}: ContactsContextProps) {
  const [contacts, dispatch] = useReducer(reducer, []);
  const [favorites, setFavorites] = useState<ContactGQL[]>([]);
  const [page, setPage] = useState(0);

  const addFavorites = (id: number) => {
    const storage = localStorage.getItem("favorites");
    if (storage) {
      const data: ContactGQL[] = JSON.parse(storage);
      const newFavs = contacts.find((c) => c.id === id);
      if (newFavs) {
        const saved = [...data, newFavs];
        localStorage.setItem("favorites", JSON.stringify(saved));
        setFavorites(saved);
      }
    }
  };

  const removeFavorites = (id: number) => {
    const storage = localStorage.getItem("favorites");
    if (storage) {
      const newFavs = favorites.filter((f) => f.id === id);
      if (newFavs) {
        localStorage.setItem("favorites", JSON.stringify(newFavs));
        setFavorites(newFavs);
      }
    }
  };

  useEffect(() => {
    const storage = localStorage.getItem("favorites");
    if (storage) {
      const data: ContactGQL[] = JSON.parse(storage);
      setFavorites(data);
    }
  }, []);

  return (
    <ContactsContext.Provider
      value={{
        page,
        contacts,
        favorites,
        setPage,
        dispatch,
        addFavorites,
        removeFavorites,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
