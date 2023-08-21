import { z } from 'zod';
import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';

import { Contact } from '../types';
import FormInput from './FormInput';
import { useAddContact } from '../hooks/useAddContact';
import { useEditContact } from '../hooks/useEditContact';

type FormProps = {
	mode: 'edit' | 'add';
	contact?: Contact;
};

const contactSchema = z.object({
	first_name: z
		.string()
		.min(2, { message: 'First name is too short' })
		.max(30, { message: 'First name is too long' }),
	last_name: z
		.string()
		.min(1, { message: 'Last name is too short' })
		.max(30, { message: 'Last name is too long' }),
	phones: z
		.array(
			z.object({
				number: z
					.string()
					.min(10, { message: 'Please input valid phone number' }),
			})
		)
		.nonempty({ message: 'Please input a phone number' }),
});

type ContactData = z.infer<typeof contactSchema>;

const emptyValues = {
	first_name: '',
	last_name: '',
	phones: [{ number: '' }],
};

const Paragraph = styled.p`
	margin: 0;
	color: red;
	font-size: 0.85rem;
`;

function ContactForm({ mode, contact }: FormProps) {
	const defaultValues = contact
		? {
				first_name: contact.first_name,
				last_name: contact.last_name,
				phones: contact.phones,
		  }
		: emptyValues;

	const {
		control,
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ContactData>({
		resolver: zodResolver(contactSchema),
		defaultValues,
	});

	const { append, remove, fields } = useFieldArray({ control, name: 'phones' });
	const { loading: addLoading, addQuery } = useAddContact();
	const { loading: editLoading, editQuery } = useEditContact();

	const firstNameError = errors.first_name?.message;
	const lastNameError = errors.last_name?.message;
	const phonesError = errors.phones?.message;

	const onSubmitContact = (data: ContactData) => {
		if (mode === 'add') addQuery({ variables: data });
		if (mode === 'edit') {
			if (contact) {
				const { first_name, last_name, phones } = contact;
				editQuery({
					variables: {
						id: contact.id,
						_set: { first_name, last_name, phones },
					},
				});
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmitContact)}>
			<h2>Contact Form</h2>
			<FormInput
				{...register('first_name')}
				placeholder="First name"
				isError={!!firstNameError}
			/>
			{firstNameError && <Paragraph>{firstNameError}</Paragraph>}
			<FormInput
				{...register('last_name')}
				placeholder="Last name"
				isError={!!lastNameError}
			/>
			{lastNameError && <Paragraph>{lastNameError}</Paragraph>}

			{fields.map((field, index) => (
				<div key={field.id}>
					<FormInput
						{...register(`phones.${index}.number`)}
						placeholder="Phone number"
						isError={!!errors.phones?.[index]?.number?.message}
					/>
					<button onClick={() => remove(index)}>Remove</button>
				</div>
			))}
			{phonesError && <Paragraph>{phonesError}</Paragraph>}

			<button onClick={() => append({ number: '' })}>Add Phone</button>
			<button type="submit" disabled={!isValid || addLoading || editLoading}>
				{mode === 'add' ? 'Add Contact' : 'Edit Contact'}
			</button>
		</form>
	);
}

export default ContactForm;
