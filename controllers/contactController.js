// const Contact = require('../models/Contact');

// exports.submitContactForm = async (req, res) => {
//     console.log('Request body:', req.body);
//     const { name, email, phone, message } = req.body;

//     if (!name || !email || !phone || !message) {
//         return res.status(400).json({ error: 'Please fill all fields' });
//     }

//     try {
//         const newContact = new Contact({ name, email, phone, message });
//         await newContact.save();
//         res.status(201).json({ message: 'Form submitted successfully!' });
//     } catch (error) {
//         console.error('Error submitting contact form:', error);
//         res.status(500).json({ error: 'Server error. Please try again later.' });
//     }
// };


const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

// Validation rules for the contact form
exports.validateContactForm = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .trim()
    .escape(),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .isMobilePhone('any', { strictMode: false }).withMessage('Invalid phone number'),
  body('message')
    .notEmpty().withMessage('Message is required')
    .trim()
    .escape()
];

// Handle form submission
exports.submitContactForm = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }

  const { name, email, phone, message } = req.body;

  try {
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();
    
    res.status(201).json({ 
      success: true,
      message: 'Form submitted successfully!',
      data: { name, email, phone,message }
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error. Please try again later.' 
    });
  }
};