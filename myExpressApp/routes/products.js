const express = require('express');
const router = express.Router();
const { database } = require('../config/helpers');




/* GET all products. */
router.get('/', function (req, res) {

  let page = (req.query.page != undefined && req.query.page != 0) ? req.query.page : 1; //to set current page number
  const limit = (req.query.page != undefined && req.query.page != 0) ? req.query.page : 10; // to set the limit of the items per page


  let startValue;
  let endValue;

  if (page > 0) {
    startValue = (page * limit) - limit //10,20,30
    endValue = (page * limit);

  } else {
    startValue = 0;
    endValue = 5;

  }

  database.table('products as p')//
    .join([{
      table: 'categories as c',
      on: 'c.id = p.cat_id'
    }])

    .withFields(['c.title as category',
      'p.title as name',
      'p.price',
	  'p.description',
      'p.quantity',
      'p.images',
      'p.id',
      'p.image'
    ])

    .slice(startValue, endValue)
    .sort({ id: .1 })
    .getAll()
    .then(prods => {
      if (prods.length > 0) {
        res.status(200).json({
          count: prods.length,
          products: prods
        });
      } else {
        res.json({ message: 'no products found' });
      }
    }).catch(err => console.log(err));







});

/* GET SINGLE PRODUCT */
router.get('/:prodid', (req, res) => {

  let productId = req.params.prodid;
  console.log(productId);

  database.table('products as p')//
    .join([{
      table: 'categories as c',
      on: 'c.id = p.cat_id'
    }])

    .withFields(['c.title as category',
      'p.title as name',
      'p.price',
	  'p.description',
      'p.quantity',
      'p.image',
      'p.images',
      'p.id'
    ])


    .filter({ 'p.id': productId })
    .get()
    .then(prod => {
      if (prod) {
        res.status(200).json(prod);
      } else {
        res.json({ message: `no products found with product Id ${productId}` });
      }
    }).catch(err => console.log(err));










});


/**GET ALL PRODUCTS FROM ONE PARTICULAR CATEGORY */
router.get('/category/:catName', (req, res) => {
  let page = (req.query.page != undefined && req.query.page != 0) ? req.query.page : 1; //to set current page number
  const limit = (req.query.page != undefined && req.query.page != 0) ? req.query.page : 10; // to set the limit of the items per page


  let startValue;
  let endValue;

  if (page > 0) {
    startValue = (page * limit) - limit //10,20,30
    endValue = (page * limit);

  } else {
    startValue = 0;
    endValue = 5;

  }
  // Fetch the category Name from the URL
  const cat_title = req.params.catName;
  database.table('products as p')//
    .join([{
      table: 'categories as c',
      on: `c.id = p.cat_id WHERE c.title LIKE '%${cat_title}%'`
    }])

    .withFields(['c.title as category',
      'p.title as name',
      'p.price',
      'p.quantity',
      'p.images',
      'p.id',
      'p.image'
    ])

    .slice(startValue, endValue)
    .sort({ id: .1 })
    .getAll()
    .then(prods => {
      if (prods.length > 0) {
        res.status(200).json({
          count: prods.length,
          products: prods
        });
      } else {
        res.json({ message: `no products found from ${cat_title} category` });
      }
    }).catch(err => console.log(err));
});

module.exports = router;
