const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

async function startServer() {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

startServer()
