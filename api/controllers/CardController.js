/**
 * CardController
 *
 * @description :: Server-side logic for managing Cards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
    var userId = req.param('user_id');
    if (!userId) return res.send(500);
    var params = {
      name: req.param('name'),
      owner: userId,
      content: req.param('content')
    };
    Card.create(params).exec(function (err, cardList) {
      if (err) return res.send(500);
      return res.json(cardList);
    });
  },


  update: function (req, res) {
    var userId = req.param('user_id');
    var cardId = req.param('card_id');
    if (!userId || !cardId) return res.send(500);
    var updateObj = {
      name: req.param('name'),
      content: req.param('content')
    };
    Card.update(cardId, updateObj).exec(function (err, cardList) {
      if (err) return res.send(500);
      return res.json(cardList);
    });
  },

  list: function (req, res) {
    var userId = req.param('user_id');
    if (!userId) return res.send(500);
    Card.find({owner: userId})
      .exec(function (err, cardsList) {
        if (!cardsList) return res.send(404);
        if (err) return res.send(500);
      return res.json(cardsList);
    });
  }
};

