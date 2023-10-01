import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { getAllMenus, getMenuById, getRestaurant } from "./models";

const app = express();

app.engine("handlebars", engine());

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

app.get("/ping", (req, res) => res.sendStatus(200));
app.get("/", (req, res) => {
  const restaurant = getRestaurant();
  res.render("home", {
    ...restaurant,
    title: restaurant.name,
  });
});

app.get("/menus", (req, res) => {
  const restaurant = getRestaurant();
  const menus = getAllMenus();
  res.render("menus", {
    menus,
    title: `Menus - ${restaurant.name}`,
  });
});

app.get("/commander", (req, res) => {
  const menuId = req.query.menu;
  const restaurant = getRestaurant();
  const menu = getMenuById(menuId as string);
  if (!menu) return res.sendStatus(404);
  res.render("commander", {
    menu,
    title: `Commander - ${restaurant.name}`,
  });
});

app.post("/commander", (req, res) => {
  const { name, address, phone, menuId } = req.body;

  const restaurant = getRestaurant();
  const menu = getMenuById(menuId as string);
  if (!menu) return res.sendStatus(404);

  res.render("commander", {
    commandeInfo: {
      name,
      address,
      phone,
    },
    title: `Commander - ${restaurant.name}`,
    menu,
  });
});

app.listen(3000, () => console.log("Server started on http://localhost:3000"));
