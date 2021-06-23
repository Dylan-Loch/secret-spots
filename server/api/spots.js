const router = require('express').Router()
const { models: { User , Spot }} = require('../db')
module.exports = router
const { requireToken } = require('./gatekeepingMiddleware')

router.get('/', requireToken, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const spots = await Spot.findAll({
      where: {
        userId: userId,
      }
    });
    res.json(spots)
  } catch (err) {
    next(err)
  }
})

router.post('/', requireToken, async (req, res, next) => {
    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId);
      const newSpot = req.body;
      // console.log('newSpot-->', newSpot)
      const spot = await Spot.create(newSpot);
      // console.log('created spot-->', spot)
      spot.setUser(user);
      res.json(spot);
    } catch (error) {
        next(error)
    }
})