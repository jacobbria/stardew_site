const { GoogleGenerativeAI } = require('@google/generative-ai');

module.exports = async function (context, req) {
    context.log('ChatBot function triggered');

    try {
        // Get API key from environment variables
        const apiKey = process.env.GEM_API_KEY;
        
        if (!apiKey) {
            throw new Error('GEM_API_KEY environment variable not configured');
        }

        // Extract request body
        const { message, resume, conversationHistory } = req.body;

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

        // Initialize Generative AI client
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Build conversation history with resume context
        const systemPrompt = `You are a helpful assistant answering questions about Jake Bria's resume. 
You have been given the full resume content below. Answer questions ONLY based on the information in this resume.
If a question cannot be answered from the resume, politely explain that the information is not available in the resume provided.

RESUME CONTENT:
${resume}

Always be professional and concise in your responses.`;

        // Prepare messages for the API
        const messages = [
            {
                role: 'user',
                parts: [{ text: systemPrompt }]
            },
            {
                role: 'model',
                parts: [{ text: 'I understand. I will answer questions only based on the resume provided. Go ahead with your questions.' }]
            }
        ];

        // Add conversation history if available
        if (conversationHistory && Array.isArray(conversationHistory)) {
            messages.push(...conversationHistory);
        }

        // Add current user message
        messages.push({
            role: 'user',
            parts: [{ text: message }]
        });

        // Call Gemini API with full conversation context
        const result = await model.generateContent({
            contents: messages
        });

        const responseText = result.response.text();

        context.res = {
            status: 200,
            body: { 
                response: responseText,
                conversationHistory: [
                    ...messages.filter(m => m.role === 'user' || m.role === 'model')
                ]
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

    } catch (error) {
        context.log.error('Error in ChatBot function:', error);
        context.res = {
            status: 500,
            body: { error: 'Failed to process message: ' + error.message },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};
