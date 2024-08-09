import { Spinner, Text, VStack } from '@chakra-ui/react';

export default function Loading() {
  return (
    <VStack>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        />
      <Text>読み込み中...</Text>
    </VStack>
  );
}