
# CyberSlouth - Decentralized Database API

CyberSlouth is a decentralized cybersecurity monitoring application that leverages IPFS for secure and tamper-proof data storage. This API serves as the decentralized database layer of CyberSlouth, allowing you to store and retrieve data using IPFS via Pinata.

## Getting Started

### Prerequisites

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **Pinata Account**: [Sign up for Pinata](https://pinata.cloud/) if you don't have an account.
- **Postman** or any API testing tool (optional, for testing purposes)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-organization/cyberslouth.git
   cd cyberslouth
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add the following variables:
   ```bash
   PINATA_JWT=your-pinata-jwt
   PINATA_GATEWAY=your-gateway.mypinata.cloud
   PORT=3000  # Optional, defaults to 3000
   ```

4. **Run the Server**:
   ```bash
   node server.js
   ```

## API Endpoints

### 1. Upload File to IPFS

#### Request

- **Method**: `POST`
- **Endpoint**: `/upload`
- **Content-Type**: `multipart/form-data`

#### Body

- **file**: The file you wish to upload (use `form-data`).

#### Example using Postman

1. Open Postman and create a new `POST` request.
2. Set the request URL to `http://localhost:3000/upload`.
3. In the "Body" tab, select `form-data`.
4. Add a key named `file`, and set the type to `File`. Choose the file you want to upload.
5. Click `Send`.

#### Response

```json
{
  "success": true,
  "ipfsHash": "bafkreibm6jg3ux5qumhcn2b3flc3tyu6dmlb4xa7u5bf44yegnrjhc4yeq",
  "message": "File uploaded successfully to IPFS via Pinata"
}
```

- **ipfsHash**: The IPFS hash (CID) of the uploaded file, which serves as both a unique identifier and a content-addressable storage pointer.

### 2. Retrieve File from IPFS

#### Request

- **Method**: `GET`
- **Endpoint**: `/file/:cid`

#### Parameters

- **cid**: The IPFS hash (CID) of the file you want to retrieve.

#### Example using Browser or Postman

1. In your browser or Postman, make a `GET` request to:
   ```text
   http://localhost:3000/file/<cid>
   ```
   Replace `<cid>` with the actual IPFS hash you received from the upload response.

#### Response

- The response will contain the content of the file stored on IPFS.

### Error Handling

- The API will return appropriate HTTP status codes (`400`, `500`) and error messages if something goes wrong (e.g., file not provided, invalid CID).

## Example Use Case

Imagine you have a cybersecurity monitoring system that detects an anomaly and needs to store the event data securely. You can use the `/upload` endpoint to store this data on IPFS. Later, if you need to analyze or retrieve this event, use the `/file/:cid` endpoint with the provided IPFS hash.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

