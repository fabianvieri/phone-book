import { useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";

import { ActionType } from "../types";
import { DELETE_CONTACT } from "../gql/queries";
import { useContactsContext } from "./useContactsContext";

export function useDeleteContact() {
  const { dispatch } = useContactsContext();
  const [deleteQuery, { loading, error, data }] = useMutation(DELETE_CONTACT);

  const deleteContact = (id: number) => {
    deleteQuery({ variables: { id } });
  };

  useEffect(() => {
    if (data) {
      dispatch({ type: ActionType.DELETE_CONTACT, payload: { id } });
      toast.success("Success delete contact");
    }
    if (error) toast.error("Error delete contact");
  }, [data, error, dispatch]);

  return {
    loading,
    deleteContact,
  };
}
