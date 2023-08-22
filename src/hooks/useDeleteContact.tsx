import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";

import { ActionType, APIDeleteResponse } from "../types";

import { useContactsContext } from "./useContactsContext";
import { DELETE_CONTACT, GET_CONTACTS } from "../gql/queries";

const PAGE_SIZE = 10;

export function useDeleteContact() {
  const { dispatch, page } = useContactsContext();
  const [deleteQuery, { loading }] = useMutation<APIDeleteResponse>(
    DELETE_CONTACT,
    {
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
          type: ActionType.DELETE_CONTACT,
          payload: { id: data.delete_contact_by_pk.id },
        });
        toast.success("Success delete contact");
      },
      onError: () => toast.error("Error delete contact"),
    }
  );

  return {
    loading,
    deleteQuery,
  };
}
