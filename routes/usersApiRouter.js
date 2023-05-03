const express = require('express');
const Router = require('express');
const passport = require('passport');
// const multer = require('multer');
// const mimeTypes = require('mime-types');
const { productRead, userRead } = require('../controller/read');

const {isAuthenticated} = require('../helpers/isAuthenticated')
const {upload} = require('../helpers/multer')


// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './public/uploads/');
//     },
//     filename: function(req, file, cb) {
//         // cb("", Date.now() + "." + mimeTypes.extension(file.mimetype));
//         cb("", "avatar" + "." + mimeTypes.extension(file.mimetype));
//     },
// });

// const maxSize = 1 * 1024 * 1024 // 1MB

// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             return cb(new Error('Solo se permiten subir archivos en formato .png, .jpg y .jpeg'));
//         }
//     },
//     limits: { fileSize: maxSize }
// });

const usersApiRouter = new Router()

// app.get('/*', async (req, res) =>{
//     res.status(403).send({ error : -1, descripcion: 'Ruta erronea !!' });
// });
// app.put('/*', async (req, res) =>{
//     res.status(403).send({ error : -1, descripcion: 'Ruta erronea !!' });
// });
// app.post('/*', async (req, res) =>{
//     res.status(403).send({ error : -1, descripcion: 'Ruta erronea !!' });
// });
// app.delete('/*', async (req, res) =>{
//     res.status(403).send({ error : -1, descripcion: 'Ruta erronea !!' });
// });




usersApiRouter.get('/', (req, res, next) => {
    res.render('index')
});


usersApiRouter.get('/signup', (req, res, next) => {
    res.render('signup')

});


usersApiRouter.post('/signup', upload.single('avatar'), passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    passReqToCallback: true
}));


usersApiRouter.get('/login', (req, res, next) => {

    res.render('login')

});

usersApiRouter.post('/login', async (req, res ) => {


    console.log(req.body);
    req.flash('userData', req.body)

    res.redirect('/profile')

});
// usersApiRouter.post('/login', passport.authenticate('local-login', {
//     successRedirect: '/profile',
//     failureRedirect: '/login',
//     passReqToCallback: true
// }),
// (req, res, next) => {
//     console.log(req.body)
//     req.session.user_data = req.body;

// });



usersApiRouter.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
});

// isAuthenticated

usersApiRouter.get('/profile', async (req, res ) => {
    // let nameuser = req.passport.user
    // if (req.passport.username) {

    //     res.render('profile', nameuser)
    // }
    // const userData = req.session.user_data;
    // delete req.session.user_data;
    const userData = req.flash('userData')[0];
    const products = await productRead();
    

    // res.send(JSON.stringify(products));
    res.render('profile', {products:products, userData})

});


module.exports = { usersApiRouter };    // req.session.user_data = req.body;
