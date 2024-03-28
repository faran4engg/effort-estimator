import { Box, Flex, Skeleton } from '@mantine/core';

const Loader = () => (
  <Flex direction="column" justify="center" w="100%" align="center" pt="lg">
    {[1, 2, 3].map((item) => (
      <Flex
        gap="md"
        w={{ base: '100%', md: '50%', xl: '40rem' }}
        key={item}
        mb="lg"
      >
        <Box w="40%" h="40%">
          <Skeleton height={50} />
        </Box>
        <Box w="100%">
          <Skeleton height={10} mb="sm" width="80%" />
          <Skeleton height={8} mb="sm" width="40%" />
          <Skeleton height={6} mb="sm" width="60%" />
          <Skeleton height={6} mb="sm" />
        </Box>
      </Flex>
    ))}
  </Flex>
);

export default Loader;
