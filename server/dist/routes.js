"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = require("express");
const query_routes_1 = require("./app/query/query.routes");
const app = (0, express_1.Router)();
exports.Router = app;
app.use('/query', query_routes_1.QueryRoutes);
