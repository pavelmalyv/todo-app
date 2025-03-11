import { MESSAGES_FIELD } from '@/consts/messages';
import { string, ref, date } from 'yup';

export const emailSchema = string().email().required(MESSAGES_FIELD.emailRequired);
export const passwordSchema = string().required(MESSAGES_FIELD.passwordRequired);
export const passwordCreateSchema = string()
	.min(8, MESSAGES_FIELD.passwordMin(8))
	.max(4096, MESSAGES_FIELD.passwordMax(4096))
	.matches(/[A-Z]/, MESSAGES_FIELD.passwordUpperCase)
	.matches(/[a-z]/, MESSAGES_FIELD.passwordLowerCase)
	.matches(/[0-9]/, MESSAGES_FIELD.passwordNumber)
	.required(MESSAGES_FIELD.passwordRequired);

export const nameSchema = string()
	.required(MESSAGES_FIELD.nameRequired)
	.max(4096, MESSAGES_FIELD.nameMax(4096));

export const getPasswordRepeatSchema = (fieldRef: string) => {
	return string()
		.oneOf([ref(fieldRef)], MESSAGES_FIELD.passwordRepeatIncorrect)
		.required(MESSAGES_FIELD.passwordRequired);
};
export const dataSchema = date()
	.required(MESSAGES_FIELD.dateRequired)
	.nullable(MESSAGES_FIELD.dateRequired)
	.test('not-empty', MESSAGES_FIELD.dateRequired, (value) => value !== null);

export const nameTaskSchema = string()
	.max(350, MESSAGES_FIELD.nameTaskMax(350))
	.required(MESSAGES_FIELD.nameTaskRequired);
