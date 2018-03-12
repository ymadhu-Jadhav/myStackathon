const sequelize = require('sequelize')
const dbforQuery = require('../db')
const router = require('express').Router()
const {Expense, Category,Budget} = require('../db/models')
module.exports = router

//Get All Expenses
router.get('/', (req, res, next) => {
    Expense.findAll({})
        .then(expenses => res.json(expenses))
        .catch(next)
})


//Get Single Expense by expenseId (expense/1)
router.get('/:expenseId', (req, res, next) => {
	Expense.findById(req.params.expenseId)
        .then((expense) => {
            res.status(200).json(expense);
        })
        .catch(next);
})

//GET all the expenses of the specific month.Eg: expenses/March
router.get('/expByMonth/:month', (req, res, next)=>{
	Expense.findAll({ where: { month: req.params.month}})
	.then( manyExpenses => res.json(manyExpenses))
	.catch(next)
})

//GET all the expenses of the specific quarter.Eg: expenses/Q1
router.get('/expByQuarter/:quarter', (req, res, next)=>{
	Expense.findAll({ where: { quarter: req.params.quarter}})
	.then( manyExpenses => res.json(manyExpenses))
	.catch(next)
})

//GET all the expenses of the specific year.Eg: expenses/2018
router.get('/expByYear/:year', (req, res, next)=>{
	Expense.findAll({ where: { year: req.params.year}})
	.then( manyExpenses => res.json(manyExpenses))
	.catch(next)
})
// GET all the expenses of the specific category of the specific month.Eg: /categories/1/expenses/4/March
router.get('/expByMonth/:month/categories/:categoryId', (req, res, next)=>{
	// console.log("fetchAllExpensesByCategory");
	//  console.log(req.params.month);
	//   console.log(req.params.categoryId);
	  
	Expense.findAll({ where: {  month: req.params.month, 
								categoryId: req.params.categoryId
							}, include: [{ model: Category}]})
	.then( manyExpenses => res.json(manyExpenses))
	.catch(next)
})

// GET all the expenses of the specific category of the specific quarter.Eg: /categories/1/expenses/4/Q1
router.get('/expByQuarter/:quarter/categories/:categoryId', (req, res, next)=>{
	Expense.findAll({ where: {  quarter: req.params.quarter, 
								categoryId: req.params.categoryId
							}, include: [{ model: Category}]})
	.then( manyExpenses => res.json(manyExpenses))
	.catch(next)
})

// GET all the expenses of the specific category of the specific year.Eg: /categories/1/expenses/4/2018
router.get('/expByYear/:year/categories/:categoryId', (req, res, next)=>{
	Expense.findAll({ where: {  year: req.params.year, 
								categoryId: req.params.categoryId
							}, include: [{ model: Category}]})
	.then( manyExpenses => res.json(manyExpenses))
	.catch(next)
})



//GET sum of all the expenses group by  category monthly

router.get('/gropupByAllCategory/:month', (req, res, next)=>{
	// console.log("/gropupByAllCategory/:month");
	// console.log(req.params.month);
	//var input='March'; //Hard Coded 
	
	//dbforQuery.query("select month,\"categoryId\" from expenses",{type:sequelize.QueryTypes.SELECT})
	dbforQuery.query("select \"categoryId\",SUM(amount),categories.name from expenses, "+
	"categories where categories.id=\"categoryId\" and month= :month "+
	"GROUP BY \"categoryId\",categories.name",
	{replacements :{month: req.params.month},type:sequelize.QueryTypes.SELECT})
	.then(expense => res.status(201).json(expense))
	.catch(next);


})

//GET sum of all the expenses group by  category Quartley
router.get('/gropupByAllCategoryByQuarter/:quarter', (req, res, next)=>{
	
	dbforQuery.query("select \"categoryId\",SUM(amount),categories.name from expenses, "+
	"categories where categories.id=\"categoryId\" and quarter= :quarter "+
	"GROUP BY \"categoryId\",categories.name",
	{replacements :{quarter: req.params.quarter},type:sequelize.QueryTypes.SELECT})
	.then(expense => res.status(201).json(expense))
	.catch(next);


})
//GET sum of all the expenses of the specific category and sum of budgets of a specific category for comparison (bar chart)

router.get('/gropupByAllCategory/budgets/:month', (req, res, next)=>{
	 console.log("/gropupByAllCategory/budgets/:month");
	// console.log(req.params.month);
	//var input='March'; //Hard Coded 
	
	//dbforQuery.query("select month,\"categoryId\" from expenses",{type:sequelize.QueryTypes.SELECT})
	dbforQuery.query("select expenses.\"categoryId\",SUM(expenses.amount),categories.name,budgets.amount from expenses, categories,budgets "+
	" where categories.id=expenses.\"categoryId\" and budgets.\"categoryId\"=categories.id "+
	" GROUP BY expenses.\"categoryId\",categories.name,budgets.amount ",
	{type:sequelize.QueryTypes.SELECT})
	.then(expense => res.status(201).json(expense))
	.catch(next);


})

router.post('/', (req, res, next) => {
	Expense.create(req.body)
		.then(expense => res.status(201).json(expense))
		.catch(next);
})

router.put('/:id', (req, res, next) => {
	Expense.update(req.body, {
		where: {id: req.params.id},
    returning: true
		})
		.then(([_, updated]) => res.status(201).json(updated[0]))
		.catch(next)
})

router.delete('/:id', (req, res, next) => {
	Expense.destroy({where: {id: req.params.id}})
		.then(() => res.sendStatus(204))
		.catch(next)
})