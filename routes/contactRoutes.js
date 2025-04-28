// const express = require('express');
// const router = express.Router();
// const { submitContactForm } = require('../controllers/contactController');

// router.post('/contact', submitContactForm);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { submitContactForm, validateContactForm } = require('../controllers/contactController');

// router.post('/contact', validateContactForm, submitContactForm);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { 
  submitContactForm, 
  validateContactForm 
} = require('../controllers/contactController');

router.post('/contact', validateContactForm, submitContactForm);

module.exports = router;