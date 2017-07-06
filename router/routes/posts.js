const {authenticate} = require('../../middleware/authenticate')

module.exports = (app, db) => {

  // CREATE

  app.post('/posts', (req, res) => {
    db.posts.create ({
      user_id: req.body.user_id,
      text: req.body.text
    })
      .then (post => res.status(200).json({success: true}))
      .catch (e => res.status(400).json({success: false}))
  })



  // UPDATE

  app.patch('/posts/update/:id', (req, res) => {
    db.posts.update (
      { text: req.body.text },
      { where: { id: req.params.id } }
    )
      .then (user => res.status(200).json({success: 'Post has been updated'}))
      .catch (e => res.status(400).json(e))
  })



  // DELETE

  app.delete('/posts/delete/:id', (req, res) => {
    db.posts.destroy ({
      where: { id: req.params.id }
    })
      .then (user => {
        db.likes.destroy ({
          where: { post_id: req.params.id }
        })
          .then (likes => res.status(200).json({success: 'Post has been deleted'}))
      })
      .catch (e => res.status(400).json(e))
  })



  // RETREIVE

  app.get('/posts/initial', (req, res) => {
    db.sequelize.query('SELECT posts.id, posts.created_at, posts.text, users.username, posts.user_id, array_agg(likes.user_id) AS likersids FROM posts JOIN users ON users.id = posts.user_id LEFT JOIN likes ON likes.post_id = posts.id GROUP BY posts.id, users.username ORDER BY posts.id DESC LIMIT 15')
      .then (posts => res.status(200).json(posts))
      .catch (e => res.status(400).json(e))
  })

  app.get('/posts/newer/:id', (req, res) => {
    db.sequelize.query(`SELECT posts.id, posts.created_at, posts.text, users.username, posts.user_id, array_agg(likes.user_id) AS likersids FROM posts JOIN users ON users.id = posts.user_id LEFT JOIN likes ON likes.post_id = posts.id WHERE posts.id > ${req.params.id} GROUP BY posts.id, users.username ORDER BY posts.id DESC LIMIT 15`)
      .then (posts => res.status(200).json(posts))
      .catch (e => res.status(400).json(e))
  })

  app.get('/posts/newer/:id/:lowest_post_id', (req, res) => {
    db.sequelize.query(`SELECT posts.id, posts.created_at, posts.text, users.username, posts.user_id, array_agg(likes.user_id) AS likersids FROM posts JOIN users ON users.id = posts.user_id LEFT JOIN likes ON likes.post_id = posts.id WHERE posts.id > ${req.params.id} GROUP BY posts.id, users.username ORDER BY posts.id DESC LIMIT 15`)
      .then (posts => {
        db.sequelize.query(`SELECT posts.id, array_agg(likes.user_id) AS likersids FROM posts LEFT JOIN likes ON likes.post_id = posts.id WHERE posts.id >= ${req.params.lowest_post_id} GROUP BY posts.id ORDER BY posts.id DESC`)
          .then (likes => res.status(200).json({posts, likes}))
      })
      .catch (e => res.status(400).json(e))
  })

  app.get('/posts/older/:id', (req, res) => {
    db.sequelize.query(`SELECT posts.id, posts.created_at, posts.text, users.username, posts.user_id, array_agg(likes.user_id) AS likersids FROM posts JOIN users ON users.id = posts.user_id LEFT JOIN likes ON likes.post_id = posts.id WHERE posts.id < ${req.params.id} GROUP BY posts.id, users.username ORDER BY posts.id DESC LIMIT 15`)
      .then (posts => res.status(200).json(posts))
      .catch (e => res.status(400).json(e))
  })

  app.get('/posts/initial/:user_id', (req, res) => {
    db.sequelize.query(`SELECT posts.id, posts.created_at, posts.text, users.username, posts.user_id, array_agg(likes.user_id) AS likersids FROM posts JOIN users ON users.id = posts.user_id LEFT JOIN likes ON likes.post_id = posts.id WHERE users.id = ${req.params.user_id} GROUP BY posts.id, users.username ORDER BY posts.id DESC LIMIT 15`)
      .then (posts => res.status(200).json(posts))
      .catch (e => res.status(400).json(e))
  })

  app.get('/posts/newer/:user_id/:id', (req, res) => {
    db.sequelize.query(`SELECT posts.id, posts.created_at, posts.text, users.username, posts.user_id, array_agg(likes.user_id) AS likersids FROM posts JOIN users ON users.id = posts.user_id LEFT JOIN likes ON likes.post_id = posts.id WHERE posts.id > ${req.params.id} AND users.id = ${req.params.user_id} GROUP BY posts.id, users.username ORDER BY posts.id DESC LIMIT 15`)
      .then (posts => res.status(200).json(posts))
      .catch (e => res.status(400).json(e))
  })

  app.get('/posts/older/:user_id/:id', (req, res) => {
    db.sequelize.query(`SELECT posts.id, posts.created_at, posts.text, users.username, posts.user_id, array_agg(likes.user_id) AS likersids FROM posts JOIN users ON users.id = posts.user_id LEFT JOIN likes ON likes.post_id = posts.id WHERE posts.id < ${req.params.id} AND users.id = ${req.params.user_id} GROUP BY posts.id, users.username ORDER BY posts.id DESC LIMIT 15`)
      .then (posts => res.status(200).json(posts))
      .catch (e => res.status(400).json(e))
  })

}
