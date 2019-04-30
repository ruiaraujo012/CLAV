const express = require('express')

const router = express.Router()
const Stats = require('../controllers/stats')
const { authenticate } = require('../auth/auth')

router.get('/', authenticate(), async (req, res) => {
	const data = await Stats.processFromDb()
	return res.json(data)
})

// router.get('/:id', authenticate(), async (req, res, next) => {})

module.exports = router
