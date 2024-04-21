const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");
// config env File
dotenv.config();

// databaseCall
connectDb();

const app = express();

//view engine
app.set('view engine', 'ejs');

app.set('views', './views');

// middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded())


app.use("/users", require("./routes/userRoute"));



const PORT = 8080 || process.env.PORT

app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`);
});