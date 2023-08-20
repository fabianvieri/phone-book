import styled from '@emotion/styled';
import { Toaster } from 'react-hot-toast';
import { BsFillPersonVcardFill } from 'react-icons/bs';

import Contacts from './components/Contacts';
import ContactsContextProvider from './context/context';

const Header = styled.header`
	font-size: 1rem;
	border-radius: 4px;
	color: black;
	font-weight: bold;
`;

const Container = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: 10px;
`;

const Heading = styled.h1`
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Icon = styled.span`
	display: none;
	margin-right: 5px;
	color: ${(props) => props.theme.colors.primary};

	@media (min-width: 400px) {
		display: flex;
	}
`;

function App() {
	return (
		<Container>
			<Toaster />
			<Header>
				<Heading>
					<Icon>
						<BsFillPersonVcardFill size={40} />
					</Icon>
					Phone Book
				</Heading>
			</Header>
			<main>
				<ContactsContextProvider>
					<Contacts />
				</ContactsContextProvider>
			</main>
		</Container>
	);
}

export default App;
