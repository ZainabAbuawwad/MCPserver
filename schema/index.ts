import { z } from "zod";

// Tool: add_task — creates a new to-do item
export const addTaskInputSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(200)
    .describe("The task's title or short description"),
  due_date: z
    .string()
    .min(1)
    .max(50)
    .optional()
    .describe("Optional due date in YYYY-MM-DD format"),
});

// Tool: list_tasks — returns tasks, optionally filtered by status
export const listTasksInputSchema = z.object({
  filter: z
    .enum(["pending", "completed", "all"])
    .optional()
    .describe("Which tasks to return: pending, completed, or all. Defaults to all"),
});

// Tool: complete_task — marks a task as done by id
export const completeTaskInputSchema = z.object({
  id: z
    .string()
    .min(1)
    .max(100)
    .describe("The unique id of the task to mark as completed"),
});