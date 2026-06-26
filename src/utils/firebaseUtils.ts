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
  Timestamp
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase";
import { UserProfile, AccommodationListing, JobListing, MarketplaceItem } from "../types";

// Note: In a real environment with Data Connect, we would use the generated SDK.
// Since we are setting up the schema/operations, we'll keep the Firestore implementation
// as the primary data store for the MVP, but aligned with the new schema.

const db = getFirestore();

export const createUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  return await setDoc(doc(db, "users", userId), data);
};

export const addDocument = async (collectionName: string, data: any) => {
  return await addDoc(collection(db, collectionName), {
    ...data,
    userId: auth.currentUser?.uid,
    createdAt: Timestamp.now()
  });
};

export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  const docRef = doc(db, collectionName, docId);
  return await updateDoc(docRef, data);
};

export const deleteDocument = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  return await deleteDoc(docRef);
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

export const applyForJob = async (jobId: string, applicantData: any) => {
  return await addDoc(collection(db, "applications"), {
    jobId,
    applicantId: auth.currentUser?.uid,
    ...applicantData,
    status: "pending",
    appliedAt: Timestamp.now()
  });
};

export const sendMessage = async (conversationId: string, text: string) => {
  return await addDoc(collection(db, "messages"), {
    conversationId,
    senderId: auth.currentUser?.uid,
    text,
    timestamp: Timestamp.now()
  });
};

export const startConversation = async (participantId: string, initialMessage?: string) => {
  const currentUserId = auth.currentUser?.uid;
  if (!currentUserId) return;

  // Check for existing conversation
  const q = query(
    collection(db, "conversations"),
    where("participants", "array-contains", currentUserId)
  );
  const snapshot = await getDocs(q);
  const existing = snapshot.docs.find(doc => doc.data().participants.includes(participantId));

  if (existing) {
    if (initialMessage) {
      await sendMessage(existing.id, initialMessage);
    }
    return existing.id;
  }

  // Fetch participant profiles for metadata
  const currentUserDoc = await getDocs(query(collection(db, "users"), where("uid", "==", currentUserId)));
  const targetUserDoc = await getDocs(query(collection(db, "users"), where("uid", "==", participantId)));

  const currentUserData = currentUserDoc.docs[0]?.data();
  const targetUserData = targetUserDoc.docs[0]?.data();

  const conversation = await addDoc(collection(db, "conversations"), {
    participants: [currentUserId, participantId],
    participantData: {
      [currentUserId]: {
        name: currentUserData?.displayName || "User",
        photoURL: currentUserData?.photoURL || ""
      },
      [participantId]: {
        name: targetUserData?.displayName || "User",
        photoURL: targetUserData?.photoURL || ""
      }
    },
    lastMessage: initialMessage || "",
    updatedAt: Timestamp.now()
  });

  if (initialMessage) {
    await sendMessage(conversation.id, initialMessage);
  }

  return conversation.id;
};

export const uploadFile = async (path: string, file: File) => {
  const storage = getStorage();
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};

export { db };
