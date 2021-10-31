import { Router, Request, Response, NextFunction } from "express";
import {
  userOrderDetails,
  postRating,
  closeOrder,
  getOrderDetails,
  getUpdate,
  addUpdate,
  sendInvoice
} from "./client.controller";

import { verifiedAdmin } from "../middleware/auth";
const router: Router = Router();

router.post(
  "/api/user/order",
  verifiedAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userOrderData = req.body;
      const { user } = res.locals.user;

      const result = await userOrderDetails(userOrderData, user._id);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/api/user/order",
  verifiedAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = res.locals.user;
      const result = await getOrderDetails(user._id);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/api/userorder/rating",
  verifiedAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body.orderId);
      const result = await postRating(
        req.body.orderId,
        req.body.rating,
        req.body.adminId
      );

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/api/userorder/close",
  verifiedAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body.orderId);
      const result = await closeOrder(req.body.orderId);

      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/api/post/update",
  verifiedAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body.orderId);
      const result = await addUpdate(req.body.orderId, req.body.message);

      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/api/get/update",

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body.orderId);
      const result = await getUpdate(req.body.orderId);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/api/get/invoice",
  verifiedAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user } = res.locals.user;
      const result = await sendInvoice(req.body.orderId);

      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);
export default router;
