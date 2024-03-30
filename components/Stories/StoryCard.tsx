import { FC } from 'react';
import { Trash2 } from 'lucide-react';
import { Badge, Button, Card, Flex, Group, Image, Text } from '@mantine/core';
import { StoryProps } from '@/core/types';

interface Props {
  story: StoryProps;
  isEstimating: boolean;
  canStartEstimation: boolean;
  startEstimation: (story: StoryProps) => Promise<void>;
  deleteStory: (story: StoryProps) => Promise<void>;
  storyBanner: string;
}
const StoryCard: FC<Props> = ({
  story,
  isEstimating = false,
  canStartEstimation = false,
  startEstimation,
  deleteStory,
  storyBanner,
}) => (
  <Card
    shadow="sm"
    padding="lg"
    radius="md"
    withBorder
    className={isEstimating ? 'animate-wiggle' : ''}
  >
    <Card.Section>
      <Image src={storyBanner} height={80} alt="Story Card" />
    </Card.Section>

    <Group justify="space-between" pt="lg" grow>
      <Text tt="capitalize" ta="center" fw={500} truncate="end">
        {story.storyName}
      </Text>
      {/* <Badge color="pink">On Sale</Badge> */}
    </Group>

    {canStartEstimation && (
      <Flex justify="space-between" mt="xs">
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
              ? 'var(--mantine-primary-color-5)'
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
  </Card>
);
export default StoryCard;
