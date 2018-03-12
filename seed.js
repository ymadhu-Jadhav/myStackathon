'use strict';

const db = require('./server/db');
const User = db.models.user
const Category = db.models.category
const Expense = db.models.expense
const Budget = db.models.budget

const users = [{
  firstName: 'Jasmine',
  lastName: 'J',
  email: 'jasmine@j.com',
  password: '444'
}, 
{
  firstName: 'Joleene',
  lastName: 'M',
  email: 'joleene@m.com',
  password: '333'
}, {
  firstName: 'Jenny',
  lastName: 'K',
  email: 'jennifer@k.com',
  password: '123'
}]

const categories = [{
  name: 'Groceries',
  image: '/images/grocery.png'
}, {
    name: 'Transportation',
    image: '/images/tampons1.png'
  }, {
    name: 'Insurance' ,
    image: '/images/tampons1.png'
  }, {
    name: 'Health',
    image: '/images/tampons1.png'
}, {
    name: 'Restaurant',
    image: '/images/tampons1.png'
}, {
    name: 'Shop & Ent',
    image: '/images/tampons1.png'
}, {
    name: 'Home & Utilities',
    image: '/images/tampons1.png'
}, {
    name: 'Travel',
    image: '/images/tampons1.png'
}, {
    name: 'Education',
    image: '/images/tampons1.png'
}, {
    name: 'Finance',
    image: '/images/tampons1.png'
}, {
    name: 'Misc',
    image: '/images/tampons1.png'
}]


const expenses = [{
  expsDate: '1/9/2018',
  month: 'January',
  quarter: 'Q1',
  year: 2018,
  merchant: 'Birthday-Party',
  accountNo: 98572,
  categoryId: 11,
  amount: 150
  },{
    expsDate: '1/12/2018',
    month: 'January',
    quarter: 'Q1',
    year: 2018,
    merchant: 'Staples',
    accountNo: 98572,
    categoryId: 11,
    amount: 50
    },{
    expsDate: '1/16/2018',
    month: 'January',
    quarter: 'Q1',
    year: 2018,
    merchant: 'Costco',
    accountNo: 98572,
    categoryId: 1,
    amount: 400
    },{
      expsDate: '1/17/2018',
      month: 'January',
      quarter: 'Q1',
      year: 2018,
      merchant: 'ACME',
      accountNo: 98572,
      categoryId: 1,
      amount: 100
      },{
        expsDate: '1/18/2018',
        month: 'January',
        quarter: 'Q1',
        year: 2018,
        merchant: 'Shop$Shop',
        accountNo: 98572,
        categoryId: 1,
        amount: 95
        },{
    expsDate: '1/19/2018',
    month: 'January',
    quarter: 'Q1',
    year: 2018,
    merchant: 'Stem-Academy',
    accountNo: 98572,
    categoryId: 9,
    amount: 350
    },{
      expsDate: '1/20/2018',
      month: 'January',
      quarter: 'Q1',
      year: 2018,
      merchant: 'Math-Academy',
      accountNo: 98572,
      categoryId: 9,
      amount: 120
      },{expsDate: '1/22/2018',
    month: 'January',
    quarter: 'Q1',
    year: 2018,
    merchant: 'Stop&Shop',
    accountNo: 98572,
    categoryId: 1,
    amount: 85
    
    },{expsDate:'1/27/2018',
    month: 'January',
    quarter: 'Q1',
    year: 2018,
    merchant: 'Costco',
    accountNo: 98572,
    categoryId: 1,
    amount: 250
    },{expsDate: '1/25/2018',
    month: 'January',
    quarter: 'Q1',
    year: 2018,
    merchant: 'Nj-Transit',
    accountNo: 98572,
    categoryId: 2,
    amount: 285
    },{expsDate: '1/28/2018',
    month: 'January',
    quarter: 'Q1',
    year: 2018,
    merchant: 'ACME',
    accountNo: 98572,
    categoryId: 1,
    amount: 285
    
    },{expsDate: '1/29/2018',
    month: 'January',
    quarter: 'Q1',
    year: 2018,
    merchant: 'Uber',
    accountNo: 98572,
    categoryId: 2,
    amount: 30
    
    },{
      expsDate: '2/12/2018',
      month: 'February',
      quarter: 'Q1',
      year: 2018,
      merchant: 'Kayak',
      accountNo: 98572,
      categoryId: 8,
      amount: 700
      },{expsDate: '2/13/2018',
      month: 'February',
      quarter: 'Q1',
      year: 2018,
      merchant: 'Nj-Transit',
      accountNo: 98572,
      categoryId: 2,
      amount: 285
      
      },{
        expsDate: '2/15/2018',
        month: 'February',
        quarter: 'Q1',
        year: 2018,
        merchant: 'Shoprite',
        accountNo: 98572,
        categoryId: 1,
        amount: 90
        },{
          expsDate: '2/16/2018',
          month: 'February',
          quarter: 'Q1',
          year: 2018,
          merchant: 'Red-Lobster',
          accountNo: 98572,
          categoryId: 5,
          amount: 85
          },{
          expsDate: '2/19/2018',
          month: 'February',
          quarter: 'Q1',
          year: 2018,
          merchant: 'Stem-Academy',
          accountNo: 98572,
          categoryId: 9,
          amount: 350
          },{
            expsDate: '2/20/2018',
            month: 'February',
            quarter: 'Q1',
            year: 2018,
            merchant: 'Costco',
            accountNo: 98572,
            categoryId: 1,
            amount: 300
            },{
              expsDate: '2/21/2018',
              month: 'February',
              quarter: 'Q1',
              year: 2018,
              merchant: 'Olive-Garden',
              accountNo: 98572,
              categoryId: 5,
              amount: 100
              },{
  expsDate: '3/10/2018',
  month: 'March',
  quarter: 'Q1',
  year: 2018,
  merchant: 'Mass-Mutual',
  accountNo: 98572,
  categoryId: 3,
  amount: 750
  },{expsDate: '3/13/2018',
  month: 'March',
  quarter: 'Q1',
  year: 2018,
  merchant: 'Uber',
  accountNo: 98572,
  categoryId: 2,
  amount: 20
  
  },{expsDate: '3/14/2018',
  month: 'March',
  quarter: 'Q1',
  year: 2018,
  merchant: 'Path-train',
  accountNo: 98572,
  categoryId: 2,
  amount: 150
  
  },{
  expsDate: '3/15/2018',
  month: 'March',
  quarter: 'Q1',
  year: 2018,
  merchant: 'Walgreens',
  accountNo: 98572,
  categoryId: 4,
  amount: 350
  },{
    expsDate: '3/17/2018',
    month: 'March',
    quarter: 'Q1',
    year: 2018,
    merchant: 'Kayak',
    accountNo: 98572,
    categoryId: 8,
    amount: 600
    },{
      expsDate: '3/18/2018',
      month: 'March',
      quarter: 'Q1',
      year: 2018,
      merchant: 'Target',
      accountNo: 98572,
      categoryId: 6,
      amount: 600
      },{
    expsDate: '3/20/2018',
    month: 'March',
    quarter: 'Q1',
    year: 2018,
    merchant: 'Just-Bagels',
    accountNo: 98572,
    categoryId: 5,
    amount: 50
    },{
    expsDate:'3/21/2018',
    month: 'March',
    quarter: 'Q1',
    year: 2018,
    merchant: 'Stop&Shop',
    accountNo: 98572,
    categoryId: 1,
    amount: 350
    }, {
      expsDate:'3/22/2018',
      month: 'March',
      quarter: 'Q1',
      year: 2018,
      merchant: 'Costco',
      accountNo: 98572,
      categoryId: 1,
      amount: 170
      }, {
        expsDate:'3/24/2018',
        month: 'March',
        quarter: 'Q1',
        year: 2018,
        merchant: 'Shoprite',
        accountNo: 98572,
        categoryId: 1,
        amount: 50
        }, {
      expsDate: '3/25/2018',
      month: 'March',
      quarter: 'Q1',
      year: 2018,
      merchant: 'Pizza-Zone',
      accountNo: 98572,
      categoryId: 5,
      amount: 60
      },{
        expsDate: '3/26/2018',
        month: 'March',
        quarter: 'Q1',
        year: 2018,
        merchant: 'Food-Zone',
        accountNo: 98572,
        categoryId: 5,
        amount: 45
        },{
expsDate: '3/28/2018',
month: 'March',
quarter: 'Q1',
year: 2018,
merchant: 'Nj-Transit',
accountNo: 98572,
categoryId: 2,
amount: 285

},
 {
expsDate: '9/18/2017',
month: 'September',
quarter: 'Q3',
year: 2017,
merchant: 'Buger-Zone' ,
accountNo: 98572,
categoryId: 5,
amount: 85
},{
expsDate: '9/28/2017',
month: 'September',
quarter: 'Q3',
year: 2017,
merchant: 'Pizza-Zone' ,
accountNo: 98572,
categoryId: 5,
amount: 300
},{
expsDate: '5/21/2017',
month: 'May',
quarter: 'Q2',
year: 2017,
merchant: 'Mass-Mutual',
accountNo: 98572,
categoryId: 3,
amount: 600
},{
expsDate: '11/15/2017',
month: 'November',
quarter: 'Q4',
year: 2017,
merchant: 'Kids-Academy',
accountNo: 98572,
categoryId: 9,
amount: 750
}]

const budgets = [{
categoryId: 1,
amount: 700

}, {
categoryId: 2,
amount: 750

}, {
categoryId: 3,
amount: 750

}, {
categoryId: 4,
amount: 400

},{
categoryId: 5,
amount: 300

},{
categoryId: 6,
amount: 500

},{
categoryId: 7,
amount: 500

},{
categoryId: 8,
amount: 750

},{
categoryId: 9,
amount: 750
},{
categoryId: 10,
amount: 750

},{
categoryId: 11,
amount: 750

}]



const seed = () =>
  Promise.all(users.map(user => User.create(user)))
  .then(() =>
    Promise.all(categories.map(category => Category.create(category)))
    )
   .then(() =>
    Promise.all(expenses.map(expense => Expense.create(expense)))
    )
    .then(() =>
    Promise.all(budgets.map(budget => Budget.create(budget)))
    )

    
const main = () => {
  console.log('Syncing the db');
  db.sync({ force: true })
  .then(() => {
    console.log('Seeding the db');
    return seed();
  })
  .catch(err => {
    console.log('Error while seeding');
    console.log(err);
  })
  .then(() => {
    db.close();
    return null;
  });
};
main();
