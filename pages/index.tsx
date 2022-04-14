import type { NextPage } from "next";
import Head from "next/head";
import { REG_BUTTON_FONT_SIZE, CONST_BORDER_RADIUS } from "../themes/constants";
import StandardLayout from "../components/layouts/StandardLayout";
import { Box, Button, Text, Flex, Spacer, Link } from "@chakra-ui/react";
import Footer from "../components/footer/footer";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | Curlo</title>
      </Head>
      <Box
        position="relative"
        w="100%"
        minH="100vh"
        bgGradient="linear-gradient(primary.purple, primary.white)"
      >
        <StandardLayout />
        <Box paddingBottom="4rem">

          {/*Card Container Box*/}
          <Flex alignItems="center" direction={{ base: "column", md: "row" }}>
            <Spacer />
            <Box
              background="primary.white"
              alignItems="center"
              padding="1rem"
              borderRadius={CONST_BORDER_RADIUS}
              marginTop="2%"
              marginBottom="50px"
              textAlign="center"
              boxShadow="lg"
              width="320px"
              height="550px"
            >
              <Text fontSize="2.5rem" marginTop="5px" fontWeight="bold">
                Get Started
              </Text>

              <Text fontSize="1.3rem" marginX="20px">
                Want to join a local
                <br />
                curling club?
                <br />
                Join today!
              </Text>

              <Box marginTop="308px">
                <Link href="/signup">
                  <Button
                    background="primary.green"
                    borderRadius="full"
                    padding="25px 30px"
                    fontSize={REG_BUTTON_FONT_SIZE}
                    boxShadow="md"
                    marginRight="10px"
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    background="primary.green"
                    borderRadius="full"
                    padding="25px 30px"
                    fontSize={REG_BUTTON_FONT_SIZE}
                    boxShadow="md"
                  >
                    More Info
                  </Button>
                </Link>
              </Box>
            </Box>{" "}
            {/*Card1}*/}
            <Spacer />
            {/*Card 2 */}
            <Box
              background="primary.white"
              alignItems="center"
              padding="0.9rem 0.9rem 0.9rem 0.9rem"
              borderRadius={CONST_BORDER_RADIUS}
              marginTop="2%"
              marginBottom="50px"
              boxShadow="lg"
              width="320px"
              height="550px"
              textAlign="center"
            >
              <Text fontSize="2.5rem" marginTop="5px" fontWeight="bold">
                Ratings
              </Text>
              <Text fontSize="1.3rem" marginX="20px">
                Want to see the top teams <br></br>
                in the world? Check out <br></br>
                the ratings below.
              </Text>
              <Box marginTop="308px">
                <Link href="/ratings">
                  <Button
                    background="primary.green"
                    borderRadius="full"
                    boxShadow="md"
                    padding="25px 108px"
                    fontSize={REG_BUTTON_FONT_SIZE}
                  >
                    Ratings
                  </Button>
                </Link>
              </Box>
            </Box>{" "}
            {/*Card2}*/}
            <Spacer />
          </Flex>{" "}
          {/*Card Container*/}
        </Box>
        <Footer />
      </Box>
    </>
  );
};
export default Home;
