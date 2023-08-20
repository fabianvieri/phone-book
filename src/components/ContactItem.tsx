import styled from '@emotion/styled';
import {
	BsTelephone,
	BsPencil,
	BsTrash,
	BsBookmark,
	BsBookmarkFill,
} from 'react-icons/bs';

import { ActionType, Contact } from '../types';
import { useDeleteContact } from '../hooks/useDeleteContact';
import { useContactsContext } from '../hooks/useContactsContext';

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

function ContactItem({
	id,
	first_name,
	last_name,
	phones,
	isFavorite,
}: Contact) {
	const { dispatch } = useContactsContext();
	const { loading, deleteQuery } = useDeleteContact(id);

	const toggleFavorite = () => {
		dispatch({ type: ActionType.TOGGLE_FAVORITE, payload: { id } });
	};

	const deleteContact = () => {
		const confirmDelete = window.confirm(
			'Are you sure want to delete this contact?'
		);
		if (confirmDelete) deleteQuery();
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
				<EditIcon>
					<BsPencil size={15} />
				</EditIcon>
				<DeleteIcon onClick={deleteContact} disabled={loading}>
					<BsTrash size={15} />
				</DeleteIcon>
				<FavoriteIcon onClick={toggleFavorite}>
					{isFavorite ? <BsBookmarkFill size={15} /> : <BsBookmark size={15} />}
				</FavoriteIcon>
			</ButtonGroup>
		</Card>
	);
}

export default ContactItem;
