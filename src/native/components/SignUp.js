import React from 'react';
import PropTypes from 'prop-types';
import { Image, ImageEditor, TouchableOpacity } from 'react-native';
import { ImagePicker } from 'expo';
import {
  Container, Content, Text, Form, Item, Label, Input, Button, DatePicker,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Messages from './Messages';
import Header from './Header';
import Spacer from './Spacer';
import * as AppHelper from '../../helper/appHelper';

class SignUp extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      qualification: '',
      workExperience: '',
      dateOfBirth: '',
      imageUrl: '',
      email: '',
      password: '',
      password2: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  handleSubmit = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then((storedData) => {
        console.log('handleSubmit storedData:', storedData);
        Actions.login()
      })
      .catch(e => console.log(`Error: ${e}`));
    // console.log('handleSubmit this.state:', this.state);
    // AppHelper.storeItem('signup_data', this.state)
    //   .then((storedData) => {
    //     console.log('handleSubmit storedData:', storedData);
    //     Actions.login()
    //   })
    //   .catch(e => console.log(`Error: ${e}`));  
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    
    if (result.cancelled) {
      console.log('got here');
      return;
    }

    let resizedUri = await new Promise((resolve, reject) => {
      ImageEditor.cropImage(result.uri,
        {
          offset: { x: 0, y: 0 },
          size: { width: result.width, height: result.height },
          displaySize: { width: 50, height: 50 },
          resizeMode: 'contain',
        },
        (uri) => resolve(uri),
        () => reject(),
      );
    });
    
    // this gives you a rct-image-store URI or a base64 image tag that
    // you can use from ImageStore

    this.setState({ imageUrl: resizedUri });
  };

  render() {
    const { loading, error } = this.props;

    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Header
            title="Welcome to AlMusbah"
          />

          {error && <Messages message={error} />}
          <TouchableOpacity onPress={this._pickImage} style={{justifyContent: 'center', alignItems: 'center'}} >
                  <Image
                    source={ this.state.imageUrl ? { uri: this.state.imageUrl } : require('../../images/icon_edit.png')}
                    style={{
                      height: 200,
                      width: 200,
                      resizeMode: 'contain'
                    }}
                  />
          </TouchableOpacity>

          <Form>
            <Item stackedLabel>
              <Label>
                First Name
              </Label>
              <Input onChangeText={v => this.handleChange('firstName', v)} />
            </Item>

            <Item stackedLabel>
              <Label>
                Last Name
              </Label>
              <Input onChangeText={v => this.handleChange('lastName', v)} />
            </Item>

            <Item stackedLabel>
              <Label>
                Qualification
              </Label>
              <Input onChangeText={v => this.handleChange('qualification', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>
                Work Experience (in year)
              </Label>
              <Input onChangeText={v => this.handleChange('workExperience', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>
                Date of Birth
              </Label>
              <DatePicker
                defaultDate={new Date(2018, 4, 4)}
                minimumDate={new Date(1950, 1, 1)}
                maximumDate={new Date(2050, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText='Select Date'
                textStyle={{ color: "black" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={v => this.handleChange('dateOfBirth', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>
                Email
              </Label>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>
                Password
              </Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
            </Item>

            <Item stackedLabel>
              <Label>
                Confirm Password
              </Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password2', v)} />
            </Item>

            <Spacer size={20} />

            <Button block onPress={this.handleSubmit}>
              <Text>
                Sign Up
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default SignUp;
