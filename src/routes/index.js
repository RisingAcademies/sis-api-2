import express from 'express';
import publicRoutes from './public';
import userRoutes from './users';

const app = express();

/* routes */
app.use('/', userRoutes);

/* public routes */
app.use('/pub', publicRoutes);

module.exports = app;
