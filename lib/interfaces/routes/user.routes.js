"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
router.get('/:email', UserController_1.UserController.find);
router.post('/', UserController_1.UserController.create);
exports.default = router;
//# sourceMappingURL=user.routes.js.map