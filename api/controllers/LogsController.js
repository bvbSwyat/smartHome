/**
 * LogsController
 *
 * @description :: Server-side logic for managing logs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {
    Logs
      .find()
      .exec(function (err, logs) {
          if (!logs) return res.send(404);
          if (err) return res.send(500);
          return res.view('logs/index', {logs: logs});
        });

  },

  create: function(req, res) {
    var userId = req.param('user_id');
    var log = req.param('log');
    var isStart = log == "start";
    if(isStart) {
      Logs.destroy().exec(function (err){
        if (err) {
          return res.negotiate(err);
        }
        var params = {
          user_id: userId,
          log: '----------------------------start-'+userId+'------------------------------',
        };
        Logs.create(params).exec(function (err, group) {
          if (err) return res.send(500);
          return res.send(200);
        });
      });
    } else {
        var params = {
          user_id: userId,
          log: log,
        };
        Logs.create(params).exec(function (err, group) {
          if (err) return res.send(500);
          return res.send(200);
        });
      res.send(200);
    }

  }
};

