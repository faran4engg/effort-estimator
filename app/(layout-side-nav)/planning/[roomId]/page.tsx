import { FC } from 'react';
import { notFound, redirect } from 'next/navigation';
import { Box } from '@mantine/core';
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/dist/types/server';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import AdminControlArea from '@/components/AdminControlArea/AdminControlArea';
import InfoMsgBox from '@/components/InfoMsg';
import PointsArea from '@/components/PointsArea/PointsArea';
import UserArea from '@/components/UserArea/UserArea';
import { RoomInfo, RoomUser } from '@/core/types';

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

  // update room with user information
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

  // update users doc
  await updateDoc(roomUsersRef, {
    users: arrayUnion(newUser),
  });

  // update stories doc with this new user in every story
  await updateUserInStories(roomId, newUser);
};

const updateUserInStories = async (roomId: string, user: RoomUser) => {
  const roomData = (await getRoomData(roomId)) as RoomInfo;
  const { stories } = roomData;

  if (!stories.length) return;

  const updatedStories = stories.map((story) => ({
    ...story,
    points: [
      ...story.points,
      {
        point: 'NA',
        userId: user.userId,
      },
    ],
  }));

  await updateDoc(doc(db, 'planning', roomId), {
    stories: updatedStories,
  });

  // revalidatePath('/planning');
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

  const currentlyEstimatingStory = roomData.stories?.find(
    (story) => story.isEstimating,
  );

  const hasStories = roomData.stories?.length > 0;
  const adminUser = roomData.users.find((u) => u.isAdmin);
  const isAdmin = adminUser?.userId === user?.id;

  return (
    <>
      {currentlyEstimatingStory && (
        <Box hiddenFrom="sm" mb="md">
          <PointsArea roomId={params.roomId as string} />
          {isAdmin && hasStories && currentlyEstimatingStory && (
            <Box my="md">
              <AdminControlArea
                roomId={params.roomId}
                storyId={currentlyEstimatingStory.storyId}
              />
            </Box>
          )}
        </Box>
      )}

      <UserArea currentlyEstimatingStory={currentlyEstimatingStory} />

      {!hasStories && (
        <Box
          visibleFrom="sm"
          pos="fixed"
          bottom={20}
          left="calc(50% + 150px)"
          style={{ transform: 'translateX(-50%)' }}
        >
          <InfoMsgBox
            msg1="Room admin"
            msg2="will create a story shortly"
            adminUser={adminUser}
          />
        </Box>
      )}
      {hasStories && !currentlyEstimatingStory && (
        <Box
          visibleFrom="sm"
          pos="fixed"
          bottom={20}
          left="calc(50% + 150px)"
          style={{ transform: 'translateX(-50%)' }}
        >
          <InfoMsgBox
            msg1="Let's wait for the room admin"
            msg2="to start estimation"
            adminUser={adminUser}
          />
        </Box>
      )}

      {currentlyEstimatingStory && (
        <>
          <Box
            visibleFrom="sm"
            pos="fixed"
            bottom={10}
            left="calc(50% + 150px)"
            style={{ transform: 'translateX(-50%)' }}
          >
            {isAdmin && hasStories && currentlyEstimatingStory && (
              <Box my="md">
                <AdminControlArea
                  roomId={params.roomId}
                  storyId={currentlyEstimatingStory.storyId}
                />
              </Box>
            )}
            <PointsArea roomId={params.roomId as string} />
          </Box>
        </>
      )}
    </>
  );
};

export default RoomPage;
