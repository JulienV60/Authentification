import express from "express";
import nunjucks from "nunjucks";
import cookie from "cookie";
import { listUser } from "./ListUser";

///Truc important pour express et nunjucks
const app = express();
app.use(express.static("public"));
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
app.set("view engine", "njk");
const formParser = express.urlencoded({ extended: true });

///

///Routes entrée
app.get("/", (request, response) => {
  response.render("home");
});

/// home.njk>login
app.get("/login", (request, response) => {
  response.render("login");
});

/// login>KnownDataBase
app.post("/dataBase", formParser, (request, response) => {
  const user = request.body.username;
  const pass = request.body.password;
  let loginInformationIsCorrect = false;

  //let listUserAnyOneHere: boolean;
  console.log(user);

  listUser.forEach((element) => {
    if (element.name === user && element.password === pass) {
      loginInformationIsCorrect = true;
      console.log(loginInformationIsCorrect);
    } else {
      console.log("42,plop");
    }
  });
  if (loginInformationIsCorrect) {
    response.set(
      "Set-Cookie",
      cookie.serialize("User connected", user, {
        maxAge: 3600,
      }),
    );
    response.render("private");
  } else {
    console.log(loginInformationIsCorrect);
    response.redirect("/");
  }
});

//login/add-cookie/login

app.get("/view-cookie", (request, response) => {
  const cookies = cookie.parse(request.get("cookie") || "");
  response.send(cookies.myCookie);
});

app.get("/clear-cookie", (request, response) => {
  response.set(
    "Set-Cookie",
    cookie.serialize("myCookie", "", {
      maxAge: 0,
    }),
  );
});
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
