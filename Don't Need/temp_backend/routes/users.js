const express = require('express')
const router = express.Router()
const knex = require('../knex')
// READ ALL records for this table
router.get('/', (req, res, next) => {
  knex('users')
    .then((rows) => {
      res.json(rows)
    })
    .catch((err) => {
      next(err)
    })
})
// READ ONE record for this table
router.get('/:id', (req, res, next) => {
  knex('users')
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
router.post('/', (req, res, next) => {

  knex('users')
    .insert({
      "name": req.body.name,
      "email": req.body.email,
      "password": req.body.password,
      "cycle_length": req.body.cycle_length,
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
router.put('/:id', (req, res, next) => {
  knex('users')
  .where('id', req.params.id)
  .then((data) => {
    knex('users')
    .where('id', req.params.id)
    .limit(1)
    .update({
      "name": req.body.name,
      "email": req.body.email,
      "password": req.body.password,
      "cycle_length": req.body.cycle_length,
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
router.delete('/:id', function(req, res, next) {
  knex('users')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if(!row) return next()
      knex('users')
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
