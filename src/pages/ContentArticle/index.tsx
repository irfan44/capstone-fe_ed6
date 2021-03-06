import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import {
  fetchArticleBySlug,
  fetchArticlesByCategory,
  fetchBasicArticlesByCategory,
} from "api/graphcms";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { ArticleContent, ArticleData } from "types/article";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import formatDate from "utils/formatDate";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "redux/hooks";
import Quiz from "components/Quiz";
import { checkPoints } from "utils/handleUser";
import ArticleCard from "components/ArticleCard";

const ContentArticle = () => {
  const [article, setArticle] = useState<ArticleContent>();
  const [relatedArticles, setRelatedArticles] = useState<ArticleData[]>([]);
  const [isClaimable, setIsClaimable] = useState(false);
  const { uid } = useAppSelector((state) => state.userProfile);
  const { premium, points } = useAppSelector((state) => state.userStatus);
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

  const getRelatedArticles = async () => {
    if (article !== undefined) {
      try {
        if (premium) {
          const articles = await fetchArticlesByCategory(article.category);
          const slicedArticles = articles.slice(0, 4);
          setRelatedArticles(slicedArticles);
        } else {
          const articles = await fetchBasicArticlesByCategory(article.category);
          const slicedArticles = articles.slice(0, 4);
          setRelatedArticles(slicedArticles);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setRelatedArticles([]);
    }
  };

  const checkingPoints = () => {
    const check = points !== null && checkPoints(points);
    setIsClaimable(check);
  };

  const date = article && formatDate(article.createdAt);
  const articlePremium = article && article.articleType === "premium";

  useEffect(() => {
    getArticleContent();
    checkingPoints();
    if (!uid) {
      navigate("/login");
    }
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    getRelatedArticles();
    document.title = `${article?.title || "memuat.."} | Literanian`;
  }, [article]);

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
              {articlePremium && (
                <>
                  <Text fontSize="sm">|</Text>
                  <Badge mb="2" variant="solid" colorScheme="yellow">
                    Premium
                  </Badge>
                </>
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
                <>
                  <Prose>
                    <RichText content={article.content.raw} />
                  </Prose>
                  {isClaimable ? (
                    <Box
                      bg="#2447F9"
                      color="white"
                      px="5"
                      py="10"
                      borderRadius="2xl"
                      mt="16"
                    >
                      <Heading size="lg" mb="6">
                        Kamu belum klaim akun premium!
                      </Heading>
                      <Text mb="4">
                        Kembali ke halaman ekplorasi untuk klaim akun premium
                      </Text>
                      <Button
                        variant="outline"
                        colorScheme="white"
                        onClick={() => navigate("/explore")}
                      >
                        Kembali ke Eksplorasi
                      </Button>
                    </Box>
                  ) : article.quiz !== null ? (
                    <Quiz quiz={article.quiz} />
                  ) : (
                    <Box
                      bg="#2447F9"
                      color="white"
                      px="5"
                      py="10"
                      borderRadius="2xl"
                      mt="16"
                    >
                      <Heading size="lg">Tidak ada kuis di artikel ini</Heading>
                    </Box>
                  )}
                </>
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
              <>
                <Prose>
                  <RichText content={article.content.raw} />
                </Prose>
                {isClaimable ? (
                  <Box
                    bg="#2447F9"
                    color="white"
                    px="5"
                    py="10"
                    borderRadius="2xl"
                    mt="16"
                  >
                    <Heading size="lg" mb="6">
                      Kamu belum klaim akun premium!
                    </Heading>
                    <Text mb="4">
                      Kembali ke halaman ekplorasi untuk klaim akun premium
                    </Text>
                    <Button
                      variant="outline"
                      colorScheme="white"
                      onClick={() => navigate("/explore")}
                    >
                      Kembali ke Eksplorasi
                    </Button>
                  </Box>
                ) : article.quiz !== null ? (
                  <Quiz quiz={article.quiz} />
                ) : (
                  <Box
                    bg="#2447F9"
                    color="white"
                    px="5"
                    py="10"
                    borderRadius="2xl"
                    mt="16"
                  >
                    <Heading size="lg">Tidak ada kuis di artikel ini</Heading>
                  </Box>
                )}
              </>
            )}
            <Heading mt="16" size="lg">
              Artikel rekomendasi
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing="6" mt="6">
              {relatedArticles.map((article) => {
                return <ArticleCard key={article.slug} {...article} />;
              })}
            </SimpleGrid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default ContentArticle;
