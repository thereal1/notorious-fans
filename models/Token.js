module.exports = (sequelize, DataTypes) => {

  const Token = sequelize.define('token', {
    access: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(300),
      allowNull: false
    }
  }, {
    paranoid: false,
    underscored: true
  })

  return Token
}
