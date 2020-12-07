var  express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require("../user/User");
// var VerifyToken = require('./VerifyToken');
const { verifyToken1 } = require("./VerifyToken");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../config");
const {OAuth2Client} = require('google-auth-library');

router.post("/register", function (req, res) {
  console.log("POST regster");

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    },
    function (err, user) {
      if (err)
        return res
          .status(500)
          .send("There was a problem registering the user.");
      // create a token
      var token = jwt.sign({ id: user.name }, config.secret, {
        expiresIn: 86400, // expires in 24 hours
      });
      console.log("token:", token);
      res.status(200).send({ auth: true, token: token });
    }
  );
});

//   router.get('/me', function(req, res) {

//     console.log("GET accesstoken");
//     var token = req.headers['x-access-token'];
//     if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

//     jwt.verify(token, config.secret, function(err, decoded) {
//       if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

//     //   res.status(200).send(decoded);
//     User.findById(decoded.id, function (err, user) {
//         if (err) return res.status(500).send("There was a problem finding the user.");
//         if (!user) return res.status(404).send("No user found.");

//         res.status(200).send(user);
//       });
//     });
//   });

router.get("/me", verifyToken1, async function (req, res, next) {
  console.log("/me authentication");
  console.log("username :", req.username);

  await User.findOne({ name: req.username }, { password: 0 }, function (
    err,
    user
  ) {
    //pasword should not be returned
    if (err)
      return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    res.status(200).send(user);
  });
});

router.post("/login", function (req, res) {
  console.log("POST login");
  //  console.log("name : ",req.body.password);
  console.log(req.body);
  console.log("email:", req.body.email);
  console.log("password:", req.body.password);

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send({ info: "Error on the server." });
    if (!user) return res.status(404).send({ info: "No user found" });

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ id: user.name }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });
    console.log("Success");

    res.status(200).send({ auth: true, token: token });
  });
  // res.status(200).send({ auth: true, token: "token" });
});



router.post("/google_login",  function (req, res) {
  console.log("POST login");
  //  console.log("name : ",req.body.password);
  console.log(req.body);
  console.log("email:", req.body.email);
  // console.log("password:", req.body.password);

  // User.findOne({ email: req.body.email },async function (err, user) {
  //   if (err) return res.status(500).send({ info: "Error on the server." });
  //   if (!user) return res.status(404).send({ info: "No user found" });

    // var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    // if (!passwordIsValid)
    //   return res.status(401).send({ auth: false, token: null });
  
   
    const client = new OAuth2Client("874607787308-r3vkocggamqukjvfeg1t3f13pc6c3abu.apps.googleusercontent.com");


     
    console.log("client:",client)
    const ticket = await client.verifyIdToken({
      idToken : req.body.token,
      audience : "874607787308-r3vkocggamqukjvfeg1t3f13pc6c3abu.apps.googleusercontent.com"
      });
      console.log("ticket:",ticket)

      const payload = ticket.getPayload();
      console.log("payload:",payload)
      const userDetails = {
      email : payload['email'],
      firstname : payload['given_name'],
  
      }
      console.log("userDetails:",userDetails)

      // var token = jwt.sign(userDetails, config.secret, {expiresIn: 1440});

       if(payload['email_verified'])
       {
        var token = jwt.sign({ id: userDetails['email'] }, config.secret, {
          expiresIn: 86400, // expires in 24 hours
        });
        console.log("Success");
    
        res.status(200).send({ auth: true, token: token });
       }
       
       res.status(200).send({ auth: false, token: null });
    
  });
  // res.status(200).send({ auth: true, token: "token" });

module.exports = router;


