import express  from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js"
import roleRouter from "./routes/role.routes.js"
import memberRouter from "./routes/member.routes.js"
import communityRouter from "./routes/community.routes.js"
/*app.get('/', (req, res) => {
    res.send('Hello, World!');
});
*/

//routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/role",roleRouter);
app.use("/api/v1/member",memberRouter);
app.use("/api/v1/community",communityRouter);

export {app}