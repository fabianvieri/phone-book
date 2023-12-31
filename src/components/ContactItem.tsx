import styled from '@emotion/styled';
import {
	BsTelephone,
	BsPencil,
	BsTrash,
	BsBookmark,
	BsBookmarkFill,
} from 'react-icons/bs';
import { useState } from 'react';

import Modal from './Modal';
import ContactForm from './ContactForm';
import { ContactGQL } from '../types';
import { useDeleteContact } from '../hooks/useDeleteContact';
import { useContactsContext } from '../hooks/useContactsContext';

type ContactItemProps = {
	contact: ContactGQL;
	isFavorite: boolean;
};

const Card = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
	border-radius: 5px;
	margin-top: 10px;
	font-size: 0.85rem;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

	@media (min-width: 400px) {
		font-size: 1rem;
		flex-direction: row;
		justify-content: space-between;
	}
`;

const Phone = styled.p`
	display: flex;
	align-items: center;
	vertical-align: middle;
`;

const ContactName = styled.p`
	font-weight: bold;
	text-transform: capitalize;
`;

const ButtonIcon = styled.button`
	cursor: pointer;
	border: none;
	padding: 5px;
	border-radius: 5px;

	&:hover {
		opacity: 0.75;
	}
`;

const EditIcon = styled(ButtonIcon)`
	color: white;
	background: ${(props) => props.theme.colors.primary};
`;

const DeleteIcon = styled(ButtonIcon)`
	color: white;
	background: ${(props) => props.theme.colors.dark};
`;

const FavoriteIcon = styled(ButtonIcon)`
	background: ${(props) => props.theme.colors.light};
`;

const ButtonGroup = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 5px;
`;

function ContactItem({ contact, isFavorite }: ContactItemProps) {
	const { id, first_name, last_name, phones } = contact;

	const { addFavorites, removeFavorites } = useContactsContext();
	const { loading, deleteQuery } = useDeleteContact();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onEditContact = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const toggleFavorite = () => {
		if (isFavorite) removeFavorites(id);
		else addFavorites(id);
	};

	const onDeleteContact = () => {
		const confirmDelete = window.confirm(
			'Are you sure want to delete this contact?'
		);
		if (confirmDelete) deleteQuery({ variables: { id } });
	};

	return (
		<Card>
			<div>
				<ContactName>{`${first_name} ${last_name}`}</ContactName>
				<Phone>
					<BsTelephone style={{ marginRight: '5px' }} />
					{phones[0].number}
				</Phone>
			</div>
			<ButtonGroup>
				{isFavorite ? (
					<FavoriteIcon onClick={toggleFavorite}>
						<BsBookmarkFill size={15} />
					</FavoriteIcon>
				) : (
					<>
						<EditIcon onClick={onEditContact}>
							<BsPencil size={15} />
						</EditIcon>
						<DeleteIcon onClick={onDeleteContact} disabled={loading}>
							<BsTrash size={15} />
						</DeleteIcon>
						<FavoriteIcon onClick={toggleFavorite}>
							<BsBookmark size={15} />
						</FavoriteIcon>
					</>
				)}
			</ButtonGroup>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<ContactForm mode="edit" contact={contact} />
			</Modal>
		</Card>
	);
}

export default ContactItem;
