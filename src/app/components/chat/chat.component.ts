import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Routes, RouterModule,ActivatedRoute, Router  } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() messages:any=[];
  @Output() send = new EventEmitter();
  @Output() closechat = new EventEmitter();
  msg:any;
  roomID:any;
  user_name:any;
  intervel:any;
  elem:any;
  notification:any;

  constructor(
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.roomID = params.room_name;
      this.user_name = params.name;
    });
  }
  sendMsg(){
    $(".chat_ul").animate({ scrollTop: $('.chat_ul')[0].scrollHeight}, 1000);
    this.msg = $('#text').val();
    if(this.msg.trim() == ''){
      console.log('empty msg')
    } else{
        this.send.emit(this.msg)
        $("#text").val('');
    }
  }
  chatClose(){
    this.closechat.emit()
  }
}
