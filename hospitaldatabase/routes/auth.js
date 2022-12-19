const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();


router.post('/login', authController.login);
router.post('/doclogin', authController.doclogin);
router.post('/reg', authController.reg);
router.post('/booking', authController.booking);
router.post('/book3', authController.book3);
router.post('/book4', authController.book4);
router.post('/apphistory', authController.apphistory);
router.post('/medhis', authController.medhis);
router.post('/profile', authController.profile);
router.post('/docprofile', authController.docprofile);
router.post('/dochis', authController.dochis);
router.post('/regdoc', authController.regdoc);
router.post('/adminhome', authController.adminhome);
router.post('/medup', authController.medup);
router.post('/medup1', authController.medup1);



module.exports = router;