import express from "express";
import path from "path.js";
import { fileURLToPath } from "url.js";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "../public")));
app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.listen(PORT, function () {
    console.log("Server is running at http://localhost:".concat(PORT));
});
