'use client';

import Image from 'next/image';
// import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Button,
  Flex,
  LoadingOverlay,
  Paper,
  Space,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const LoginCard = () => {
  const [visible, { toggle }] = useDisclosure(false);
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const params = new URLSearchParams(searchParams.toString());

  const login = () => {
    toggle();
  };

  return (
    <>
      <Text ta="center" fw="bold" style={{ fontSize: '2.4rem' }}>
        Login Page
      </Text>
      <Box pos="relative">
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />

        <Paper withBorder shadow="lg" p={30} mt={30} radius="md">
          <Flex direction="column" gap="md">
            <p>login area 1</p>
            <p>login area 2</p>
            <p>login area 3</p>
            <p>login area 4</p>
          </Flex>
          <Space h="md" />
          <Button fullWidth mt="xl" type="submit">
            Login
          </Button>
          <Space h="md" />
          <Flex direction="column" align="center">
            <div>or login with</div>
            <Space h="md" />
            <UnstyledButton
              onClick={() => {
                login();
              }}
            >
              <Image
                alt="google_icon"
                src="/google_icon.svg"
                width={24}
                height={24}
              />
            </UnstyledButton>
          </Flex>
        </Paper>
      </Box>
    </>
  );
};

export default LoginCard;
