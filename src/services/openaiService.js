const OpenAI = require('openai');

class OpenAIService {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        // System message to control AI behavior
        this.systemMessage = `You are a helpful customer service representative for Rouqe Golf. 
        Keep responses brief and focused on customer service topics.
        Only discuss public information about products, shipping, and general policies.
        Never disclose sensitive information about:
        - Manufacturing locations
        - Profit margins
        - Sales numbers
        - Internal operations
        - Employee information
        - Supplier relationships
        - Unreleased products
        
        If asked about these topics, politely decline to provide specifics.
        
        Limit responses to 2-3 short paragraphs maximum.
        Always maintain a professional, friendly tone.`;
    }

    async generateResponse(userQuestion) {
        try {
            const completion = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: this.systemMessage },
                    { role: "user", content: userQuestion }
                ],
                max_tokens: 150, // Limit response length
                temperature: 0.7,
                presence_penalty: 0.6 // Discourage repetitive responses
            });

            return completion.choices[0].message.content;
        } catch (error) {
            console.error('OpenAI service error:', error);
            throw error;
        }
    }
}

module.exports = new OpenAIService(); 
