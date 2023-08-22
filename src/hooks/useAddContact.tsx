import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";

import { ActionType, APIAddResponse } from "../types";

import { ADD_CONTACT, GET_CONTACTS } from "../gql/queries";
import { useContactsContext } from "./useContactsContext";

const PAGE_SIZE = 10;

export function useAddContact() {
  const { dispatch, page } = useContactsContext();
  const [addQuery, { loading }] = useMutation<APIAddResponse>(ADD_CONTACT, {
    refetchQueries: [
      {
        query: GET_CONTACTS,
        variables: {
          limit: PAGE_SIZE,
          offset: page * PAGE_SIZE,
          where: {
            first_name: { _like: "%" },
          },
          order_by: [{ created_at: "desc" }],
        },
      },
    ],
    onCompleted: (data) => {
      dispatch({
        type: ActionType.ADD_CONTACT,
        payload: data.insert_contact.returning,
      });
      toast.success("Success add contact");
    },
    onError: () => toast.error("Error add contact"),
  });

  return {
    loading,
    addQuery,
  };
}
