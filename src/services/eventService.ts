import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  orderBy, 
  Timestamp, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { uploadImage } from '../lib/uploadImage';
import { 
  EventDocument, 
  EventCategory, 
  EventType, 
  EventStatus, 
  EventGeoCoordinates 
} from '../types/firestore';

/**
 * ============================================================================
 * EVENT SERVICE: FIRESTORE & IMGBB INTEGRATION
 * ============================================================================
 * Demonstrates the full integration pipeline:
 * 1. Image upload to ImgBB -> CDN direct URL
 * 2. Firestore Document construction with strong typing
 * 3. Persistence into the `events` collection with atomic timestamps
 */

export interface CreateEventInput {
  title: string;
  slug?: string;
  shortSummary: string;
  descriptionMarkdown: string;
  category: EventCategory;           // 'upcoming' | 'past' | 'video_library'
  eventType: EventType;              // 'rally' | 'townhall' | 'youth_summit' | etc.
  status?: EventStatus;
  isFeatured?: boolean;
  
  startDate: Date | string;
  endDate?: Date | string;
  doorsOpenTime?: string;
  
  isOnline?: boolean;
  locationName: string;
  venueAddress?: string;
  county?: string;
  coordinates?: EventGeoCoordinates;
  
  // Optional video library fields
  videoUrl?: string;
  videoDurationSeconds?: number;
  
  capacity?: number;
  rsvpRequired?: boolean;
  registrationLink?: string;
  
  createdBy: string;                 // Admin / Coordinator User ID
}

export interface CreateEventResult {
  success: boolean;
  eventId: string;
  imageUrl: string;
  event: Partial<EventDocument>;
}

/**
 * Utility to generate an SEO-friendly slug from an event title
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Core Integration Function:
 * Takes text event details and a raw image file, uploads the banner to ImgBB,
 * and saves the completed document to the Firestore `events` collection.
 *
 * @param input - Text details for the event
 * @param imageFile - Raw image file (JPEG/PNG/WebP) for the event banner flyer
 * @returns Result object containing the Firestore document ID and ImgBB image URL
 */
export async function createNewEvent(
  input: CreateEventInput,
  imageFile: File | Blob
): Promise<CreateEventResult> {
  try {
    // ------------------------------------------------------------------------
    // Step 1: Validate input parameters
    // ------------------------------------------------------------------------
    if (!input.title || !input.shortSummary || !input.locationName) {
      throw new Error('Missing required event fields: title, shortSummary, and locationName are required.');
    }

    if (!imageFile) {
      throw new Error('An event banner flyer image file is required.');
    }

    // ------------------------------------------------------------------------
    // Step 2: Upload flyer image to ImgBB CDN
    // ------------------------------------------------------------------------
    const customImageSlug = slugify(input.title) + '-' + Date.now();
    
    // Upload file and await the direct CDN image URL
    const fileToUpload = imageFile instanceof File ? imageFile : new File([imageFile], `${customImageSlug}.jpg`, { type: 'image/jpeg' });
    const hostedBannerUrl = await uploadImage(fileToUpload);

    // ------------------------------------------------------------------------
    // Step 3: Format Timestamps & Document Payload
    // ------------------------------------------------------------------------
    const eventsCollectionRef = collection(db, 'events');
    const newEventDocRef = doc(eventsCollectionRef); // Pre-generates the unique Firestore document ID

    const startTimestamp = input.startDate instanceof Date 
      ? Timestamp.fromDate(input.startDate) 
      : Timestamp.fromDate(new Date(input.startDate));

    const endTimestamp = input.endDate 
      ? (input.endDate instanceof Date ? Timestamp.fromDate(input.endDate) : Timestamp.fromDate(new Date(input.endDate)))
      : undefined;

    const eventPayload: Omit<EventDocument, 'createdAt' | 'updatedAt'> & {
      createdAt: any;
      updatedAt: any;
    } = {
      id: newEventDocRef.id,
      title: input.title.trim(),
      slug: input.slug ? slugify(input.slug) : slugify(input.title),
      shortSummary: input.shortSummary.trim(),
      descriptionMarkdown: input.descriptionMarkdown || '',
      category: input.category || 'upcoming',
      eventType: input.eventType || 'townhall',
      status: input.status || 'published',
      isFeatured: input.isFeatured ?? false,
      
      startDate: startTimestamp,
      ...(endTimestamp && { endDate: endTimestamp }),
      ...(input.doorsOpenTime && { doorsOpenTime: input.doorsOpenTime }),
      
      isOnline: input.isOnline ?? false,
      locationName: input.locationName.trim(),
      ...(input.venueAddress && { venueAddress: input.venueAddress.trim() }),
      ...(input.county && { county: input.county }),
      ...(input.coordinates && { coordinates: input.coordinates }),
      
      // ImgBB Hosted CDN URL
      bannerImageUrl: hostedBannerUrl,
      thumbnailImageUrl: hostedBannerUrl, // ImgBB provides direct optimized access
      galleryImageUrls: [],
      
      // Video Library Attributes
      ...(input.videoUrl && { videoUrl: input.videoUrl }),
      ...(input.videoDurationSeconds && { videoDurationSeconds: input.videoDurationSeconds }),
      
      capacity: input.capacity || 0,
      registeredCount: 0,
      rsvpRequired: input.rsvpRequired ?? false,
      ...(input.registrationLink && { registrationLink: input.registrationLink }),
      
      createdBy: input.createdBy,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // ------------------------------------------------------------------------
    // Step 4: Write Document to Cloud Firestore
    // ------------------------------------------------------------------------
    await setDoc(newEventDocRef, eventPayload);

    return {
      success: true,
      eventId: newEventDocRef.id,
      imageUrl: hostedBannerUrl,
      event: {
        ...eventPayload,
        id: newEventDocRef.id,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create event: ${error.message}`);
    }
    throw new Error('An unknown error occurred while creating the event.');
  }
}

/**
 * Query helper to fetch events by category (e.g. 'upcoming', 'past', or 'video_library')
 */
export async function getEventsByCategory(category: EventCategory): Promise<EventDocument[]> {
  try {
    const eventsRef = collection(db, 'events');
    const q = query(
      eventsRef,
      where('category', '==', category),
      where('status', '==', 'published'),
      orderBy('startDate', category === 'upcoming' ? 'asc' : 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EventDocument));
  } catch (error) {
    console.error(`Error querying ${category} events:`, error);
    return [];
  }
}

/**
 * Query helper to fetch single event by ID
 */
export async function getEventById(eventId: string): Promise<EventDocument | null> {
  try {
    const eventDocRef = doc(db, 'events', eventId);
    const snapshot = await getDoc(eventDocRef);
    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...snapshot.data() } as EventDocument;
  } catch (error) {
    console.error(`Error fetching event ${eventId}:`, error);
    return null;
  }
}
