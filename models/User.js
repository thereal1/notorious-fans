const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../config/db');
const env = require('../config/env');
const auth = require('../config/auth');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    paranoid: false,
    underscored: true,
    instanceMethods: {
      generateAuthToken: function () {
        return new Promise((resolve, reject) => {
          const access = 'auth'
          resolve(sequelize.models.token.create ({
            access: access,
            token: jwt.sign({
              _id:
              this.id, access},
              auth.SECRET, {
                expiresIn: auth.TOKEN_TIME
              }).toString(),
            user_id: this.id
          }));
        });
      }
    },
    classMethods:  {
      findByCredentials: function (username, password) {
        let self = this;
        return new Promise((resolve, reject) => {
          self.findOne ({
            where: {
              username: username
            }
          })
            .then(user => {
              if (!user) { reject() };
              bcrypt.compare(password, user.password, (err, res) => {
                if (!res) { reject() };
                resolve(user);
              });
            })
            .catch(e => reject());
        })
      }
    }
  })

  User.beforeCreate(function (user, options, next) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) { console.log(err) }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) { console.log(err) }
        user.password = hash
        next()
      })
    })
  })


  return User
}
