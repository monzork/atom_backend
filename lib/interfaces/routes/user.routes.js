"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
router.get('/:email', UserController_1.UserController.find);
router.post('/', UserController_1.UserController.create);
router.post('/find-or-create', UserController_1.UserController.findOrCreate);
exports.default = router;
