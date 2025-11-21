import { CourseData, VideoProvider } from './types';

export const COURSE_CONTENT: CourseData = {
  title: "Monday.com CRM Development Masterclass",
  description: "A comprehensive path from beginner to advanced Monday.com app development, featuring API mastery and framework certification.",
  modules: [
    {
      id: "mod-01",
      title: "Beginner: CRM Fundamentals",
      description: "Master the core structure of Monday.com CRM before writing code.",
      lessons: [
        {
          id: "less-01-01",
          title: "Introduction to Monday.com CRM for Developers",
          description: "A complete overview of the CRM structure (leads, deals, accounts) and how to integrate apps. Understand the unique features like the activities timeline.",
          type: 'video',
          videoId: "2uYCzXhs2t0",
          provider: VideoProvider.YouTube,
          duration: "14:00",
          resources: [
             { title: "Monday.com CRM Product Page", url: "https://monday.com/crm" }
          ]
        },
        {
          id: "less-01-02",
          title: "Complete CRM Tutorial 2025",
          description: "Exhaustive guide covering boards, forms, automations, email sequences, and sales dashboards.",
          type: 'video',
          videoId: "2FI0vkcjB-E",
          provider: VideoProvider.YouTube,
          duration: "43:00"
        },
        {
          id: "less-01-03",
          title: "CRM Comprehensive Guide",
          description: "A text-based deep dive to consolidate your knowledge of CRM features.",
          type: 'article',
          contentUrl: "https://addtocrm.com/how-to-use-crm/monday-crm",
          duration: "15 min read"
        }
      ]
    },
    {
      id: "mod-02",
      title: "Intermediate: API & GraphQL",
      description: "Learn to manipulate Monday.com data programmatically using GraphQL.",
      lessons: [
        {
          id: "less-02-01",
          title: "GraphQL API Quickstart",
          description: "Learn to access the API Playground, authenticate, and make your first query in 5 minutes.",
          type: 'video',
          videoId: "oSDegxHokLo",
          provider: VideoProvider.YouTube,
          duration: "05:00",
          resources: [
            { title: "API Playground", url: "https://monday.com/developers/v2/try-it-yourself" }
          ]
        },
        {
          id: "less-02-02",
          title: "Mastering GraphQL in 15 Minutes",
          description: "Deep dive into complex queries, filtering data, and performing mutations.",
          type: 'video',
          videoId: "uFSPSfVID1g",
          provider: VideoProvider.YouTube,
          duration: "15:00"
        },
        {
          id: "less-02-03",
          title: "Integration Guide & Best Practices",
          description: "Comprehensive guide on OAuth, RESTful patterns in GraphQL, and security.",
          type: 'article',
          contentUrl: "https://www.clarify.ai/blog/integrating-monday-crm-api-a-comprehensive-guide",
          duration: "20 min read"
        },
        {
          id: "less-02-04",
          title: "Integrations Overview",
          description: "Explore possible integrations and architectural patterns.",
          type: 'article',
          contentUrl: "https://www.subscriptionflow.com/2024/07/monday-com-integrations-a-comprehensive-guide/",
          duration: "10 min read"
        }
      ]
    },
    {
      id: "mod-03",
      title: "Advanced: App Development Framework",
      description: "Build native Monday.com apps, custom views, and widgets using the SDK.",
      lessons: [
        {
          id: "less-03-01",
          title: "Monday Code & App Deployment",
          description: "How to use the CLI, manage environment variables, and deploy your app backend.",
          type: 'video',
          videoId: "tXAKtabsXqM",
          provider: VideoProvider.YouTube,
          duration: "34:00",
          resources: [
            { title: "Monday Code Docs", url: "https://developer.monday.com/apps/docs/monday-code" }
          ]
        },
        {
          id: "less-03-02",
          title: "Apps Framework Builder's Guide",
          description: "Webinar on building native tools, handling auth without keys, and dashboard widgets.",
          type: 'video',
          videoId: "lu_0Ize4hm0",
          provider: VideoProvider.YouTube,
          duration: "60:00"
        },
        {
          id: "less-03-03",
          title: "Official Framework Documentation",
          description: "The bible for Monday developers. Architecture, Building Blocks, and Design System.",
          type: 'documentation',
          contentUrl: "https://developer.monday.com/apps",
          duration: "Reference"
        },
        {
          id: "less-03-04",
          title: "GraphQL API Reference",
          description: "Complete list of queries and mutations.",
          type: 'documentation',
          contentUrl: "https://developer.monday.com/api-reference/",
          duration: "Reference"
        },
        {
          id: "less-03-05",
          title: "Community Q&A: Sales CRM API",
          description: "Real-world discussion on specific CRM API limitations and solutions.",
          type: 'article',
          contentUrl: "https://community.monday.com/t/does-the-sales-crm-have-an-api/41871",
          duration: "5 min read"
        }
      ]
    },
    {
      id: "mod-04",
      title: "Certifications & Career",
      description: "Get certified and join the partner program.",
      lessons: [
        {
          id: "less-04-01",
          title: "Official Monday.com Certifications",
          description: "Guide to API, Sales CRM, and Core certifications.",
          type: 'documentation',
          contentUrl: "https://support.monday.com/hc/en-us/articles/18394717181714-Get-certified-by-monday-com",
          duration: "10 min read"
        },
        {
          id: "less-04-02",
          title: "Developer Partner Program",
          description: "Benefits of becoming a partner: Sandbox accounts, support, and revenue share.",
          type: 'article',
          contentUrl: "https://partners.monday.com/roles/developer/",
          duration: "5 min read"
        },
        {
          id: "less-04-03",
          title: "Tella Academy Certifications",
          description: "Alternative certification path with portfolio building.",
          type: 'article',
          contentUrl: "https://www.tella.com/certification/monday",
          duration: "Flexible"
        }
      ]
    }
  ]
};