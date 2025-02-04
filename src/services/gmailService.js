const { google } = require('googleapis');

class GmailService {
    constructor() {
        this.oauth2Client = new google.auth.OAuth2(
            process.env.GMAIL_CLIENT_ID,
            process.env.GMAIL_CLIENT_SECRET,
            process.env.GMAIL_REDIRECT_URI
        );
        
        this.oauth2Client.setCredentials({
            refresh_token: process.env.GMAIL_REFRESH_TOKEN
        });
        
        this.gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
    }

    async sendCollaborationEmail(data) {
        try {
            const { name, email, instagram, tiktok, twitter, reason } = data;

            // Format social media links with proper validation
            const formatHandle = (handle, platform) => {
                if (!handle) return 'Not provided';
                handle = handle.trim().replace('@', '');
                switch(platform) {
                    case 'instagram': return `https://instagram.com/${handle}`;
                    case 'tiktok': return `https://tiktok.com/@${handle}`;
                    case 'twitter': return `https://twitter.com/${handle}`;
                }
            };

            const instagramLink = formatHandle(instagram, 'instagram');
            const tiktokLink = formatHandle(tiktok, 'tiktok');
            const twitterLink = formatHandle(twitter, 'twitter');

            // Create email content
            const emailContent = `
                New Collaboration Request

                Name: ${name}
                Email: ${email}

                Social Media Profiles:
                Instagram: ${instagramLink}
                TikTok: ${tiktokLink}
                X (Twitter): ${twitterLink}

                Reason for Collaboration:
                ${reason}
            `;

            // Encode the email in base64
            const encodedEmail = Buffer.from(
                `To: info@rouqesupport.com\n` +
                `Subject: Collaboration Request - ${name}\n` +
                `Content-Type: text/plain; charset=utf-8\n\n` +
                `${emailContent}`
            ).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

            // Send the email
            await this.gmail.users.messages.send({
                userId: 'me',
                requestBody: {
                    raw: encodedEmail
                }
            });

            return true;
        } catch (error) {
            console.error('Gmail service error:', error);
            throw error;
        }
    }
}

module.exports = new GmailService(); 
