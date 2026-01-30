const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async function (context, req) {
    try {
        // Get Gemini API key - hardcode it here or set as environment variable
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            return {
                status: 400,
                body: { error: 'GEMINI_API_KEY not configured. Please set the environment variable.' },
                headers: { 'Content-Type': 'application/json' }
            };
        }

        // Extract message and resume from request body
        const { message, resume } = req.body;

        if (!message) {
            return {
                status: 400,
                body: { error: 'Message is required' },
                headers: { 'Content-Type': 'application/json' }
            };
        }

        if (!resume) {
            return {
                status: 400,
                body: { error: 'Resume content is required' },
                headers: { 'Content-Type': 'application/json' }
            };
        }

        // Initialize Gemini API client
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
        const result = await model.generateContent([
            systemPrompt,
            `\n\nUser question: ${message}`
        ]);

        const response = await result.response;
        const responseText = response.text();

        return {
            status: 200,
            body: { 
                response: responseText
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

    } catch (error) {
        console.error('ChatBot Function Error:', error);
        return {
            status: 500,
            body: { error: 'Failed to process message: ' + error.message },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};
