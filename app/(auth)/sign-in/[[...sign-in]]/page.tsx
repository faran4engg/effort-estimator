import { Center } from '@mantine/core';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <Center mt="xl">
      <SignIn />
    </Center>
  );
}
