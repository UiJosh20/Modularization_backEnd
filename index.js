const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRouter = require('./routes/user.route');
const app = express();
const PORT = process.env.PORT;


app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb"}));
app.use(express.json({limit: "50mb"}));
app.use('/', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
