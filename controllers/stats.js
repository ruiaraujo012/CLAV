const Stat = require('../models/stats')

const Stats = module.exports

Stats.listByUsername = username => {
    return Stat
        .findOne({
            username: username
        })
        .exec()
}

Stats.insertMany = listStats => {
    return Stat.insertMany(listStats)
}

Stats.insert = stat => {
    return Stat.create(stat)
}

Stats.export = () => {
    return Stat
        .find()
        .exec()
}
