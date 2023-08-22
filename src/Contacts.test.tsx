import { render, screen } from '@testing-library/react';
import { Theme, ThemeProvider } from '@emotion/react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './App';

const API_URI = process.env.REACT_APP_API_URI;
const client = new ApolloClient({
	uri: API_URI,
	cache: new InMemoryCache(),
});

const theme: Theme = {
	colors: {
		primary: '#557A46',
		secondary: '#7A9D54',
		light: '#F2EE9D',
		dark: '#8C3333',
	},
};

test('renders contacts', () => {
	render(
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</ApolloProvider>
	);
	const linkElement = screen.getByText(/contacts/i);
	expect(linkElement).toBeInTheDocument();
});
