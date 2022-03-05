import Head from "next/head";
import StandardLayout from "../components/layouts/StandardLayout";
import {
  Box,
  Button,
  Text,
  Flex,
  Spacer,
  Center,
  Link,
} from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home | Curlo</title>
      </Head>
      <Box
        position="absolute"
        w="100%"
        h="100vh"
        minW="md"
        bgGradient="linear-gradient(primary.purple, primary.white)"
      >
        <StandardLayout />
        {/*Card Container Box*/}
        <Flex
          alignItems="center"
          //marginLeft={{base:"0",md:"12.5%",lg:"25%"}}
          //        justify ="center"
          direction={{ base: "column", md: "row" }}
        >
          <Spacer />
          <Center>
            <Box
              display="inline-block"
              background="primary.white"
              alignItems="center"
              padding="1rem"
              borderRadius="35px"
              marginTop={"7%"}
              textAlign="center"
              boxShadow="lg"
              width="320px"
              height="525px"
              //     marginBottom={{md:'50px' }}>
            >
              <Text fontSize="2.5rem" marginTop="5px" fontWeight="bold">
                Get Started
              </Text>

              <Text fontSize="1.4rem" marginX="20px">
                Want to join a local <br></br>
                curling club? Join <br></br>today!
              </Text>

              <Link href="/signup">
                <Button
                  background="primary.green"
                  borderRadius="35px"
                  padding="25px 30px"
                  fontSize="19px"
                  boxShadow="md"
                  marginTop="24vh"
                  marginRight="10px"
                >
                  Sign Up
                </Button>
              </Link>

              <Link href="/about">
                <Button
                  background="primary.green"
                  borderRadius="35px"
                  padding="25px 30px"
                  fontSize="19px"
                  boxShadow="md"
                  marginTop="24vh"
                >
                  More Info
                </Button>
              </Link>
            </Box>{" "}
            {/*Card1}*/}
          </Center>
          <Spacer />
          <Center>
            {/*Card 2 */}
            <Box
              display="inline-block"
              background="primary.white"
              alignItems="center"
              padding="0.9rem 0.9rem 0.9rem 0.9rem"
              borderRadius="35px"
              marginTop={"7%"}
              boxShadow="lg"
              width="320px"
              height="525px"
              //             marginLeft={{base:"0%",md:"0%",lg:"25%"}}

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
              <br></br>

              <span>
                <Link href="/ratings">
                  <Button
                    background="#7FD6A4"
                    borderRadius="full"
                    //            marginTop={{base:"0",md:"17.5vh",lg:"35vh"}}
                    marginTop="22vh"
                    padding="25px 99px"
                    fontSize="19px"
                  >
                    <b>Ratings</b>
                  </Button>
                </Link>
              </span>
            </Box>{" "}
            {/*Card2}*/}
          </Center>
          <Spacer />
        </Flex>{" "}
        {/*Card Container*/}
      </Box>
    </>
  );
};

export default Home;
