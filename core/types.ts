// all your types
export interface RoomInfo {
  createdAt: number;
  roomName: string;
  roomId: string;
  stories: StoryProps[];
  users: User[];
}

export interface StoryProps {
  createdAt: number;
  storyId: string;
  storyName: string;
  isEstimating: boolean;
  points: StoryPointRecord[];
}

export interface StoryPointRecord {
  point: string;
  userId: string;
}

export interface User {
  isAdmin: boolean;
  userId: string;
  userName: string;
  createdAt: number;
}

/////

export interface CreateRoomForm {
  roomName: string;
  userName: string;
}
