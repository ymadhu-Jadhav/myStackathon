const router = require('express').Router()
const {Budget, Category} = require('../db/models')
module.exports = router

//Get All Budgets
router.get('/', (req, res, next) => {
    Budget.findAll({include: [{model: Category}]})
        .then(budgets => res.json(budgets))
        .catch(next)
})


//Get Single Budget by budgetId (budget/1)
router.get('/:budgetId', (req, res, next) => {
	Budget.findById(req.params.budgetId)
        .then((budget) => {
            res.status(200).json(budget);
        })
        .catch(next);
})

router.post('/', (req, res, next) => {
	Budget.create(req.body)
		.then(budget => res.status(201).json(budget))
		.catch(next);
})

router.put('/updateInfo/:budgetid', (req, res, next) => {
	console.log("/updateInfo/:budgetid");
	var budgetId=parseInt(req.params.budgetid);

	Budget.findById(budgetId)
		.then(function(budget){
			return budget.update(req.body)
		})
		.then(function(updatedBudget){	
			res.status(200).send(updatedBudget);
		})
		.catch(next);

	//console.log(req.body);
	// Budget.update({amount:req.body.amount}, {
	// 	where: {id: budgetId},
    // returning: true
	// 	})
	// 	.then(([_, updated]) => res.status(201).json(updated[0]))
	// 	.catch(next)
})

router.delete('/:budgetid', (req, res, next) => {
	Budget.destroy({where: {id: req.params.id}})
		.then(() => res.sendStatus(204))
		.catch(next)
})