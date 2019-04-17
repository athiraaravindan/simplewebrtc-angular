import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Routes, RouterModule,ActivatedRoute, Router  } from '@angular/router';
import { HomeComponent } from '../home/home.component'

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  @Output() playvideo = new EventEmitter();
  @Output() pausevideo = new EventEmitter();
  @Output() playaudio = new EventEmitter();
  @Output() pauseaudio = new EventEmitter();
  @Output() chatopen = new EventEmitter();
  @Output() chatclose = new EventEmitter();
  video_play:boolean = false;
  audio_play:boolean = false;
  loadChild:boolean = false;
  noti:boolean = false;
  constructor(
    public homecomponent:HomeComponent
  ) { }

  ngOnInit() {
    this.homecomponent.notification.subscribe((data: any) => {
      if (data === 'true') {
        console.log(data)
        this.noti = true;
      } else{
        this.noti = false;
      }
    });
 this.homecomponent.forchatNoti.subscribe((data:any)=>{
   if(data){
     this.loadChild = false;
   }
 })
  }
  pause_video(){
    this.video_play = true
    this.playvideo.emit();
  }
  play_video(){
    this.video_play = false;
    this.pausevideo.emit()
  }
  pause_audio(){
    this.audio_play = true;
    this.playaudio.emit();
  }
  play_audio(){
    this.audio_play = false;
    this.pauseaudio.emit();
  }
  chatOpen(){
    this.loadChild = true;
    this.chatopen.emit();
  }
  chatClose(){
    this.loadChild = false;
    this.chatclose.emit();

  }
}
