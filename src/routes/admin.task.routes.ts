import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import { getAdminTask, updateAdminTaskStatus } from "../services/admin.task.service";

export const adminTaskRouter = Router();

// This middleware 1st check is it a logged in account & 2nd check is it Admin user
adminTaskRouter.use(authenticate, requireAdmin);

adminTaskRouter.get("/", async (req, res, next) => {
  try {
    const data = await getAdminTask(req.query);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
});


// update task status

adminTaskRouter.patch("/:taskId/status", async (req, res, next) => {
    try {
        
        const task = await updateAdminTaskStatus(req.params.taskId, req.body.status)
        

        res.status(200).json({
            success: true,
            data: {task}
        })
    } catch (error) {
        next(error)
    }
})