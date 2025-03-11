import { saveTaskSchema, tasksSchema, taskSchema } from '@/schemas/tasks';
import { InferType } from 'yup';

export type SaveTask = InferType<typeof saveTaskSchema>;
export type Task = InferType<typeof taskSchema>;
export type Tasks = InferType<typeof tasksSchema>;
