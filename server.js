const express = require('express');
const axios = require('axios');
const multer = require('multer');
const fs = require('fs');
const FormData = require('form-data'); // Import FormData
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).send('No file provided');
        }

        const data = new FormData();
        data.append('file', fs.createReadStream(file.path)); // Use the fs module to read the file

        const response = await axios.post(
            'https://api.pinata.cloud/pinning/pinFileToIPFS',
            data,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PINATA_JWT}`,
                    ...data.getHeaders(), // Correctly add headers from FormData
                },
            }
        );

        res.json({
            success: true,
            ipfsHash: response.data.IpfsHash,
            message: 'File uploaded successfully to IPFS',
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file');
    }
});

app.get('/file/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const url = `https://${process.env.PINATA_GATEWAY}/ipfs/${cid}`;
        const response = await axios.get(url);

        res.send(response.data);
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).send('Error fetching file');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
