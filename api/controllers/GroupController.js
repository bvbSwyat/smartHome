/**
 * GroupController
 *
 * @description :: Server-side logic for managing Groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function (req, res) {
    var userId = req.param('user_id');
    if (!userId) return res.send(500);
    var params = {
      name: req.param('name'),
      manager: userId,
      user_ids: req.param('user_ids')
    };
    Group.create(params).exec(function (err, group) {
      if (err) return res.send(500);
      return res.json(group);
    });
  },

  update: function(req, res) {
    var groupId = req.param('group_id');
    var userIds = req.param('user_ids');
    if (!userIds || !groupId) return res.send(500);

    var updateObj = {user_ids: userIds};
    CardList.update(groupId, updateObj).exec(function (err, group) {
      if (err) return res.send(500);
      return res.json(group);
    });
  },

  list: function (req, res) {
    var userId = req.param('user_id');
    if (!userId) return res.send(500);

    User.findOne(userId)
      .populate('groups')
      .exec(function (err, user) {
        if (!user) return res.send(404);
        if (!user.groups) return res.send(404);
        if (err) return res.send(500);
      return res.json(user.groups);
    });
  }
};

