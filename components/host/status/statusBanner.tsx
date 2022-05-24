import {
    Box,
    Button,
    CloseButton,
    Icon,
    Square,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { FiInfo } from 'react-icons/fi'

interface StatusBannerProps {
  isOpen: boolean,
  onClose: () => void
  openModal: () => void
}

function StatusBanner(props: StatusBannerProps)  {
    const isMobile = useBreakpointValue({ base: true, md: false })
    const { isOpen, onClose, openModal } = props

    return (
      <>
      { isOpen &&
      <Box 
        as="section" 
        color="black"
        backgroundColor='white'
      >
        <Box 
          bg="bg-surface" 
          boxShadow='xl'
          py={{ base: '4', md: '2.5' }} 
        >
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              justify="space-between"
              spacing={{ base: '3', md: '2' }}
            >
              <Stack
                spacing="2"
                direction={{ base: 'column', md: 'row' }}
                align={{ base: 'start', md: 'center' }}
              >
                {!isMobile && (
                  <Square size="12" bg="bg-subtle" borderRadius="md">
                    <Icon as={FiInfo} boxSize="6" />
                  </Square>
                )}
                <Stack
                  direction={{ base: 'column', md: 'row' }}
                  spacing={{ base: '2.5', md: '3.5' }}
                  pe={{ base: '4', sm: '0' }}
                >
                  <Text fontWeight="bold">Your account request is currently under review.</Text>
                  <Button 
                    variant="link" 
                    color='black'
                    onClick={openModal}
                  >
                      Curlo Account Verification Process
                  </Button>
                </Stack>
              </Stack>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                spacing={{ base: '3', sm: '2' }}
                align={{ base: 'stretch', sm: 'center' }}
                paddingEnd='2'
              >
                <CloseButton 
                  display={{ base: 'none', sm: 'inline-flex' }} 
                  onClick={onClose}
                />
              </Stack>
            </Stack>
        </Box>
      </Box>
      }
      </>
    )
  }

  export default StatusBanner