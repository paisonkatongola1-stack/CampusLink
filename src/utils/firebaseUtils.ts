import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
  orderBy,
  limit,
  onSnapshot
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase";
import {
  UserProfile,
  AccommodationListing,
  JobListing,
  MarketplaceItem,
  EventListing,
  BusinessProfile,
  ChatMessage,
  Notification
} from "../types";

const db = getFirestore();
const storage = getStorage();

// User Profile
export const createUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  return await setDoc(doc(db, "users", userId), data);
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  return await updateDoc(doc(db, "users", userId), data);
};

// Generic Collection Fetch
export const getCollection = async <T>(collectionName: string, constraints: any[] = []): Promise<T[]> => {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  } catch (e) {
    console.error(`Error fetching ${collectionName}:`, e);
    return [];
  }
};

// Listings CRUD
export const addListing = async (collectionName: string, data: any) => {
  return await addDoc(collection(db, collectionName), {
    ...data,
    status: 'pending',
    createdAt: Timestamp.now()
  });
};

export const updateListingStatus = async (collectionName: string, id: string, status: 'approved' | 'rejected') => {
  return await updateDoc(doc(db, collectionName, id), { status });
};

// Messaging
export const sendMessage = async (receiverId: string, text: string) => {
  if (!auth.currentUser) return;
  return await addDoc(collection(db, "messages"), {
    senderId: auth.currentUser.uid,
    receiverId,
    text,
    timestamp: Timestamp.now()
  });
};

export const subscribeToMessages = (callback: (messages: ChatMessage[]) => void) => {
  if (!auth.currentUser) return;
  const q = query(
    collection(db, "messages"),
    where("senderId", "in", [auth.currentUser.uid]),
    orderBy("timestamp", "asc")
  );
  // Note: This is simplified, real implementation would need complex queries for bidirectional chat
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatMessage));
    callback(messages);
  });
};

// Storage
export const uploadFile = async (path: string, file: File) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

// Applications
export const applyForJob = async (jobId: string, applicantData: any) => {
  return await addDoc(collection(db, "applications"), {
    jobId,
    applicantId: auth.currentUser?.uid,
    ...applicantData,
    status: "pending",
    appliedAt: Timestamp.now()
  });
};

export { db, storage };
