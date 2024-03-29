'use client';

import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { RoomInfo } from '@/core/types';
import AppContext, { Context } from './AppContext';

const AppContextProvider = ({
  children,
  roomId,
}: {
  children: JSX.Element | JSX.Element[];
  roomId: string;
}) => {
  const [roomInfo, setRoomInfo] = useState<RoomInfo>({} as RoomInfo);

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

      updateRoomInfo(updatedRoomInfo);
    });

    return () => {
      // eslint-disable-next-line no-console
      console.log(111, 'unsubscribing from firestore...');
      unsub();
    };
  }, []);

  return (
    <AppContext.Provider value={updatedContext}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
