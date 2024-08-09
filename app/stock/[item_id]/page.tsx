'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react'
import {
  Box,
  VStack,
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  HStack,
  Button,
  Alert,
  AlertIcon,
  Link as ChakraLink,
  Input,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { ItemObject } from '@/lib/type';
import { useUser, useItems } from '@/components/providers'
import Loading from '@/components/loading'

export default function Page() {
  const { item_id } = useParams();
  const { userId } = useUser();
  const { userName } = useUser();
  const { items, setItems } = useItems();
  const [item, setItem] = useState<ItemObject>();
  const [message, setMessage] = useState({state: 0, message: ''})
  const [isEdit, setIsEdit] = useState(false)
  const [unit, setUnit] = useState(0)
  const [purchaseDate, setPurchaseDate] = useState<Date>(new Date())

  const updateItems = async () => {
    try {
      const response = await fetch(`/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          UserId: userId,
          ItemId: item?.ItemId,
          Unit: unit,
          PurchaseDate: purchaseDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      if (response.status === 200) {
        setItems(items.map((i) => {
          if (i.ItemId === item?.ItemId) {
            return {
              ...i,
              Unit: unit,
              PurchaseDate: purchaseDate,
            };
          }
          return i;
        }));
        setIsEdit(!isEdit);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }

  useEffect(() => {
    if (item_id && items.length > 0) {
      const foundItem = items.find((item) => item?.ItemId === Number(item_id));
      setItem(foundItem);
    }

    if (item) {
      setUnit(item.Unit);
      setPurchaseDate(item.PurchaseDate);
      const today = new Date();
      const limitDate = new Date(item?.LimitDate);
      const timeDiff = limitDate.getTime() - today.getTime();
      const dayDiff = timeDiff / (1000 * 3600 * 24);

      if (dayDiff < 0) {
        setMessage({state: 3, message: '期限切れです...'});
      } else if (dayDiff <= 7) {
        setMessage({state: 2, message: '期限間近です！'});
      } else {
        setMessage({state: 1, message: '期限内です'});
      }
    }
  }, [item_id, items, item]);

  return (
    <Box>
      <Text fontSize='14px' alignSelf="flex-start" marginX="3%">ようこそ RakuStoへ {userName} さん</Text>
      <Heading as='h1' display='flex' justifyContent='center' alignItems='center' bg='#be0201' textColor='white' marginTop={5}>STOCK ITEM</Heading>
      {!item ? (
        <VStack marginTop="30">
          <Loading />
        </VStack>
      ) : (
        <VStack>
          <Card marginTop="20px">
            <CardBody>
              <Image
                src={item?.ItemImage}
                alt={item?.ItemName}
              />
            </CardBody>
          </Card>
          <Heading as="h2" fontSize="20px" marginTop="20px">
            {item?.ItemName}
          </Heading>
          {!isEdit ? (
            <VStack marginTop="10px">
              <VStack spacing={3} alignItems="left">
                <Text fontSize="16px">
                  <strong>カテゴリ：</strong>{item?.Category}
                </Text>
                <Text fontSize="16px">
                  <strong>個数：</strong>{item?.Unit}
                </Text>
                <Text fontSize="16px">
                  <strong>購入日：</strong>{item?.PurchaseDate.toLocaleString().split(/(T| )/)[0].replace(/-/g, '/')}
                </Text>
                <Text fontSize="16px" color="#ba0201" fontWeight="bold">
                  <strong>期限：</strong>{item?.LimitDate.toLocaleString().split(/(T| )/)[0].replace(/-/g, '/')}
                </Text>
              </VStack>
              <Alert status={message.state === 3 ? 'error' : message.state === 2 ? 'warning' : message.state === 1 ? 'success' : 'loading'} marginTop="10px">
                <AlertIcon />
                {message.message}
                {message.state === 2 &&
                  <ChakraLink href={`/recipe?category=${item?.Category}`} color="orange.600" fontWeight="bold">
                    <Text as="u">レシピを探す</Text>
                  </ChakraLink>
                }
              </Alert>
              <ChakraLink href={item?.ItemURL} color="#ba0201" fontWeight="bold" marginTop="10px" isExternal>
                商品ページ
                <ExternalLinkIcon mx='2px' />
              </ChakraLink>
              <HStack spacing="100px" justifyContent="center" marginTop="20px">
                <Link href={`/stock`} passHref>
                  <Button colorScheme="blue" size="lg">戻る</Button>
                </Link>
                <Button
                  background="#ba0201"
                  color="white"
                  _active={{
                    background: "#ba0201",
                    color: "white"
                  }}
                  isActive
                  size="lg"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  編集
                </Button>
              </HStack>
            </VStack>
          ) : (
            <VStack marginTop="10px">
              <VStack spacing={3} alignItems="left">
                <Text fontSize="16px"><strong>カテゴリ：</strong>{item?.Category}</Text>
                <Text fontSize="16px">
                  <strong>個数：</strong>
                  <Button colorScheme="blue" size="sm" marginRight="5" onClick={() => setUnit(unit - 1)}>-</Button>
                  {unit}
                  <Button colorScheme="blue" size="sm" marginLeft="5" onClick={() => setUnit(unit + 1)}>+</Button>
                </Text>
                <Text fontSize="16px">
                  <strong>購入日：</strong>
                </Text>
                <Input placeholder='Select Date and Time' type='datetime-local' onChange={(e) => setPurchaseDate(new Date(e.target.value))} />
                <Text fontSize="16px" color="#ba0201" fontWeight="bold"><strong>期限：</strong>{item?.LimitDate.toLocaleString().split(/(T| )/)[0].replace(/-/g, '/')}</Text>
              </VStack>
              <Alert status={message.state === 3 ? 'error' : message.state === 2 ? 'warning' : message.state === 1 ? 'success' : 'loading'} marginTop="10px">
                <AlertIcon />
                {message.message}
                {message.state === 2 &&
                  <ChakraLink href={`/recipe?category=${item?.Category}`} color="orange.600" fontWeight="bold">
                    <Text as="u">レシピを探す</Text>
                  </ChakraLink>
                }
              </Alert>
              <ChakraLink href={item?.ItemURL} color="#ba0201" fontWeight="bold" marginTop="10px" isExternal>
                商品ページ
                <ExternalLinkIcon mx='2px' />
              </ChakraLink>
              <HStack spacing={20} justifyContent="center" marginTop="20px">
                <Button
                  colorScheme="blue"
                  size="lg"
                  p={2}
                  onClick={() => {
                    setIsEdit(!isEdit)
                    setUnit(item.Unit)
                    setPurchaseDate(item.PurchaseDate)
                  }}
                >
                  キャンセル
                </Button>
                <Button
                  background="#ba0201"
                  color="white"
                  _active={{
                    background: "#ba0201",
                    color: "white"
                  }}
                  isActive
                  size="lg"
                  onClick={() => {
                    updateItems()
                  }}
                >
                  保存
                </Button>
              </HStack>
            </VStack>
          )}
        </VStack>
      )}
    </Box>
  );
}
