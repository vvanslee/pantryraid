/**
 * TokenCheck middleware will check for our json web token. Since it is
 * in a separate file, we can import it in any part of our app
 * and use it as we need.
 */
const jwt = require('jsonwebtoken');
const secret_key = require("../secret");
const router = require('express').Router();

const tokenCheck = (req, res, next)=>{
    console.log("You are trying to access a data route!");
    // const authHeader = req.headers.authorization;
    // console.log("req.url: ",req.url);
    // console.log("tokenCheck - req.url:",req.url);
    // console.log("tokenCheck - req.params.token:",req.params.token);
    const authHeader = req.params.token;
    if (authHeader && authHeader.length > 0) {
        // split the header which should look like:
        // Bearer xxxx.yyy.zzzz
        // then assign it to the value on the req for our route to see!
        // const token = authHeader.split(" ")[1];
        const token = authHeader.replace("/", "");
        // console.log("Token is now: ", token);

        jwt.verify(token, secret_key, (err, data) => {
            if(err) {
                res.sendStatus(403);
            } else {
                req.token = {
                    token,
                    data: data
                };
                // If everything is okay, we tell the middleware to 
                // go to the "next" thing in the list, either the next
                // middleware or the route the user was trying to access
                console.log("tokenCheck.js: The TOKEN has successfully been verified");
                next();
                // console.log("tokenCheck - next()");
                // next(JSON.stringify(data));
                // console.log("tokenCheck data:");
                // console.log(data);
            }
        });
    } else {
         // if it doesn't exist, then we just say forbidden!
         // no soup for you!
         res.sendStatus(403); // means forbidden!
    }
}

module.exports = tokenCheck;