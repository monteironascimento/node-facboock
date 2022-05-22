import express from 'express';
import { postGroup } from './routes/group.route';

//https://www.facebook.com/ofertabestt

const port = (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test' ? 3091 : 3090);

const app = express();
console.log(`START  NODE-FACBOOCK - AMBIENTE ${process.env.NODE_ENV}   PORTA ${port}`)

app.use(express.json());

app.use( "/postGroupFacboock", postGroup);

app.get('/', (require, response) => {
    return response.json({status: "OK"});
})

app.listen(port);