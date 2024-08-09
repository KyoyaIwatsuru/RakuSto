import { useItems } from '@/components/providers';
import {
  Image,
  Stack,
  Heading,
  Text,
  Grid,
  GridItem,
  Link,
  Card,
  CardBody
} from '@chakra-ui/react';
import { CardsProps } from '@/lib/type';

export default function Cards({ itemFilter }: CardsProps) {
  const { items } = useItems();
  const today = new Date();
  let status: string;

  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={3} marginTop={2}>
      {items.map((item) => {
        const limitDate = new Date(item?.LimitDate);
        const timeDiff = limitDate.getTime() - today.getTime();
        const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

        if (dayDiff < 0) {
          status = "Expired";
        } else if (dayDiff <= 7) {
          status = "Soon to Expire";
        } else {
          status = "Within Deadline";
        }

        if ((itemFilter == status) || (itemFilter == "All") ){
          return (
            <GridItem key={item?.ItemId} display="flex">
              <Link href={`/stock/${item?.ItemId}`} style={{ width: '100%' }}>
                <Card maxW="sm" mb={5} display="flex" flexDirection="column" height="100%">
                  <CardBody  flexGrow={1}>
                    <Image
                      src={item?.ItemImage}
                      alt={item?.ItemName}
                      borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md" textAlign="center">{item?.Category}</Heading>
                      <Text color={status === 'Within Deadline' ? 'black' : '#be0201'} fontWeight={status === 'Within Deadline' ? 'normal' : 'bold'} textAlign="center">
                        {status === 'Expired'
                          ? '期限切れ'
                          : `あと${dayDiff}日`}
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </Link>
            </GridItem>
          );
        }
      })}
    </Grid>
  );
}