export type Phone = {
	number: string;
};

export type Contact = {
	id: number;
	first_name: string;
	last_name: string;
	phones: Phone[];
};

export type APIResponse = {
	contact: Contact[];
};
