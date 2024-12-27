import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import docc from '../media/d7f7162e-dc17-4d04-a293-09fc1e391a7a.jpg';
import stes from '../media/4495ad2289ec337e13538153883ee24a.png'

import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

const AppointmentHero = () => {
  const {isSignedIn } = useUser();
  const navigate = useNavigate();
  
  const handleBooking = () => {
    if (isSignedIn) {
      navigate('/profile/home');
    } else {
      navigate('/login');
    }
  };

  // Adjust responsive behavior for text and image sizes
  const textAlign = useBreakpointValue({ base: 'center', md: 'left' });


  return (
    <Box 
    className='back'
      minH="100vh"
    //   bg={useColorModeValue('gray.800', 'gray.900')}
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        maxW="1200px"
        mx="auto"
        spacing={6}
      >
       
        <Stack
          flex={1}
          spacing={6}
          textAlign={textAlign}
          p={{ base: 4, md: 6 }}
          justify="center"
        >
        
        <Heading as="h1" size="2xl" color="black" position="relative">
  <img
    src={stes}
    alt="doc"
    width="120px"
    style={{
      position: "absolute",
      top: -45, // Adjust as needed
      left: 520, // Adjust as needed
      zIndex: 0, // Ensure image is behind the text
    }}
  />
  <span style={{ position: "relative", zIndex: 1 }}>
    Your Journey to Wellness Starts Here!
  </span>
</Heading>


          
          <Text fontSize="l" className='doc-text  special-heading '>
          You deserve to feel good in your skin all month long, and if you don’t, let’s change that! Our mission is to get to the bottom of chronic skin issues so you can heal your skin (and body!) for the long haul. 
          </Text>
          <div 
  className='inline-flex w-[40%] items-center justify-center px-5 py-3 text-base font-medium text-white bg-[#c49782] border border-gray-300 rounded-lg hover:bg-[#b08070]'
  size="lg"
  onClick={handleBooking}
  alignSelf={{ base: 'center', md: 'start' }}
>
  Book A Dietitian Today
</div>

        </Stack>
        <Box flex={1}>
        <img
            src={docc}
            alt="doc"
          className='rounded-l-full'
          />
        </Box>
       
      </Flex>
    </Box>
  );
};

export default AppointmentHero;
