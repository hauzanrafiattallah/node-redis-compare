import express from "express";
import categoryController from "../controller/category-controller.js";
import healthController from "../controller/health-controller.js";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router();
publicRouter.post("/api/users", userController.register);
publicRouter.post("/api/users/login", userController.login);
publicRouter.get("/ping", healthController.ping);
publicRouter.get("/api/categories", categoryController.findAll);

export { publicRouter };
