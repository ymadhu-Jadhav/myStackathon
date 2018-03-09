const Sequelize = require('sequelize')
const db = require('../db')
const Category = require('./Category');


 const Expense = db.define('expense', {

    expsDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },

    month: {
        type: Sequelize.STRING,
        allowNull: false
      },
    
    quarter: {
        type: Sequelize.STRING,
        allowNull: false
      },
    
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    
    merchant: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    accountNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
 })

 module.exports = Expense;

Expense.hook('beforeValidate', (expense) => {
    return Category.findOne({where: {id: expense.categoryId }})
      .then( category => {
        category.id = category.name;
      })
  })
  