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
        <Text c="dimmed" size="sm">
          Ready to Estimate 🤞
        </Text>
      </Flex>
    </Card>
  );
};
export default UserCard;
