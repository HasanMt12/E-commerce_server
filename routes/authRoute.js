import express from "express";

import { registerController,  loginController,  testController,
} from "../controller/authController.js";

import { requireSignIn , isAdmin } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);


//LOGIN || POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn,  testController)
export default router;

//protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});