module.exports = (sequelize, DataTypes) => {

  const Like = sequelize.define('like', {
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    paranoid: false,
    underscored: true,
    tableName: 'likes'
  })

  return Like
}
