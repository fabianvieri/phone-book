import { useState } from "react";
import styled from "@emotion/styled";

import Modal from "./Modal";
import Spinner from "./Spinner";
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import { useContacts } from "../hooks/useContacts";
import { useContactsContext } from "../hooks/useContactsContext";

const breakpoints = [600];
const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

const Button = styled.button`
  outline: none;
  border: none;
  padding: 10px 15px;
  background: ${(props) => props.theme.colors.secondary};
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

const Error = styled.p`
  color: pink;
  font-size: 0.85rem;
  margin: 0;
`;

function Contacts() {
  const { loading, error } = useContacts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { contacts, favorites, page, setPage } = useContactsContext();

  const onAddContact = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Flex>
        <Heading2>Contacts</Heading2>
        <Button onClick={onAddContact}>Add Contact</Button>
      </Flex>
      <SearchInput />
      {loading ? (
        <Spinner />
      ) : error ? (
        <Error>Error loading contacts</Error>
      ) : (
        <div>
          <ContactList
            title="Favorite Contacts"
            contacts={contacts}
            isFavorite={true}
          />
          <ContactList
            title="Regular Contacts"
            contacts={favorites}
            isFavorite={false}
          />
          <Pagination page={page} setPage={setPage} />
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ContactForm mode="add" />
      </Modal>
    </div>
  );
}

export default Contacts;
