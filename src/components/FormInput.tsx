import styled from "@emotion/styled";
import { HTMLAttributes } from "react";

type FormInputProps = HTMLAttributes<HTMLInputElement> & {
  isError: boolean;
};

const Input = styled.input<FormInputProps>`
    outline: none;
	border: none;
	padding: 10px 10px 10px 0px;
	font-size: 1rem;
    border-style:solid;
    border-width:5px;
    border-color:${(props) => (props.isError ? "hotpink" : "grep")}

    &:focus {
		outline: none;
	}
`;

function FormInput(props: FormInputProps) {
  return <Input {...props} />;
}

export default FormInput;
