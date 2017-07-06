const db = require('../config/db')

var authenticate = (req, res, next) => {
  const tkn = req.header('x-auth')
  console.log(tkn)
  db.tokens.findOne ({
    where: {
      token: tkn
    }
  })
    .then(token => {
      if (!token) {
        return Promise.reject()
      } else {
        next()
      }
    })
    .catch(e => res.status(404).json({message: 'x-auth invalid'}))
};

module.exports = {authenticate}
