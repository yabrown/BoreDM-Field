const cors = require('cors');
const express = require('express');
const db = require('./queries')
const env = require('./env')

// routers
const loginRouter = require('./routers/login');
const projectsRouter = require('./routers/projects');
const samplesRouter = require('./routers/samples');
const logsRouter = require('./routers/logs');
const classificationsRouter = require('./routers/classifications');
const remarksRouter = require('./routers/remarks');
const waterRouter = require('./routers/water');

const { PORT } = env;
const app = express();

app.use(cors({ origin: '*', "methods": "GET,HEAD,PUT,PATCH,POST,DELETE" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use routers
app.use('/', loginRouter);
app.use('/', projectsRouter);
app.use('/', samplesRouter);
app.use('/', logsRouter);
app.use('/', classificationsRouter);
app.use('/', remarksRouter);
app.use('/', waterRouter);

// reseeds the DB
// written by: Max and Louis
app.get('/reseedDB', async (req, res) => {
    // console.log("doing default theing")
    try {
        const results = await db.reseedDB();
        res.json(results);
    } catch (err) {
        console.log(err);
    }
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
