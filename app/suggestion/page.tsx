"use client";

import { Box, Text, VStack, Heading } from '@chakra-ui/react';
import Cards from '@/components/ItemCard';
import Suggest_Cards from '@/components/SuggestionCards';
import Loading from '@/components/loading';
import { useItems } from '@/components/providers';
import { useUser } from '@/components/providers';

export default function Page() {
  const { items } = useItems();
  const { userName } = useUser();

  return (
    <Box>
      <Text fontSize='14px' alignSelf="flex-start" marginX="3%">ようこそ RakuStoへ {userName} さん</Text>
      <Heading as='h1' display='flex' justifyContent='center' alignItems='center' bg='#be0201' textColor='white' marginTop={5}>SUGGESTION</Heading>
      {items.length === 0 ? (
        <VStack marginTop="30">
          <Loading />
        </VStack>
      ) : (
        <Box>
          <Text textAlign="center" fontWeight="bold" marginTop={5}>期限間近のアイテム</Text>
          <Cards itemFilter="Expired" />
          <Cards itemFilter="Soon to Expire" />
          <Text textAlign="center" fontWeight="bold" marginTop={5}>おすすめ商品</Text>
          <Suggest_Cards />
        </Box>
      )}
    </Box>
  );
}
