import { Center } from '@mantine/core';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <Center mt="xl">
      <SignUp />
    </Center>
  );
}
