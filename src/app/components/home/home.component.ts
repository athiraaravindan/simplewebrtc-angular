declare var SimpleWebRTC
// var messages:any = [];
var self:any;
import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { Routes, RouterModule,ActivatedRoute, Router  } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @Output() notification = new EventEmitter();
  @Output() forchatNoti = new EventEmitter();
  public messages:any = [];
  roomID:any;
  webrtc:any;
  no_msg:any;
  user_name:any;
  video_play:boolean = false;
  audio_play:boolean = false;
  loadChild:boolean = false;
  msg:any;
  constructor(
    private route:ActivatedRoute,
  ) {
  self = this;
   }
  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.roomID = params.room_name;
      this.user_name = params.name;
    });
    var room = this.roomID;
    this.webrtc = new SimpleWebRTC({
      localVideoEl: 'localVideo',
      remoteVideosEl: '',
      autoRequestMedia: true,
      nick:this.user_name,
      debug: false,
      audio:true,
      video:true,
      url:"https://one2one.enfinlabs.com:9443",
      // socketio: this.socket,
      peerConnetionConfig:{
        iceTransports: 'relay'
      }
    });
    var webrtc = this.webrtc
    this.webrtc.on('readyToCall', function () {
      if(room){
       webrtc.joinRoom(room);
      }
    });
    webrtc.on('videoAdded',  (video, peer)=> {
        var remotes = document.getElementById('remoteVideos');
        if (remotes) {
          var d = document.createElement('span');
          d.className = 'videoContainer';
          d.id = 'container_' + webrtc.getDomId(peer);
          d.appendChild(video);
          video.style.width = "300px";
          video.style.borderRadius = "25px";
          video.style.marginRight = "5%";
          remotes.appendChild(d);
        }
      });
      webrtc.on('videoRemoved', function (video, peer) {
        var remotes = document.getElementById('remoteVideos');
      var el = document.getElementById('container_' + webrtc.getDomId(peer));
      if (remotes && el) {
        remotes.removeChild(el);
        }
      });
      webrtc.on('channelMessage', function(peer, label, data) {
        if (label == "chat") {
          console.log(data.payload.data)
            var res = JSON.parse(data.payload.data);
            var method = res.method
            if(method == 'chat'){
              self.notification.emit("true")
              // self.no_msg = self.messages.length +1  
              // console.log(self.messages.length)
              self.messages.push({name:res.name,message:res.message})
            }    
        } 
    });
  
  }
  pause_video(){
    this.webrtc.pauseVideo();
    console.log('video pause')
  }
  play_video(){
	  this.webrtc.resumeVideo();
    console.log('video play')
  }
  pause_audio(){
    this.webrtc.mute();
    console.log('audio pause')
  }
  play_audio(){
    this.webrtc.unmute();
    console.log('audio play')
  }
  chatOpen(){
    $("#chatopen").show();
    // console.log(self.no_msg)
    // $('.notification').hide();
    // self.no_msg = null;
    console.log('chat open')
    this.loadChild = true
  }
  chatClose(){
    console.log('chat close');
    self.notification.emit("false")
    this.loadChild = false;
  }
  sendToAll(data) {
    // console.log(data)
    this.webrtc.sendDirectlyToAll('chat', 'message', {data: data});
  }

  sendMsg(datas){
    this.loadChild = true
    let chat_data:any = {};
    chat_data.method  = 'chat';
    chat_data.name    = this.user_name;
    chat_data.message = datas;
    self.sendToAll(JSON.stringify(chat_data));
    this.messages.push({name:"you",message:datas})
  }
  close_Chatpage(){
    this.forchatNoti.emit('true');
    this.notification.emit("false")

    this.loadChild = false;

    
  }
}
