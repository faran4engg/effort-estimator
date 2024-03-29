import { createContext, useContext } from 'react';
import { RoomInfo } from '@/core/types';

export interface Context {
  roomInfo: RoomInfo;

  updateRoomInfo: (updatedRoomInfo: RoomInfo) => void;
}

const initialContext: Context = {
  roomInfo: {} as RoomInfo,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateRoomInfo: (updatedRoomInfo: RoomInfo) => {},
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
