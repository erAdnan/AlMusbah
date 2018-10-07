import React from 'react';
import {
  Container, Content, Text, H2, Label, Input, Form, View, Header, Button,
} from 'native-base';
import Spacer from './Spacer';
import { Actions } from 'react-native-router-flux';

const Home = () => {
  const onSignUp = () => Actions.signUp();
  const onSignIn = () => Actions.login();
  return (
    <Container style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Content padder >

            <View>
              <H2>Welcome to Al-Musbah</H2>
              <Spacer size={20} />
              <Button block onPress={onSignUp}>
              <Text>
                Sign Up
              </Text>
            </Button>
            <Spacer size={5} />
            <Button block onPress={onSignIn}>
              <Text>
                Sign In
              </Text>
            </Button>
           </View>
        </Content>
      </Container>
  )
};

export default Home;
