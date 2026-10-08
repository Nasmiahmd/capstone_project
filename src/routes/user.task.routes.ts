import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
  createUserTask,
  deleteTaskById,
  getUserTaskById,
  getUserTasks,
  updateUserTask,
} from "../services/user.task.service";

export const userTaskRouter = Router();

// all the routes below are protected by this middleware
userTaskRouter.use(authenticate);

userTaskRouter.post("/", async (req, res, next) => {
  try {
    const task = await createUserTask(req.user!.userId, req.body.title);

    res.status(201).json({
      success: true,
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
});

userTaskRouter.get("/", async (req, res, next) => {
  try {
    const tasks = await getUserTasks(req.user!.userId);

    res.status(200).json({
      success: true,
      data: { tasks },
    });
  } catch (error) {
    next(error);
  }
});

userTaskRouter.get("/:taskId", async (req, res, next) => {
  try {
    const task = await getUserTaskById(req.params.taskId, req.user!.userId);

    res.status(200).json({
      success: true,
      data: { task },
    });
  } catch (error) {
    next(error);
  }
});

userTaskRouter.patch("/:taskId", async (req, res, next) => {
  try {
    const task = await updateUserTask(
      req.params.taskId,
      req.user!.userId,
      req.body?.title,
      req.body?.status,
    );

    res.status(200).json({
      success: true,
      data: { task },
    });
  } catch (error) {
    next(error);
  }
});

userTaskRouter.delete("/:taskId", async (req, res, next) => {
  try {
    await deleteTaskById(req.params.taskId, req.user!.userId);

    res.status(200).json({
      success: true,
      message: "Successfully deleted the task",
    });
  } catch (error) {
    next(error);
  }
});
