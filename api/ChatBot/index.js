module.exports = async function (context, req) {
    context.log('ChatBot test function triggered');
    
    try {
        // Test 1: Check if API key is available
        const apiKey = process.env.GEMINI_API_KEY;
        const hasApiKey = !!apiKey;
        
    context.log('API Key present:', hasApiKey);
        
        if (!hasApiKey) {
            context.log('NO API KEY FOUND');
            context.res = {
            context.res = {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
                body: { 
                    success: false,
                    message: 'GEMINI_API_KEY environment variable not found',
                    hasApiKey: false
                }
            };
            return;
        }
        
        context.log('API KEY FOUND - length:', apiKey.length);
        
        context.res = {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: { 
                success: true,
                message: 'API key found successfully',
                hasApiKey: true,
                keyLength: apiKey.length
            }
        };
        
    } catch (error) {
        context.log('Runtime ERROR:', error.message);
        context.res = {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
            body: { 
                success: false,
                message: 'Error: ' + error.message
            }
        };
    }
};
