const app = require("./app");
require("colors");
const { join } = require("path");
const connectDb = require("./config/connectDb");
const configPath = join(__dirname, "config", ".env");
require("dotenv").config({ path: configPath });

connectDb();
const port = process.env.PORT || 0; 
app.listen(port, () => {
  console.log('Server is running on port ${port}');
});

