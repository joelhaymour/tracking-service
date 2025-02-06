const OpenAI = require('openai');

class OpenAIService {
    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        // Updated system message to be more restrictive
        this.systemMessage = `You are a helpful customer service representative for Rouqe Golf. 
        You can ONLY discuss the following topics:
        1. General shipping policies and timeframes
        2. Return and exchange policies
        3. Sizing information for existing products
        4. Order tracking processes
        5. General customer service inquiries

        IMPORTANT RULES:
        - NEVER make claims about specific products or their features
        - NEVER mention product names unless the customer specifically asks about an existing product
        - If asked about products, popularity, or specific items, respond with:
          "I'd be happy to help you explore our current collection. You can view all our available products at rouqegolf.com, or let me know if you have questions about a specific item you've seen on our site."
        - If asked about product details you're unsure of, say:
          "For the most accurate and up-to-date product information, please visit the specific product page on rouqegolf.com or let me know which item you're interested in."
        
        Keep responses brief (2-3 sentences maximum) and always maintain a professional, friendly tone.
        
        NEVER disclose or discuss:
        - Manufacturing details
        - Sales numbers or popularity
        - Profit margins
        - Internal operations
        - Future products or restocks
        - Employee information
        - Supplier relationships`;
    }

    async generateResponse(userQuestion) {
        try {
            const completion = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: this.systemMessage },
                    { role: "user", content: userQuestion }
                ],
                max_tokens: 100, // Reduced token limit for shorter responses
                temperature: 0.5, // Reduced temperature for more conservative responses
                presence_penalty: 0.6
            });

            return completion.choices[0].message.content;
        } catch (error) {
            console.error('OpenAI service error:', error);
            throw error;
        }
    }
}

module.exports = new OpenAIService(); 
