// all your types
export interface RoomInfo {
  createdAt: number;
  roomName: string;
  roomId: string;
  stories: StoryProps[];
  users: RoomUser[];
  revealResults?: boolean;
}

export interface StoryProps {
  createdAt: number;
  storyId: string;
  storyName: string;
  storyBanner: string;
  agreedSP?: string;
  isEstimating: boolean;
  points: StoryPointRecord[];
}

export interface StoryPointRecord {
  point: string;
  userId: string;
}

export interface RoomUser {
  isAdmin: boolean;
  userId: string;
  userName: string;
  userImg: string;
  createdAt: number;
}

/////

export interface CreateRoomFormProps {
  roomName: string;
  userName: string;
}
