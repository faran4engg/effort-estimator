'use client';

import { FC } from 'react';
import { Avatar, Card, Flex, Text } from '@mantine/core';
import { RoomUser, StoryProps } from '@/core/types';
import { useAppContext } from '@/lib/context/AppContext';
import classes from './UserCard.module.css';

const UserCard: FC<{
  user: RoomUser;
  userAvatar: string;
  currentlyEstimatingStory?: StoryProps;
}> = ({ user, userAvatar, currentlyEstimatingStory }) => {
  const context = useAppContext();
  const userPoints = currentlyEstimatingStory?.points.find(
    (p) => p.userId === user.userId,
  );

  return (
    <Card radius="lg" shadow="sm" p="lg" className={classes.card}>
      {context.revealResults ? (
        <Avatar size={80} radius={100} mx="auto">
          {userPoints?.point === 'NA' ? '🥱' : userPoints?.point}
        </Avatar>
      ) : (
        <Avatar
          src={userAvatar}
          size={80}
          radius="lg"
          mx="auto"
          style={{ boxShadow: 'rgb(0 0 0 / 30%) 4px 4px 10px 0px' }}
        />
      )}
      <Text
        ta="center"
        fz="lg"
        mt="lg"
        tt="capitalize"
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
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
