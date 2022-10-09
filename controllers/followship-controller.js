const { User, Followship } = require('../models')
const helpers = require('../_helpers')

const followshipController = {
  postFollowship: (req, res, next) => {
    const userId = helpers.getUser(req).id
    const { id } = req.body
    if (userId === Number(id)) throw new Error('使用者不能追蹤自己')

    return User.findByPk(userId)
      .then(user => {
        if (!user) throw new Error('使用者不存在')

        return Followship.create({
          followingId: Number(id),
          followerId: userId
        })
          .then(followship => res.status(200).json(followship))
          .catch(error => next(error))
      }
      )
  }
}

module.exports = followshipController
