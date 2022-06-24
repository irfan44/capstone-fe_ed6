import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Container,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { fetchArticleBySlug } from "api/graphcms";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { ArticleContent } from "types/article";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import formatDate from "utils/formatDate";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "redux/hooks";

const ContentArticle = () => {
  const [article, setArticle] = useState<ArticleContent>();
  const { uid } = useAppSelector((state) => state.userProfile);
  const { premium } = useAppSelector((state) => state.userStatus);
  const { slug } = useParams();
  const navigate = useNavigate();

  const getArticleContent = async () => {
    if (slug) {
      try {
        const article = await fetchArticleBySlug(slug);
        setArticle(article);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const date = article && formatDate(article.createdAt);
  const articlePremium = article && article.articleType === "premium";

  useEffect(() => {
    getArticleContent();
    if (!uid) {
      navigate("/login");
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box minH="100vh" bg="#f6f8fd" py="16">
      <Container maxW="4xl">
        {article && (
          <>
            <Breadcrumb fontSize="sm" mb="2">
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/explore">
                  Explorasi
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink
                  as={Link}
                  to={`/category/${article.category}`}
                  textTransform="capitalize"
                >
                  {article.category}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{article.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Heading mb="4">{article.title}</Heading>
            <HStack mb="6">
              <Badge bg="#D6E6F5">{article.category}</Badge>
              <Text fontSize="sm">|</Text>
              <Text fontSize="sm">{date}</Text>
              <Text fontSize="sm">|</Text>
              {articlePremium && (
                <Badge mb="2" variant="solid" colorScheme="yellow">
                  Premium
                </Badge>
              )}
            </HStack>
            <Image
              src={article.coverImage.url}
              borderRadius="2xl"
              alt={article.title}
              width="100%"
              height={{ base: "300px", md: "500px" }}
              objectFit="cover"
            />
            {articlePremium ? (
              premium ? (
                <Prose>
                  <RichText content={article.content.raw} />
                </Prose>
              ) : (
                <Box
                  as={Center}
                  py="16"
                  px="5"
                  bg="#2447F9"
                  color="white"
                  borderRadius="2xl"
                  mt="16"
                >
                  <Text>
                    Dapatkan lebih banyak poin untuk buka akses ke artikel
                    premium
                  </Text>
                </Box>
              )
            ) : (
              <Prose>
                <RichText content={article.content.raw} />
              </Prose>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default ContentArticle;