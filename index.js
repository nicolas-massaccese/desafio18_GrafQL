const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

// graphQL
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');

// initializations
const app = express();
const { connectToDb } = require('./config/database.js');
// require('./config/database.js');
require('./config/auth.js');
// const { createProduct } = require('./controller/create');



// settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);


// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.signupMessage = req.flash('signupMessage');
    res.locals.loginMessage = req.flash('loginMessage');
    res.locals.errorMsg = req.flash('errorMsg');
    res.locals.userOk = req.flash('userOk');
    res.locals.user = req.user;
    next();
});


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


// routes
const { usersApiRouter } = require('./routes/usersApiRouter.js');
app.use(usersApiRouter);



// starting server

connectToDb()
    // .then( async () => await createProduct())
//     // .then( async () => await read())
    .then(() => app.listen(3000, () => console.log('Ready!')));