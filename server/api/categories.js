const router = require('express').Router()
const {Category, Expense} = require('../db/models')
const Sequelize = require('sequelize')
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

//GET sum of all the expenses of the specific category Eg: /:categoryId/expenses/budgets/:categoryId
 router.get('/:categoryId/sumOfExpenses/expenses', (req, res, next)=>{
 	Expense.findAll({ attributes: { expenseId: [Sequelize.fn('count',
 	Sequelize.col('expenses.id')),'expenseCount'], 
	include: [{ attributes: [],model: Category}],
	group: ['category.id']
 }
 	.then( sum => res.json(sum))
	.catch(next)
 	})
 })

// //GET sum of all the expenses of the specific category Eg: /:categoryId/expenses/budgets/:categoryId
// router.get('/:categoryId/sumOfExpenses/expenses', (req, res, next)=>{
// 	Category.findAll({ attributes: { categoryId: [Sequelize.fn('count',
// 	Sequelize.col('categories.id')),'categoryCount'], 
// 	include: [{ attributes: [],model: Expense}],
// 	group: ['expense.id','expense.amount']
// }
// 	.then( sum => res.json(sum))
// 	.catch(next)
// 	})
// })



// //GET sum of expenses of the specific category.Eg: categories/1/expenses
// router.get('/:categoryId/expenses/:expenseId', (req, res, next)=>{
//     Category.findAll(req.params.categoryId, {include: [{model: Expense}]} )
//     .then( categoryExpenses => res.json(categoryExpenses))
//     .catch(next)
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