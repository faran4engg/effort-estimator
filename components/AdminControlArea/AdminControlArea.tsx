'use client';

import party from 'party-js';
import { FC, useEffect } from 'react';
import { Button, Card, Center, Flex } from '@mantine/core';
import { usePrevious } from '@mantine/hooks';
import { useAppContext } from '@/lib/context/AppContext';

const AdminControlArea: FC<{ roomId: string; storyId: string }> = ({
  // roomId,
  storyId,
}) => {
  const previousStoryId = usePrevious(storyId);
  const context = useAppContext();

  const handleRevealResult = async () => {
    context.updateRevealResults(true);
    // await axios.post('/api/reveal-results', { roomId, flag: true });
  };

  const handleHideResult = async () => {
    context.updateRevealResults(false);
    // await axios.post('/api/reveal-results', { roomId, flag: false });
  };

  useEffect(() => {
    if (previousStoryId !== storyId) {
      context.updateRevealResults(false);
    }
  }, [storyId]);

  return (
    <Center>
      <Card radius="md" withBorder>
        <Flex gap="lg">
          <Button
            size="lg"
            variant="outline"
            leftSection="🙈"
            onClick={() => context.revealResults && handleHideResult()}
          >
            Hide Results
          </Button>
          <Button
            bg="var(--mantine-primary-color-6)"
            size="lg"
            variant="filled"
            rightSection="👀"
            onClick={(e) => {
              // @ts-ignore
              party.confetti(e.target, {
                count: party.variation.range(20, 40),
                spread: party.variation.range(30, 50),
                size: party.variation.range(0.6, 1),
              });
              if (!context.revealResults) {
                handleRevealResult();
              }
            }}
          >
            Reveal Results
          </Button>
        </Flex>
      </Card>
    </Center>
  );
};

export default AdminControlArea;
