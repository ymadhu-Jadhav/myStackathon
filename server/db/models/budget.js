const Sequelize = require('sequelize')
const db = require('../db')
const Category = require('./Category');

const Budget = db.define('budget', {

    amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

Budget.hook('beforeValidate', (budget) => {
    return Category.findOne({where: {id: budget.categoryId }})
      .then( category => {
        category.id = category.name;
        category.id = category.image;
      })
  })

  module.exports = Budget;  