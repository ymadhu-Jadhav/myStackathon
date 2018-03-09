const db = require('../db')
const User = require('./user')
const Category = require('./category')
const Expense = require('./expense')
const Budget = require('./budget')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

 Expense.belongsTo(User);
 Expense.belongsTo(Category);
 Category.hasMany(Expense);
 Budget.belongsTo(Category);
//  Category.hasOne(Budget)



/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,Category,Expense,Budget,db
}
