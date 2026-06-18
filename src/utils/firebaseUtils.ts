import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  orderBy,
  limit
} from "firebase/firestore";
import { auth } from "../firebase";
import {
  UserProfile,
  AccommodationListing,
  JobListing,
  MarketplaceItem,
  EventListing,
  BusinessProfile,
  Application,
  ChatMessage,
  Notification,
  Review,
  SavedItem
} from "../types";

const db = getFirestore();

// --- User Profile Operations ---
export const createUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  return await setDoc(doc(db, "users", userId), {
    ...data,
    createdAt: Timestamp.now()
  });
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const userDoc = await getDoc(doc(db, "users", userId));
  return userDoc.exists() ? (userDoc.data() as UserProfile) : null;
};

// --- Generic CRUD Factory (Internal) ---
const getAll = async <T>(collectionName: string): Promise<T[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
};

const getById = async <T>(collectionName: string, id: string): Promise<T | null> => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as T) : null;
};

// --- Accommodation ---
export const getAccommodations = () => getAll<AccommodationListing>("accommodation");
export const getAccommodationById = (id: string) => getById<AccommodationListing>("accommodation", id);
export const postAccommodation = (data: Partial<AccommodationListing>) => addDoc(collection(db, "accommodation"), { ...data, createdAt: Timestamp.now() });

// --- Marketplace ---
export const getMarketplaceItems = () => getAll<MarketplaceItem>("marketplace");
export const postMarketplaceItem = async (data: Partial<MarketplaceItem>) => {
  return await addDoc(collection(db, "marketplace"), {
    ...data,
    sellerId: auth.currentUser?.uid,
    createdAt: Timestamp.now()
  });
};

// --- Jobs ---
export const getJobs = () => getAll<JobListing>("jobs");
export const postJob = (data: Partial<JobListing>) => addDoc(collection(db, "jobs"), { ...data, postedAt: Timestamp.now() });

// --- Events ---
export const getEvents = () => getAll<EventListing>("events");
export const postEvent = (data: Partial<EventListing>) => addDoc(collection(db, "events"), { ...data, createdAt: Timestamp.now() });

// --- Businesses ---
export const getBusinesses = () => getAll<BusinessProfile>("businesses");
export const postBusiness = (data: Partial<BusinessProfile>) => addDoc(collection(db, "businesses"), { ...data, createdAt: Timestamp.now() });

// --- Applications ---
export const applyForJob = async (jobId: string, applicantData: Partial<Application>) => {
  return await addDoc(collection(db, "applications"), {
    jobId,
    applicantId: auth.currentUser?.uid,
    ...applicantData,
    status: "pending",
    appliedAt: Timestamp.now()
  });
};

export const getApplicationsForJob = async (jobId: string) => {
  const q = query(collection(db, "applications"), where("jobId", "==", jobId));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Application));
};

// --- Messages ---
export const sendMessage = async (receiverId: string, text: string) => {
  return await addDoc(collection(db, "messages"), {
    senderId: auth.currentUser?.uid,
    receiverId,
    text,
    timestamp: Timestamp.now(),
    isRead: false
  });
};

export const getChatHistory = async (otherUserId: string) => {
  const myUid = auth.currentUser?.uid;
  const q1 = query(collection(db, "messages"),
    where("senderId", "==", myUid),
    where("receiverId", "==", otherUserId),
    orderBy("timestamp", "asc")
  );
  const q2 = query(collection(db, "messages"),
    where("senderId", "==", otherUserId),
    where("receiverId", "==", myUid),
    orderBy("timestamp", "asc")
  );

  const [s1, s2] = await Promise.all([getDocs(q1), getDocs(q2)]);
  const msgs = [...s1.docs, ...s2.docs].map(doc => ({ id: doc.id, ...doc.data() } as ChatMessage));
  return msgs.sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis());
};

// --- Notifications ---
export const getNotifications = async (userId: string) => {
  const q = query(collection(db, "notifications"), where("userId", "==", userId), orderBy("createdAt", "desc"), limit(20));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification));
};

// --- Reviews ---
export const getReviews = async (targetId: string) => {
  const q = query(collection(db, "reviews"), where("targetId", "==", targetId), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
};

export const postReview = (data: Partial<Review>) => addDoc(collection(db, "reviews"), { ...data, userId: auth.currentUser?.uid, createdAt: Timestamp.now() });

// --- Saved Items ---
export const toggleSavedItem = async (userId: string, itemId: string, itemType: SavedItem['itemType']) => {
  const q = query(collection(db, "saved_items"), where("userId", "==", userId), where("itemId", "==", itemId));
  const snap = await getDocs(q);

  if (snap.empty) {
    return await addDoc(collection(db, "saved_items"), {
      userId,
      itemId,
      itemType,
      savedAt: Timestamp.now()
    });
  } else {
    return await deleteDoc(doc(db, "saved_items", snap.docs[0].id));
  }
};

export { db };
