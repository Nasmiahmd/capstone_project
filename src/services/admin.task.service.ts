import { AppError } from "../errors/AppError";
import { findAllTasks } from "../repositories/admin.task.repository";
import { Task } from "../types/task";

type AdminTaskListQuery = {
    search?: string;
    status?: string;
}

type AdminTaskListResponse = {
    tasks: Task[]
}

const TASK_STATUSES = ["OPEN", "IN_PROGRESS", "RESOLVED"] as const;

type TaskStatus = (typeof TASK_STATUSES)[number]

export async function getAdminTask(
    query: AdminTaskListQuery
):Promise<AdminTaskListResponse> {
    

    const search = query.search?.trim() || undefined;
    const status = query.search?.trim() || undefined;

    if(status && !TASK_STATUSES.includes(status as TaskStatus)){
        throw new AppError(404, "status must be between open, inProgress, resolved")
    }

    const tasks = await findAllTasks({
        search, status
    })

    return {
        tasks
    }
}