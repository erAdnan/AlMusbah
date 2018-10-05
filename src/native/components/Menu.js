import React from 'react';
import {View, Text,ImageBackground,Linking} from 'react-native';
import {Actions} from 'react-native-router-flux'
import {
 Content,List,ListItem,Thumbnail,Left,Body,Button,Icon
} from 'native-base';
import Spacer from './Spacer';

const Menu = () => (

  <View style={{flex:1}}>

        <View style={{flex:1}}>
        <Content>
        <List>
            <ListItem onPress={() => Actions.updateProfile()} icon>
                <Left>
                    <Icon active name="contact"  />
                </Left>
                <Body>
                <Text >Profile</Text>
                </Body>
            </ListItem>
            <ListItem onPress={() => Actions.login()} icon>
                <Left>

                    <Icon active name="power" />

                </Left>
                <Body>
                <Text >Sign In</Text>
                </Body>
            </ListItem>
            <ListItem onPress={() => Actions.signUp()} icon>
                <Left>

                    <Icon active name="add-circle"  />

                </Left>
                <Body>
                <Text >Sign Up</Text>
                </Body>
            </ListItem>
            <ListItem onPress={() => Actions.home()} icon>
                <Left>

                    <Icon active name="power"  />

                </Left>
                <Body>
                <Text >Log Out</Text>
                </Body>
            </ListItem>
        </List>
        </Content>
        </View>
    </View>

);

export default Menu;
