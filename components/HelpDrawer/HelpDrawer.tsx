'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Center,
  Drawer,
  Group,
  Radio,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { getRandomNumberBetween } from '@/utils/getRandomNumberBetween';
import { sleep } from '@/utils/sleep';

const HelpDrawer = ({ currentlyEstimatingStory }) => {
  const [opened, { open, close }] = useDisclosure();

  const [complexity, setComplexity] = useState('0');
  const [risk, setRisk] = useState('0');
  const [effort, setEffort] = useState('0');

  const pokerPoints = [1, 2, 3, 5, 8, 13, 21];

  const [estimate, setEstimate] = useState(1);
  const [estimating, setEstimating] = useState(false);

  useEffect(() => {
    setComplexity('0');
    setEffort('0');
    setRisk('0');
    setEstimate(0);
  }, [currentlyEstimatingStory]);

  const calculatePoints = async () => {
    const index =
      Number(complexity) - 1 + Number(risk) - 1 + Number(effort) - 1;
    setEstimate(pokerPoints[index]);
    setEstimating(true);
    const delaySeconds = getRandomNumberBetween(1000, 3000); // between 150 to 3000 ms
    await sleep(delaySeconds);
    setEstimating(false);
  };

  return (
    <>
      <Drawer
        offset={8}
        radius="md"
        position="right"
        opened={opened}
        onClose={close}
      >
        <Title order={3}>Lets help you in deciding your points!</Title>
        <Title mt="lg" order={4}>
          According to you
        </Title>

        <Radio.Group
          value={complexity}
          onChange={setComplexity}
          name="complexity"
          label="What is the Complexity of this Story ?"
          my="sm"
        >
          <Group mt="xs">
            <Radio value="1" label="Low" />
            <Radio value="2" label="Medium" />
            <Radio value="3" label="High" />
          </Group>
        </Radio.Group>

        <Radio.Group
          value={risk}
          onChange={setRisk}
          name="risk"
          label="What is the Uncertinity/Risk of this Story ?"
          my="sm"
        >
          <Group mt="xs">
            <Radio value="1" label="Low" />
            <Radio value="2" label="Medium" />
            <Radio value="3" label="High" />
          </Group>
        </Radio.Group>

        <Radio.Group
          value={effort}
          onChange={setEffort}
          name="effort"
          label="What is the Efforts needed for completion of this Story ?"
          my="sm"
        >
          <Group mt="xs">
            <Radio value="1" label="Low" />
            <Radio value="2" label="Medium" />
            <Radio value="3" label="High" />
          </Group>
        </Radio.Group>

        {Number(complexity) > 0 && Number(risk) > 0 && Number(effort) > 0 ? (
          <Center>
            <Button
              variant="filled"
              bg="var(--mantine-primary-color-6)"
              my="lg"
              onClick={calculatePoints}
            >
              Estimate
            </Button>
          </Center>
        ) : (
          <div></div>
        )}

        {estimate > 0 ? (
          <Box>
            {!estimating && estimate < 21 && (
              <Box my="lg">
                <Center>
                  <Title order={3}>You should poker this as</Title>
                </Center>
              </Box>
            )}
            <Box mt="md">
              <Center>
                {estimating ? (
                  <Text fz="1rem" fw={500}>
                    Estimating...
                  </Text>
                ) : (
                  <>
                    {estimate < 21 ? (
                      <Text
                        fz="4rem"
                        fw={600}
                        c="var(--mantine-primary-color-6)"
                      >
                        {estimate}
                      </Text>
                    ) : (
                      <Text
                        fz="2rem"
                        fw={600}
                        c="var(--mantine-primary-color-6)"
                      >
                        You need to refine this story well
                      </Text>
                    )}
                  </>
                )}
              </Center>
            </Box>

            {!estimating && estimate < 21 && (
              <Box my="sm">
                <Center>
                  <Text
                    onClick={close}
                    c="var(--mantine-primary-color-6)"
                    td="underline"
                  >
                    Use this estinate
                  </Text>
                </Center>
              </Box>
            )}
          </Box>
        ) : (
          <div></div>
        )}
      </Drawer>

      <Card
        onClick={open}
        bg="var(--mantine-primary-color-5)"
        c="white"
        fw="500"
        w={{ base: '40', md: '50' }}
        withBorder
        pos="fixed"
        right={0}
        top="40%"
      >
        N e e d
        <br />
        <br />H e l p
      </Card>
    </>
  );
};

export default HelpDrawer;
