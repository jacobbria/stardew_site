const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async function (context, req) {
    context.log('ChatBot function triggered');
    
    try {
        // Get Gemini API key
        const apiKey = process.env.GEMINI_API_KEY;
        context.log('API Key configured:', !!apiKey);
        
        if (!apiKey) {
            context.log('ERROR: No API key found');
            return {
                status: 400,
                body: JSON.stringify({ error: 'GEMINI_API_KEY not configured' })
            };
        }

        // Extract message and resume from request body
        const { message, resume } = req.body;
        context.log('Message length:', message?.length);
        context.log('Resume length:', resume?.length);

        if (!message) {
            context.log('ERROR: Message is missing');
            return {
                status: 400,
                body: JSON.stringify({ error: 'Message is required' })
            };
        }

        if (!resume) {
            context.log('ERROR: Resume is missing');
            return {
                status: 400,
                body: JSON.stringify({ error: 'Resume content is required' })
            };
        }

        // Initialize Gemini API client
        context.log('Initializing Gemini client...');
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // System prompt with resume context
        const systemPrompt = `You are a helpful assistant answering questions about Jake Bria's resume. 
You have been given the full resume content below. Answer questions ONLY based on the information in this resume.
If a question cannot be answered from the resume, politely explain that the information is not available in the resume provided.
Be concise and professional in your responses.

RESUME CONTENT:
${resume}`;

        // Call Gemini API with the system prompt and user message
        context.log('Calling Gemini API...');
        const result = await model.generateContent([
            systemPrompt,
            `\n\nUser question: ${message}`
        ]);

        context.log('Got response from Gemini');
        const response = await result.response;
        const responseText = response.text();
        context.log('Response text length:', responseText.length);

        return {
            status: 200,
            body: JSON.stringify({ 
                response: responseText
            })
        };

    } catch (error) {
        context.log('ERROR:', error.message);
        context.log('Stack:', error.stack);
        return {
            status: 500,
            body: JSON.stringify({ error: 'Failed to process message: ' + error.message })
        };
    }
};
