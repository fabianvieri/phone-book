import { useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";

import { EDIT_CONTACT } from "../gql/queries";
import { ActionType, Contact } from "../types";
import { useContactsContext } from "./useContactsContext";

export function useEditContact() {
  const { dispatch } = useContactsContext();
  const [editQuery, { loading, error, data }] = useMutation(EDIT_CONTACT);

  const editContact = (contact: Contact) => {
    const { id, first_name, last_name, phones } = contact;
    editQuery({ variables: { id, _set: { first_name, last_name, phones } } });
  };

  useEffect(() => {
    if (data) {
      dispatch({ type: ActionType.EDIT_CONTACT, payload: data.contact });
      toast.success("Success edit contact");
    }
    if (error) toast.error("Error edit contact");
  }, [data, error, dispatch]);

  return {
    loading,
    editContact,
  };
}
