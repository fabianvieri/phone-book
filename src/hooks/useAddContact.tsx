import { useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";

import { ADD_CONTACT } from "../gql/queries";
import { ActionType, ContactGQL } from "../types";
import { useContactsContext } from "./useContactsContext";

export function useAddContact() {
  const { dispatch } = useContactsContext();
  const [addQuery, { loading, error, data }] = useMutation(ADD_CONTACT);

  const addContact = (contact: Omit<ContactGQL, "id">) => {
    addQuery({ variables: contact });
  };

  useEffect(() => {
    if (data) {
      dispatch({ type: ActionType.ADD_CONTACT, payload: data.contact });
      toast.success("Success add contact");
    }
    if (error) toast.error("Error add contact");
  }, [data, error, dispatch]);

  return {
    loading,
    addContact,
  };
}
