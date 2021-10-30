import { Router, Request, Response, NextFunction } from "express";
import { verifiedAdmin } from "../middleware/auth";
import * as jwt from "jsonwebtoken";
import {
  loginAdmin,
  registerAdmin,
  postCompanyDetails,
  getFilterCompanyDetails,
  getOrderDetails,
} from "./admin.controller";
import { companyData } from "../../types/types";

const router: Router = Router();

router.post(
  "/api/admin/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const adminData = req.body;

    try {
      const result = await registerAdmin(adminData);

      const token = jwt.sign(
        {
          _id: result._id,
          email: adminData.email,

          category: "admin",
        },
        process.env.JWT_SECRET || "",
        { expiresIn: "10d" }
      );
      res.json({ token, result });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/api/admin/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;
    try {
      const result = await loginAdmin(email, password);

      res.json({ token: result, success: true });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/api/admin/company",
  verifiedAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    const companyData = req.body as companyData;
    const { user } = res.locals.user;
    try {
      //const { user } = res.locals.user;
      const result = await postCompanyDetails(companyData, user._id);

      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);
interface filterData {
  fromAddress: string;
  toAddress: string;
  date: Date;
  sortBy: string;
}
router.post(
  "/api/admin/company/filter",
  verifiedAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    const filterData = req.body as filterData;

    try {
      const result = await getFilterCompanyDetails(filterData);
      res.json(result);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

router.get(
  "/api/admin/order",
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

export default router;
