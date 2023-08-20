import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Theme, ThemeProvider } from '@emotion/react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

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

root.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</ApolloProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
