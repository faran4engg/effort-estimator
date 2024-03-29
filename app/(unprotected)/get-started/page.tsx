import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';
import { Box, Button, Container, Divider, Flex, Text } from '@mantine/core';

const GetStarted = async () => {
  const user = await currentUser();

  // console.log(111, user?.firstName);
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
          <Button>Create Room</Button>
        </Flex>
        <Text my="lg" size="lg" ta="center">
          Create a room and share the room link with your team !
        </Text>
      </div>
      <Divider my="lg" label="OR" labelPosition="center" />
      <div>
        <Flex justify="center" align="center" gap="md">
          <Button variant="default">Join Room</Button>
          <Box
            pos="relative"
            w={{ base: '120px', lg: '150px', xl: '200px' }}
            h={{ base: '120px', lg: '150px', xl: '200px' }}
          >
            <Image src="/man.svg" fill alt="Man" />
          </Box>
        </Flex>
        <Text my="lg" size="md" ta="center" c="dimmed">
          {user?.firstName ? `Hey ${user?.firstName} 👋, ` : ''}Please consider
          asking your meeting facilitator to share a room link 🔗 to join
          estimation session!
        </Text>
      </div>
    </Container>
  );
};

export default GetStarted;
