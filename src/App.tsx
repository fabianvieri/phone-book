import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import Layout from './Layout';
import Contact from './pages/Contact';
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route path="contacts" element={<Contact />}></Route>
			<Route path="contacts/add" element={<AddContact />}></Route>
			<Route path="contacts/edit" element={<EditContact />}></Route>
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
