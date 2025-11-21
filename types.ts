export enum PostStatus {
  IDLE = 'IDLE',
  RESEARCHING = 'RESEARCHING',
  TOPIC_SELECTION = 'TOPIC_SELECTION', // New Step
  GENERATING_IMAGE = 'GENERATING_IMAGE',
  WRITING = 'WRITING',
  CONNECTING_WP = 'CONNECTING_WP',
  DRAFTING = 'DRAFTING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface WordPressSettings {
  siteUrl: string;
  username: string;
  appPassword: string;
  isConnected: boolean;
}

export interface ResearchSource {
  title: string;
  uri: string;
}

export interface SuggestedTopic {
  title: string;
  rationale: string;
}

export interface TrendAnalysis {
  sentiment: 'positive' | 'neutral' | 'negative';
  key_events: string[];
  sources_news: string[];
  sources_social: string[];
  suggested_topics: SuggestedTopic[];
}

export interface ResearchResult {
  summary: string;
  sources: ResearchSource[];
  trendAnalysis: TrendAnalysis;
}

export interface GeneratedPost {
  title: string;
  content: string; // HTML content
  researchSummary: string;
  sources: ResearchSource[];
  featuredImage?: string; // Base64 data URI
  wordpressLink?: string;
}

export interface BlogPostRecord {
  id: string;
  topic: string;
  date: string;
  status: 'Draft' | 'Published' | 'Scheduled';
  wordpressId?: number;
}