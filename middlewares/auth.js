const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    try {
      const token = req.header("Authorization");
      console.log("token", token);
      if (!token)
        return res.status(500).json({
          status: 500,
          message: "access denied",
        });
  
      const decoded = jwt.verify(token, "secretkeyjwt");
      if (decoded.type == "refresh_token") {
        return res.status(500).json({
          status: 500,
          message: "invalid token",
        });
      }

      req.user = decoded;
      console.log(decoded);

      next();
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  },

  auth_register: (req, res, next) => {

    try {
      const token = req.header("Authorization");
  
      if (!token){
        req.session.role='user'
        next()
      }else{
        delete req.session.role;
    
        const decoded = jwt.verify(token, "secretkeyjwt");
        if (decoded.type == "refresh_token") {
          return res.status(500).json({
            status: 500,
            message: "invalid token",
          });
        }
        
    
        req.user = decoded;
        console.log(decoded);
        
        next();
      }
    }catch (error) {
        res.status(500).json({
          status: 500,
          message: error.message,
        });
      }
    
  }
}
