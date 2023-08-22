import styled from "@emotion/styled";
import { ContactGQL } from "../types";
import ContactItem from "./ContactItem";

type ContactListProps = {
  title: string;
  contacts: ContactGQL[];
  isFavorite: boolean;
};

const Heading3 = styled.h3`
  font-weight: 400;
`;

const Paragraph = styled.p`
  color: grey;
  font-size: 0.85rem;
  margin: 0;
`;

function ContactList({ title, contacts, isFavorite }: ContactListProps) {
  return (
    <div>
      <Heading3>{title}</Heading3>
      {contacts.length === 0 ? (
        <Paragraph>You have no contacts here</Paragraph>
      ) : (
        contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            isFavorite={isFavorite}
          />
        ))
      )}
    </div>
  );
}

export default ContactList;
