'use client';

import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { RoomInfo } from '@/core/types';
import AppContext, { Context } from './AppContext';

const AppContextProvider = ({
  children,
  roomId,
  initialData,
}: {
  children: JSX.Element | JSX.Element[];
  roomId: string;
  initialData: RoomInfo;
}) => {
  const [roomInfo, setRoomInfo] = useState<RoomInfo>(initialData);

  const updateRoomInfo = (updatedRoomInfo: RoomInfo) => {
    setRoomInfo(updatedRoomInfo);
  };

  const updatedContext: Context = {
    roomInfo,
    updateRoomInfo,
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'planning', roomId), (updatedDoc) => {
      const updatedRoomInfo = updatedDoc.data() as RoomInfo;
      console.log(111, 'updated data: ', updatedDoc.data());
      updateRoomInfo(updatedRoomInfo);
    });

    return () => {
      console.log(111, 'unsubbing firestore');
      unsub();
    };
  }, []);

  return (
    <AppContext.Provider value={updatedContext}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
