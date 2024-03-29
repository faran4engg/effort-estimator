'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';

import {
  Box,
  Button,
  Flex,
  LoadingOverlay,
  Paper,
  TextInput,
} from '@mantine/core';

import { hasLength, useForm } from '@mantine/form';
import { doc, setDoc } from 'firebase/firestore';
import { useDisclosure } from '@mantine/hooks';

import { db } from '@/firebase/firebase';
import { CreateRoomForm, RoomInfo } from '@/core/types';
import { getUUID } from '@/utils/getUUID';
import { sleep } from '@/utils/sleep';

interface Props {
userName: string;
}
const CreateRoomForm:FC<Props> = ({ userName }) => {
  const [visible, { toggle }] = useDisclosure(false);
const router = useRouter();

  const form = useForm<CreateRoomForm>({
    initialValues: {
      roomName: '',
      userName,
    },
    validate: {
      userName: hasLength(
        { min: 2, max: 20 },
        'Your name must be 2-20 characters long',
      ),
      roomName: hasLength(
        { min: 2 },
        'Room name must be at least 2 characters long',
      ),
    },
  });

  const submitCreateRoom = async (values: typeof form.values) => {
    if (!form.isValid()) return;

    toggle();
    await sleep(2000);

    const adminUser = {
      createdAt: Date.now(),
      userId: getUUID(),
      userName: values.userName,
      // room creator is an Admin
      isAdmin: true,
    };

const roomId = `room-${getUUID()}`;
    const newRoom: RoomInfo = {
      roomName: values.roomName,
      roomId,
      createdAt: Date.now(),
      users: [adminUser],
      stories: [],
    };

await setDoc(doc(db, 'rooms', roomId), newRoom);
toggle();
router.push(`/planning/${roomId}`);
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />

      <Paper
        component="form"
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        onSubmit={form.onSubmit(submitCreateRoom)}
      >
        <Flex direction="column" gap="md">
          <TextInput
            label="Room Name"
            placeholder="ex. Refinement 2.23"
            withAsterisk
            {...form.getInputProps('roomName')}
          />
          <TextInput
            label="Your Name"
            placeholder="ex. John Doe"
            withAsterisk
            {...form.getInputProps('userName')}
          />
        </Flex>

        <Button fullWidth mt="xl" type="submit">
          Create
        </Button>
      </Paper>
    </Box>
  );
};

export default CreateRoomForm;
