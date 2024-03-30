'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { RoomInfo, StoryProps } from '@/core/types';
import AppContext, { Context } from './AppContext';

const AppContextProvider = ({
  children,
  roomId,
}: {
  children: JSX.Element | JSX.Element[];
  roomId: string;
}) => {
  const [roomInfo, setRoomInfo] = useState<RoomInfo>({} as RoomInfo);
  const [currentlyEstimatingStory, setCurrentlyEstimatingStory] =
    useState<StoryProps | null>({} as StoryProps);

  const router = useRouter();

  const updateRoomInfo = (updatedRoomInfo: RoomInfo) => {
    setRoomInfo(updatedRoomInfo);
  };
  const updateCurrentlyEstimatingStory = (story: StoryProps | null) => {
    setCurrentlyEstimatingStory(story);
  };

  const updatedContext: Context = {
    roomInfo,
    updateRoomInfo,
    currentlyEstimatingStory,
    updateCurrentlyEstimatingStory,
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'planning', roomId), (updatedDoc) => {
      const updatedRoomInfo = updatedDoc.data() as RoomInfo;
      updateRoomInfo({ ...updatedRoomInfo });

      const estimatingStory = updatedRoomInfo.stories.find(
        (s) => !!s.isEstimating,
      );

      estimatingStory
        ? updateCurrentlyEstimatingStory({ ...estimatingStory })
        : updateCurrentlyEstimatingStory(null);

      router.refresh();
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
