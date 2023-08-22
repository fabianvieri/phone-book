import styled from '@emotion/styled';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';

type PaginationProps = {
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Flex = styled.div`
	display: flex;
	gap: 10px;
	width: 100%;
	margin-top: 10px;
	justify-content: center;
	align-items: center;
`;

const ButtonIcon = styled.button`
	cursor: pointer;
	border: none;
	padding: 5px;

	color: ${(props) => props.theme.colors.primary};

	&:hover {
		transform: scale(1.2);
	}

	&:disabled {
		color: grey;
	}
`;

const Page = styled.div`
	padding: 5px 10px;
	background: ${(props) => props.theme.colors.primary};
	color: white;
	font-weight: bold;
	border-radius: 10px;
`;

function Pagination({ page, setPage }: PaginationProps) {
	return (
		<Flex>
			<ButtonIcon onClick={() => setPage((prev) => prev - 1)} disabled={!page}>
				<BsCaretLeftFill />
			</ButtonIcon>
			<Page>{page + 1}</Page>
			<ButtonIcon>
				<BsCaretRightFill onClick={() => setPage((prev) => prev + 1)} />
			</ButtonIcon>
		</Flex>
	);
}

export default Pagination;
