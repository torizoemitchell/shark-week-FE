const express = require('express')
const router = express.Router()
const knex = require('../knex')

//middleware

// READ ALL records for this table
router.get('/temp_backend/', (req, res, next) => {
  knex('blog')
    .orderBy('id', 'asc')
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      next(err)
    })
})
// READ ONE record for this table
router.get('/temp_backend/:id', (req, res, next) => {
  knex('blog')
    .where('id',req.params.id)
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      console.log(err);
      next(err)
    })
})
// CREATE ONE record for this table
router.post('/temp_backend/', (req, res, next) => {
  knex('blog')
    .insert({
      "title": req.body.title,
      "blog": req.body.blog,
    })
    .returning('*')
    .then((data) => {
      res.json(data[0])
    })
    .catch((err) => {
      next(err)
    })
 })
// UPDATE ONE record for this table
router.put('/temp_backend/:id', (req, res, next) => {
  knex('blog')
  .where('id', req.params.id)
  .then((data) => {
    knex('blog')
    .where('id', req.params.id)
    .limit(1)
    .update({
      "title": req.body.title,
      "blog": req.body.blog,
    })
    .returning('*')
    .then((data) => {
      res.json(data[0])
    })
  })
  .catch((err) => {
    next(err)
  })
})
// DELETE ONE record for this table
router.delete('/temp_backend/:id', function(req, res, next) {
  knex('blog')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if(!row) return next()
      knex('blog')
        .del()
        .where('id', req.params.id)
        .then(() => {
          res.send(`ID ${req.params.id} Deleted`)
        })
    })
    .catch((err) => {
      next(err)
    })
})

router.use(function(err,req, res, next) {
  next(createError(404));
});
router.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = router
