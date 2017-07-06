'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Pages', {
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
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Pages');
  }
};
