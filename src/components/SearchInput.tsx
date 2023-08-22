import styled from '@emotion/styled';
import { BsSearch } from 'react-icons/bs';
import { ChangeEvent, useEffect, useState } from 'react';

type SearchInputPros = {
	setSearch: React.Dispatch<React.SetStateAction<string>>;
};

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

function SearchInput({ setSearch }: SearchInputPros) {
	const [value, setValue] = useState('');

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	useEffect(() => {
		const timeout = setTimeout(() => setSearch(value), 500);
		return () => clearTimeout(timeout);
	}, [value, setSearch]);

	return (
		<SearchInputContainer>
			<Input
				type="text"
				placeholder="Search contact name"
				value={value}
				onChange={onInputChange}
			/>
			<Icon>
				<BsSearch size={20} />
			</Icon>
		</SearchInputContainer>
	);
}

export default SearchInput;
