import { gql, useQuery } from '@apollo/client';
import { APIResponse } from '../types';

const GET_CONTACT_LIST = gql`
	query GetContactList(
		$distinct_on: [contact_select_column!]
		$limit: Int
		$offset: Int
		$order_by: [contact_order_by!]
		$where: contact_bool_exp
	) {
		contact(
			distinct_on: $distinct_on
			limit: $limit
			offset: $offset
			order_by: $order_by
			where: $where
		) {
			created_at
			first_name
			id
			last_name
			phones {
				number
			}
		}
	}
`;

function Contact() {
	const { loading, data, error } = useQuery<APIResponse>(GET_CONTACT_LIST, {
		variables: {
			where: {
				first_name: { _like: '%John%' },
			},
		},
	});

	return (
		<div>
			<h2>Contact</h2>
			{loading ? <p>Loading..</p> : error ? <p>Error</p> : <p>success</p>}
			<ul>
				{data?.contact.map((contact) => (
					<li key={contact.id}>{contact.first_name}</li>
				))}
			</ul>
		</div>
	);
}

export default Contact;
