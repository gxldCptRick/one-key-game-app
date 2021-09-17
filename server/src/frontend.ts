import express from 'express';
import * as path from "path"


export const createApp = () => {
  const app =  express()
  app.use(express.static(path.normalize(path.join(__dirname, '../public'))));
  app.get('/healthz', (_, res) => {
    res.json({ o: 'k' });
    });
  return app;
}
