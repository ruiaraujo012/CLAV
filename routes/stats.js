const express = require('express')

const router = express.Router()
const Stats = require('../controllers/stats')
const { authenticate } = require('../auth/auth')

router.get('/', authenticate(), async (req, res) => {
	const data = await Stats.quantityOfAcessPerUrl()
	return res.json(data)
})

router.get('/quantityOfAccessPerUrl/:quantity', authenticate(), async (req, res) => {
	const data = await Stats.quantityOfAcessPerUrl(req.params.quantity)
	return res.json(data)
})
// router.get('/:id', authenticate(), async (req, res, next) => {})

module.exports = router
