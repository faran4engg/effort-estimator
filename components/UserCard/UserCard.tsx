'use client';

import { FC } from 'react';
import { Avatar, Card, Flex, Text } from '@mantine/core';
import { RoomUser, StoryProps } from '@/core/types';
import { useAppContext } from '@/lib/context/AppContext';
import classes from './UserCard.module.css';

const UserCard: FC<{
  user: RoomUser;
  currentlyEstimatingStory?: StoryProps;
}> = ({ user, currentlyEstimatingStory }) => {
  const context = useAppContext();
  const userPoints = currentlyEstimatingStory?.points.find(
    (p) => p.userId === user.userId,
  );

  return (
    <Card radius="lg" shadow="sm" p="lg" className={classes.card}>
      {context.revealResults ? (
        <Avatar size={100} radius={100} mx="auto">
          {userPoints?.point === 'NA' ? '🥱' : userPoints?.point}
        </Avatar>
      ) : (
        <Avatar src={user.userImg} size={100} radius={100} mx="auto" />
      )}
      <Text ta="center" fz="lg" mt="lg">
        {user.userName}
      </Text>

      <Flex justify="center" mt="lg">
        {currentlyEstimatingStory?.isEstimating &&
          !context.revealResults &&
          userPoints?.point !== 'NA' && (
            <Text c="dimmed" size="lg">
              ...has estimated ✅
            </Text>
          )}
        {currentlyEstimatingStory?.isEstimating && context.revealResults && (
          <Text c="dimmed" size="lg">
            Result Time 🙈
          </Text>
        )}
        {currentlyEstimatingStory?.isEstimating &&
          !context.revealResults &&
          userPoints?.point === 'NA' && (
            <Text c="dimmed" size="lg">
              ...is thinking 😵‍💫
            </Text>
          )}
        {!currentlyEstimatingStory?.isEstimating && (
          <Text c="dimmed" size="lg">
            ...is ready 💪
          </Text>
        )}
      </Flex>
    </Card>
  );
};
export default UserCard;
