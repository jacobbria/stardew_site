const { BlobServiceClient } = require('@azure/storage-blob');

module.exports = async function (context, req) {
    context.log('GetResume function triggered');

    try {
        // Get configuration from environment variables
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        const containerName = process.env.STORAGE_CONTAINER_NAME || 'resumes';
        const blobName = process.env.RESUME_BLOB_NAME || 'Jake_Bria_Resume.pdf';

        if (!connectionString) {
            throw new Error('AZURE_STORAGE_CONNECTION_STRING environment variable not set');
        }

        // Create Blob Service Client from connection string
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        
        // Get container client and blob client
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        context.log(`Downloading blob '${blobName}' from container '${containerName}'`);
        
        // Download the blob
        const downloadBlockBlobResponse = await blockBlobClient.download(0);

        // Convert readable stream to buffer
        const chunks = [];
        for await (const chunk of downloadBlockBlobResponse.readableStreamBody) {
            chunks.push(chunk);
        }
        const resumeBuffer = Buffer.concat(chunks);

        // Return the PDF as a binary response
        context.res = {
            status: 200,
            body: resumeBuffer,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="Jake_Bria_Resume.pdf"',
                'Content-Length': resumeBuffer.length
            },
            isRaw: true
        };
    } catch (error) {
        context.log.error('Error retrieving resume:', error);
        context.res = {
            status: 500,
            body: { error: 'Failed to retrieve resume: ' + error.message },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};
