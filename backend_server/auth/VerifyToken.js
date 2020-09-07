var jwt = require("jsonwebtoken");
var config = require("../config");
// const { use } = require('../routes/alien');

function verifyToken1(req, res, next) {
  console.log("verifyTokn");
  const authHeader = req.headers.authorization;
  if (authHeader.split(" ")[0] === "Bearer") {
    token = authHeader.substring(7, authHeader.length);
  } else {
    var token = req.headers["x-access-token"];
  }
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    // if everything good, save to request for use in other routes
    req.username = decoded.id;
    console.log("username :", decoded);
    console.log("username :", req.username);
    next();
  });
}

module.exports.verifyToken1 = verifyToken1;

// function check_data(req,res,next) {
//   console.log("REQ :", req.method)
//   req.username = "rajeshkanna"
// 	a = 2
// 	if (a != 2) {
// 		res.redirect('/login');
// 	}
// 	return next()
// }

//   module.exports.check_data = check_data;
