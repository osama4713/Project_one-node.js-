require('../db/mongoose');
const MenuRouter = require('../Admin/routers/menu');
const AdministrationRouter = require('../Admin/routers/administration');
const AdminRouter = require('../Admin/routers/admin');
const UserRouter = require('../Client/routers/user');
const express = require('express');

const app = express();

const port = process.env.PORT || 3000 ;

app.use(express.json());
app.use(MenuRouter)
app.use(AdministrationRouter)
app.use(AdminRouter)
app.use(UserRouter)

app.listen( port ,()=>{console.log('All DONE')})