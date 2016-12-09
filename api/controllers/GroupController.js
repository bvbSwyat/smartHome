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
};

