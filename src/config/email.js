// Email configuration for EmailJS
// Replace these values with your actual EmailJS credentials

export const EMAIL_CONFIG = {
  SERVICE_ID: 'your_service_id', // Replace with your EmailJS service ID
  TEMPLATE_ID: 'your_template_id', // Replace with your EmailJS template ID
  PUBLIC_KEY: 'your_public_key', // Replace with your EmailJS public key
};

// Email template for EmailJS
// Create this template in your EmailJS dashboard with these variables:
export const EMAIL_TEMPLATE_VARIABLES = {
  to_name: '{{to_name}}',
  to_email: '{{to_email}}',
  player_id: '{{player_id}}',
  player_name: '{{player_name}}',
  tournament_name: '{{tournament_name}}',
  tournament_dates: '{{tournament_dates}}',
  venue: '{{venue}}',
  events: '{{events}}',
  total_fee: '{{total_fee}}',
  payment_status: '{{payment_status}}',
  instructions: '{{instructions}}',
  admit_card_link: '{{admit_card_link}}'
};

// Sample EmailJS template content:
/*
Subject: SMAASH Tournament Registration Confirmed - {{player_name}}

Dear {{to_name}},

Congratulations! Your registration for {{tournament_name}} has been confirmed.

Registration Details:
- Player Name: {{player_name}}
- Player ID: {{player_id}}
- Events: {{events}}
- Total Fee: {{total_fee}}
- Payment Status: {{payment_status}}

Tournament Information:
- Dates: {{tournament_dates}}
- Venue: {{venue}}

Your admit card is ready! Access it here: {{admit_card_link}}

Important Instructions:
{{instructions}}

Best of luck for the tournament!

SMAASH Tournament Organizing Committee
Contact: 7052416803, 9839174810, 97953100021
*/