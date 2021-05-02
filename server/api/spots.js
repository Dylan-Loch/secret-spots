const router = require('express').Router()
const { models: { User , Spot }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const spots = await Spot.findAll();
    res.json(spots)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
    try {
        const newSpot = req.body;
        console.log('newSpot-->', newSpot)
        const spot = await Spot.create(newSpot);
        console.log('created spot-->', spot)
        res.json(spot);
    } catch (error) {
        next(error)
    }
})