export const BASE_URL = import.meta.env.BASE_URL;
export const LOGIN_URL = `${BASE_URL}login`;
export const REGISTRATION_URL = `${BASE_URL}registration`;
export const TODAY_TASKS_URL = `${BASE_URL}today`;
export const TOMORROW_TASKS_URL = `${BASE_URL}tomorrow`;
export const CALENDAR_URL = `${BASE_URL}calendar`;
export const POLICY_URL = `${BASE_URL}privacy-policy`;
export const RESET_PASSWORD_URL = `${BASE_URL}auth/reset-password`;
export const ACTION_URL = `${BASE_URL}auth/action`;
export const ABOUT_URL = `${BASE_URL}about`;

export const getTagUrl = (id: string) => `${BASE_URL}tag/${id}`;
export const getTasksDayUrl = (timestamp: number | string) => `${BASE_URL}tasks-day/${timestamp}`;
