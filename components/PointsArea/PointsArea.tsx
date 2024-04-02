'use client';

import { FC, useState } from 'react';
import { Card, Center, Flex, Text, UnstyledButton } from '@mantine/core';
import { useUser } from '@clerk/nextjs';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { StoryProps } from '@/core/types';
import { useAppContext } from '@/lib/context/AppContext';
import { getRandomNumberBetween } from '@/utils/getRandomNumberBetween';
import { sleep } from '@/utils/sleep';
import classes from './points-area.module.css';
import { cardPoints } from './points-data';

interface Props {
  roomId: string;
}

const PointsArea: FC<Props> = ({ roomId }) => {
  const { user } = useUser();
  const context = useAppContext();

  const currentlyEstimatingStory = context.roomInfo.stories?.find(
    (s) => !!s.isEstimating,
  ) as StoryProps;

  const userSelectedPoint = currentlyEstimatingStory?.points?.find(
    (p) => p.userId === user?.id,
  );
  const [selectedPoint, setSelectedPoint] = useState(
    userSelectedPoint ? userSelectedPoint.point : '',
  );

  if (!user?.id) {
    return <p>Oops! No user identified!</p>;
  }
  if (!context?.currentlyEstimatingStory) {
    return <p>No story is being estimated</p>;
  }

  const selectPoint = async (point: string) => {
    if (!user?.id) return;

    setSelectedPoint(point);

    const delaySeconds = getRandomNumberBetween(150, 3000); // between 150 to 3000 ms
    await sleep(delaySeconds);

    const allStories = context.roomInfo.stories;
    const storyToUpdateIndex = allStories.findIndex(
      (story) => story.storyId === currentlyEstimatingStory.storyId,
    );

    const pointsForCurrentUserIndex =
      currentlyEstimatingStory?.points.findIndex((p) => p.userId === user.id);

    if (
      pointsForCurrentUserIndex === undefined ||
      pointsForCurrentUserIndex === null
    ) {
      return;
    }

    const roomRef = doc(db, 'planning', roomId);

    await getDoc(roomRef)
      // eslint-disable-next-line @typescript-eslint/no-shadow
      .then(async (doc) => {
        if (doc.exists()) {
          const data = doc.data();

          const storyToUpdate = { ...data.stories[storyToUpdateIndex] };
          storyToUpdate.points[pointsForCurrentUserIndex].point = point;

          data.stories.splice(storyToUpdateIndex, 1, storyToUpdate);

          await updateDoc(roomRef, {
            stories: [...data.stories],
          });
        }
      });
  };

  return (
    <Center>
      <Card radius="md" withBorder className={classes.card}>
        <Flex gap="md" wrap="wrap" justify="center" align="center">
          {cardPoints.map((item) => (
            <UnstyledButton
              key={item.point}
              className={classes.item}
              p={4}
              c={item.color}
              onClick={() => selectPoint(item.point)}
              style={{
                border:
                  selectedPoint === item.point ? '2px solid #1971c2' : 'none',
                transform:
                  selectedPoint === item.point ? 'scale(1.2)' : 'scale(1)',
              }}
            >
              <Text tt="capitalize" size="xl" fw="bold">
                {item.point}
              </Text>
            </UnstyledButton>
          ))}
        </Flex>
      </Card>
    </Center>
  );
};

export default PointsArea;
