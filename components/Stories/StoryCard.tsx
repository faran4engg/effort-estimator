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
}
const StoryCard: FC<Props> = ({
  story,
  isEstimating = false,
  canStartEstimation = false,
  startEstimation,
  deleteStory,
}) => (
  <Card
    shadow="sm"
    padding="lg"
    radius="md"
    withBorder
    className={isEstimating ? 'animate-wiggle' : ''}
  >
    <Card.Section>
      <Image
        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
        height={60}
        alt="Story Card"
      />
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
          color={isEstimating ? 'green' : 'cyan'}
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
          size="sm"
          variant="dot"
          // gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
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
