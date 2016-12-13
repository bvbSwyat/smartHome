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
      users_ids: req.param('user_ids')
    };
    Group.create(params).exec(function (err, group) {
      if (err) return res.send(500);
      return res.json(group);
    });
  },

  update: function(req, res) {
    var userId = req.param('user_id');
    if (!userId) return res.send(500);
    var updateObj = {};
    CardList.update(listId, updateObj).exec(function (err, cardList) {
      if (err) return res.send(500);
      return res.json(cardList);
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
        console.log(user.groups)
        // user.groups = (new Function("return [" + user.groups+ "];")());
        // if (user.groups.length > 0) {
        //   for (var group in user.groups) {
        //     var currentGroup = user.groups[group];
        //
        //     if (currentGroup.user_ids != null) {
        //       console.log(222, currentGroup)
        //       var where = [];
        //       for (var i in currentGroup.user_ids) {
        //         where.push({id: currentGroup.user_ids[i]});
        //       }
        //       console.log(where)
        //       User.find({'$and': currentGroup.user_ids}).exec(function (err, users) {
        //         console.log(111, users)
        //         console.log(users)
        //         if (!users) return res.send(404);
        //         if (err) return res.send(500);
        //         currentGroup.users = users;
        //
        //       })
        //     }
        //
        //   }
        //   return res.json(user.groups);
        //
        // }
      return res.json(user.groups);
    });
  }
};

