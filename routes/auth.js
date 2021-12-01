const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const {register,
   eraseMe,
    update, login,uploads, uploadProfileImage,profile
} = require('../controller/auth');


router.post('/register',upload.single("photo"),register);

router.post('/login', login);

router.get('/profile/:id', profile);

router.delete('/eraseMe',auth.userAuthentication, eraseMe);

router.put('/update/:id', auth.userAuthentication, update);

router.post('/uploads/:id',auth.userAuthentication,upload.single('photo'),uploads);

router.post('/uploadProfileImage/:id',upload.single('photo'),uploadProfileImage);




module.exports = router;
