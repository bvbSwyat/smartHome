/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	sign_in: function (req, res) {
      var userEmail = req.param('email');
      var userPass = req.param('password');
      if (!userEmail || !userPass) {
          return res.send(403);
      }
      User
          .findOne({email: userEmail, password: userPass})
          .exec(function (err, user) {
              if (!user) return res.send(404);
              if (err) return res.send(500);
              res.cookie('Auth', HelperService.randString(16), {
                domain: 'card.list',
                secure: true
              });
              res.json(user);
            });
    },

  sign_up: function (req, res) {
      var userName = req.param('name');
      var userEmail = req.param('email');
      var userPass = req.param('password');
      var isManager = req.param('is_manager');
      if (!userName || !userEmail || !userPass || !isManager) {
        return res.send(403);
      }
      User.find({email: userEmail})
          .exec(function (err, user) {
              if (user.email) return res.send(403);
              var newUser = {
                email: userEmail,
                name: userName,
                password: userPass,
                is_manager: isManager
              };
              User.create(newUser).exec(function (err, user) {
                  res.cookie('Auth', HelperService.randString(16), {
                    domain: 'card.list',
                    secure: true
                  });
                  if (err) return res.send(500);
                  return res.json(user);
              });
          });
    },

  logout: function (req, res) {
      var id = req.param('id');
      User
          .findOne(id)
          .exec(function (err, user) {
              if (!user) return res.send(404);
              if (err) return res.send(500);
              res.clearCookie('Auth');
              res.send(200);
            });
    },
};

