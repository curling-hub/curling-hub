import React,{ useState } from 'react'
import Head from 'next/head'
import type { GetServerSideProps, NextPage } from 'next'
import {
    Box,
    Link as ChakraLink,
    Input,
    Stack,
    VStack,
    HStack,
    Button,
    Radio,
    RadioGroup,
    useRadio,
    useRadioGroup,
    Text,
    Checkbox,
    Flex,
    FormControl,
    FormHelperText,
    FormErrorMessage,
    FormLabel, 
    Textarea,
} from '@chakra-ui/react'

{/*import * as React from "react";*/}
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

{/*import DatePicker from "react-date-picker";*/}
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

import {
    Select,
    OptionBase,
    GroupBase,
    ActionMeta,
    MultiValue
} from "chakra-react-select"
import { object, string, boolean, number, array } from 'yup';
import { Field, Form, Formik, FieldProps, FieldArray, FieldArrayRenderProps } from 'formik';
import { RowDataPacket } from 'mysql2';
import { useRouter } from 'next/router';
import internal from 'stream'
import { IntegerDataType } from 'sequelize/types'

interface Data {
    categories: RowDataPacket
/*props: Data*/
}

const MatchDate = () => {
    const[startDate,setStartDate] = useState(new Date());
    return (
        <DatePicker 
            selected={startDate} 
            onChange={(date:Date) => setStartDate(date)} />    
    );
};

function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getCheckboxProps()
  
    return (
      <Box as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='2px'
          borderRadius='35px'
          boxShadow='md'

          _checked={{
            bg: 'gray',
            color: 'black',
            fontWeight: 'bold',
            borderColor: 'teal.600',
          }}
          _focus={{
            boxShadow: 'outline',
          }}
          px={7}
          py={3}
          margin='0px 20px'
        >
          {props.children}
        </Box>
      </Box>
    )
  }

  function Example() {
    const options = ['Win', 'Lose', 'Tie']
    
    const { getRootProps, getRadioProps } = useRadioGroup({
    
      name: 'result',
      defaultValue: 'Win',
      onChange: console.log,
    })

  
    const group = getRootProps()
  
    return (
      <HStack {...group}
         >
        {options.map((value) => {
          const radio = getRadioProps({ value })
          return (
            <RadioCard key={value} {...radio}
               
                >
              {value}
            </RadioCard>
          )
        })}
      </HStack>
    )
  }
  


const HostAddMatch: NextPage = () => {
   {/*Form Stuff*/}  
   const router = useRouter()
    const [selectedDate, setSelectedDate] = useState <Date | null> (new Date());
  
    const teams = [
      "USA Team",
      "Canada Team",
      "Placeholder Until ServerBase",
    ];

  {/*}  const submit = async (values: {
        date: string,
        team1: string,
        team2: string,
        winner: number,
        location: string,
        sheet: string,
        categories: Array<{value: number, label: string}>,
        comment: string

    })*/}

    return( 
        <>
            <Head><title>Host Add Match | Curlo</title></Head>
    {/*Basic Stuff*/}
                    
            <Box
                    position="relative"
                    w="100%"
                    minH="100vh"
                    minW="md"
                    bgGradient="linear-gradient(#735FED, #FFFFFF) repeat"
                    paddingTop = '3%'
            >
                 {/*Details Inside Box*/}
                <Box
                   // alignItems={"center"}
                    bg="primary.white"
                    h="750px"
                    w="90%"
                    marginLeft = "5%"
                    paddingLeft = "10%"
                    borderRadius="35px"
                    >
                        <Text
                        textAlign={"center"}
                        paddingTop= '2%'
                        marginRight = '5%'
                        fontSize = '50px'
                        fontWeight = 'bold'
                        paddingBottom= '3%'
                        >Add Match</Text>
                    <HStack>
                        <Example/>
                    <DatePicker 
                        selected={selectedDate} onChange={date => setSelectedDate(date)} /> 
                    </HStack>
                    <HStack>
                      <Flex pt="30" justify="left" align="left" w="full">
                      <FormControl w="60">
                        <FormLabel>Team 1</FormLabel>
                        <AutoComplete openOnFocus>
                          <AutoCompleteInput variant="filled" />
                          <AutoCompleteList>
                            {teams.map((teamname, team_id) => (
                              <AutoCompleteItem
                                key={`option-${team_id}`}
                                value={teams}
                                textTransform="capitalize"
                              >
                                {teams}
                              </AutoCompleteItem>
                            ))}
                          </AutoCompleteList>
                        </AutoComplete>
                       
                      </FormControl>
                    </Flex>
                    <Flex pt="30" justify="left" align="right" w="full">
                      <FormControl w="60">
                        <FormLabel>Team 2</FormLabel>
                        <AutoComplete openOnFocus>
                          <AutoCompleteInput variant="filled" />
                          <AutoCompleteList>
                            {teams.map((teamname, team_id) => (
                              <AutoCompleteItem
                                key={`option-${team_id}`}
                                value={teams}
                                textTransform="capitalize"
                              >
                                {teams}
                              </AutoCompleteItem>
                            ))}
                          </AutoCompleteList>
                        </AutoComplete>
                       
                      </FormControl>
                    </Flex>
                  </HStack>            
                  <HStack>
                  <Flex pt="30" justify="left" align="left" w="full">
                      <FormControl w="60">
                        <FormLabel>Location</FormLabel>
                        <AutoComplete openOnFocus>
                          <AutoCompleteInput variant="filled" />
                          <AutoCompleteList>
                            {teams.map((teamname, team_id) => (
                              <AutoCompleteItem
                                key={`option-${team_id}`}
                                value={teams}
                                textTransform="capitalize"
                              >
                                {teams}
                              </AutoCompleteItem>
                            ))}
                          </AutoCompleteList>
                        </AutoComplete>
                       
                      </FormControl>
                      </Flex>
                      <Flex pt="30" justify="left" align="left" w="full">
                      <FormControl w="60">
                        <FormLabel>Sheet of Ice</FormLabel>
                        <AutoComplete openOnFocus>
                          <AutoCompleteInput variant="filled" />
                          <AutoCompleteList>
                            {teams.map((teamname, team_id) => (
                              <AutoCompleteItem
                                key={`option-${team_id}`}
                                value={teams}
                                textTransform="capitalize"
                              >
                                {teams}
                              </AutoCompleteItem>
                            ))}
                          </AutoCompleteList>
                        </AutoComplete>
                      </FormControl>
                    </Flex>
                    </HStack>
                  
                  <Textarea
                  marginTop = '3%'
                   placeholder='Comments'/>


                   <Button > Add Match Result </Button> 

                </Box>{/*Details Inside Box*/}
            




            </Box> {/*Background Box*/}
        </>
    )
}

export default HostAddMatch

{/*<FormHelperText>Who do you support.</FormHelperText>*/}