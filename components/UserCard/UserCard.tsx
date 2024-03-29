import { FC } from 'react';
import { Avatar, Card, Flex, Text } from '@mantine/core';
import { RoomUser } from '@/core/types';
import classes from './UserCard.module.css';

const UserCard: FC<{ user: RoomUser }> = ({ user }) => (
  <Card radius="lg" shadow="sm" p="lg" className={classes.card}>
    <Avatar src={user.userImg} size={100} radius={100} mx="auto" />
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
export default UserCard;
