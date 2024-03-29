'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { PlusIcon } from 'lucide-react';
import { Button, Card, Skeleton } from '@mantine/core';
import { useUser } from '@clerk/nextjs';
import { StoryProps } from '@/core/types';
import { useAppContext } from '@/lib/context/AppContext';
import AddStory from './AddStory';
import StoryCard from './StoryCard';

const Stories = () => {
  const { roomId } = useParams();
  const { user } = useUser();

  const [showAddStoryCard, setShowAddStoryCard] = useState<boolean>(false);

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

  // const startEstimation = async (storyToUpdate: StoryProps) => {
  //   await axios.post('/api/reveal-results', { roomId, flag: false });
  //   const index = stories?.findIndex(
  //     (story) => story.storyId === storyToUpdate.storyId,
  //   );

  //   const estimatingStory: StoryProps = {
  //     ...storyToUpdate,
  //     isEstimating: true,
  //   };

  //   // make all stories's isEstimating as false
  //   const updatedStories = stories.map((story) => ({
  //     ...story,
  //     isEstimating: false,
  //   }));

  //   // and now update the one which is actually being estimated
  //   updatedStories.splice(index, 1, estimatingStory);

  //   mutateUpdateStories(
  //     // @ts-ignore
  //     { roomId, stories: updatedStories },
  //     {
  //       onSuccess: async () => {
  //         queryClient.invalidateQueries({ queryKey: ['room', roomId] });
  //       },
  //       onSettled: async () => {
  //         // this api call is used for pusher
  //         await axios.post('/api/start-estimate', {
  //           roomId,
  //           story: estimatingStory,
  //         });

  //         router.refresh();
  //       },
  //     },
  //   );
  // };

  // const deleteStory = async (storyToUpdate: StoryProps) => {
  //   await axios.post('/api/reveal-results', { roomId, flag: false });
  //   const index = stories?.findIndex(
  //     (story) => story.storyId === storyToUpdate.storyId,
  //   );

  //   // make all stories's isEstimating as false
  //   const updatedStories = stories.filter(
  //     (story) => story.storyId !== storyToUpdate.storyId,
  //   );

  //   mutateUpdateStories(
  //     // @ts-ignore
  //     { roomId, stories: updatedStories },
  //     {
  //       onSuccess: async () => {
  //         queryClient.invalidateQueries({ queryKey: ['room', roomId] });
  //       },
  //       onSettled: async () => {
  //         // this api call is used for pusher
  //         await axios.post('/api/stories', {
  //           roomId,
  //           storyName: storyToUpdate.storyName,
  //         });

  //         router.refresh();
  //       },
  //     },
  //   );
  // };

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
        <div key={story.storyId} style={{ marginBottom: '1.5rem' }}>
          <StoryCard
            story={story}
            // startEstimation={startEstimation}
            // deleteStory={deleteStory}
            isEstimating={story.isEstimating}
            //  @ts-ignore
            canStartEstimation={isAdmin}
          />
        </div>
      ))}
    </>
  );
};

export default Stories;
