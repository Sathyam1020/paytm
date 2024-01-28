const express = require("express");
const database = require("./config/db");
const userRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 3000

database.connect();
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

app.use('/api/v1/user', userRoutes);

app.get('/', (req, res) => {
    res.json({
        message: "Hello from the other side of the world",
    });
})

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
});