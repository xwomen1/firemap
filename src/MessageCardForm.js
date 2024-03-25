import React, { useState } from 'react';
import { Card, CardTitle, CardText, Form, Button, FormGroup, Label, Input } from 'reactstrap';
import './App.css';

import { Map, Marker, Popup } from 'react-leaflet';
import { sendMessage } from './API';
const MessageCardForm = (props) => {
  const [selectedMessage, setSelectedMessage] = useState(null); 
  const [state, setState] = useState({

    // location: {
    //   lat: 51.505,
    //   lng: -0.09,
    // },
    // haveUsersLocation: false,
    // zoom: 2,
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
    // showMessageForm: false,
    // sendingMessage: false,
    // sentMessage: false,
    // messages: props.messages || []
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setState(prevState => ({
      ...prevState,
      userMessage: {
        ...prevState.userMessage,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gửi thông tin tin nhắn đi
    const message = {
      ...state,
      // // Thêm vị trí của người dùng
      // latitude: props.location.lat,
      // longitude: props.location.lng
    };

    // Xử lý logic để gửi tin nhắn (ở đây là props.onSubmit)
    props.onSubmit(message);
    sendMessage(message)
    // Sau khi gửi, reset form
    setState({
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
    });
  };

 
  
  const handleMarkerClick = (message) => {
    // Set the selected message in state to display its details
    setSelectedMessage(message);
  };

 
  const handleCloseForm = () => {
    // Gọi hàm đóng biểu mẫu từ props
    props.cancelMessage();
  };
  
  return (
    <Card color="success"
    body className="message-form" >
      <CardTitle>Welcome to GuestM.app!</CardTitle>
      <CardText>Leave a message with your location!</CardText>
      <Form onSubmit={handleSubmit}>
      <div className="form-container">
  <div className="column">
    <FormGroup>
      <Label for="BuildingType">Building Type</Label>
      <Input type="text" name="BuildingType" id="BuildingType" value={state.userMessage.BuildingType} onChange={handleChange} />
    </FormGroup>
    <FormGroup>
      <Label for="BuildingAge">Building Age</Label>
      <Input type="text" name="BuildingAge" id="BuildingAge" value={state.userMessage.BuildingAge} onChange={handleChange} />
    </FormGroup>
    <FormGroup check>
          <Label check>
          <Input type="checkbox" name="InsuranceElectronic" checked={state.userMessage.InsuranceElectronic} onChange={handleChange} />{' '}
            Insurance Electronic
          </Label>
        </FormGroup>
        <FormGroup>
  <Label for="InsuranceGas">Insurance Gas</Label>
  <Input 
    type="checkbox" 
    name="InsuranceGas" 
    id="InsuranceGas" 
    checked={state.userMessage.InsuranceGas} 
    onChange={handleChange} 
  />
</FormGroup>
<FormGroup>
  <Label for="Repair">Repair</Label>
  <Input 
    type="text" 
    name="Repair" 
    id="Repair" 
    value={state.userMessage.Repair} 
    onChange={handleChange} 
  />
</FormGroup>
<FormGroup>
  <Label for="Weather">Weather</Label>
  <Input 
    type="text" 
    name="Weather" 
    id="Weather" 
    value={state.userMessage.Weather} 
    onChange={handleChange} 
  />
</FormGroup>
 <FormGroup>
  <Label for="TypeofBuildingNear">Type of Building Near</Label>
  <Input 
    type="text" 
    name="TypeofBuildingNear" 
    id="TypeofBuildingNear" 
    value={state.userMessage.TypeofBuildingNear} 
    onChange={handleChange} 
  />
</FormGroup>
<FormGroup check>
  <Label check>
    <Input 
      type="checkbox" 
      name="Training" 
      checked={state.userMessage.Training} 
      onChange={handleChange} 
    />
    Training
  </Label>
</FormGroup>
<FormGroup>
  <Label for="HightofBuilding">Height of Building</Label>
  <Input 
    type="text" 
    name="HightofBuilding" 
    id="HightofBuilding" 
    value={state.userMessage.HightofBuilding} 
    onChange={handleChange} 
  />
</FormGroup>
    {/* Các trường thông tin khác cho cột 1 */}
  </div>
  <div className="column">
 
<FormGroup>
  <Label for="NumberofFloor">Number of Floors</Label>
  <Input 
    type="text" 
    name="NumberofFloor" 
    id="NumberofFloor" 
    value={state.userMessage.NumberofFloor} 
    onChange={handleChange} 
  />
</FormGroup>
<FormGroup>
  <Label for="NumberofAlarm">Number of Alarms</Label>
  <Input 
    type="text" 
    name="NumberofAlarm" 
    id="NumberofAlarm" 
    value={state.userMessage.NumberofAlarm} 
    onChange={handleChange} 
  />
</FormGroup>
<FormGroup>
  <Label for="NumberoffireExtinguisher">Number of Fire Extinguishers</Label>
  <Input 
    type="text" 
    name="NumberoffireExtinguisher" 
    id="NumberoffireExtinguisher" 
    value={state.userMessage.NumberoffireExtinguisher} 
    onChange={handleChange} 
  />
</FormGroup>
<FormGroup>
  <Label for="WidthofNearRoad">Width of Nearby Road</Label>
  <Input 
    type="text" 
    name="WidthofNearRoad" 
    id="WidthofNearRoad" 
    value={state.userMessage.WidthofNearRoad} 
    onChange={handleChange} 
  />
</FormGroup>
<FormGroup>
  <Label for="DistancetoNearlyBuilding">Distance to Nearby Building</Label>
  <Input 
    type="text" 
    name="DistancetoNearlyBuilding" 
    id="DistancetoNearlyBuilding" 
    value={state.userMessage.DistancetoNearlyBuilding} 
    onChange={handleChange} 
  />
</FormGroup>
<FormGroup>
  <Label for="TimetoExtinguish">Time to Extinguish</Label>
  <Input 
    type="text" 
    name="TimetoExtinguish" 
    id="TimetoExtinguish" 
    value={state.userMessage.TimetoExtinguish} 
    onChange={handleChange} 
  />
</FormGroup>
<FormGroup>
  <Label for="DistancetoFireStation">Distance to Fire Station</Label>
  <Input 
    type="text" 
    name="DistancetoFireStation" 
    id="DistancetoFireStation" 
    value={state.userMessage.DistancetoFireStation} 
    onChange={handleChange} 
  />
</FormGroup>
<FormGroup>
  <Label for="NumberofEmergencyExit">Number of Emergency Exits</Label>
  <Input 
    type="text" 
    name="NumberofEmergencyExit" 
    id="NumberofEmergencyExit" 
    value={state.userMessage.NumberofEmergencyExit} 
    onChange={handleChange} 
  />
</FormGroup> 
    {/* Các trường thông tin khác cho cột 2 */}
  </div>
</div>

            <Button type="cancel" color="danger" onClick={handleCloseForm}>Cancel</Button>
            <Button type="submit" color="info">Send</Button>
      </Form>
      {
        !props.sendingMessage && !props.sentMessage && props.haveUsersLocation ?
          <Form onSubmit={props.formSubmitted}>
            {/* Your form fields */}
            <Button type="cancel" color="danger" onClick={handleCloseForm}>Cancel</Button>
            {/* <Button type="submit" color="info" disabled={!props.formIsValid()}>Send</Button> */}
            <Button type="submit" color="info" >Send</Button>

          </Form> :
          props.sendingMessage || !props.haveUsersLocation ? 
            <video 
              autoPlay
              loop
              src="https://i.giphy.com/media/BCIRKxED2Y2JO/giphy.mp4"></video> :
            <CardText>Thanks for submitting a message!</CardText>
      }
      <Map>
  {state.messages && state.messages.map(message => (
    <Marker
      key={message._id}
      position={[message.latitude, message.longitude]}
      onClick={() => handleMarkerClick(message)}
    />
  ))}
  {selectedMessage && (
    <Popup
      position={[selectedMessage.latitude, selectedMessage.longitude]}
      
    >
      {/* Popup content */}
    </Popup>
  )}
</Map>

      
    </Card>
  );
};

export default MessageCardForm;
