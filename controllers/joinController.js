const mongoose = require("mongoose");
const passport = require("passport");
const nodemailer = require('nodemailer')
const db = require("../models");
const axios = require('axios')



module.exports =
{
    sendMail: function(req, res)
    {
        let { applyingUser } = req.body
        let { projectOwner } = req.body

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                user: 'LookingForProjectGreenTeam@gmail.com',
                pass: 'greenteam'
            }

        });
        message = 'Hello, ' + projectOwner.firstName + ' ' + applyingUser.username +
            ' would like to join your group. His skills are: ' +
            applyingUser.skills  + ". Would you like to add him to your group?" +
            "https://www.projectlfg.herokuapp.com/join/apply-for-group/" + projectOwner.projectId

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"LFG" <LookingForProjectGreenTeam@gmail.com>', // sender address
            to: projectOwner.email, // list of receivers
            subject: "Someone Wants to Join Your Group!", // Subject line
            text: message // plain text body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            res.json(info);

        });

    }, 
    updateGroup: function(req, res)
    {
        console.log("body ", req.body)
        console.log("params ", req.params)
        db.Post
        .findOneAndUpdate({ _id: req.body.projectId }, {$set:{ joined: [...req.body.applicant]}})
        .then(dbModel =>
        {
            console.log("Successful")
            console.log(model)
        })
        .catch(err => res.status(422).json(err));

      }
}
