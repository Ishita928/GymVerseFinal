import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';

import { Routes, Route, Link } from "react-router-dom";
import {
  Flex,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  VStack,
  Heading,
  Text,
  Box,
  Button,
  Select,
  useToast
} from '@chakra-ui/react';
import { useAuth } from '@clerk/clerk-react';
import { userProfile, updateDoctorProfile } from '../../utils/fetchData';

const ProfilePage = () => {
  const toast = useToast()

  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    profileImg: '',
    name: '',
    email: '',
    // documents: '',
    experience: '',
    qualifications: '',
    specialization: '',
  });

  const fetchUserProfile = useCallback(async () => {
    const token = await getToken();
    const response = await userProfile(token, user?.id);


    setProfileData(response);
    setFormData({
      profileImg: response.doctorId.profileImg,
      name: response.doctorId.name,
      email: response.email,
      // documents: response.doctorId.documents,
      experience: response.doctorId.experience,
      qualifications: response.doctorId.qualifications,
      specialization: response.doctorId.specialization,
    });
  }, [getToken, user?.id])

  useEffect(() => {
    fetchUserProfile();
    console.log(profileData)
  }, [getToken, user?.id,profileData, fetchUserProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsEditing(true);
  };

  const handleEditProfile = async () => {
    console.log('Edited Profile Data:', formData);
    const token = await getToken();
    const responsePromise = updateDoctorProfile(token, user?.id, formData);
    toast.promise(responsePromise, {
      error: { title: 'There was an error updating your profile' },
      loading: { title: 'Your profile is updating' },
      success: { title: "Profile Updated successfully" }
    })
    const response = await responsePromise;

    console.log(response)
    // Here you would typically send the updated data to your backend
  };

  if (!isLoaded || !profileData) {
    return (
      <Flex justify="center" align="center" height="100vh" bg="gray.900">
        <Spinner size="xl" color="white" />
      </Flex>
    );
  }

  return (
    <>
      {profileData?.isDoctor === true ? (
        <>
          <Text color={'white'} textAlign={'center'} fontSize={'25px'}>
            Profile Information
          </Text>
          <Box bg="gray.700" p={6} rounded="md" w="50%" mx="auto">
            <VStack spacing={4} align="flex-start">
              <Flex align="center">
                <Avatar src={formData.profileImg} size="xl" mr={4} />
                <VStack align="flex-start">
                  <Heading color="white" size="md">
                    {formData.name}
                  </Heading>
                  <Text color="gray.300">{formData.email}</Text>
                </VStack>
              </Flex>
              <FormControl>
                <FormLabel color="white">Full Name</FormLabel>
                <Input
                  name="fullname"
                  value={formData.name}
                  onChange={handleInputChange}
                  bg="white"
                />
              </FormControl>
              <FormControl>
                <FormLabel color="white">Email</FormLabel>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  bg="white"
                  isDisabled={true}
                />
              </FormControl>
              <FormControl>
                <FormLabel color="white">Experience</FormLabel>
                <Input
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  bg="white"
                />
              </FormControl>
              <FormControl>
                <FormLabel color="white">Qualifications</FormLabel>
                <Input
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleInputChange}
                  bg="white"
                />
              </FormControl>
              <FormControl>
                <FormLabel color="white">Specialization</FormLabel>
                <Select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  bg="white"
                >
                  <option value="Pediatric Nutrition">Pediatric Nutrition</option>
                  <option value="Sports Nutrition">Sports Nutrition</option>
                  <option value="Weight Management">Weight Management</option>
                  <option value="General Physician">General Physician</option>
                  <option value="Public Health Nutrition">Public Health Nutrition</option>
                  <option value="Clinical Dietetics">Clinical Dietetics</option>
                </Select>
              </FormControl>
              <Button
                colorScheme="blue"
                onClick={handleEditProfile}
                isDisabled={!isEditing}
              >
                Edit Profile
              </Button>
            </VStack>
          </Box>
        </>
      ) : (
        <section className="relative bg-cover bg-center text-white h-screen" style={{ backgroundImage: 'url(path-to-your-image.jpg)' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 container mx-auto text-center py-40">
        <h1 className="text-5xl font-bold mb-4 text-[#f7f2ee]">Welcome to GymVerse</h1>
        <p className="text-xl mb-6 text-[#f7f2ee]">Your Trusted Health Partner for Appointments and Doctor Services</p>
        
      </div>
    
       
    </section>
      )}
    </>
  );
  
};

export default ProfilePage;
