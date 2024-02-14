const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.route');
const app = express();
const PORT = 8000;

dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb"}));
app.use(express.json({limit: "50mb"}));
app.use('/', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
