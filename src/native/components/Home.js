import React from 'react';
import {
  Container, Content, Text, H1, Label, Input, Form, View, Header, Button,
} from 'native-base';
import Spacer from './Spacer';
import { Actions } from 'react-native-router-flux';

const Home = () => {
  const onSignUp = () => Actions.signUp();
  const onSignIn = () => Actions.login();
  return (
    <Container>
        <Content>

            <Spacer size={20} />
            <View padder style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <H1>Welcome to Almushbah</H1>
              <Spacer size={20} />
              <Button block onPress={onSignUp}>
              <Text>
                Sign Up
              </Text>
            </Button>
            <Spacer size={20} />
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
