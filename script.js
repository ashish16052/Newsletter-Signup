const express = require("express");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

mailchimp.setConfig({
    apiKey: "INSERT YOUR API HERE",
    server: "us20"
});

app.post("/", function (req, res) {

    const firstName = req.body.first;
    const secondName = req.body.last;
    const email = req.body.email;
    const listId = "INSERT YOUR LIST HERE";
    const subscribingUser = {
        firstName: firstName,
        lastName: secondName,
        email: email
    };

    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        })
    };
    run();

    res.sendFile(__dirname + "/success.html");
    run().catch(e => res.sendFile(__dirname + "/failure.html"));
})



app.listen(3000, function () {
    console.log("Server is running on port-3000");
});

