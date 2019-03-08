const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');


// load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// passport config
require('./config/passport')(passport);

// public static folder
app.use(express.static(path.join(__dirname, 'public')));


// bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config 
const db = require('./config/database');

// connect to mongoose
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB connected...' + process.env.NODE_ENV))
    .catch(err => console.log(err));




// handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

// method-override middleware
app.use(methodOverride('_method'));

// express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

// passport middelware
app.use(passport.initialize());
app.use(passport.session());

// connect-flash middleware
app.use(flash());

// Global variables 
app.use((req, res, next) => {
    res.locals.success_msg= req.flash('success_msg');
    res.locals.error_msg= req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


//index Route
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page',
        header: 'Welcome to my home page'
    });
});


//About Route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        header: 'welcome to my about page'
    });
});


// use routes
app.use('/ideas', ideas);
app.use('/users', users);



// server listen port
const port = process.env.PORT || 5000;
app.listen(port, err => {
    if (err) {
        throw new Error('port is in use')
        
    } else {
        console.log(`server is up and running on port ${port}.`);
    }
  
});
