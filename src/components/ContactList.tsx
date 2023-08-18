import styled from "@emotion/styled";
import Contact from "./Contact";
import SearchInput from "./SearchInput";

// const GET_CONTACT_LIST = gql`
//   query GetContactList(
//     $distinct_on: [contact_select_column!]
//     $limit: Int
//     $offset: Int
//     $order_by: [contact_order_by!]
//     $where: contact_bool_exp
//   ) {
//     contact(
//       distinct_on: $distinct_on
//       limit: $limit
//       offset: $offset
//       order_by: $order_by
//       where: $where
//     ) {
//       created_at
//       first_name
//       id
//       last_name
//       phones {
//         number
//       }
//     }
//   }
// `;

const breakpoints = [600];
const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

const Button = styled.button`
  outline: none;
  border: none;
  padding: 10px 15px;
  background: green;
  color: white;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 5px;

  &:hover {
    opacity: 0.8;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;

  ${mq[0]} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Heading2 = styled.h2`
  margin: 0;
  padding: 5px 0px;
`;

function ContactList() {
  // const { loading, data, error } = useQuery<APIResponse>(GET_CONTACT_LIST, {
  //   variables: {
  //     where: {
  //       first_name: { _like: "%John%" },
  //     },
  //   },
  // });

  return (
    <div>
      <Flex>
        <Heading2>Contacts</Heading2>
        <Button>Add Contact</Button>
      </Flex>
      <SearchInput />
      <Contact id={1} name="Lorem Ipsum" phone="081234567890" />
    </div>
  );
}

export default ContactList;
