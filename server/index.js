import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import supplierRoutes from "./routes/supplier.route.js";
import purchaseOrderRoutes from "./routes/purchaseOrder.route.js";
import grnRoutes from "./routes/grn.route.js";
import rmaRoutes from "./routes/rma.route.js";
import backorderRoutes from "./routes/backorder.route.js";
import productRoutes from "./routes/product.route.js";

import cors from "cors";
import cookieParser from "cookie-parser";

// STORAGE
import storageProductRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import storageSupplierRoutes from "./routes/storageSupplier.route.js";
import manualAdjustmentRoutes from "./routes/manualAdjustmentRoutes.js";
import stockMovement from "./routes/stockMovement.js";

// For serving React build
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);
app.use("/api/grns", grnRoutes);
app.use("/api/rmas", rmaRoutes);
app.use("/api/backorders", backorderRoutes);

// Storage Routes
app.use("/api/storage-products", storageProductRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/storageSupplier", storageSupplierRoutes);
app.use("/api/manualAdjustment", manualAdjustmentRoutes);
app.use("/api/stockMovement", stockMovement);

// Serve React frontend (after build)
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
