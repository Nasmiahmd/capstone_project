import { AppError } from "../errors/AppError";
import {
  createTask,
  deleteTaskByIdAndUserId,
  fetchTaskByUserId,
  findTaskByIdAndUserId,
  updateTaskTitle,
} from "../repositories/user.task.repository";
import { Task } from "../types/task";

function validateTitle(title: unknown): string {
  if (typeof title !== "string" || !title.trim()) {
    throw new AppError(400, "Title is required");
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length > 100) {
    throw new AppError(400, "The title char length should be 100 or less");
  }

  return trimmedTitle;
}

const VALID_STATUSES: readonly Status[] = ["OPEN", "IN_PROGRESS", "RESOLVED"];

function validateStatus(status: unknown, s?: Status): string {
  if (typeof status !== "string" || !status.trim()) {
    throw new AppError(400, "Status is required");
  }
  const trimmedStatus = status.trim().toUpperCase() as Status;
 
  if (!VALID_STATUSES.includes(trimmedStatus)) {
    throw new AppError(400, `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`);
  }

  return trimmedStatus;
}

export async function createUserTask(
  userId: string,
  title: unknown,
): Promise<Task> {
  const validTitle = validateTitle(title);

  return createTask(userId, validTitle);
}

export async function getUserTasks(userId: string): Promise<Task[]> {
  return fetchTaskByUserId(userId);
}

export async function getUserTaskById(
  taskId: string,
  userId: string,
): Promise<Task> {
  const task = await findTaskByIdAndUserId(taskId, userId);

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  return task;
}

export async function updateUserTask(
  taskId: string,
  userId: string,
  title: string,
  status: string,
): Promise<Task | null> {
  const validTitle = validateTitle(title);
  const validStatus = validateStatus(status)
  const task = updateTaskTitle(taskId, userId, validTitle, validStatus);

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  return task;
}

export async function deleteTaskById(
  taskId: string,
  userId: string,
): Promise<void> {
  const task = await deleteTaskByIdAndUserId(taskId, userId);

  if (!task) {
    throw new AppError(404, "Task not found");
  }
}
