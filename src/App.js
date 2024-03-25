import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Card, CardText, Button } from 'reactstrap';
import userLocationURL from './user_location.svg';
import messageLocationURL from './message_location.svg';
import MessageCardForm from './MessageCardForm';
import { getMessages, sendMessage} from './API';
import './App.css';
const myIcon = L.icon({
  iconUrl: userLocationURL,
  iconSize: [50, 82]
});

const messageIcon = L.icon({
  iconUrl: messageLocationURL,
  iconSize: [50, 82]
});

class App extends Component {
  state = {
    messages: [],
    location: {
      lat: 21.0285, // Latitude của Hà Nội
      lng: 105.8542, // Longitude của Hà Nội
    },
    haveUsersLocation: false,
    zoom: 2,
    showMessageForm: false,
    sendingMessage: false,
    sentMessage: false,
    selectedMessage: null,
    formIsValid: false,
    userMessage: {
      BuildingType: '',
      BuildingAge: '',
      InsuranceElectronic: false,
      InsuranceGas: false,
      Repair: '',
      Weather: '',
      TypeofBuildingNear: '',
      Training: false,
      HightofBuilding: '',
      NumberofFloor: '',
      NumberofAlarm: '',
      NumberoffireExtinguisher: '',
      WidthofNearRoad: '',
      DistancetoNearlyBuilding: '',
      TimetoExtinguish: '',
      DistancetoFireStation: '',
      NumberofEmergencyExit: ''
    }
  };

  handleSubmit = (message) => {
    // Xử lý gửi tin nhắn
    console.log('Message submitted:', message);
  }

  formIsValid = () => {
    const { BuildingType, BuildingAge } = this.state.userMessage;
    const trimmedBuildingType = BuildingType.trim();
    const trimmedBuildingAge = BuildingAge.trim();
    return trimmedBuildingType.length > 0 && trimmedBuildingType.length <= 500 &&
      trimmedBuildingAge.length > 0 && trimmedBuildingAge.length <= 500 &&
      this.state.haveUsersLocation;
  }

  formSubmitted = (event) => {
    event.preventDefault();
    
    if (this.formIsValid()) {
      this.setState({
        ...this.state,
        sendingMessage: true
      });
      
      const message = {
        ...this.state.userMessage,
        // latitude: this.state.location.lat,
        // longitude: this.state.location.lng,
      };
      sendMessage(message)
        .then((result) => {
          setTimeout(() => {
            this.setState({
              ...this.state,
              sendingMessage: false,
              sentMessage: true
            });
          }, 4000);
        });
    }
  }


  valueChanged = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      userMessage: {
        ...prevState.userMessage,
        [name]: value
      }
    }))
  }

  componentDidMount() {
    getMessages()
      .then(messages => {
        this.setState({
          messages: messages || [] // Handle case when messages is null or undefined
        });
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
        // Handle error gracefully, e.g., show error message to the user
      });
  
    // Update map location
    this.setState({
      location: {
        lat: 21.0285, // Latitude của Hà Nội
        lng: 105.8542, // Longitude của Hà Nội
      },
      zoom: 12, // Đặt mức độ zoom cho thành phố Hà Nội
    });
  }
  
  

  // Hàm hiển thị biểu mẫu khi nhấp vào bản đồ
 // Hàm hiển thị biểu mẫu khi nhấp vào bản đồ


   // Hàm đóng biểu mẫu
   cancelMessage = () => {
    this.setState({
      showMessageForm: false,
      // Các cập nhật khác khi đóng biểu mẫu
    });
  };

  handleMarkerClick = (message) => {
    this.setState({
      selectedMessage: message
    });
  };
  handleClick = () => {
    this.setState({
      showMessageForm: true,
      // Các cập nhật khác khi đóng biểu mẫu
    });
  }

  handleClosePopup = () => {
    this.setState({
      selectedMessage: null
    });
  };

  render() {
    const centerOfHanoi = [21.0285, 105.8542];
    return (
      <div className="map">
        <Map 
          className="map"
          worldCopyJump={true}
          center={centerOfHanoi}
          zoom={this.state.zoom}
          onClick={this.handleClick} 
          >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors and Chat location by Iconika from the Noun Project"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.haveUsersLocation && (
            <Marker position={centerOfHanoi} icon={myIcon} onClick={this.handleClick}>
    <Popup>
      Click here!
    </Popup>
  </Marker>
          )}
          {this.state.messages.map(message => (
            <Marker
              key={message._id}
              position={[message.latitude, message.longitude]}
              icon={messageIcon}
              onClick={() => this.handleMarkerClick(message)}>
              <Popup>
                <p><em>Building Type:</em> {message.BuildingType}</p>
                <p><em>Building Age:</em> {message.BuildingAge}</p>
                <p><em>Insurance Electronic:</em> {message.InsuranceElectronic ? 'Yes' : 'No'}</p>
                {/* Other properties */}
              </Popup>
            </Marker>
          ))}
        </Map>
        {!this.state.showMessageForm ? (
          <Button className="message-form" onClick={this.showMessageForm} color="info">
            Add a Message
          </Button>
        ) : !this.state.sentMessage ? (
          <MessageCardForm
            messages={this.state.messages}
            location={this.state.location}
            onSubmit={this.handleSubmit}
            cancelMessage={this.cancelMessage}
            showMessageForm={this.state.showMessageForm}
            sendingMessage={this.state.sendingMessage}
            sentMessage={this.state.sentMessage}
            haveUsersLocation={this.state.haveUsersLocation}
            formSubmitted={this.formSubmitted}
            valueChanged={this.valueChanged}
            sendMessage={this.sendMessage}
          />
        ) : (
          <Card body className="thanks-form">
            <CardText>Thanks for submitting a message!</CardText>
          </Card>
        )}
        <Card className="footer">
          <CardText>
            Made with <span role="img" aria-label="love">💚</span> by{' '}
            <a href="https://github.com/xwomen1" target="_blank" rel="noopener noreferrer">
              linhhust
            </a>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default App;
