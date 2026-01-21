const { BlobServiceClient } = require('@azure/storage-blob');

module.exports = async function (context, req) {
    context.log('Hello, API');

    try {
        context.res = {
            status: 200,
            body: { message: 'API is working!' },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        context.log.error('Error:', error);
        context.res = {
            status: 500,
            body: { error: 'API failed' },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};
