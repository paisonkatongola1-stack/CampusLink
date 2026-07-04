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
  onSnapshot,
  orderBy,
  Timestamp
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase";
import { UserProfile, AccommodationListing, JobListing, MarketplaceItem } from "../types";

const db = getFirestore();
const storage = getStorage();

export const createUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  return await setDoc(doc(db, "users", userId), data);
};

export const getAccommodations = async (): Promise<AccommodationListing[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "accommodation"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AccommodationListing));
  } catch (e) {
    console.error("Error fetching accommodations:", e);
    return [];
  }
};

export const postMarketplaceItem = async (data: Partial<MarketplaceItem>) => {
  return await addDoc(collection(db, "marketplace"), {
    ...data,
    sellerId: auth.currentUser?.uid,
    createdAt: Timestamp.now(),
    status: 'pending'
  });
};

export const applyForJob = async (jobId: string, applicantData: any) => {
  return await addDoc(collection(db, "applications"), {
    jobId,
    applicantId: auth.currentUser?.uid,
    ...applicantData,
    status: "pending",
    appliedAt: Timestamp.now()
  });
};

// Messaging
export const sendMessage = async (conversationId: string, text: string) => {
  if (!auth.currentUser) return;
  return await addDoc(collection(db, `conversations/${conversationId}/messages`), {
    senderId: auth.currentUser.uid,
    text,
    createdAt: Timestamp.now()
  });
};

export const onMessagesUpdate = (conversationId: string, callback: (messages: any[]) => void) => {
  const q = query(
    collection(db, `conversations/${conversationId}/messages`),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(messages);
  });
};

// Storage
export const uploadFile = async (path: string, file: File) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

// Saved Items
export const saveItem = async (type: string, itemId: string) => {
  if (!auth.currentUser) return;
  return await setDoc(doc(db, "saved_items", `${auth.currentUser.uid}_${itemId}`), {
    userId: auth.currentUser.uid,
    itemId,
    type,
    savedAt: Timestamp.now()
  });
};

export const unsaveItem = async (itemId: string) => {
  if (!auth.currentUser) return;
  return await deleteDoc(doc(db, "saved_items", `${auth.currentUser.uid}_${itemId}`));
};

export { db };
