'use strict'
module.exports = function (app) {
  const companies = require('../controllers/companiesController')
  const userHandlers = require('../controllers/userController')

  // todoList Routes
  app
    .route('/companies')
    .get(userHandlers.loginRequired, companies.list_all_companies)
    .post(userHandlers.loginRequired, companies.create_a_company)

  app
    .route('/companies/:companyId')
    .get(companies.read_a_company)
    .post(companies.add_a_location)
    .put(companies.update_a_company)
    .delete(companies.delete_a_company)

  app.route('/auth/register').post(userHandlers.register)

  app.route('/auth/sign_in').post(userHandlers.sign_in)
}
