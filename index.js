import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/dbConfig.js";
import userRoutes from "./routes/userRoutes.js";
import mailRoutes from "./routes/mailRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/mail", mailRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send(`<h1 style=text-align:center>Welcome to Bulk Email Project<h1>
  
  <ul>
  

<li>
<mark>POST /api/mail/create-mail</mark>: send mail to multiple recipeients.
</li> 
<li>
<mark>POST /api/mail/all-mails</mark>: Get All mails sent by the user.
</li>
<li>
<mark>POST /api/mail/today-mails</mark>: Get All mails sent by the user today.
</li>
<li>
<mark>POST /api/mail/monthly-mails</mark>: Get All mails sent by the user in this month.
</li>
<li>
<mark>POST /register</mark>: Register a new user.
</li>
<li>
<mark>POST /login</mark>: Log in with existing credentials.
</li> 
<li>
<mark>POST /logout</mark>: Log out from the application.
</li>
<li>
<mark>POST /forgotPassword</mark>: Request a password reset.
</li>
<li>
<mark>POST /resetPassword</mark>: Reset password using the provided mail link.
</li>
  
  </ul>
  
  `);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Connected to the port`, port);
});
