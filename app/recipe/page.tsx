"use client";

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Heading,
  VStack,
  useColorModeValue,
  Select,
  Container,
  Box,
  Text,
} from '@chakra-ui/react';
import { useItems } from '@/components/providers';
import { RecipeCard } from '@/components/RecipeCard';
import Loading from '@/components/loading';
import { Recipe } from '@/lib/type';
import { useUser } from '@/components/providers';

export default function Page() {
  const { items } = useItems();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [almostExpierdCategory, setAlmostExpierdCategory] = useState<string[]>([]);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const { userName } = useUser();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const result = await fetch('/api/recipes');

        if (!result.ok) throw new Error('データの取得に失敗しました');

        const data = await result.json();
        const formattedData = data.map((recipe: any) => ({
          id: recipe.RecipeID,
          title: recipe.RecipeTitle,
          imageUrl: recipe.RecipeImageURL,
          detailPageUrl: recipe.RecipeURL,
          category: recipe.RecipeCategory,
        }));
        setRecipes(formattedData);
      } catch (error) {
        console.error('データの取得中にエラーが発生しました:', error);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const categories = Array.from(new Set(items.map(item => {
      const today = new Date();
      const limitDate = new Date(item.LimitDate);
      const timeDiff = limitDate.getTime() - today.getTime();
      const dayDiff = timeDiff / (1000 * 3600 * 24);
      return (dayDiff > 0 && dayDiff <= 7) ? item.Category : '';
    })));
    setAlmostExpierdCategory(categories);
  }, [items]);

  // 期限切れ間近のレシピをフィルタリング
  const matchedRecipes = useMemo(() =>
    recipes.filter(recipe => almostExpierdCategory.includes(recipe.category)),
    [recipes, almostExpierdCategory]
  );

  // 表示するレシピのカテゴリー一覧を取得
  const categories = useMemo(() => {
  recipes.filter(recipe => almostExpierdCategory.includes(recipe.category))
    const uniqueCategories = Array.from(new Set(matchedRecipes.map(recipe => recipe.category)));
    return ['すべてのカテゴリー', ...uniqueCategories];
  }, [matchedRecipes]);

  // カテゴリー選択時に表示するレシピをフィルタリング
  const filteredRecipes = useMemo(() =>
    selectedCategory && selectedCategory !== 'すべてのカテゴリー'
      ? matchedRecipes.filter(recipe => recipe.category === selectedCategory)
      : matchedRecipes,
    [selectedCategory, matchedRecipes]
  );

  // カテゴリー選択時にURLを更新
  const handleCategoryChange = (category: string) => {
    router.push(category === 'すべてのカテゴリー' ? '/recipe' : `/recipe?category=${encodeURIComponent(category)}`);
  };

  return (
    <Box>
      <Text fontSize='14px' alignSelf="flex-start" marginX="3%">ようこそ RakuStoへ {userName} さん</Text>
      <Heading as='h1' display='flex' justifyContent='center' alignItems='center' bg='#be0201' textColor='white' marginTop={5}>RECIPE</Heading>
      <Heading mb={4} fontSize="2xl" textAlign="center" marginTop={5}>期限切れ間近推薦レシピ</Heading>
      <Container maxW="container.sm" py={4} bg={bgColor}>

        {!recipes.length ? (
          <VStack marginTop="30">
            <Loading />
          </VStack>
        ) : (
          <Box>
            <Select
              mb={4}
              value={selectedCategory || 'すべてのカテゴリー'}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>

            <VStack spacing={8} align="stretch">
              {filteredRecipes.slice(0, 10).map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </VStack>
          </Box>
        )}
      </Container>
    </Box>
  );
}