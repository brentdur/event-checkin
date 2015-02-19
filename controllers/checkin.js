var request = require('request-promise');
var API_BASE_URL = "https://api.tnyu.org/v1.0/";

module.exports = {
  showEvents: function(req, res, next, urlFor) {
    request({
      url: API_BASE_URL + "events/up-next",
      json: true,
      rejectUnauthorized: false
    }, function(err, response, body) {
      res.render('showEvents', {events: body.events});
    });
  },

  showConfiguredEvent: function(req, res, next, urlFor) {
    request({
      url: API_BASE_URL + "events/" + req.params.event_id,
      json: true,
      rejectUnauthorized: false
    }, function(err, response, body) {
      res.render('showEvents', {events: body.events, fromConfig: true});
    });
  },

  checkin: function(req, res, next, urlFor) {
    res.render('checkin');
  },

  thanks: function(req, res, next, urlFor) {
    res.render('thanks');
  },

  configure: function(req, res, next, urlFor) {
    request({
      url: "https://api.tnyu.org/v1.0/events/next-10",
      json: true,
      rejectUnauthorized: false
    }, function(err, response, body) {
      var events = body.events instanceof Array ? body.events : [body.events];
      res.render('configure', {events: events});
    });
  }
}