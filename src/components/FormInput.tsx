import styled from '@emotion/styled';
import { HTMLAttributes, forwardRef } from 'react';

type FormInputProps = HTMLAttributes<HTMLInputElement> & {
	isError: boolean;
	disabled?: boolean;
};

const Input = styled.input<FormInputProps>`
	outline: none;
	border: none;
	width: 100%;
	font-size: 1rem;
	padding: 10px 10px 10px 0px;
	border-bottom: 1px solid ${(props) => (props.isError ? 'red' : 'grey')};

	&:focus {
		outline: none;
	}
`;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => (
	<Input {...props} ref={ref} />
));

export default FormInput;
