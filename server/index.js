import express from 'express';
import routes from './routes.js';
import bodyParser from 'express';
import {sequelize} from "../db/sequelize.js";

const app = express();

const logRequests = function (req, res, next) {
    console.log(req.method, req.url)
    next();
}

await sequelize.sync({ alter: true, force: false });
console.log("All models were synchronized successfully.");

app.use(logRequests);
app.use(bodyParser.urlencoded({extended: false}));
app.use('/contacts', routes);


async function main() {
    app.listen(4000, () => {
        console.log('app is running on port 4000, http://localhost:4000');
    });
}

await main();