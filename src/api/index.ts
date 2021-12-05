import express from "express";
import submissions from './routes/submissions';

const api = express();

const port = 8080;

api.get("/status", (req, res) => {
    res.json({ api: 'ok' });
});

api.use(submissions);

if (process.env['NODE_ENV'] === "production") {
    api.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
    });
}

export default api;