import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';


import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../components/Profile';

import MenuComponent from '../components/Menu';
import HomeComponent from '../components/Home';

const MenuIcon = () => (
  <Icon name="menu" size={30} />
);

const Index = (
  <Stack hideNavBar>
    <Scene
      key="home"
      {...DefaultProps.navbarProps}
      component={HomeComponent}
      Layout={LoginComponent}
    />
    <Scene
      key="drawer"
      drawer
      contentComponent={MenuComponent}
      drawerIcon={MenuIcon}
      drawerWidth={300}
    >

      <Scene
        key="updateProfile"
        title="UPDATE PROFILE"
        {...DefaultProps.navbarProps}
        component={UpdateProfileContainer}
        Layout={UpdateProfileComponent}
      />
    </Scene>
    <Scene
      back
      hideNavBar={false}
      key="login"
      title="LOGIN"
      {...DefaultProps.navbarProps}
      component={LoginContainer}
      Layout={LoginComponent}
    />
    <Scene
      back
      hideNavBar={false}
      key="signUp"
      title="SIGN UP"
      {...DefaultProps.navbarProps}
      component={SignUpContainer}
      Layout={SignUpComponent}
    />
  </Stack>
);

export default Index;
