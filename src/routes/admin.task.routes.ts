<<<<<<< HEAD
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import { getAdminTask } from "../services/admin.task.service";

export const adminTaskRouter = Router();

// This middleware 1st check is it a logged in account & 2nd check is it Admin user
adminTaskRouter.use(authenticate, requireAdmin);

adminTaskRouter.get('/', async(req, res, next) => {
    try {
        const data = await getAdminTask()
    } catch (error) {
        next(error)
    }
=======
import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import { getAdminTask } from "../services/admin.task.service";

export const adminTaskRouter = Router();

// This middleware 1st check is it a logged in account & 2nd check is it Admin user
adminTaskRouter.use(authenticate, requireAdmin);

adminTaskRouter.get('/', async(req, res, next) => {
    try {
        const data = await getAdminTask()
    } catch (error) {
        next(error)
    }
>>>>>>> 2dd398ed249c33c572aebf12c5ace6c040d4a949
})