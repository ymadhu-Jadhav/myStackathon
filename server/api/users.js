const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
  .then(user => res.status(200).json(user))
  .catch(next);
});

router.post('/', (req, res, next) => {
	User.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	})
		.then(user => res.status(201).json(user))
		.catch(next);
})

router.put('/:id', (req, res, next) => {
	User.update(req.body, {
		where: {id: req.params.id},
    returning: true
		})
		.then(([_, updated]) => res.status(201).json(updated[0]))
		.catch(next)
})

router.delete('/:id', (req, res, next) => {
	User.destroy({where: {id: req.params.id}})
		.then(() => res.sendStatus(204))
		.catch(next)
})