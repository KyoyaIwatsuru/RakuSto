import Image from 'next/image';
import Link from 'next/link';
import { Box } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Box alignSelf="flex-start">
      <Link href='/'>
        <Image src='/楽天市場.png' alt='楽天市場ロゴ' width={100} height={100} />
      </Link>
    </Box>
  );
}