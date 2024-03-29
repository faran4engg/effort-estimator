import { SignIn } from '@clerk/nextjs';
import { Center } from '@mantine/core';

export default function Page() {
  return (
    <Center mt="xl">
      <SignIn />
    </Center>
  );
}
