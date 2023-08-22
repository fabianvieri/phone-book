import { z } from "zod";
import toast from "react-hot-toast";
import styled from "@emotion/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

import { ContactGQL } from "../types";
import FormInput from "./FormInput";
import { useAddContact } from "../hooks/useAddContact";
import { useEditContact } from "../hooks/useEditContact";
import { useContactsContext } from "../hooks/useContactsContext";

type FormProps = {
  mode: "edit" | "add";
  contact?: ContactGQL;
};

const contactSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name is too short" })
    .max(30, { message: "First name is too long" }),
  last_name: z
    .string()
    .min(1, { message: "Last name is too short" })
    .max(30, { message: "Last name is too long" }),
  phones: z
    .array(
      z.object({
        number: z
          .string()
          .min(10, { message: "Please input valid phone number" }),
      })
    )
    .nonempty({ message: "Please input a phone number" }),
});

type ContactData = z.infer<typeof contactSchema>;

const emptyValues = {
  first_name: "",
  last_name: "",
  phones: [{ number: "" }],
};

const Paragraph = styled.p`
  margin: 0;
  color: red;
  font-size: 0.85rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Flex = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  outline: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 15px;
  &:hover {
    opacity: 0.8;
  }
`;

const RemoveButton = styled(Button)`
  background: ${(props) => props.theme.colors.dark};
  color: white;
`;

const PhoneButton = styled(Button)`
  background: ${(props) => props.theme.colors.secondary};
  color: white;
`;

const SubmitButton = styled(Button)`
  background: ${(props) => props.theme.colors.primary};
  color: white;

  &:disabled {
    background: grey;
  }
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
    formState: { errors },
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const { append, remove, fields } = useFieldArray({ control, name: "phones" });
  const { contacts } = useContactsContext();
  const { loading: addLoading, addQuery } = useAddContact();
  const { loading: editLoading, editQuery } = useEditContact();

  const firstNameError = errors.first_name?.message;
  const lastNameError = errors.last_name?.message;
  const phonesError = errors.phones?.message;

  const onSubmitContact = (data: ContactData) => {
    if (mode === "add") {
      const name = `${data.first_name}${data.last_name}`;
      const exists = contacts.find(
        (contact) =>
          `${contact.first_name}${contact.last_name}`.toLowerCase() ===
          name.toLocaleLowerCase()
      );

      if (exists) {
        toast.error("Name must be unique");
        return;
      }
      addQuery({ variables: data });
    }

    if (mode === "edit") {
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
    <Form onSubmit={handleSubmit(onSubmitContact)}>
      <h2>Contact Form</h2>
      <FormInput
        {...register("first_name")}
        placeholder="First name"
        isError={!!firstNameError}
      />
      {firstNameError && <Paragraph>{firstNameError}</Paragraph>}
      <FormInput
        {...register("last_name")}
        placeholder="Last name"
        isError={!!lastNameError}
      />
      {lastNameError && <Paragraph>{lastNameError}</Paragraph>}

      {fields.map((field, index) => (
        <Flex key={field.id}>
          <FormInput
            {...register(`phones.${index}.number`)}
            placeholder="Phone number"
            isError={!!errors.phones?.[index]?.number?.message}
          />
          <RemoveButton onClick={() => remove(index)}>Remove</RemoveButton>
        </Flex>
      ))}
      {phonesError && <Paragraph>{phonesError}</Paragraph>}

      <PhoneButton onClick={() => append({ number: "" })}>
        Add Phone
      </PhoneButton>
      <SubmitButton type="submit" disabled={addLoading || editLoading}>
        Submit
      </SubmitButton>
    </Form>
  );
}

export default ContactForm;
