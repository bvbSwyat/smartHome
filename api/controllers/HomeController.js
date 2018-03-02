/**
 * CardController
 *
 * @description :: Server-side logic for managing Cards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require('lodash');

module.exports = {
	index: function (req, res) {
    var homeId = 1;
    Home.findOne(homeId).exec(function (err, home) {
        if (!home) {
            var homeObj = {
              status: false,
              temperature: null,
              hSystem: {
                  status: false
              },
              kSystem: {
                  status: false
              }
            };
            Home.create(homeObj).exec(function (err, home) {
              if (err) return res.send(500);
              return res.json(home);
            });
        } else {
            return res.json(home);
        }
    })
  },


  update: function (req, res) {
    var homeId = 1;
    var updateObj = {
      status: req.param('status'),
      temperature: req.param('temperature'),
      hSystem: req.param('hSystem'),
      kSystem: req.param('kSystem')
    };
    Home.findOne(homeId).exec(function (err, home) {
        if (err) return res.send(500);
        if (!_.isEqual(updateObj.status, home.status)
            || !_.isEqual(updateObj.temperature, home.temperature)
            || !_.isEqual(updateObj.hSystem, home.hSystem)
            || !_.isEqual(updateObj.kSystem, home.kSystem)) {

            Home.update(homeId, updateObj).exec(function (err) {
              if (err) return res.send(500);
              return res.json(home);
            });
        }
    });
  }
};

