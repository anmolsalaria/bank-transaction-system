const express = require("express")

const cors = require("cors")
const cookieParser = require("cookie-parser")


const app = express()

app.use(

    cors({

        origin: "http://localhost:5173", 
        credentials: true

    })

);

app.use(express.json())
app.use(cookieParser())

//Routes required
const authRouter = require("./routes/auth.routes")
const accountRouter = require("./routes/account.routes")
const transactionRouter = require("./routes/transaction.routes")


//Use Routes
app.use("/api/auth",authRouter)
app.use("/api/accounts",accountRouter)
app.use("/api/transactions",transactionRouter)

module.exports = app