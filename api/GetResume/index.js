const { BlobServiceClient } = require('@azure/storage-blob');

module.exports = async function (context, req) {
    context.log('GetResume function triggered');

    try {
        // Read configuration from environment variables
        const connectionString = process.env.AZ_STR_CONN_STR;
        const containerName = process.env.STORAGE_CONTAINER_NAME || 'resumes';
        const blobName = process.env.RESUME_BLOB_NAME || 'Jake_Bria_Resume.pdf';

        if (!connectionString) {
            throw new Error('AZURE_STORAGE_CONNECTION_STRING not configured');
        }

        // Connect to Azure Blob Storage
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Download blob content to a Buffer (simplest in Node)
        context.log(`Downloading blob '${blobName}' from container '${containerName}'`);
        const resumeBuffer = await blockBlobClient.downloadToBuffer();

        // Return the PDF as a binary response
        context.res = {
            status: 200,
            body: resumeBuffer,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="Jake_Bria_Resume.pdf"',
                'Content-Length': resumeBuffer.length,
                'Cache-Control': 'no-store'
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
