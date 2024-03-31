'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  Flex,
  FocusTrap,
  LoadingOverlay,
  TextInput,
} from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { StoryProps } from '@/core/types';
import { useAppContext } from '@/lib/context/AppContext';
import { getUUID } from '@/utils/getUUID';
import { sleep } from '@/utils/sleep';

interface Props {
  roomId: string;
  setShowAddStoryCard: (value: boolean) => void;
}
const AddStory: FC<Props> = ({ roomId, setShowAddStoryCard }) => {
  const context = useAppContext();
  const router = useRouter();

  const [visible, { toggle }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      storyName: '',
      // link: '',
    },
    validate: {
      storyName: hasLength(
        { min: 2 },
        'Story name must be at least 2 characters long',
      ),
    },
  });

  const addStory = async (values: typeof form.values) => {
    toggle();
    const existingStoriesCount = context.roomInfo.stories.length;

    const newStory: StoryProps = {
      createdAt: Date.now(),
      storyId: getUUID(),
      storyName: values.storyName,
      // when existingStoriesCount is 0, it means the story we are adding is the first one
      storyBanner: `/banners/${existingStoriesCount % 6}.webp`,
      isEstimating: false,
      points: context.roomInfo.users.map((user) => ({
        point: 'NA',
        userId: user.userId,
      })),
    };

    const updatedStories = [
      newStory,
      ...(context.roomInfo.stories ?? []),
    ] as StoryProps[];

    await updateDoc(doc(db, 'planning', roomId), {
      stories: updatedStories,
    });

    await sleep(1200);
    toggle();
    setShowAddStoryCard(false);
    router.refresh();
  };

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: 'sm' }}
        loaderProps={{ color: 'pink', type: 'dots' }}
      />
      <Card
        shadow="sm"
        padding="md"
        radius="md"
        my="md"
        component="form"
        onSubmit={form.onSubmit(addStory)}
      >
        <FocusTrap>
          <TextInput
            label="Ticket Number"
            placeholder="ex. ECOA-9927"
            withAsterisk
            {...form.getInputProps('storyName')}
          />
        </FocusTrap>
        {/* <TextInput label="Link" {...form.getInputProps('link')} mt="xs" /> */}
        <Flex justify="space-between">
          <Button
            mt="sm"
            radius="md"
            variant="subtle"
            size="xs"
            onClick={() => setShowAddStoryCard(false)}
          >
            Cancel
          </Button>
          <Button
            mt="sm"
            radius="md"
            variant="filled"
            bg="var(--mantine-primary-color-7)"
            size="xs"
            type="submit"
          >
            Add
          </Button>
        </Flex>
      </Card>
    </Box>
  );
};

export default AddStory;
