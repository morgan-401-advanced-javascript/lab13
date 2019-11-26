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


router.use(auth);
router.use(err401);

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
router.get('/hidden', (req, res, next) => {
  console.log('im in hiddn', req.user);
  if(req.user && req.user._id){
    console.log('user',req.user);
    console.log('user capablility?',req.user.capabilities);
    res.status(200).json({valid:true});
  }
  else{
    next('can not find user');
  }
});

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
  if(req.user.can('create')){
    res.status(200).json({ valid: true }); 
  }
  else {
    next('Incorrect role access');
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
router.post('/create', (req, res, next) => {
  // if(req.user && req.user._id) {
  //   let capabilities = req.user.virtualRoles.capabilities;

  //   if(capabilities.includes('create')) 
  if(req.user.can('create')){
    res.status(200).json({ valid: true }); 
  }
  else {
    next('Incorrect role access');
  }
  
});

// TODO: Swagger Comments
/**
 * @route PUT /update/:id
 * Accessible by roles that have the "update" capability
 * 
 * @param {object} req
 * @param {object} res
 * @param {function} next middleware
 */
router.put('/update/:id', (req, res, next) => {

  if (req.user.can('update') !== true)
    return next({ status: 403, msg: 'You cannot update books' });

  
  else {
    res.status(200).json({ valid: true }); 
  }
  
});

// TODO: Swagger Comments
/**
 * @route DELETE /delete/:id
 * Accessible by roles that have the "delete" capability
 * @param {object} req
 * @param {object} res
 * @param {function} next middleware
 */
router.delete('/delete/:id', (req, res, next) => {
  if(req.user.can('delete')) {
    res.status(200).json({ valid: true }); 
  }
  else {
    next('Incorrect role access');
  }
  
});

// TODO: Swagger Comments
/**
 * @route GET /super
 * Visible by roles that have the "superuser" capability
 * @param {object} req
 * @param {object} res
 * @param {function} next middleware
 */
router.get('/super', (req, res, next) => {
  if(req.user.can('superuser')) {
    res.status(200).json({ valid: true }); 
  }
  else {
    next('Incorrect role access');
  }
  
});

router.use(err403);


module.exports = router;
