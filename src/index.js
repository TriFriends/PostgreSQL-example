import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";
import models, { sequelize } from "./config/dbConfig";

const app = express(),
  PORT = process.env.PORT || 3000,
  POSTGRES_DATABASE = process.env.POSTGRES_DATABASE,
  POSTGRES_USERNAME = process.env.POSTGRES_USERNAME,
  POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;

if (!PORT || !POSTGRES_DATABASE || !POSTGRES_USERNAME || !POSTGRES_PASSWORD) {
  throw new Error("There is no env variable !!!");
}

//tworzy połaczenie z bazą danych
//force wymazuje wszystkie wcześniejsze dane z bazy danych
sequelize.sync({ force: true }).then(async () => {
  console.log("[POSTGRESQL] Connection has been successful established");

  models.Users.create({
    first_name: "Marcin",
    last_name: "Warzybok",
    username: "mwarzybok",
    password: "mwarzybok",
    isAdmin: true
  })
  
  models.Classes.create({
    number: "1A"
  });
  models.Classes.create({
    number: "1B"
  });
  // setTimeout(() => {
  //     models.Users.findOne({
  //         where: {
  //             first_name: "Marcin"
  //         }
  //     }).then((user) => {
  //         models.Classes.findOne({
  //             where: {
  //                 number: "1A"
  //             }
  //         }).then((classes) => {
  //             console.log(user)
  //         })
  //     })
  // }, 1000)

  // setTimeout(() => {
  //     models.Users.findOne({ where: { id: 1 } }).then((user) => {
  //         models.Classes.findOne({ where: { id: 1 } }).then((classes) => {
  //             // console.log(JSON.stringify(user, undefined, 5))
  //             // console.log(JSON.stringify(classes, undefined, 5))
  //             user.setClasses(classes)
  //             // setTimeout(() => {
  //             //     models.Classes.findOne({ include: [models.Users] }).then((cl) => {
  //             //         console.log(JSON.stringify(cl.dataValues, undefined, 5))
  //             //     })
  //             //     models.Users.findOne({
  //             //         attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
  //             //         include: [
  //             //             {
  //             //                 model: models.Classes,
  //             //                 as: 'classes',
  //             //                 attributes: ['id', 'number'],
  //             //                 through: {
  //             //                     attributes: []
  //             //                 }
  //             //             }
  //             //         ]
  //             //     }).then((ur) => {
  //             //         console.log(JSON.stringify(ur.dataValues, undefined, 5))
  //             //     })
  //             // }, 1000)
  //         })
  //     })
  // }, 1000)
});

//umożliwia użycie biblioteki qs zamiast querystring, jest to po prostu bardziej bogatsza wersja biblioteki do obsługi
//extended true umożliwia dostęp do req.body bez konieczności parsowania obiektu ze stringa lub tablicy
//ponieważ podczas odbierania wartość może być String lub Array, natomiast w bibliotece querystring może być dowolnym typem
app.use(bodyParser.urlencoded({ extended: true }));

//automatyczne parsowanie req.body na Content Type - JSON
app.use(bodyParser.json());

//ustawienia polityki Cross Origin Resource Sharing - zabezpieczenie przed atakami
//możliwość wykluczenia niektórych stron i adresów, lub po prostu wpisanie listy adresów, które
//mają możliwość wysłania żądania TCP
//umożliwia również blokadę niektórych portów
app.use(cors());

app.get("/", (req, res) => {
  res.send({ ok: "working" });
});

app.listen(PORT, () => {
  console.log(`Application is running on port: ${PORT}`);
});
