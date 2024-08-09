'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { ItemObject } from '@/lib/type';

interface UserContextProps {
  userId: number;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

interface ItemContextProps {
  items: ItemObject[];
  setItems: React.Dispatch<React.SetStateAction<ItemObject[]>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);
const ItemContext = createContext<ItemContextProps | undefined>(undefined);

export function Providers({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<number>(1);
  const [userName, setUserName] = useState<string>('楽天太郎');
  const [items, setItems] = useState<ItemObject[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`/api/items?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }

        const data: ItemObject[] = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId, userName, setUserName }}>
      <ItemContext.Provider value={{ items, setItems }}>
        {children}
      </ItemContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}

export function useItems() {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error('useItems must be used within a ItemProvider');
  }

  return context;
}