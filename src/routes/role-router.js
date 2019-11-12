'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const err403 = require('../middleware/403.js');
const err401 = require('../middleware/401.js');


// TODO: Swagger Comments
// Visible by all clients
router.get('/public', (req, res, next) => {
  res.status(200).json({ valid: true });
});

// === TODO: Define all the routes below ======

// TODO: Swagger Comments
// Visible by logged in clients
/**
 * @route GET /hidden
 * tests if the user is authenticated
 * @param {object} req
 * @param {object} res
 * @param {function} next middleware
 */
router.get('/hidden', auth, err401, (req, res, next) => {
  if(req.user && req.user._id){
    console.log('user',req.user);
    console.log('user capablility?',req.user.__v);
    res.status(200).json({valid:true});
  }
  else{
    next('can not find user');
  }
}, err403);

// TODO: Swagger Comments
/**
 * @route GET /read-only
 * tests if the user has read only permission
 * @param {object} req
 * @param {object} res
 * @param {function} next middleware
 */
// Visible by roles that have the "read" capability
router.get('/read-only', (req, res, next) => {
  if(req.user && req.user._id){
    res.status(200).json({valid:true});
  }
});

// TODO: Swagger Comments
/**
 * @route POST /create
 * Accessible by roles that have the "create" capability
 * @param {object} req
 * @param {object} res
 * @param {function} next middleware
 */
router.post('/create', (req, res, next) => {});

// TODO: Swagger Comments
/**
 * @route PUT /update/:id
 * Accessible by roles that have the "update" capability
 * 
 * @param {object} req
 * @param {object} res
 * @param {function} next middleware
 */
router.put('/update/:id', (req, res, next) => {});

// TODO: Swagger Comments
/**
 * @route DELETE /delete/:id
 * Accessible by roles that have the "delete" capability
 * @param {object} req
 * @param {object} res
 * @param {function} next middleware
 */
router.delete('/delete/:id', (req, res, next) => {});

// TODO: Swagger Comments
/**
 * @route GET /super
 * Visible by roles that have the "superuser" capability
 * @param {object} req
 * @param {object} res
 * @param {function} next middleware
 */
router.get('/super', (req, res, next) => {});

module.exports = router;
