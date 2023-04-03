const express = require("express");
const cookieParser = require('cookie-parser');

const config = require("./config/config");
const InterceptorRegister = require("./interceptor/InterceptorRegister");
const SessionManagerInterceptor = require("./interceptor/SessionManagerInterceptor");

const app = express();
app.use(cookieParser());

const interceptorRegister = new InterceptorRegister();

interceptorRegister.addInterceptor(new SessionManagerInterceptor())
    .setOrder(0)
    .addPaths("/*")

if (config.addInterceptors) config.addInterceptors(interceptorRegister);

interceptorRegister.registerInterceptor(app);

app.get("/check", async (req, res) => {
    console.log("check call")
    const session = await req.getSession(false);
    let id = "null";
    if (session) id = await session.getAttribute("id");
    res.send(id);
});

app.get("/login", async (req, res) => {
    console.log("login call")
    const query = req.query;
    const session = await req.getSession();

    const id = query.id;
    const password = query.password;
    const name = query.name;

    if (session) {
        await session.setAttribute("id", id);
        await session.setAttribute("password", password);
        await session.setAttribute("name", name);
    }

    let result = "null";
    if (session) result = session.getAttribute("id")
    res.send(result);
});

app.get("/logout", async (req, res) => {

    console.log("logout call")

    req.removeSession();
    const session = await req.getSession(false);

    let id;
    if (session) id = session.getAttribute("id");

    res.send(id);
});


app.listen(3001);