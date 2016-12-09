/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req, res) {
      var id = req.param('id');
      User
          .findOne(id)
          .exec(function (err, user) {
              if (!user) return res.send(404);
              if (err) return res.send(500);
              res.json(user);
            });
    },
};

