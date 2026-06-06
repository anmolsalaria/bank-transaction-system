const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")

const transactionController = require("../controllers/transaction.controller")

const transactionRoutes = express.Router()



//POST /api/transactions/
// Create a new transaction

transactionRoutes.post("/",authMiddleware.authMiddleware,transactionController.createTransaction)

module.exports = transactionRoutes