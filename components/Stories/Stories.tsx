'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PlusIcon } from 'lucide-react';
import { Button, Card, LoadingOverlay, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useUser } from '@clerk/nextjs';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { StoryProps } from '@/core/types';
import { useAppContext } from '@/lib/context/AppContext';
import { sleep } from '@/utils/sleep';
import AddStory from './AddStory';
import StoryCard from './StoryCard';

const Stories = () => {
  const { roomId } = useParams();
  const { user } = useUser();
  const router = useRouter();

  const [visible, { open, close }] = useDisclosure(false);

  const [showAddStoryCard, setShowAddStoryCard] = useState<boolean>(false);
  const [deleteStoryId, setDeleteStoryId] = useState<string>('');

  const context = useAppContext();

  if (!context?.roomInfo || Object.keys(context.roomInfo).length === 0) {
    return (
      <Card shadow="sm" padding="xs" radius="md" withBorder>
        <Skeleton height={50} mb="xs" />
        <Skeleton height={8} mb="xs" radius="xl" />
        <Skeleton height={8} width="70%" radius="xl" />
      </Card>
    );
  }

  const isAdmin = context.roomInfo.users.find(
    (ctxUser) => ctxUser.userId === user?.id,
  )?.isAdmin;

  const startEstimation = async (storyToUpdate: StoryProps) => {
    const { stories } = context.roomInfo;

    const roomUsersRef = doc(db, 'planning', context.roomInfo.roomId);
    await updateDoc(roomUsersRef, {
      revealResults: false,
    });

    const index = stories.findIndex(
      (story) => story.storyId === storyToUpdate.storyId,
    );

    const estimatingStory: StoryProps = {
      ...storyToUpdate,
      isEstimating: true,
    };

    // make all stories's isEstimating as false
    const updatedStories = stories.map((story) => ({
      ...story,
      isEstimating: false,
    }));

    // and now update the one which is actually being estimated
    updatedStories.splice(index, 1, estimatingStory);

    await updateDoc(doc(db, 'planning', roomId as string), {
      stories: updatedStories,
    });

    // context.updateCurrentlyEstimatingStory(estimatingStory);

    router.refresh();
  };

  const deleteStory = async (storyToUpdate: StoryProps) => {
    setDeleteStoryId(storyToUpdate.storyId);
    const { stories } = context.roomInfo;
    open();
    await sleep(2000);
    const updatedStories = stories.filter(
      (story) => story.storyId !== storyToUpdate.storyId,
    );
    await updateDoc(doc(db, 'planning', roomId as string), {
      stories: updatedStories,
    });
    close();

    router.refresh();
  };

  return (
    <>
      {isAdmin && (
        <Button
          leftSection={<PlusIcon size={20} />}
          variant="outline"
          fullWidth
          mb="md"
          onClick={() => setShowAddStoryCard(true)}
        >
          Add a Story
        </Button>
      )}

      {!context.roomInfo.stories.length && !isAdmin && (
        <Card shadow="sm" padding="xs" radius="md" withBorder>
          <Skeleton height={50} mb="xs" />
          <Skeleton height={8} mb="xs" radius="xl" />
          <Skeleton height={8} width="70%" radius="xl" />
        </Card>
      )}

      {showAddStoryCard && (
        <AddStory
          setShowAddStoryCard={setShowAddStoryCard}
          roomId={roomId as string}
        />
      )}

      {context.roomInfo.stories.map((story: StoryProps) => (
        <div
          key={story.storyId}
          style={{ marginBottom: '1.5rem', position: 'relative' }}
        >
          <LoadingOverlay
            visible={visible && deleteStoryId === story.storyId}
            zIndex={1000}
            overlayProps={{
              radius: 'sm',
              backgroundOpacity: 0.7,
            }}
            loaderProps={{ color: 'pink', type: 'bars' }}
          />
          <StoryCard
            story={story}
            startEstimation={startEstimation}
            deleteStory={deleteStory}
            isEstimating={story.isEstimating}
            canStartEstimation={!!isAdmin}
          />
        </div>
      ))}
    </>
  );
};

export default Stories;
