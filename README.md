# Blockchain-based eVault System for Legal Records

## Introduction
This project is a blockchain-based eVault system designed to securely store, manage, and share legal records. The system ensures security, transparency, and accessibility for all stakeholders using Hyperledger Fabric.

## Features
- Secure storage of legal records on the blockchain.
- User-friendly interface for uploading and retrieving documents.
- Smart contracts for managing access and permissions.
- Integration with existing legal databases and case management systems.

## Technology Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Blockchain**: Hyperledger Fabric
- **Database**: MongoDB
- **Authentication**: JWT
- **Encryption**: AES

## Setup Instructions

### Prerequisites
- Docker
- Docker Compose
- Node.js
- npm

### Blockchain Network Setup
1. Clone the Hyperledger Fabric samples repository:
    ```sh
    git clone https://github.com/hyperledger/fabric-samples.git
    cd fabric-samples/test-network
    ./network.sh up createChannel -c mychannel -ca
    ./network.sh deployCC -ccn evault -ccp ../chaincode/evault -ccl javascript
    ```

### Backend Setup
1. Navigate to the `evault-backend` directory and install dependencies:
    ```sh
    npm install
    node server.js
    ```

### Frontend Setup
1. Navigate to the `evault-frontend` directory and install dependencies:
    ```sh
    npm install
    npm start
    ```

## Testing
- Use Postman or similar tools to test the backend APIs.
- Frontend components can be tested using Jest and React Testing Library.

## Contributing
- Follow clean code principles.
- Ensure proper documentation.
- Write tests for new features and bug fixes.

## License
This project is licensed under the MIT License.
