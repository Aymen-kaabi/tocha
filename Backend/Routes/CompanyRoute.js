const express = require("express");
const router = express.Router();
const Companys = require("../Models/CompanyModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const verify = require("./VerificationToken.js");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

// const {loginValidation} = require('./Validation.js')
dotenv.config();

router.get("/", async (req, res) => {
  await Companys.findAll().then((companys) => res.json(companys));
});

router.get("/:id", async (req, res) => {
  await Companys.findByPk(req.params.id).then((companys) => res.json(companys));
});

router.post("/register", async (req, res) => {
  const emailExist = await Companys.findOne({ where: { email: req.body.email } });
  if (emailExist) return res.status(400).send("Email already exist");
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  await Companys.create({
    name: req.body.name,
    password: hashPassword,
    email: req.body.email,
    street: req.body.street,
    city: req.body.city,
    zipCode: req.body.zipCode,
    description: req.body.description,
    phoneNumber1: req.body.phoneNumber1,
    phoneNumber2: req.body.phoneNumber2,
    numberPatent: req.body.numberPatent,
    logo: req.body.logo,
  }).then((user) => {
    nodemailer.createTestAccount((err, email) => {
      var transporter = nodemailer.createTransport(
        smtpTransport({
          service: "gmail",
          port: 465,
          secure: false,
          host: "smtp.gmail.com",
          auth: {
            user: process.env.GMAIL_USER,
            pass:  process.env.GMAIL_PASS,
          },
          tls: {
            rejectUnauthorized: false,
          },
        })
      );

      let mailOptions = {
        from: process.env.GMAIL_USER,
        to: `${req.body.email}`,
        subject: "Be5tef",
        text: `Hey Mr/Mrs ${req.body.lastName} , thank you for checking out Bekhtef ,your request to join bekhtef's community has been accepted , we are looking forward a win-win cooperation  `,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        console.log("done");
        res.json(user);
      });
    });
  });
});
router.post("/login", async (req, res) => {
  // const {error} = loginValidation(req.body)
  // if(error) return res.send(error.details[0].message)
  const user = await Companys.findOne({ where: { email: req.body.email } });
  if (!user) return res.send({ status: 404 });
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send({ status: 500 });
  const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);
  res
    .header("auth_token", token)
    .send({ token: token, id: user.id, name:user.name , status:"company" , logo: user.logo});
});

router.put("/:id", async (req, res) => {
  Companys.findByPk(req.params.id).then((companys) => {
    companys
      .update({
       street: req.body.street,
       city: req.body.city,
       zipCode: req.body.zipCode,
       phoneNumber1: req.body.phoneNumber1,
      })
      .then((companys) => {
        res.json(companys);
      });
  });
});

router.delete("/:id", async (req, res) => {
  await Companys.findByPk(req.params.id)
    .then((companys) => {
      companys.destroy();
    })
    .then(() => {
      res.json("deleted");
    });
});

router.delete("/", async (req, res) => {
  await Companys.destroy({ where: {}, truncate: true }).then(() =>
    res.json("cleared")
  );
});
router.post("/changPass",async(req,res) => {
  const hashPassword = await bcrypt.hash(req.body.email, 0);
  let transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
          tls: {
            rejectUnauthorized: false,
          },
        })
      let mailOptions = {
        from: process.env.GMAIL_USER,
        to: `${req.body.email}`,
        subject: "Reset password",
        text:hashPassword,
      };
      transporter.sendMail(mailOptions).then(() => {
        res.send({ status: 200 });
      });
    });
router.post("/checkCode", async (req, res)=>{
  console.log(req.body.email)
  console.log(req.body.code)
  const validCode = await bcrypt.compare(req.body.email, req.body.code);
  if(validCode) return res.send({ status: 200 })
  if(!validCode) return res.send({ status: 500 })
})
router.patch("/password", async (req, res) => {
  console.log(req.body)
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  await Companys.findOne({ where: { email: req.body.email } }).then((companys) => {
    companys
    .update({
       password: hashPassword
      })
      .then((companys) => {
        res.json(companys);
      }).catch((err) => console.log(err))
  });
});

module.exports = router;