import React from 'react';
import PropTypes from 'prop-types';
import { Image, ImageEditor, TouchableOpacity } from 'react-native';
import { ImagePicker } from 'expo';
import {
  Container, Content, DatePicker, Text, Body, ListItem, Form, Item, Label, Input, CheckBox, Button, View, Card, CardItem,
} from 'native-base';
import Messages from './Messages';
import Loading from './Loading';
import Header from './Header';
import Spacer from './Spacer';

class UpdateProfile extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    member: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
    }).isRequired,
  }

  static defaultProps = {
    error: null,
    success: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: props.member.firstName || '',
      lastName: props.member.lastName || '',
      email: props.member.email || '',
      qualification: props.member.qualification || '',
      workExperience: props.member.workExperience || '',
      dateOfBirth: props.member.dateOfBirth || '',
      imageUrl: props.member.imageUrl || '',
      password: '',
      password2: '',
      changeEmail: false,
      changePassword: false,
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
      .then(() => console.log('Profile Updated'))
      .catch(e => console.log(`Error: ${e}`));
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
    const { loading, error, success } = this.props;
    const {
      firstName,
      lastName,
      qualification,
      workExperience,
      dateOfBirth,
      email,
      imageUrl,
      changeEmail,
      changePassword,
    } = this.state;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder>
          <Header
            title="Update my profile"
            content="Thanks for keeping your account up to date!"
          />

          {error && <Messages message={error} />}
          {success && <Messages message={success} type="success" />}
            <TouchableOpacity onPress={this._pickImage} style={{justifyContent: 'center', alignItems: 'center'}} >
                  <Image
                    source={imageUrl ? { uri: imageUrl } : require('../../images/icon_edit.png')}
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
              <Input
                value={firstName}
                onChangeText={v => this.handleChange('firstName', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>
                Last Name
              </Label>
              <Input
                value={lastName}
                onChangeText={v => this.handleChange('lastName', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>
                Qualification
              </Label>
              <Input
                value={qualification}
                onChangeText={v => this.handleChange('qualification', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>
                Work Experience (in year)
              </Label>
              <Input
                value={workExperience}
                onChangeText={v => this.handleChange('workExperience', v)}
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
              {/* <Input
                value={dateOfBirth}
                onChangeText={v => this.handleChange('dateOfBirth', v)}
              /> */}
            </Item>

            <ListItem>
              <CheckBox
                checked={changeEmail}
                onPress={() => this.handleChange('changeEmail', !changeEmail)}
              />
              <Body>
                <Text>
                  Change Email
                </Text>
              </Body>
            </ListItem>

            {changeEmail
              && (
              <Item stackedLabel>
                <Label>
                  Email
                </Label>
                <Input
                  autoCapitalize="none"
                  value={email}
                  keyboardType="email-address"
                  onChangeText={v => this.handleChange('email', v)}
                />
              </Item>
              )
            }

            <ListItem>
              <CheckBox
                checked={changePassword}
                onPress={() => this.handleChange('changePassword', !changePassword)}
              />
              <Body>
                <Text>
                  Change Password
                </Text>
              </Body>
            </ListItem>

            {changePassword
              && (
              <View padder>
                <Item stackedLabel>
                  <Label>
                    Password
                  </Label>
                  <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
                </Item>

                <Item stackedLabel last>
                  <Label>
                    Confirm Password
                  </Label>
                  <Input secureTextEntry onChangeText={v => this.handleChange('password2', v)} />
                </Item>
              </View>
              )
            }

            <Spacer size={20} />

            <Button block onPress={this.handleSubmit}>
              <Text>
                Update Profile
              </Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default UpdateProfile;
