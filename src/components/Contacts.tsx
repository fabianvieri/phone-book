import styled from '@emotion/styled';
import { useState, useCallback, useMemo } from 'react';

import Modal from './Modal';
import Spinner from './Spinner';
import Pagination from './Pagination';
import SearchInput from './SearchInput';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { useContacts } from '../hooks/useContacts';
import { useContactsContext } from '../hooks/useContactsContext';

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

const PAGE_SIZE = 10;

function Contacts() {
	const [page, setPage] = useState(0);
	const [search, setSearch] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { contacts, favorites } = useContactsContext();
	const { loading, error } = useContacts(page, PAGE_SIZE);

	const onAddContact = useCallback(() => {
		setIsModalOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	const contactList = useMemo(() => {
		const array = [...contacts];
		array.sort(
			(a, b) =>
				new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
		);

		let sorted = array.slice(0, PAGE_SIZE);

		if (search.trim().length > 0) {
			sorted = sorted.filter((c) =>
				c.first_name.toLowerCase().startsWith(search.toLowerCase())
			);
		}
		return sorted;
	}, [contacts, search]);

	return (
		<div>
			<Flex>
				<Heading2>Contacts</Heading2>
				<Button onClick={onAddContact}>Add Contact</Button>
			</Flex>
			<SearchInput setSearch={setSearch} />
			{loading ? (
				<Spinner />
			) : error ? (
				<Error>Error loading contacts</Error>
			) : (
				<div>
					<ContactList
						title="Favorite Contacts"
						contacts={favorites}
						isFavorite={true}
					/>
					<ContactList
						title="Regular Contacts"
						contacts={contactList}
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
