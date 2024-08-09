import { Link, VStack, Text, Image } from '@chakra-ui/react';

export default function Home() {
  return (
    <VStack>
      <Text fontSize='14px' alignSelf="flex-start" marginX="3%">ようこそ RakuStoへ</Text>
      <VStack spacing={10}>
        <Link href='/stock'>
          <VStack bgColor='gray.100' borderRadius='full' width={200} height={200} 
    justifyContent='center'>
            <Image src='/in-stock.png' alt='在庫' width={100} height={100} />
            <Text fontWeight='bold'>Stock</Text>
          </VStack>
        </Link>
        <Link href='/suggestion'>
          <VStack bgColor='gray.100' borderRadius='full' width={200} height={200} 
    justifyContent='center'>
            <Image src='/suggestion.png' alt='提案' width={100} height={100} />
            <Text fontWeight='bold'>Suggestion</Text>
          </VStack>
        </Link>
        <Link href='/recipe'>
          <VStack bgColor='gray.100' borderRadius='full' width={200} height={200} 
    justifyContent='center'>
            <Image src='/book.png' alt='レシピ' width={100} height={100} />
            <Text fontWeight='bold'>Recipe</Text>
          </VStack>
        </Link>
      </VStack>
    </VStack>
  );
}
