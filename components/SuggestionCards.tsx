import { useEffect, useState } from 'react';
import {
  Image,
  Stack,
  Heading,
  Grid,
  GridItem,
  Link,
  Card,
  CardBody
} from '@chakra-ui/react';
import { RankItem, Rank } from '@/lib/type';

export default function Suggest_Cards() {
  const [items, setItems] = useState<RankItem[]>([]);

  async function getRankItems(){
    try {
      const result = await fetch('/api/rakutenAPI');

      if (!result.ok) {
        throw new Error('データの取得に失敗しました');
      }

      const data = await result.json();
      return data.Items.slice(0, 9).map((item: Rank) => ({
        ItemId: item.itemCode,
        ItemName: item.itemName,
        ItemUrl: item.itemUrl,
        ItemImage: item.mediumImageUrls[0]
      }));
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      return [];
    }
  }

  useEffect(() => {
    const fetchItems = async () => {
      const result = await getRankItems();
      setItems(result);
    };

    fetchItems();
  }, []);

  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={3} marginTop={5}>
      {items.map((item) => {
        const truncatedItemName = item.ItemName.length > 10 ? item.ItemName.substring(0, 10) + '...' : item.ItemName;

        return (
          <GridItem key={item.ItemId} display="flex">
            <Link href={item.ItemUrl} style={{ width: '100%' }}>
              <Card maxW="sm" mb={5} display="flex" flexDirection="column" height="100%">
                <CardBody flexGrow={1}>
                  <Image
                    src={item.ItemImage}
                    alt={item.ItemName}
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{truncatedItemName}</Heading>
                  </Stack>
                </CardBody>
              </Card>
            </Link>
          </GridItem>
        );
      })}
    </Grid>
  );
}