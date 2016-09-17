import React, { Component } from 'react';
import { Event } from './event.js';
import { CreateEvent } from './createEvent';
import { styles } from './styles.js';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ListView,
  TouchableHighlight,
  ScrollView,
  RefreshControl
} from 'react-native';
const ACCESS_TOKEN = require('./InstagramInfo');

export class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instagramObject: null,
      images: ['no images']
    };

    this._backwardToEvents = this._backwardToEvents.bind(this);
    this.getPhotosFromInstagram = this.getPhotosFromInstagram.bind(this);
  }

  componentWillMount () {
    this.getPhotosFromInstagram(this.props.hashtag);
  }

  filterInstagramData (data, hashtag) {
    var images = [];

    data.forEach(function (image) {
      if (image.caption.text.includes(hashtag)) {
        images.push(image.images.standard_resolution.url);
      }
    });

    return images;
  }

  _backwardToEvents() {
    console.log(this.props.current, 'CURRENT');
    if (this.props.current) {
      this.props.refreshCurrent();
    } else {
      this.props.refreshPast();
    }
    
    this.props.navigator.pop(1);
  }

  deleteEvent () {
    var context = this;
    console.log(this.props);

    // xhr = new XMLHttpRequest();

    // xhr.open('POST', 'http://localhost:3000/api/delete');
    // xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    // var json = JSON.stringify({
    //   title: context.props.title,
    //   username: context.props.username
    // });
    // xhr.send(json);

    fetch('http://localhost:3000/api/delete', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: context.props.title,
        username: context.props.username
      }),
    })
      .then(() => {
        this.backwardToEvents();
      }
    );
  }

  getPhotosFromInstagram (hashtag) {
    var context = this;
    var url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + ACCESS_TOKEN;
    console.log('ACCESS_TOKEN.AccessToken', ACCESS_TOKEN);


    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var imageObject = JSON.parse(xhr.responseText);

        context.setState({
          instagramObject: imageObject,
          images: context.filterInstagramData(imageObject.data, hashtag)
        });

      } else {
        alert('Request failed.  Returned status of ' + xhr.status);
      }
    };
    xhr.send();
  }

  render () {
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.eventPageContainer}>
          <Text style={styles.eventText}>Title: {this.props.title}</Text>
          <Text style={styles.eventText}>Catgegory: {this.props.category}</Text>
          <Text style={styles.eventText}>Location: {this.props.location}</Text>
          <Text style={styles.eventText}>Date/Time: {this.props.time + ', ' + this.props.date}</Text>
          <Text style={styles.eventText}>Description: {this.props.description}</Text>
        </View>

        <View style={styles.instagramContainer}>
          <Text style={styles.eventText}>Check out some pics from {this.props.hashtag}!</Text>
          <Image style={styles.instagramPhoto} source={{uri: this.state.images[0]}}/>
          <Image style={styles.instagramPhoto} source={{uri: this.state.images[1]}}/>
          <Image style={styles.instagramPhoto} source={{uri: this.state.images[2]}}/>
          <Image style={styles.instagramPhoto} source={{uri: this.state.images[3]}}/>


          <TouchableHighlight style={styles.deleteEventButton} underlayColor='white' backwardToEvents={this._backwardToEvents} props={this.props} onPress={this.deleteEvent}>
            <Text style={styles.deleteButtonText}>Delete Event</Text>
          </TouchableHighlight>
        </View>

      </View>
      </ScrollView>
    );
  }
}