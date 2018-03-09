const Sequelize = require('sequelize')
const db = require('../db')
const images = ['https://www.mynaturalmarket.com/365-by-Whole-Foods-Market-Tampons-with-Applicator-Regular.html']
const getRandomImage = () => images[Math.floor(Math.random() * images.length)];


const Category = db.define ('category',{

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }  
    },
    image: {
        type: Sequelize.STRING,
        defaultValue: function() {
          return getRandomImage();
        }
    }
})

module.exports = Category;  