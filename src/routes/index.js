import express from 'express';
import publicRoutes from './public';
import userRoutes from './user';
import schoolRoutes from './school';
import studentRoutes from './student';

const app = express();

/* routes */
app.use('/', userRoutes);

/* public routes */
app.use('/pub', publicRoutes);

/* School routes */
app.use('/school', schoolRoutes);

/* School routes */
app.use('/student', studentRoutes);

module.exports = app;
