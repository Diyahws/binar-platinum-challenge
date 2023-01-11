const { User } = require("../models");
const nodemailer = require('nodemailer')
const fs = require('fs')
const handlebars = require('handlebars')

module.exports = {
  sendEmail: async (req, res) => {
    const emailUser = await User.findAll()

    console.log(emailUser)

    fs.readFile('./template/email-template.html', {encoding: 'utf-8'}, function (err, html) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:{
          user: "erandadava@gmail.com",
          pass: "pubhjdtqmvppwtke"
        }
      })
  
      for (let i = 0; i < emailUser.length; i++) {
        var template = handlebars.compile(html);
        var dataEmail = {
          name:emailUser[i].name,
        }
  
        var htmltoSend = template(dataEmail)
        const mail = {
          from: 'erandadava@gmail.com',
          to: emailUser[i].email,
          subject: `hello! ${dataEmail.name}`,
          html: htmltoSend
        }
        
        transporter.sendMail(mail, (err, info) => {
          if (err)
            console.log(err);
          else{
            return res.status(200).json({
              status:200,
              message:'email berhasil dikirim'
          })
          }
        })
      }
  
    })
  },
};
