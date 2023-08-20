import styled from '@emotion/styled';
import { BsSearch } from 'react-icons/bs';

const SearchInputContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`;

const Input = styled.input`
	outline: none;
	border: none;
	padding: 10px 10px 10px 0px;
	font-size: 1rem;
	flex: 1;
	border-bottom: 1px solid grey;
	margin-top: 15px;

	&:focus {
		outline: none;
	}
`;

const Icon = styled.div`
	display: none;

	@media (min-width: 400px) {
		display: flex;
	}
`;

function SearchInput() {
	return (
		<SearchInputContainer>
			<Input type="text" placeholder="Search contact name" />
			<Icon>
				<BsSearch size={20} />
			</Icon>
		</SearchInputContainer>
	);
}

export default SearchInput;
