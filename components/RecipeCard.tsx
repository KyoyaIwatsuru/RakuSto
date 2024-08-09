import { FC } from "react";
import { Recipe } from "@/lib/type";
import { Box, Image, Link, Text, useColorModeValue } from "@chakra-ui/react";

export const RecipeCard: FC<Recipe> = (recipe) => {
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const placeholderImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23cccccc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24px' fill='%23333333'%3EImage Loading...%3C/text%3E%3C/svg%3E`;

  return (
    <Link href={recipe.detailPageUrl} key={recipe.id}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={cardBgColor}
        shadow="md"
        transition="all 0.3s"
        _hover={{
          transform: 'translateY(-5px)',
          shadow: 'lg',
          borderColor: 'blue.500',
        }}
        width="100%"
      >
        <Box position="relative" width="100%" paddingBottom="100%">
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            objectFit="cover"
            fallbackSrc={placeholderImage}
          />
        </Box>
        <Box p={3}>
          <Text fontWeight="bold" color={textColor} fontSize="md">
            {recipe.title}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {recipe.category}
          </Text>
        </Box>
      </Box>
    </Link>
  );
}