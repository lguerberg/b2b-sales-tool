import { GetCampaignDetailsResponse } from '@api/infrastructure/schemas/campaign/get-campaign-details.schema'

export const mockCampaigns: GetCampaignDetailsResponse[] = [
  {
    id: 'campaign_001',
    name: 'Summer Clearance Sale',
    description: 'Promote summer clearance with up to 70% off.',
    status: 'PENDING',
    group: {
      name: 'Sales Team',
      description: 'Handles all sales-related campaigns.',
    },
    emails: [
      {
        subject: 'Don’t Miss Our Summer Clearance Sale!',
        message: 'Huge discounts on summer items. Limited time offer!',
        status: 'SENT',
      },
      {
        subject: 'Final Days of the Summer Clearance!',
        message: 'Sale ends soon! Get the best deals now.',
        status: 'PENDING',
      },
    ],
    analytics: {
      emailsSentCount: 1500,
      emailsOpenedCount: 1200,
      emailsFailedCount: 10,
      emailsClickedCount: 800,
      meetingsScheduledCount: 5,
    },
  },
  {
    id: 'campaign_002',
    name: 'New Product Launch',
    description: 'Introducing our latest product line.',
    status: 'PENDING',
    group: {
      name: 'Product Launch Group',
      description: 'Responsible for launching new products.',
    },
    emails: [
      {
        subject: 'Exciting New Products Just Launched!',
        message: 'Check out our new product range and enjoy special launch offers.',
        status: 'SENT',
      },
    ],
    analytics: {
      emailsSentCount: 5000,
      emailsOpenedCount: 3000,
      emailsFailedCount: 50,
      emailsClickedCount: 2000,
      meetingsScheduledCount: 15,
    },
  },
  {
    id: 'campaign_003',
    name: 'Black Friday Deals',
    description: 'Massive discounts for Black Friday.',
    status: 'CREATING',
    group: {
      name: 'Marketing Group',
      description: 'Handles all marketing campaigns and promotions.',
    },
    emails: [
      {
        subject: 'Black Friday Deals Are Here!',
        message: 'Unbelievable discounts on all products. Limited stock!',
        status: 'scheduled',
      },
    ],
    analytics: {
      emailsSentCount: 20000,
      emailsOpenedCount: 15000,
      emailsFailedCount: 100,
      emailsClickedCount: 12000,
      meetingsScheduledCount: 25,
    },
  },
  {
    id: 'campaign_004',
    name: 'End of Year Review',
    description: 'Review and insights from the past year.',
    status: 'PENDING',
    group: {
      name: 'Strategy Team',
      description: 'Develops strategic insights and reviews.',
    },
    emails: [
      {
        subject: 'Annual Review: Highlights of the Year',
        message: 'Get insights into our performance and key milestones this year.',
        status: 'SENT',
      },
    ],
    analytics: {
      emailsSentCount: 1000,
      emailsOpenedCount: 800,
      emailsFailedCount: 5,
      emailsClickedCount: 600,
      meetingsScheduledCount: 10,
    },
  },
  {
    id: 'campaign_005',
    name: 'Holiday Greetings',
    description: 'Send holiday greetings and best wishes.',
    status: 'SENT',
    group: {
      name: 'Community Outreach',
      description: 'Engages with the community and sends seasonal messages.',
    },
    emails: [
      {
        subject: 'Season’s Greetings and Best Wishes!',
        message: 'Wishing you a joyful holiday season and a happy new year.',
        status: 'PENDING',
      },
    ],
    analytics: {
      emailsSentCount: 0,
      emailsOpenedCount: 0,
      emailsFailedCount: 0,
      emailsClickedCount: 0,
      meetingsScheduledCount: 0,
    },
  },
  {
    id: 'campaign_006',
    name: 'Monthly Newsletter',
    description: 'Monthly updates and news.',
    status: 'SENT',
    group: {
      name: 'Content Team',
      description: 'Creates and distributes newsletters and content.',
    },
    emails: [
      {
        subject: 'June Newsletter: Latest Updates and News',
        message: 'Catch up on all the latest news and updates for June.',
        status: 'SENT',
      },
      {
        subject: 'June Newsletter: Special Features Inside',
        message: 'Read about our special features and exclusive content.',
        status: 'PENDING',
      },
    ],
    analytics: {
      emailsSentCount: 3000,
      emailsOpenedCount: 2500,
      emailsFailedCount: 20,
      emailsClickedCount: 1800,
      meetingsScheduledCount: 8,
    },
  },
  {
    id: 'campaign_007',
    name: 'Customer Feedback Survey',
    description: 'Gather feedback to improve services.',
    status: 'SENDING',
    group: {
      name: 'Customer Service',
      description: 'Handles customer feedback and service improvements.',
    },
    emails: [
      {
        subject: 'We Value Your Feedback!',
        message: 'Help us improve by taking our quick survey.',
        status: 'SENT',
      },
      {
        subject: 'Reminder: Complete Our Feedback Survey',
        message: 'Your feedback is important to us. Please complete our survey.',
        status: 'SENT',
      },
    ],
    analytics: {
      emailsSentCount: 800,
      emailsOpenedCount: 650,
      emailsFailedCount: 10,
      emailsClickedCount: 500,
      meetingsScheduledCount: 2,
    },
  },
  {
    id: 'campaign_008',
    name: 'Flash Sale Alert',
    description: 'Announce a limited-time flash sale.',
    status: 'PENDING',
    group: {
      name: 'Sales Team',
      description: 'Handles all sales-related campaigns.',
    },
    emails: [
      {
        subject: 'Flash Sale Starts Now!',
        message: 'Get up to 60% off for the next 24 hours.',
        status: 'SENT',
      },
    ],
    analytics: {
      emailsSentCount: 12000,
      emailsOpenedCount: 9000,
      emailsFailedCount: 30,
      emailsClickedCount: 7500,
      meetingsScheduledCount: 12,
    },
  },
  {
    id: 'campaign_009',
    name: 'Webinar Invite',
    description: 'Invite customers to an upcoming webinar.',
    status: 'SENDING',
    group: {
      name: 'Education Team',
      description: 'Provides educational content and training.',
    },
    emails: [
      {
        subject: 'Join Our Upcoming Webinar!',
        message: 'Learn about the latest trends and best practices in our upcoming webinar.',
        status: 'SENT',
      },
      {
        subject: 'Webinar Reminder',
        message: 'Don’t forget to join us for the webinar tomorrow.',
        status: 'PENDING',
      },
    ],
    analytics: {
      emailsSentCount: 2500,
      emailsOpenedCount: 2000,
      emailsFailedCount: 15,
      emailsClickedCount: 1600,
      meetingsScheduledCount: 18,
    },
  },
  {
    id: 'campaign_010',
    name: 'Special VIP Offers',
    description: 'Exclusive offers for VIP customers.',
    status: 'SENT',
    group: {
      name: 'Loyalty Program',
      description: 'Manages VIP and loyalty programs.',
    },
    emails: [
      {
        subject: 'Exclusive Offers Just for You!',
        message: 'As a valued VIP customer, enjoy these special offers.',
        status: 'SENT',
      },
    ],
    analytics: {
      emailsSentCount: 500,
      emailsOpenedCount: 450,
      emailsFailedCount: 2,
      emailsClickedCount: 300,
      meetingsScheduledCount: 5,
    },
  },
]
