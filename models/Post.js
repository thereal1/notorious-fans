module.exports = (sequelize, DataTypes) => {

  const Post = sequelize.define('post', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    paranoid: false,
    underscored: true
  })

  return Post
}
