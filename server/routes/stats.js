const express = require('express')

const router = express.Router()
const Stats = require('../controllers/stats')

router.get('/', async (req, res) => {
	console.log('Testing stats!')
	const data = await Stats.quantityOfAcessPerUrl()
	return res.json(data)
})

router.get('/dailyAccess/:quantity', async (req, res) => {
	const data = await Stats.dailyAccess(req.params.quantity)
	return res.json(data)
})

router.get('/quantityOfAccessPerUrl/:quantity', async (req, res) => {
	const data = await Stats.quantityOfAcessPerUrl(req.params.quantity)
	return res.json(data)
})

router.get('/quantityOfAccessPerUser/:quantity', async (req, res) => {
	const data = await Stats.quantityOfAccessPerUser(req.params.quantity)
	return res.json(data)
})

module.exports = router
