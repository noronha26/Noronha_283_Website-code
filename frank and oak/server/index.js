const express = require('express');
const allRoutes = require('./src/app');
const cors = require('cors');
require('dotenv').config();
require('./src/db/config');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', allRoutes);
app.use('/frank-and-oak-admin-files',express.static('./src/uploads'));
app.use('/frank-and-oak-files',express.static('./src/uploads'));
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    // console.log(process.env.ADMIN_EMAILN);
    // console.log("Admin email:", process.env.ADMIN_EMAILN);
})