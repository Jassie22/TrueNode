# Automated Booking System Setup Guide

## Overview
Your booking system now integrates with Calendly to provide automated calendar management. When users book a consultation, it will be automatically added to your calendar with all the project details pre-filled.

## Current Features
✅ Custom booking page with your branding  
✅ Project details collection (type, budget, timeline)  
✅ Automatic Calendly integration  
✅ Email notifications with booking details  
✅ Pre-filled customer information  

## Calendly Setup Required

### 1. Configure Custom Questions in Calendly
Log into your Calendly account and add these custom questions to your "30min" event type:

1. **Phone Number** (Answer Key: `a1`)
   - Question: "What's your phone number?"
   - Type: Text input
   - Optional

2. **Company** (Answer Key: `a2`)
   - Question: "What company do you represent?"
   - Type: Text input
   - Optional

3. **Project Type** (Answer Key: `a3`)
   - Question: "What type of project are you interested in?"
   - Type: Multiple choice
   - Options: Website Development, App Development, AI Integration, Data Analysis, Branding, Ecommerce, Other

4. **Budget Range** (Answer Key: `a4`)
   - Question: "What's your project budget range?"
   - Type: Multiple choice
   - Options: Under £5,000, £5,000 - £10,000, £10,000 - £25,000, £25,000 - £50,000, Over £50,000

5. **Timeline** (Answer Key: `a5`)
   - Question: "What's your preferred timeline?"
   - Type: Multiple choice
   - Options: ASAP, 1-3 months, 3-6 months, 6+ months, Just exploring

6. **Project Details** (Answer Key: `a6`)
   - Question: "Please describe your project in detail"
   - Type: Long text
   - Optional

### 2. Enable Integrations (Optional)
- **Google Calendar**: Already integrated through Calendly
- **Email Notifications**: Configure your preferred notification settings
- **Meeting Links**: Set up automatic Google Meet link generation

## How It Works

### User Journey:
1. **Project Information**: User fills out project type, budget, timeline, and description
2. **Contact Details**: User provides name, email, and phone
3. **Schedule Selection**: Calendly widget loads with pre-filled information
4. **Automatic Booking**: Meeting is added to both calendars
5. **Notifications**: Both parties receive email confirmations

### Automatic Data Flow:
1. Custom booking form collects detailed project information
2. Data is passed to Calendly using prefill parameters
3. When meeting is scheduled, Calendly sends confirmation
4. Additional project details are emailed to you separately
5. All information is automatically organized for your review

## Email Notifications
You'll receive two emails per booking:
1. **Calendly Confirmation**: Standard meeting details and calendar invite
2. **Project Details Email**: Comprehensive project information from the custom form

## Testing the System
1. Visit `/booking` on your website
2. Fill out a test booking with sample project details
3. Complete the Calendly scheduling process
4. Verify you receive both notification emails
5. Check that the meeting appears in your calendar

## Customization Options

### Booking Configuration
All settings are centralized in `src/config/booking.ts`:
- Calendly URL
- Custom field mappings
- Email endpoints
- Time slots
- Business hours

### Styling
The booking page uses your existing design system and can be customized in `src/app/booking/page.tsx`.

## Benefits of This System
- **Professional Experience**: Custom branded booking page
- **Automated Scheduling**: No manual calendar management
- **Complete Information**: Project details collected upfront
- **Organized Workflow**: All booking data in one place
- **Time Saving**: Automated confirmations and reminders

## Troubleshooting

### If Calendly widget doesn't load:
- Check that your Calendly URL is correct in the configuration
- Ensure Calendly scripts are loading properly
- Verify your Calendly event is set to "Public"

### If custom questions don't populate:
- Confirm the answer keys (a1, a2, etc.) match in Calendly
- Check that custom questions are added to the correct event type

### If email notifications aren't working:
- Verify the FormSubmit endpoint is configured correctly
- Check your spam folder for notifications
- Ensure the notification email address is correct

## Security & Privacy
- All data is transmitted securely via HTTPS
- Calendly handles data according to their privacy policy
- Email notifications use FormSubmit's secure service
- No sensitive data is stored on your website

## Future Enhancements
Consider these potential improvements:
- Payment integration for consultation fees
- Automated meeting preparation emails
- Calendar sync with project management tools
- Custom booking confirmation pages
- Multi-language support

Your automated booking system is now ready to streamline your consultation scheduling process! 