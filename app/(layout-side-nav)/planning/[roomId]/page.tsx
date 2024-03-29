import { FC } from 'react';
import { notFound, redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/dist/types/server';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { RoomInfo, RoomUser } from '@/core/types';
import AppContextProvider from '@/lib/context/AppContextProvider';

const getRoomData = async (roomId: string) => {
  const docRef = doc(db, 'planning', roomId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    notFound();
  }

  return docSnap.data();
};

const updateUser = async (
  users: RoomUser[],
  currUser: User,
  roomId: string,
) => {
  // check if currUser exists in the database users[] of the room
  const isUserInDB = users.find((userInDb) => userInDb.userId === currUser.id);

  if (isUserInDB) return;

  // update room with user information - for now user array
  const newUser: RoomUser = {
    createdAt: Date.now(),
    userId: currUser.id,
    userName: currUser.firstName || currUser.id,
    // userImg from google login
    userImg: currUser.imageUrl || '/mascot.svg',
    // room creator is an Admin
    isAdmin: false,
  };

  const roomUsersRef = doc(db, 'planning', roomId);

  // Atomically add a new region to the "regions" array field.
  await updateDoc(roomUsersRef, {
    users: arrayUnion(newUser),
  });

  // localStorage.setItem(LS_USER_ID_KEY, currUser.id);
};
interface RoomPageParams {
  params: {
    // add params
    roomId: string;
    searchParams?: Object;
  };
}
export const dynamic = 'force-dynamic';
const RoomPage: FC<RoomPageParams> = async ({ params }) => {
  const roomData = (await getRoomData(params.roomId)) as RoomInfo;
  const user = await currentUser();

  if (!user) {
    return redirect('/sign-in');
  }

  await updateUser(roomData.users, user, params.roomId);

  return (
    <AppContextProvider roomId={params.roomId} initialData={roomData}>
      <div>Home Page 111</div>
    </AppContextProvider>
  );
};

export default RoomPage;
