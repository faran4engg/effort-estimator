import { createContext, useContext } from 'react';
import { RoomInfo, StoryProps } from '@/core/types';

export interface Context {
  roomInfo: RoomInfo;
  updateRoomInfo: (updatedRoomInfo: RoomInfo) => void;
  currentlyEstimatingStory: StoryProps | null;
  updateCurrentlyEstimatingStory: (story: StoryProps) => void;
  revealResults: boolean;
  updateRevealResults: (flag: boolean) => void;
}

const initialContext: Context = {
  roomInfo: {} as RoomInfo,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateRoomInfo: (updatedRoomInfo: RoomInfo) => {},

  currentlyEstimatingStory: {} as StoryProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateCurrentlyEstimatingStory: (story: StoryProps) => {},

  revealResults: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateRevealResults: (flag: boolean) => {},
};

const AppContext = createContext(initialContext);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      'useAppContext must be used inside the AppContext.Provider ',
    );
  }

  return context;
};

export default AppContext;
