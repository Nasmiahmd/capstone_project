// combine all ur routes of application
// Even if its 1000 or lakhs
// pluging all routes in one place
import { Router } from 'express';
import { healthRouter } from './health.routes';
import { authRouter } from './auth.routes';

export const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use("/auth", authRouter)