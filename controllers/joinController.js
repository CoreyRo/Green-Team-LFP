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
        let { projectId } = req.body
        console.log("req.body", req.body)
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                user: 'LookingForProjectGreenTeam@gmail.com',
                pass: 'greenteam'
            }

        });
        message = 
            `Hello, ${projectOwner.firstName} ${projectOwner.lastName}, 
            ProjectLFP user ${applyingUser.firstName} ${applyingUser.lastName} would like to join your project: 
            ${projectOwner.title}
            ${projectOwner.description}
            ${projectOwner.desiredSkills}
            https://www.projectlfg.herokuapp.com/project/${projectOwner.projectId}
            
            Click the link to add them to your project.
            https://www.projectlfg.herokuapp.com/join/apply-for-group/${applyingUser._id}/for/${projectOwner.projectId}`

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

    // join/apply-for-group/5a2a4f67deb2c47a28bc84d9
    updateGroup: function(req, res)
    {
        console.log("body ", req.body)
        console.log("params ", req.params)
        db.Post
            .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel =>
        {
            console.log("Successful")
            console.log(dbModel)
            res.json(dbModel)
        })
        .catch(err => {
            console.log("join err", err)
            res.status(422).json(err)
        })

      }
}
