'use client';

import { FC } from 'react';
import { Box, Button, LoadingOverlay, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { StoryProps } from '@/core/types';
import { sleep } from '@/utils/sleep';

interface Props {
  story: StoryProps;
  updateStoryPoints: (updatedStory: StoryProps) => Promise<void>;
}
const StoryResult: FC<Props> = ({ story, updateStoryPoints }) => {
  const [visible, { toggle }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      agreedSP: '',
    },
  });

  const handleUpdateStoryPoints = async (values: typeof form.values) => {
    const { agreedSP } = values;
    toggle();
    const updatedStory: StoryProps = {
      ...story,
      agreedSP,
      isEstimating: false,
    };
    await sleep(2000);
    await updateStoryPoints(updatedStory);
    toggle();
  };
  return (
    <Box
      w="100%"
      component="form"
      onSubmit={form.onSubmit(handleUpdateStoryPoints)}
      pos="relative"
    >
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: 'sm' }}
        loaderProps={{ color: 'pink', type: 'bars' }}
      />
      <TextInput
        label="Agreed Story Points :"
        {...form.getInputProps('agreedSP')}
      />
      <Button
        fullWidth
        mt="sm"
        radius="md"
        variant="filled"
        bg="var(--mantine-primary-color-5)"
        size="xs"
        type="submit"
      >
        Update Story Points
      </Button>
    </Box>
  );
};

export default StoryResult;
