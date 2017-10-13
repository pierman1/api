'use strict'

const mongoose = require('mongoose'),
  Company = mongoose.model('Companies')

exports.list_all_companies = function (req, res) {
  Company.find({}, function (err, company) {
    if (err) res.send(err)
    res.json(company)
  })
}

exports.create_a_company = function (req, res) {
  const new_company = new Company(req.body)
  new_company.save(function (err, company) {
    if (err) res.send(err)
    res.json(company)
  })
}

exports.read_a_company = function (req, res) {
  Company.findById(req.params.companyId, function (err, company) {
    if (err) res.send(err)
    res.json(company)
  })
}

exports.update_a_company = function (req, res) {
  Company.findOneAndUpdate(
    { _id: req.params.companyId },
    req.body,
    { new: true },
    function (err, company) {
      if (err) res.send(err)
      res.json(company)
    }
  )
}

exports.delete_a_company = function (req, res) {
  Company.remove(
    {
      _id: req.params.companyId
    },
    function (err, company) {
      if (err) res.send(err)
      res.json({ message: 'Company successfully deleted' })
    }
  )
}

exports.add_a_location = function (req, res) {
  console.log(req.body)
  Company.findOne({ _id: req.params.companyId }, function (err, company) {
    if (err) return res.send(err)
    company.set(req.body)
    company.save(function () {
      res.send(req.body)
    })
  })
}
