import express from 'express';
import * as http from 'http';

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;


app.get('/healthz', (_, res) => {
    res.json({ o: 'k' });
});


server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
