'use client';

import React from 'react';
import { SimpleGrid } from '@mantine/core';
import { useAppContext } from '@/lib/context/AppContext';
import UserCard from '../UserCard/UserCard';

const UserArea = () => {
  const context = useAppContext();

  if (!context?.roomInfo?.users?.length) return <p>No Users</p>;

  const { users } = context.roomInfo;
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 3, xl: 4 }}
      verticalSpacing={{ base: 'md', sm: 'lg' }}
    >
      {users.map((user) => (
        <UserCard user={user} />
      ))}
    </SimpleGrid>
  );
};

export default UserArea;
