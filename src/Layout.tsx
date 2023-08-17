import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

const Header = styled.header`
	padding: 15px;
	background-color: green;
	font-size: 24px;
	border-radius: 4px;
	color: white;
	font-weight: bold;
`;

const Container = styled.div`
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
`;

const Heading = styled.h1`
	margin: 0;
`;

function Layout() {
	return (
		<>
			<Header>
				<Container>
					<Heading>Phone Book</Heading>
				</Container>
			</Header>
			<main>
				<Container>
					<Outlet />
				</Container>
			</main>
		</>
	);
}

export default Layout;
