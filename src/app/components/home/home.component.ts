declare var SimpleWebRTC
// var messages:any = [];
var self:any;
import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule,ActivatedRoute, Router  } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public messages:any = [];
  roomID:any;
  webrtc:any;
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
    $("#chatopen").hide();
    this.route.queryParams.subscribe(params => {
      this.roomID = params.room_name;
      this.user_name = params.name;
      console.log(this.roomID);
      console.log(this.user_name)
    });
    var room = this.roomID;
    this.webrtc = new SimpleWebRTC({
      localVideoEl: 'localVideo',
      remoteVideosEl: '',
      autoRequestMedia: true,
      nick:this.user_name,
      debug: true,
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
        // this.messages.push('helooo')
      //  webrtc.connection.on('message',(data)=>{
        // if(data.type === 'chat'){
          // console.log('chat received',data);
          // let mg = data.payload.message
          // console.log(mg)
          // $("#chatopen").show();
          // this.loadChild = true;
            // this.messages.push(mg)
              // $('#messages').append('<p style="color:yellow">' + data.payload.nick + ':' + data.payload.message+'</p>');
              // $('p').css('float:right')
            // }
        // });
      }
    });
    webrtc.on('videoAdded',  (video, peer)=> {
      console.log('video added', peer);
        var remotes = document.getElementById('remoteVideos');
        if (remotes) {
          var d = document.createElement('span');
          d.className = 'videoContainer';
          d.id = 'container_' + webrtc.getDomId(peer);
          console.log(d.id)
          d.appendChild(video);
          video.style.width = "300px";
          video.style.borderRadius = "25px";
          video.style.marginRight = "5%";
          remotes.appendChild(d);
        }
      });
      webrtc.on('videoRemoved', function (video, peer) {
        var remotes = document.getElementById('remoteVideos');
      // var remotes = document.getElementById(webrtc.getDomId(peer));
      var el = document.getElementById('container_' + webrtc.getDomId(peer));
      if (remotes && el) {
        remotes.removeChild(el);
        }
      });
      webrtc.on('channelMessage', function(peer, label, data) {
  
        if (label == "chat") {
          $("#chatopen").show();
            var res = JSON.parse(data.payload.data);
            var method = res.method
            if(method == 'chat'){
              console.log(data.payload.data)
              console.log(res.name)
              console.log(res.message)
              self.messages.push({name:res.name,message:res.message})
            }
            // if(method == 'enable_video'){
            //     let el1:any = document.getElementsByClassName(res.token)[0];
            //     el1.style.display = 'block';
            // }
            // if(method == 'disable_video'){
            //   let el2:any = document.getElementsByClassName(res.token)[0];
            //   el2.style.display = 'none';
              
            // }
            
        } 
    });
  
  }
  pause_video(){
    this.video_play = true;
    this.webrtc.pauseVideo();
    console.log('video pause')
  }
  play_video(){
    this.video_play = false;
	  this.webrtc.resumeVideo();
    console.log('video play')
  }
  pause_audio(){
    this.audio_play = true;
    console.log('audio pause')
  }
  play_audio(){
    this.audio_play = false;
    console.log('play audio')
  }
  chatOpen(){
    $("#chatopen").show();
    console.log('chat open')
    this.loadChild = true
  }
  chatClose(){
    // $("#chatopen").hide();

    console.log('chat close')
    this.loadChild = false;
  }
  // sendToAll(data) {
  //   console.log(data)
  //   this.webrtc.sendDirectlyToAll('chat', 'message', {data: data});
  // }
  // sendMsg(){
  //   this.msg = $('#text').val();
  //   if(this.msg.trim() == ''){
  //     console.log('empty msg')
  //   } else{

  //     this.messages.push({name:"you",message:this.msg})
  //     console.log(this.messages)
  //     let chat_data:any = {};
  //       chat_data.method  = 'chat';
  //       chat_data.name    = this.user_name;
  //       chat_data.message = this.msg;
  //       self.sendToAll(JSON.stringify(chat_data));
  //     $('#text').val('');
  //   }
  // }
  sendMsg(datas){
    let chat_data:any = {};
    chat_data.method  = 'chat';
    chat_data.name    = this.user_name;
    chat_data.message = datas;
    console.log((JSON.stringify(chat_data)))
  }
}
