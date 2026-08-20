import { Timestamp } from 'firebase/firestore';

/**
 * ============================================================================
 * FIRESTORE DATABASE SCHEMA DEFINITION: KAMAU WA MBIU LEADERSHIP PLATFORM
 * ============================================================================
 * Architecture Strategy:
 * - Direct NoSQL Document Modeling with Google Cloud Firestore
 * - Static & dynamic media assets hosted via ImgBB CDN
 * - High-speed indexing on compound keys (status, date, category)
 */

// ----------------------------------------------------------------------------
// 1. COLLECTION: users
// Path: /users/{userId}
// Description: Membership, administrative privileges, volunteer status, and profiles
// ----------------------------------------------------------------------------

export type UserRole = 
  | 'member' 
  | 'volunteer' 
  | 'coordinator' 
  | 'content_editor' 
  | 'admin' 
  | 'superadmin';

export type MembershipTier = 
  | 'free' 
  | 'supporter' 
  | 'patron' 
  | 'youth_ambassador' 
  | 'diaspora';

export type UserAccountStatus = 
  | 'active' 
  | 'pending_verification' 
  | 'suspended' 
  | 'archived';

export interface UserLocation {
  county?: string;
  constituency?: string;
  ward?: string;
  diasporaCountry?: string;
}

export interface UserDocument {
  id: string;                         // Matches Firebase Auth UID
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  membershipTier: MembershipTier;
  membershipNumber: string;          // e.g. KWM-2026-89412
  status: UserAccountStatus;
  
  // Profile & Media
  avatarUrl?: string;                // Hosted on ImgBB
  bio?: string;
  interests?: string[];              // e.g. ['Youth Empowerment', 'Clean Water', 'Governance']
  
  // Demographics / Location
  location?: UserLocation;
  
  // Badges & Volunteer metadata
  isVerified: boolean;
  volunteerSkills?: string[];
  assignedChapter?: string;
  
  // Auditing & Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt?: Timestamp;
}

// ----------------------------------------------------------------------------
// 2. COLLECTION: events
// Path: /events/{eventId}
// Description: Live rallies, townhalls, youth summits, and on-demand video archives
// ----------------------------------------------------------------------------

export type EventStatus = 
  | 'draft' 
  | 'published' 
  | 'ongoing' 
  | 'completed' 
  | 'cancelled';

export type EventCategory = 
  | 'upcoming' 
  | 'past' 
  | 'video_library';

export type EventType = 
  | 'rally' 
  | 'townhall' 
  | 'community_service' 
  | 'youth_summit' 
  | 'press_conference' 
  | 'fundraiser' 
  | 'livestream' 
  | 'video_archive';

export interface EventGeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface EventDocument {
  id: string;
  title: string;
  slug: string;                      // SEO-friendly URL slug (e.g. 'nairobi-youth-leadership-summit-2026')
  shortSummary: string;
  descriptionMarkdown: string;
  
  // Filtering & Classification
  category: EventCategory;           // 'upcoming' | 'past' | 'video_library'
  eventType: EventType;
  status: EventStatus;
  isFeatured: boolean;
  
  // Date & Scheduling
  startDate: Timestamp;
  endDate?: Timestamp;
  doorsOpenTime?: string;            // e.g. "09:00 AM EAT"
  
  // Physical / Virtual Location
  isOnline: boolean;
  locationName: string;              // e.g. "KICC Tsavo Ballroom" or "YouTube Live"
  venueAddress?: string;
  county?: string;
  coordinates?: EventGeoCoordinates;
  
  // Media & Visual Assets (ImgBB URLs & Video links)
  bannerImageUrl: string;            // Main high-res flyer/hero hosted on ImgBB
  thumbnailImageUrl?: string;        // Optimized card thumbnail
  galleryImageUrls?: string[];       // ImgBB gallery URLs post-event
  
  // Video & Broadcast Assets (For category: 'video_library' or Livestreams)
  videoUrl?: string;                 // YouTube / Vimeo / HLS link
  videoDurationSeconds?: number;     // For video library browsing
  streamEmbedCode?: string;
  recordedSpeechTranscript?: string;
  
  // Attendance & Engagement
  capacity?: number;
  registeredCount: number;
  rsvpRequired: boolean;
  registrationLink?: string;
  
  // Auditing
  createdBy: string;                 // User ID of creator/admin
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ----------------------------------------------------------------------------
// 3. COLLECTION: media_feeds
// Path: /media_feeds/{feedId}
// Description: Dynamic news articles, official announcements, press releases, and photo galleries
// ----------------------------------------------------------------------------

export type MediaFeedType = 
  | 'news' 
  | 'announcement' 
  | 'press_release' 
  | 'gallery_album' 
  | 'speech' 
  | 'op_ed';

export type MediaPublicationStatus = 
  | 'draft' 
  | 'published' 
  | 'archived';

export interface MediaFeedDocument {
  id: string;
  title: string;
  slug: string;
  type: MediaFeedType;
  status: MediaPublicationStatus;
  
  excerpt: string;
  contentMarkdown: string;
  
  // Media Assets (ImgBB URLs)
  featuredImageUrl: string;          // Main cover/hero image from ImgBB
  featuredImageCaption?: string;
  galleryImages?: Array<{
    url: string;                     // ImgBB URL
    caption?: string;
    altText?: string;
  }>;
  
  // Metadata & Categorization
  authorName: string;
  authorRole?: string;               // e.g. "Communications Director"
  authorAvatarUrl?: string;
  tags: string[];                    // e.g. ['Infrastructure', 'Youth', 'Kiambu']
  isPinned: boolean;
  
  // Engagement
  readTimeMinutes?: number;
  viewCount: number;
  sharesCount: number;
  
  // Dates
  publishedAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ----------------------------------------------------------------------------
// 4. COLLECTION: system_content
// Path: /system_content/{contentKey}
// Description: Editable singleton documents for Platform Vision, About, Core Pillars, and Settings
// Recommended Document IDs: 'vision_mission', 'about_kamau', 'pillars_agenda', 'platform_settings'
// ----------------------------------------------------------------------------

export interface StrategicPillar {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;                  // Lucide icon identifier
  description: string;
  metricLabel?: string;
  metricValue?: string;
  imageUrl?: string;                 // ImgBB URL
}

export interface LeadershipMilestone {
  year: string;
  title: string;
  description: string;
  achievementBadge?: string;
}

export interface SystemContentDocument {
  id: string;                        // e.g. 'vision_mission' | 'about_kamau' | 'pillars_agenda'
  sectionKey: string;
  title: string;
  subtitle: string;
  
  // Primary Text & Quotes
  mainContentMarkdown: string;
  leadQuote?: {
    text: string;
    author: string;
    role: string;
  };
  
  // Visual Assets (ImgBB)
  heroImageUrl?: string;
  portraitImageUrl?: string;
  supportingImageUrls?: string[];
  
  // Structured Sub-data
  pillars?: StrategicPillar[];
  milestones?: LeadershipMilestone[];
  coreValues?: Array<{
    title: string;
    description: string;
  }>;
  
  // Key Platform Statistics
  stats?: Array<{
    label: string;
    value: string;
    suffix?: string;
  }>;
  
  // Auditing
  lastUpdatedBy: string;
  updatedAt: Timestamp;
}
