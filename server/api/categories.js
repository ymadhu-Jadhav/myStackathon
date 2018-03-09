const router = require('express').Router()
const {Category, Expense} = require('../db/models')
module.exports = router

//Get All Categories
router.get('/', (req, res, next) => {
    Category.findAll({})
        .then(users => res.json(users))
        .catch(next)
})


//Get Single Category by categoryId (category/1)
router.get('/:categoryId', (req, res, next) => {
	Category.findById(req.params.categoryId)
        .then((category) => {
            res.status(200).json(category);
        })
        .catch(next);
})

//GET all the expenses of the specific category.Eg: category/1/expenses 
router.get('/:categoryId/expenses/', (req, res, next)=>{
		Category.findAll({ where: { id: req.params.categoryId}, include: [{ model: Expense}]})
		.then( manyExpenses => res.json(manyExpenses))
		.catch(next)
})

//GET single expense of the specific category.Eg: categories/1/expenses/2
router.get('/:categoryId/expenses/:expenseId', (req, res, next)=>{
    Expense.findById(req.params.expenseId,{include: [{model: Category}]} )
    .then( singleExpense => res.json(singleExpense))
    .catch(next)
})

//GET all the expenses of the specific category where categoryExpenses > categoryBudget Eg: /:categoryId/expenses/budgets/:categoryId
// router.get('/:categoryId/expenses', (req, res, next)=>{
// 	Category.findAll({ where: { id: req.params.categoryId}, include: [{ model: Expense}]})
// 	.then( manyExpenses => res.json(manyExpenses))
// 	Category.findById({ where: { id: req.params.categoryId}, include: [{ model: Expense}]})
// 	.catch(next)
// })

router.post('/', (req, res, next) => {
	Category.create(req.body)
		.then(category => res.status(201).json(category))
		.catch(next);
})

router.put('/:categoryid', (req, res, next) => {
	Category.update(req.body, {
		where: {id: req.params.categoryid},
    returning: true
		})
		.then(([_, updated]) => res.status(201).json(updated[0]))
		.catch(next)
})

router.delete('/:categoryid', (req, res, next) => {
	Category.destroy({where: {id: req.params.id}})
		.then(() => res.sendStatus(204))
		.catch(next)
})