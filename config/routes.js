/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'index'
  },

  'get /home': {
        controller: 'home',
        action: 'index'
    },


  'post /home': {
        controller: 'home',
        action: 'update'
    },


  'post /auth/sign_up': {
        controller: 'auth',
        action: 'sign_up'
    },

  'post /auth/sign_in': {
        controller: 'auth',
        action: 'sign_in'
    },

  'put /auth/logout': {
        controller: 'auth',
        action: 'logout'
    },



  'get /user/:id': {
        controller: 'user',
        action: 'index'
    },

  'get /users': {
        controller: 'user',
        action: 'list'
    },


  'post /user/:user_id/group': {
        controller: 'group',
        action: 'create'
    },

  'put /user/:user_id/group': {
        controller: 'group',
        action: 'update'
    },

  'get /user/:user_id/group/list': {
        controller: 'group',
        action: 'list'
    },

  'put /group/:group_id': {
        controller: 'group',
        action: 'update'
    },


  'post /user/:user_id/card': {
        controller: 'card',
        action: 'create'
  },

  'put /user/:user_id/card/:card_id': {
    controller: 'card',
    action: 'update'
  },

  'get /user/:user_id/card/list': {
        controller: 'card',
        action: 'list'
    },


  'post /user/:user_id/cardList': {
        controller: 'cardList',
        action: 'create'
    },

  'put /cardList/:list_id': {
        controller: 'cardList',
        action: 'update'
    },

  'get /cardList/:list_id': {
        controller: 'cardList',
        action: 'watch'
    },

  'get /user/:user_id/cardList/list': {
        controller: 'cardList',
        action: 'list'
    },

  'get /logs': {
        controller: 'Logs',
        action: 'index'
  },
  'post /logs': {
        controller: 'Logs',
        action: 'create'
  },




  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
