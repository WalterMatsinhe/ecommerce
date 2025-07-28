//where u use this uve created in auth controller
const express = require('express');
const { 
    registerUser,
    loginUser,
    logoutUser,
    authMiddleware
} = require('../../controllers/auth/auth-controller');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/check-auth',authMiddleware, (req,res)=> {
    const user = req.user;
})

module.exports = router;
