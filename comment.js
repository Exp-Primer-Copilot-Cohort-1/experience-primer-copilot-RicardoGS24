// Create web server

// 1. Load the express module
const express = require('express');
// 2. Create an app with the express function
const app = express();
// 3. Load the body-parser module
const bodyParser = require('body-parser');
// 4. Load the express-handlebars module
const exphbs = require('express-handlebars');
// 5. Load the mongoose module
const mongoose = require('mongoose');
// 6. Load the Comment model
const Comment = require('./models/comment');
// 7. Load the Post model
const Post = require('./models/post');
// 8. Load the commentController module
const commentController = require('./controllers/commentController');
// 9. Load the postController module
const postController = require('./controllers/postController');

// 10. Connect to the database
mongoose.connect('mongodb://localhost/commentdb', { useNewUrlParser: true });
// 11. Check if connected to the database
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
// 12. Check if there is an error connecting to the database
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
});

// 13. Set up the port
const port = 3000;

// 14. Set up the body-parser module
app.use(bodyParser.urlencoded({ extended: true }));

// 15. Set up the handlebars module
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// 16. Set up the commentController module
commentController(app);

// 17. Set up the postController module
postController(app);

// 18. Set up the home page
app.get('/', (req, res) => {
    Post.find({}).populate('comments').then((posts) => {
        res.render('home', { posts: posts });
    }).catch((err) => {
        console.log(err);
    });
});

// 19. Set up the about page
app.get('/about', (req, res) => {
    res.render('about');
});

// 20. Set up the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});