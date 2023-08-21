import { useState } from "react";
import styled from "@emotion/styled";

import Modal from "./Modal";
import SearchInput from "./SearchInput";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import { useContacts } from "../hooks/useContacts";
import Spinner from "./Spinner";

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

function Contacts() {
  const { loading, error, regularContacts, favoriteContacts } = useContacts();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <p>Error loading contacts</p>
      ) : (
        <div>
          <ContactList title="Favorite Contacts" contacts={favoriteContacts} />
          <ContactList title="Regular Contacts" contacts={regularContacts} />
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ContactForm mode="add" />
      </Modal>
    </div>
  );
}

export default Contacts;
