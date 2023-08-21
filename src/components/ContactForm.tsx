import { z } from "zod";
import styled from "@emotion/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

import { Contact } from "../types";
import FormInput from "./FormInput";

type FormProps = {
  mode: "edit" | "add";
  defaultValues?: Omit<Contact, "id" | "isFavorite">;
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

const initial = {
  first_name: "",
  last_name: "",
  phones: [{ number: "" }],
};

const Paragraph = styled.p`
  margin: 0;
  color: red;
  font-size: 0.85rem;
`;

function ContactForm({ mode, defaultValues = initial }: FormProps) {
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

  const firstNameError = errors.first_name?.message;
  const lastNameError = errors.last_name?.message;
  const phonesError = errors.phones?.message;

  console.log(firstNameError, lastNameError, phonesError);

  const onSubmitContact = (data: ContactData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitContact)}>
      <h2>Contact Form</h2>
      <FormInput
        {...register("first_name")}
        placeholder="First name"
        isError={!!firstNameError}
      />
      {firstNameError && <p>{firstNameError}</p>}
      <FormInput
        {...register("last_name")}
        placeholder="Last name"
        isError={!!lastNameError}
      />
      {lastNameError && <p>{lastNameError}</p>}

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
      {phonesError && <p>{phonesError}</p>}

      <button onClick={() => append({ number: "" })}>Add Phone</button>
      <button type="submit">
        {mode === "add" ? "Add Contact" : "Edit Contact"}
      </button>
    </form>
  );
}

export default ContactForm;
