const express = require('express');

const authRoute = require('./routes/authRoute');

const errorMiddleware = require('./middlewares/error');
const notFoundMiddleware = require('./middlewares/notFound');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(8007, () => console.log('server running on port 8007'));
