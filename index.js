const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

//Middleware
app.use(express.json());
app.use('/api/users', authRoute);
app.use('/api/posts', postsRoute);

app.listen(3000, () => console.log('Server started on port 3000...'));
// Tutorial source: Dev Ed: https://www.youtube.com/watch?v=2jqok-WgelI&t=1800s
