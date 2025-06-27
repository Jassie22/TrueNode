# True Node - n8n Lead Generation Workflow Setup Guide

## Overview
This guide will help you set up an automated workflow that:
- Finds businesses in West Midlands using Google Places API
- Identifies businesses with low online presence
- Generates personalized emails using Google Gemini AI
- Sends 50 emails on Tuesday, Wednesday, Thursday at 10am
- Respects 28-day gap between contacts
- Complies with UK GDPR requirements

## Prerequisites
- Google Cloud Platform account (for Places API and Gemini API)
- PostgreSQL database
- n8n instance (self-hosted or cloud)
- Your True Node website running (for unsubscribe functionality)

## Part 1: n8n Installation & Setup

### Option A: n8n Cloud (Recommended for beginners)
1. Go to [n8n.cloud](https://n8n.cloud)
2. Sign up for an account
3. Choose a plan (Starter plan should be sufficient)
4. Your n8n instance will be ready in minutes

### Option B: Self-hosted n8n
```bash
# Using Docker (easiest)
docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n

# Or using npm
npm install n8n -g
n8n start
```

## Part 2: Database Setup (PostgreSQL)

### 1. Create PostgreSQL Database
```sql
-- Connect to PostgreSQL and create database
CREATE DATABASE truenode_leads;

-- Use the database
\c truenode_leads;

-- Create leads table
CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    business_name VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    website VARCHAR(255),
    google_place_id VARCHAR(255) UNIQUE,
    rating DECIMAL(2,1),
    total_reviews INTEGER,
    online_presence_score INTEGER, -- 1-10 scale (1 = low presence)
    business_category VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create email campaigns table
CREATE TABLE email_campaigns (
    id SERIAL PRIMARY KEY,
    lead_id INTEGER REFERENCES leads(id),
    email_sent_at TIMESTAMP,
    email_subject VARCHAR(255),
    email_body TEXT,
    gemini_prompt TEXT,
    status VARCHAR(50) DEFAULT 'sent', -- sent, failed, bounced
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create unsubscribed emails table (backup to your website)
CREATE TABLE unsubscribed_emails (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    unsubscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_leads_place_id ON leads(google_place_id);
CREATE INDEX idx_leads_online_presence ON leads(online_presence_score);
CREATE INDEX idx_campaigns_lead_id ON email_campaigns(lead_id);
CREATE INDEX idx_campaigns_sent_at ON email_campaigns(email_sent_at);
CREATE INDEX idx_unsubscribed_email ON unsubscribed_emails(email);
```

### 2. Connection Details for n8n
You'll need these details:
- Host: your PostgreSQL host
- Port: 5432 (default)
- Database: truenode_leads
- Username: your PostgreSQL username
- Password: your PostgreSQL password

## Part 3: API Keys Setup

### Google Places API
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable the Places API:
   - Go to "APIs & Services" > "Library"
   - Search for "Places API"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key
   - Restrict the key to Places API only (recommended)

### Google Gemini API
1. Go to [Google AI Studio](https://aistudio.google.com)
2. Get your API key
3. Or use Vertex AI in Google Cloud Console

## Part 4: n8n Workflow Configuration

### Step 1: Create New Workflow
1. Open your n8n interface
2. Click "Create Workflow"
3. Name it "True Node Lead Generation"

### Step 2: Add Schedule Trigger
1. Add "Schedule Trigger" node
2. Configure:
   - **Trigger Rules**: Custom
   - **Cron Expression**: `0 10 * * 2,3,4` (10am on Tue, Wed, Thu)
   - **Timezone**: Europe/London

### Step 3: Add Google Places Search
1. Add "HTTP Request" node after Schedule Trigger
2. Configure:
   - **Method**: GET
   - **URL**: `https://maps.googleapis.com/maps/api/place/textsearch/json`
   - **Query Parameters**:
     ```
     query: business services West Midlands UK
     key: YOUR_GOOGLE_PLACES_API_KEY
     region: uk
     location: 52.2,-1.8
     radius: 50000
     ```

### Step 4: Add Data Processing
1. Add "Code" node to process Google Places results
2. Configure JavaScript code:

```javascript
// Filter businesses with low online presence
const items = $input.all();
const filteredBusinesses = [];

for (const item of items) {
  const data = item.json;
  
  if (data.results) {
    for (const place of data.results) {
      // Calculate online presence score (1-10, where 1 is lowest)
      let onlinePresenceScore = 10;
      
      // Reduce score based on various factors
      if (!place.website) onlinePresenceScore -= 3;
      if (place.rating < 3.5) onlinePresenceScore -= 2;
      if (place.user_ratings_total < 10) onlinePresenceScore -= 2;
      if (!place.photos || place.photos.length < 3) onlinePresenceScore -= 1;
      
      // Only target businesses with low online presence (score <= 4)
      if (onlinePresenceScore <= 4) {
        filteredBusinesses.push({
          business_name: place.name,
          address: place.formatted_address,
          google_place_id: place.place_id,
          rating: place.rating || 0,
          total_reviews: place.user_ratings_total || 0,
          online_presence_score: onlinePresenceScore,
          business_category: place.types[0] || 'business',
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          website: place.website || null
        });
      }
    }
  }
}

return filteredBusinesses.map(business => ({ json: business }));
```

### Step 5: Check Database for Existing Contacts
1. Add "Postgres" node
2. Configure connection with your database details
3. Set operation to "Execute Query"
4. Query:
```sql
SELECT google_place_id, email_sent_at 
FROM leads l 
LEFT JOIN email_campaigns ec ON l.id = ec.lead_id 
WHERE l.google_place_id = $1 
AND (ec.email_sent_at IS NULL OR ec.email_sent_at < NOW() - INTERVAL '28 days')
```

### Step 6: Get Business Contact Details
1. Add "HTTP Request" node for Google Places Details
2. Configure:
   - **Method**: GET
   - **URL**: `https://maps.googleapis.com/maps/api/place/details/json`
   - **Query Parameters**:
     ```
     place_id: {{$json.google_place_id}}
     fields: name,formatted_phone_number,website,email
     key: YOUR_GOOGLE_PLACES_API_KEY
     ```

### Step 7: Generate Email Content with Gemini
1. Add "Google Gemini" node (or HTTP Request to Gemini API)
2. Configure prompt:

```
You are writing a professional email from True Node, a web development company based in Leamington Spa, UK. 

Generate a personalized email for this business:
- Business Name: {{$json.business_name}}
- Location: {{$json.address}}
- Current online presence score (1-10): {{$json.online_presence_score}}

Email requirements:
- Professional but friendly tone
- Mention specific observations about their online presence
- Offer website development/improvement services
- Keep it under 200 words
- Include True Node contact details
- Must include unsubscribe link: https://www.truenode.co.uk/unsubscribe
- Compliant with UK GDPR

Generate both subject line and email body.
```

### Step 8: Limit Daily Sends
1. Add "Code" node to limit to 50 emails per day
2. JavaScript code:
```javascript
const items = $input.all();
const maxEmailsPerDay = 50;

// Take only first 50 items
const limitedItems = items.slice(0, maxEmailsPerDay);

return limitedItems;
```

### Step 9: Check Unsubscribe List
1. Add "HTTP Request" node
2. Configure:
   - **Method**: GET
   - **URL**: `https://www.truenode.co.uk/api/unsubscribe`
   - **Query Parameters**: `email={{$json.email}}`

### Step 10: Save to Database
1. Add "Postgres" node
2. Configure to insert into leads table:
```sql
INSERT INTO leads (business_name, address, phone, email, website, google_place_id, rating, total_reviews, online_presence_score, business_category, latitude, longitude)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
ON CONFLICT (google_place_id) DO UPDATE SET
  updated_at = CURRENT_TIMESTAMP
RETURNING id;
```

### Step 11: Send Email
1. Add "Send Email" node (Gmail, Outlook, or SMTP)
2. Configure:
   - **From**: info@truenode.co.uk
   - **To**: {{$json.email}}
   - **Subject**: {{$json.generated_subject}}
   - **Body**: {{$json.generated_email}}

### Step 12: Log Email Campaign
1. Add "Postgres" node
2. Configure to insert into email_campaigns table:
```sql
INSERT INTO email_campaigns (lead_id, email_sent_at, email_subject, email_body, gemini_prompt, status)
VALUES ($1, NOW(), $2, $3, $4, 'sent');
```

## Part 5: Error Handling & Monitoring

### Add Error Handling
1. Add "If" nodes to handle errors
2. Add "Set" nodes to log errors
3. Add notification nodes for critical failures

### Add Monitoring
1. Create a separate workflow for monitoring
2. Check daily email counts
3. Monitor bounce rates
4. Track unsubscribe rates

## Part 6: Testing

### Test Individual Nodes
1. Test Google Places API connection
2. Test database connections
3. Test Gemini API
4. Test email sending

### Test Complete Workflow
1. Run with small dataset first
2. Check database entries
3. Verify emails are being sent
4. Test unsubscribe functionality

## Part 7: Compliance & Best Practices

### GDPR Compliance
- ✅ Unsubscribe functionality implemented
- ✅ Clear purpose of data collection
- ✅ Contact information provided
- ✅ Option to request data deletion

### Email Best Practices
- Use professional email address
- Personalize each email
- Respect unsubscribe requests immediately
- Monitor bounce rates
- Don't send too frequently

### Rate Limiting
- Limit API calls to respect quotas
- Spread emails throughout the day
- Monitor for IP blocks

## Workflow JSON Configuration

Once you've set up all nodes, you can export/import this workflow configuration:

```json
{
  "name": "True Node Lead Generation",
  "nodes": [
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "cronExpression",
              "cronExpression": "0 10 * * 2,3,4"
            }
          ]
        }
      },
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1,
      "position": [240, 300]
    }
    // ... more nodes configuration
  ],
  "connections": {
    "Schedule Trigger": {
      "main": [
        [
          {
            "node": "Google Places Search",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
    // ... more connections
  }
}
```

## Troubleshooting

### Common Issues
1. **API Key Errors**: Check API keys are correct and have proper permissions
2. **Database Connection**: Verify PostgreSQL connection details
3. **Email Delivery**: Check SMTP settings and authentication
4. **Rate Limits**: Monitor API quotas and implement delays

### Monitoring
- Set up alerts for workflow failures
- Monitor email delivery rates
- Track database growth
- Check API usage

## Next Steps
1. Set up all prerequisites
2. Configure the workflow step by step
3. Test thoroughly with small datasets
4. Deploy and monitor
5. Scale up gradually

## Support
For issues with this workflow:
- Email: info@truenode.co.uk
- Phone: +44 7894 045027

Remember to test everything thoroughly before going live! 