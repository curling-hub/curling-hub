import type { NextPage } from "next";
import Head from "next/head";
import { REG_BUTTON_FONT_SIZE, CONST_BORDER_RADIUS } from "../themes/constants";
import StandardLayout from "../components/layouts/StandardLayout";
import { Box, Button, Text, Flex, Spacer, Link, propNames } from "@chakra-ui/react";
import Footer from "../components/footer/footer";
import { useSession } from 'next-auth/react'
import { getSession } from '../lib/auth/session'
import { serverSideRedirectTo } from '../lib/auth/redirect'
import type { GetServerSideProps } from 'next'
import TeamLayout from '../components/layouts/TeamLayout'
import HostLayout from "../components/layouts/HostLayout";
import AdminLayout from "../components/layouts/AdminLayout"
import { AccountType } from "../lib/models/accountType";
import { getHostInfoById, isHostAdmin } from "../lib/handlers/hosts";
import { getAllTeams } from "../lib/handlers/teams";

export interface loggedInProps {
  isLoggedIn: boolean
  accountType: string
  id: number
}

function getNavType(id: number, accountType: string) {
  if (accountType == 'host') {
    return <HostLayout hostId={id} />
  }
  else if (accountType == 'admin') {
    return <AdminLayout />
  }
  else if (accountType == 'team') {
    return <TeamLayout />
  }
}


const Home: NextPage<loggedInProps> = (props: loggedInProps) => {
  const { data: session } = useSession()



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
        {session ? getNavType(props.id, props.accountType) : <StandardLayout />}


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








export const getServerSideProps: GetServerSideProps = async (context) => {
  const { signedIn, signedUp, session } = await getSession(context)
  if (!session) {
    return serverSideRedirectTo('/login')
  }
  //const accountType: string = session.user.account_type as string

  if (!signedIn) {// not signed in 
    return {
      props: { isLoggedIn: false, session: null, accountType: null }
    }
  }
  else {
    const { params } = context
    if (!params) {
      return { notFound: true }
    }
    const idStr = Array.isArray(params.id) ? params.id[0] : params.id
    if (!idStr) {
      return { notFound: true }
    }
    const hostId = Number.parseInt(idStr)
    const userId = session.user.id
    // TODO: redirect on error?
    try {
      const [teams, hostInfo, hasPermission] = await Promise.all([
        getAllTeams(),
        getHostInfoById(hostId),
        isHostAdmin(userId, hostId),
      ])
      if (!hasPermission) {
        return { notFound: true }
      }
      //console.log({ teams, hostInfo })

      if (session.user.account_type == AccountType.ADMIN) {
        return {
          props: { isLoggedIn: true, session: session, accountType: 'admin' }
        }
      }

      else if (session.user.account_type == AccountType.TEAM) {
        return {
          props: { isLoggedIn: true, session: session, accountType: 'team' }
        }
      }

      else if (session.user.account_type == AccountType.HOST) {
        return {
          props: { isLoggedIn: true, session: session, accountType: 'host', id: hostId }
        }
      }

    } catch (error) {
      console.log(error)
    }
    return { props: {} }
  }
}

export default Home;
