export type UserRole = 'student' | 'business' | 'landlord' | 'employer' | 'admin';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: UserRole;
  university?: string;
  course?: string;
  year?: string;
  skills?: string[];
  bio?: string;
  avatarUrl?: string;
  cvUrl?: string;
  createdAt: any;
}

export interface AccommodationListing {
  id: string;
  title: string;
  price: string;
  distance: string;
  location: string;
  images: string[];
  amenities: string[];
  landlordId: string;
  university: string;
  genderPreference?: 'male' | 'female' | 'any';
  description?: string;
  contactInfo?: string;
}

export interface JobListing {
  id: string;
  role: string;
  company: string;
  location: string;
  salary: string;
  type: 'Internship' | 'Part-time' | 'Full-time' | 'Freelance';
  tags: string[];
  description?: string;
  postedAt: any;
  companyLogo?: string;
  isRemote?: boolean;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  price: string;
  location: string;
  rating: number;
  category: string;
  image: string;
  sellerId: string;
  description?: string;
  condition?: 'new' | 'used';
  createdAt: any;
}

export interface EventListing {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  image: string;
  description: string;
  category: string;
  registeredUsers?: string[];
}

export interface BusinessProfile {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  location: string;
  rating: number;
  services: string[];
  contactEmail: string;
  contactPhone: string;
  ownerId: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: any;
  isRead: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  applicantId: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'accepted';
  appliedAt: any;
  resumeUrl?: string;
  coverLetter?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: any;
  link?: string;
}

export interface Review {
  id: string;
  targetId: string; // businessId or accommodationId
  userId: string;
  rating: number;
  comment: string;
  createdAt: any;
}

export interface SavedItem {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'accommodation' | 'marketplace' | 'job' | 'event';
  savedAt: any;
}
