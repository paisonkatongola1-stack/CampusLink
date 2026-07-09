import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, QueryConstraint } from 'firebase/firestore';
import { db } from '../utils/firebaseUtils';

export const useCollection = <T>(collectionName: string, constraints: QueryConstraint[] = []) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, collectionName), ...constraints);

    const unsubscribe = onSnapshot(q,
      (snapshot) => {
        const result = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
        setData(result);
        setLoading(false);
      },
      (err) => {
        console.error(`Error listening to ${collectionName}:`, err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, JSON.stringify(constraints)]);

  return { data, loading, error };
};
