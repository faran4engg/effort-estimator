import Image from 'next/image';
import { Box, Button, Container, Divider, Flex, Text } from '@mantine/core';
import { currentUser } from '@clerk/nextjs';
import CreateRoomButton from '@/components/CreateRoomButton/CreateRoomButton';

const GetStarted = async () => {
  const user = await currentUser();

  return (
    <Container>
      <div>
        <Flex justify="center" align="center" gap="md">
          <Box
            pos="relative"
            w={{ base: '120px', lg: '150px', xl: '200px' }}
            h={{ base: '120px', lg: '150px', xl: '200px' }}
          >
            <Image src="/woman.svg" fill alt="Woman" />
          </Box>
          <CreateRoomButton />
        </Flex>
        <Text my="lg" size="lg" ta="center" fz="h3">
          Create a room and share the room link with your team !
        </Text>
      </div>
      <Divider my="lg" label="OR" labelPosition="center" />
      <div>
        <Flex justify="center" align="center" gap="md">
          <Button size="xl" radius="md" variant="default">
            Join Room
          </Button>
          <Box
            pos="relative"
            w={{ base: '120px', lg: '150px', xl: '200px' }}
            h={{ base: '120px', lg: '150px', xl: '200px' }}
          >
            <Image src="/man.svg" fill alt="Man" />
          </Box>
        </Flex>
        <Text my="lg" size="md" ta="center" c="dimmed" fz="h3">
          {user?.firstName ? `Hey ${user?.firstName} 👋, ` : ''}Please consider
          asking your meeting facilitator to share a room link 🔗 to join
          estimation session!
        </Text>
      </div>
    </Container>
  );
};

export default GetStarted;
