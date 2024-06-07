const express = require('express');
const bodyParser = require('body-parser');
const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const mongoose = require('mongoose');
const jwt = require('jwt-simple');

const app = express();
app.use(bodyParser.json());

const ccpPath = path.resolve(__dirname, '..', 'fabric-samples', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');

async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/evault', { useNewUrlParser: true, useUnifiedTopology: true });
        
        app.post('/login', async (req, res) => {
            const { username, password } = req.body;
            // Simplified authentication logic
            if (username === 'admin' && password === 'password') {
                const token = jwt.encode({ username }, 'secret');
                res.json({ token });
            } else {
                res.status(401).send('Unauthorized');
            }
        });

        app.use(async (req, res, next) => {
            const token = req.headers['authorization'];
            if (token) {
                try {
                    req.user = jwt.decode(token, 'secret');
                    next();
                } catch (e) {
                    res.status(401).send('Unauthorized');
                }
            } else {
                res.status(401).send('Unauthorized');
            }
        });

        app.post('/records', async (req, res) => {
            const { id, owner, content } = req.body;
            const wallet = new FileSystemWallet(path.join(process.cwd(), 'wallet'));
            const gateway = new Gateway();
            await gateway.connect(ccpPath, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
            const network = await gateway.getNetwork('mychannel');
            const contract = network.getContract('evault');
            const result = await contract.submitTransaction('createRecord', id, owner, content);
            res.send(result.toString());
        });

        app.get('/records/:id', async (req, res) => {
            const { id } = req.params;
            const wallet = new FileSystemWallet(path.join(process.cwd(), 'wallet'));
            const gateway = new Gateway();
            await gateway.connect(ccpPath, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
            const network = await gateway.getNetwork('mychannel');
            const contract = network.getContract('evault');
            const result = await contract.evaluateTransaction('queryRecord', id);
            res.send(result.toString());
        });

        app.listen(3000, () => {
            console.log('Server is listening on port 3000');
        });
    } catch (error) {
        console.error(`Failed to run the application: ${error}`);
    }
}

main();
