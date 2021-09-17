import * as http from 'http';
import {createApp} from './frontend';
import {configureIoServer} from './game/ioServer';

const expressApp = createApp()
const server = http.createServer(expressApp)
configureIoServer(server)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
