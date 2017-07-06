const routes = [
  require('./routes/users'),
  require('./routes/posts'),
  require('./routes/likes')
]

module.exports = function router (app, db) {
  return routes.forEach((route) => {
    route(app, db)
  })
}
