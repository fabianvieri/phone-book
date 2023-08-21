import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

import { Contact } from "../types";

type FormProps = {
  mode: "edit" | "add";
  defaultValues?: Omit<Contact, "id" | "isFavorite">;
};

const contactSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  phones: z.array(z.object({ number: z.string().min(10) })).min(1),
});

type ContactData = z.infer<typeof contactSchema>;

const initial = {
  first_name: "",
  last_name: "",
  phones: [{ number: "" }],
};

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

  const onSubmitContact = (data: ContactData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitContact)}>
      <h2>Contact Form</h2>
      <input {...register("first_name")} placeholder="First name" />
	  {errors.first_name && <p>{errors.first_name.message}</p>}
      <input {...register("last_name")} placeholder="Last name" />
	  {errors.last_name && <p>{errors.last_name.message}</p>}
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            {...register(`phones.${index}.number`)}
            placeholder="Phone number"
          />
		  {errors.phones?.[index]?.number && <p>{errors.phones?.[index]?.number?.message}</p>}
          <button onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button onClick={() => append({ number: "" })}>Add Phone</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ContactForm;
