import styled from "@emotion/styled";
import { HTMLAttributes, forwardRef } from "react";

type FormInputProps = HTMLAttributes<HTMLInputElement> & {
  isError: boolean;
};

const Input = styled.input<FormInputProps>`
  outline: none;
  border: none;
  padding: 10px 10px 10px 0px;
  font-size: 1rem;
  border-bottom: 1px solid ${(props) => (props.isError ? "red" : "grey")};
  &:focus {
    outline: none;
  }
`;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => (
  <Input {...props} ref={ref} />
));

export default FormInput;
