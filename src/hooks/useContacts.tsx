import toast from "react-hot-toast";
import { useQuery } from "@apollo/client";

import { APIResponse, ActionType } from "../types";

import { GET_CONTACTS } from "../gql/queries";
import { useContactsContext } from "./useContactsContext";

const PAGE_SIZE = 10;

export function useContacts() {
  const { dispatch, page } = useContactsContext();
  const { loading, error } = useQuery<APIResponse>(GET_CONTACTS, {
    variables: {
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
      where: {
        first_name: { _like: "%" },
      },
      order_by: [{ created_at: "desc" }],
    },
    onCompleted: (data) => {
      dispatch({ type: ActionType.SET_CONTACTS, payload: data.contact });
    },
    onError: () => toast.error("Error loading contact list"),
  });

  return {
    error,
    loading,
  };
}
