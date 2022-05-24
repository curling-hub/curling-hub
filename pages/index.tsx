import type { NextPage } from "next";
import Head from "next/head";
import { REG_BUTTON_FONT_SIZE, CONST_BORDER_RADIUS } from "../themes/constants";
import StandardLayout from "../components/layouts/StandardLayout";
import { Box, Button, Text, Flex, Spacer, Link } from "@chakra-ui/react";
import Footer from "../components/footer/footer";
import { getSession } from '../lib/auth/session'
import { serverSideRedirectTo } from '../lib/auth/redirect'
import type { GetServerSideProps } from 'next'
import TeamLayout from '../components/layouts/TeamLayout'
import { AccountType } from "../lib/models/accountType";
import { getTeamIdByUserId } from "../lib/handlers/teams";
import { getHostIdByUserId } from "../lib/handlers/hosts";
import AdminLayout from "../components/layouts/AdminLayout";
import HostLayout from "../components/layouts/HostLayout";
import StatusBanner from "../components/host/status/statusBanner";
import RequestModal from "../components/modals/RequestModal";
import { useState } from "react";

function landingPageLayout(accountType?: AccountType, id?: number | null) {
  switch (accountType) {
    case AccountType.ADMIN:
      return <AdminLayout />
    case AccountType.HOST:
      return <HostLayout hostId={id} />
    case AccountType.TEAM:
      return <TeamLayout teamId={id} />
    default:
      return <StandardLayout />
  }
}

const LandingPage: NextPage<LandingPageProps> = (props: LandingPageProps) => {
  const {
    regStatus,
    accountType,
    id,
  } = props

  const [showStatusModal, setShowStatusModal] = useState(false)
  const [showBanner, setShowBanner] = useState(!regStatus)

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
        <StatusBanner
            isOpen={showBanner}
            onClose={() => setShowBanner(false)}
            openModal={() => setShowStatusModal(true)}
        />
        {landingPageLayout(accountType, id)}
        <RequestModal
            isOpen={showStatusModal}
            onClose={() => setShowStatusModal(false)}
        />
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
export interface LandingPageProps {
  regStatus: boolean
  accountType?: AccountType
  id?: number | null
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { signedIn, signedUp, session } = await getSession(context)

  if (!signedIn) {
    return { props: { regStatus: true } }
  } else if ((!signedUp || !session) && !(session && session.user.account_type == AccountType.HOST)) { //Partially setup account
    return serverSideRedirectTo('/new-team')
  }

  const userId = session.user.id
  switch (session.user.account_type) {
    case AccountType.ADMIN:
      return {
        props: { regStatus: true, accountType: AccountType.ADMIN }
      }
    case AccountType.HOST:
      const hostId = await Promise.all([getHostIdByUserId(userId)])
      const setUpComplete = signedUp && session
      return {
        props: { regStatus: setUpComplete, accountType: AccountType.HOST, id: hostId }
      }
    case AccountType.TEAM:
      const teamId = await Promise.all([getTeamIdByUserId(userId)])
      return {
        props: { regStatus: true, accountType: AccountType.TEAM, id: teamId }
      }
  }
  return {
    props: {}
  }
}
export default LandingPage;
