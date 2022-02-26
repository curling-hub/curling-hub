import type { NextPage } from 'next'
import Head from 'next/head'
import StandardLayout from '../components/layouts/StandardLayout'
import { Box } from "@chakra-ui/react"
import {Button} from "@chakra-ui/react"
import {Text} from "@chakra-ui/react"
import{Flex, Spacer} from "@chakra-ui/react"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | Curlo</title>
      </Head>
      <div style={{
        background: "linear-gradient(#735FED, #FFFFFF)",
        height: "100vh",
        width: '100%'
      }}>

        <StandardLayout />
        {/*Card Container Box*/}
      <Flex display="wrap" 
        alignItems="center"
        marginLeft={{base:"0",md:"12.5%",lg:"25%"}}

        justify ="center">
        
        
        <Box display="inline-block" 
             background= "#FFFFFF" 
             alignItems="center" 
             padding="1rem"
             borderRadius="35px"
             marginTop={"7%"} 
             textAlign="center">
          <Text fontSize="2.5rem"
            marginTop="5px">
            <b>Get Started</b> 
          </Text>
          <Text fontSize = "1.4rem">
            Want to join a local <br></br>
            curling club? Join <br></br>today!
          </Text>
          <br></br>
          <span>
          <Button background="#7FD6A4" 
            borderRadius="35px"
            marginTop={{base:"0",md:"17.5vh",lg:"35vh"}}
            padding="25px"
            fontSize="19px">
            <b>Sign Up</b>
          </Button>
          </span>
          <span>
          <Button background="#7FD6A4" 
            borderRadius="35px"
            marginLeft="15px"
            marginTop={{base:"0",md:"17.5vh",lg:"35vh"}}
            padding="25px"
            fontSize="19px">
              <b>More Info</b>
            </Button>
          </span>    
        </Box> {/*Card1}*/}

        {/*Card 2 */}
        <Box display="inline-block" 
             background= "#FFFFFF" 
             alignItems="center" 
             padding="0.9rem 0.9rem 0.9rem 0.9rem"
             borderRadius="35px"
             marginTop={"7%"} 
   //          marginLeft="25%"
             marginLeft={{base:"0%",md:"12%",lg:"25%"}}
          //   marginRight={{base:"0",md:"5%",lg:"10%"}}
             textAlign="center">

          <Text fontSize="2.5rem"
            marginTop="5px">
            <b>Ratings</b> 
          </Text>
          <Text fontSize = "1.4rem">
            Want to see the top teams <br></br>
            in the world? Check out <br></br>
            the ratings below.
          </Text>
          <br></br>

          <span>
          <Button background="#7FD6A4" 
            borderRadius="35px"
            marginLeft="15px"
            marginTop={{base:"0",md:"17.5vh",lg:"35vh"}}
            padding="25px 99px"
            fontSize="19px">
              <b>Ratings</b>
            </Button>
          </span>    
        </Box> {/*Card2}*/}

      </Flex> {/*Card Container*/}
       </div>
      
    </>
  )
}

export default Home