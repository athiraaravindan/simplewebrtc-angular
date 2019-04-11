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
  @Output() send = new EventEmitter()
  msg:any;
  roomID:any;
  user_name:any;

  constructor(
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.roomID = params.room_name;
      this.user_name = params.name;
    });
  }
  sendMsg(){
    this.msg = $('#text').val();
    if(this.msg.trim() == ''){
      console.log('empty msg')
    } else{
        // let chat_data:any = {};
        // chat_data.method  = 'chat';
        // chat_data.name    = this.user_name;
        // chat_data.message = this.msg;
        this.send.emit(this.msg)
        $("#text").val('');
    }
  }
}
