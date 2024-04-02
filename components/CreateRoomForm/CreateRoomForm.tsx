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
import { useDisclosure } from '@mantine/hooks';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { CreateRoomFormProps, RoomInfo } from '@/core/types';
import { getUUID } from '@/utils/getUUID';
import { sleep } from '@/utils/sleep';

interface Props {
  userFirstName: string;
  userImg: string;
  userId: string;
}
const CreateRoomForm: FC<Props> = ({ userFirstName, userImg, userId }) => {
  const [visible, { toggle }] = useDisclosure(false);

  const router = useRouter();

  const form = useForm<CreateRoomFormProps>({
    initialValues: {
      roomName: '',
      userName: userFirstName,
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
    await sleep(1200);

    const adminUser = {
      createdAt: Date.now(),
      userId,
      userName: values.userName,
      // userImg from google login
      userImg,
      // room creator is an Admin
      isAdmin: true,
    };

    const roomId = `room-${getUUID()}`;
    const newRoomData: RoomInfo = {
      roomName: values.roomName,
      roomId,
      createdAt: Date.now(),
      users: [adminUser],
      stories: [],
    };

    await setDoc(doc(db, 'planning', roomId), newRoomData);
    toggle();
    // localStorage.setItem(LS_USER_ID_KEY, userId);
    router.push(`/planning/${roomId}`);
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: 'sm' }}
        loaderProps={{ color: 'pink', type: 'dots' }}
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
            size="lg"
            label="Room Name"
            placeholder="ex. Refinement 2.23"
            withAsterisk
            {...form.getInputProps('roomName')}
          />
          <TextInput
            size="lg"
            label="Your Name"
            placeholder="ex. John Doe"
            withAsterisk
            {...form.getInputProps('userName')}
          />
        </Flex>

        <Button
          bg="var(--mantine-primary-color-5)"
          size="xl"
          radius="md"
          fullWidth
          mt="xl"
          type="submit"
        >
          Create
        </Button>
      </Paper>
    </Box>
  );
};

export default CreateRoomForm;
