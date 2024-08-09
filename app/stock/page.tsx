"use client";

import { useState } from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
} from '@chakra-ui/react';
import Cards from '@/components/ItemCard';
import Filter from '@/components/filter';
import { useUser, useItems } from '@/components/providers';
import Loading from '@/components/loading';

export default function Page() {
  const [itemFilter, setItemFilter] = useState('All');
  const { items } = useItems();
  const { userName } = useUser();

  return (
    <Box>
      <Text fontSize='14px' alignSelf="flex-start" marginX="3%">ようこそ RakuStoへ {userName} さん</Text>
      <Heading as='h1' display='flex' justifyContent='center' alignItems='center' bg='#be0201' textColor='white' marginTop={5}>STOCK</Heading>
      {items.length === 0 ? (
        <VStack marginTop="30">
          <Loading />
        </VStack>
      ) : (
        <Box>
          <Box position='relative' marginTop={5}>
            <Text position='absolute' left='50%' transform='translateX(-50%)' textAlign="center" marginTop={2} fontWeight="bold">{itemFilter}</Text>
            <Filter setItemFilter={setItemFilter} />
          </Box>
          <Cards itemFilter={itemFilter} />
        </Box>
      )}
    </Box>
  );
}
