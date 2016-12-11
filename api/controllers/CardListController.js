/**
 * CardListController
 *
 * @description :: Server-side logic for managing Cardlists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
    var userId = req.param('user_id');
    if (!userId) return res.send(500);
    var params = {
      name: req.param('name'),
      owner: userId,
      card_ids: req.param('card_ids'),
      status: req.param('status')
    };
    CardList.create(params).exec(function (err, cardList) {
      if (err) return res.send(500);
      return res.json(cardList);
    });
  },

  watch: function (req, res) {
    var listId = req.param('list_id');
    if (!listId) return res.send(500);

    var findObj = {id: listId};
    CardList.findOne(findObj)
      .exec(function (err, cardList) {
         if (!cardList) return res.send(404);
         if (err) return res.send(500);
      return res.json(cardList);
    });
  },

  update: function(req, res) {
    var listId = req.param('list_id');
    var status = req.param('status');
    if (!status || !listId) return res.send(500);

    var updateObj = {status: status};
    CardList.update(listId, updateObj).exec(function (err, cardList) {
      if (err) return res.send(500);
      return res.json(cardList);
    });
  },

  list: function (req, res) {
    var userId = req.param('user_id');
    if (!userId) return res.send(500);

    User.findOne(userId)
      .populate('card_lists')
      .exec(function (err, user) {
        if (!user) return res.send(404);
        if (!user.card_lists) return res.send(404);
        if (err) return res.send(500);
      return res.json(user.card_lists);
    });
  }
};

