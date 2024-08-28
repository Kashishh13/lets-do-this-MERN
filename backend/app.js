const express = require('express');
const app = express();
const PORT = 1000;
const cors = require('cors');
require("./dBconnection.js"); // Make sure this is correctly configured
const userAPI = require('./routes/user.js');
const taskApi=require("./routes/task.js")
app.use(cors());
app.use(express.json());

app.use("/api/vi", userAPI);
app.use("/api/vi",taskApi)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
