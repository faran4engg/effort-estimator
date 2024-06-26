import { FC } from 'react';
import { Trash2 } from 'lucide-react';
import { Badge, Button, Card, Flex, Group, Image, Text } from '@mantine/core';
import { StoryProps } from '@/core/types';
import StoryResult from './StoryResult';

interface Props {
  story: StoryProps;
  isEstimating: boolean;
  canStartEstimation: boolean;
  startEstimation: (story: StoryProps) => Promise<void>;
  deleteStory: (story: StoryProps) => Promise<void>;
  updateStoryPoints: (updatedStory: StoryProps) => Promise<void>;
}
const StoryCard: FC<Props> = ({
  story,
  isEstimating = false,
  canStartEstimation = false,
  startEstimation,
  deleteStory,
  updateStoryPoints,
}) => (
  <Card
    shadow="sm"
    padding="sm"
    radius="md"
    className={isEstimating ? 'animate-wiggle' : ''}
  >
    <Card.Section>
      <Image src={story.storyBanner} height={60} alt="Story Card" />
    </Card.Section>

    <Group justify="space-between" mt="md" grow>
      <Text tt="capitalize" ta="center" fw={500} truncate="end">
        {story.storyName}
      </Text>
    </Group>

    {canStartEstimation && (
      <Flex justify="space-between" mt="sm">
        <Button
          color="red"
          radius="md"
          size="xs"
          onClick={() => canStartEstimation && deleteStory(story)}
          variant="light"
          disabled={!isEstimating && !canStartEstimation}
        >
          <Trash2 size={16} color="#f16060" />
        </Button>

        <Button
          c="#fff"
          bg={
            isEstimating
              ? 'var(--mantine-color-green-7)'
              : 'var(--mantine-primary-color-4)'
          }
          radius="md"
          size="xs"
          onClick={() =>
            canStartEstimation && !isEstimating && startEstimation(story)
          }
          variant={
            isEstimating ? 'filled' : canStartEstimation ? 'light' : 'default'
          }
          disabled={!isEstimating && !canStartEstimation}
        >
          {isEstimating ? 'Voting...' : 'Estimate'}
        </Button>
      </Flex>
    )}

    {isEstimating && canStartEstimation && (
      <Flex mt="md">
        <StoryResult story={story} updateStoryPoints={updateStoryPoints} />
      </Flex>
    )}
    {isEstimating && !canStartEstimation && (
      <Flex justify="center" mt="xs">
        <Badge
          c="#fff"
          bg="var(--mantine-primary-color-5)"
          size="md"
          variant="outline"
          p="xs"
          tt="capitalize"
        >
          Voting Now
        </Badge>
      </Flex>
    )}

    <Flex gap="sm" mt="sm" justify="space-between">
      <Text size="sm" c="dimmed" fw="bold">
        Agreed Points:
      </Text>
      <Text fw="bold" size="sm" c="dimmed">
        {story.agreedSP ? story.agreedSP : 'Yet to estimate'}
      </Text>
    </Flex>
  </Card>
);
export default StoryCard;
