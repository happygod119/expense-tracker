const db = require("../../config/mongoose");

const Record = require("../record");
const User = require("../user");
const Category = require("../category");
const bcrypt = require("bcryptjs/dist/bcrypt");

const SEED_RECORD = [
  {
    name: "廣志",
    email: "user1@example.com",
    password: "12345678",
    record: [
      {
        name: "午餐",
        date: "2019-04-23",
        amount: 60,
        categoryName: "餐飲食品",
      },
      {
        name: "晚餐",
        date: "2019-04-25",
        amount: 60,
        categoryName: "餐飲食品",
      },
      {
        name: "捷運",
        date: "2019-04-25",
        amount: 120,
        categoryName: "交通出行",
      },
    ],
  },
  {
    name: "小新",
    email: "user2@example.com",
    password: "12345678",
    record: [
      {
        name: "電影：驚奇隊長",
        date: "2019-05-05",
        amount: 220,
        categoryName: "休閒娛樂",
      },
      {
        name: "租金",
        date: "2019-04-01",
        amount: 25000,
        categoryName: "家居物業",
      },
    ],
  },
];

db.once("open", () => {
  return Promise.all(
    Array.from(SEED_RECORD, (seedUser) => {
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(seedUser.password, salt))
        .then((hash) => {
          return User.create({
            name: seedUser.name,
            email: seedUser.email,
            password: hash,
          });
        })
        .then((user) => {
          return Promise.all(
            Array.from(seedUser.record, (record) => {
              return Category.findOne({ name: record.categoryName }).then(
                (category) => {
                  record.categoryId = category._id;
                  record.userId = user._id;
                  return Record.create(record);
                }
              );
            })
          );
        });
    })
  ).then(() => {
    console.log("done");
    process.exit();
  });
});
