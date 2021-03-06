import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stat,
  StatHelpText,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "redux/hooks";

const HeroSection = () => {
  const navigate = useNavigate();
  const { uid } = useAppSelector((state) => state.userProfile);

  const handleExploreButton = () => {
    uid ? navigate("/explore") : navigate("/login");
  };

  return (
    <Flex
      as={Container}
      direction={{ base: "column", md: "column", lg: "row" }}
      alignItems="center"
      maxW="6xl"
      pt="16"
      pb="5%"
    >
      <Box
        w={{ base: "100%", md: "100%", lg: "50%" }}
        pr={{ base: "0", md: "0", lg: "6" }}
        pb={{ base: "16", md: "16", lg: "0" }}
      >
        <Heading
          as="h1"
          size="2xl"
          mb="6"
          letterSpacing="wide"
          lineHeight="shorter"
        >
          Explorasi Berbagai Artikel Menarik Di Literanian
        </Heading>
        <Text fontWeight={400} fontSize="md" mb="6">
          Baca artikel dan kerjakan kuis untuk kumpulkan poin. Penuhi target dan
          dapatkan akses untuk artikel premium
        </Text>

        <Button size="lg" onClick={handleExploreButton} bgColor={"#2447F9"}>
          Eksplorasi sekarang!
        </Button>
        <Flex mt="12">
          <Stat>
            <StatNumber>100+</StatNumber>
            <StatHelpText>Pengguna</StatHelpText>
          </Stat>
          <Stat>
            <StatNumber>10</StatNumber>
            <StatHelpText>Artikel</StatHelpText>
          </Stat>
          <Stat>
            <StatNumber>5</StatNumber>
            <StatHelpText>Kontributor</StatHelpText>
          </Stat>
        </Flex>
      </Box>
      <Box w={{ base: "100%", md: "100%", lg: "60%" }}>
        <Image
          src="/images/hero.webp"
          alt="Hero image"
          borderRadius="xl"
          w="full"
          h={["240px", "400px"]}
          objectFit="cover"
        />
      </Box>
    </Flex>
  );
};

export default HeroSection;
