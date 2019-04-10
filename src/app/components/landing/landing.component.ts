import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators, FormBuilder, NgForm} from '@angular/forms';
import { Routes, RouterModule,ActivatedRoute, Router  } from '@angular/router';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  signupForm :FormGroup
  name:any;
  room_name:any;

  constructor(
    private formBuilder: FormBuilder,
    private router:Router
  ) { 
    this.signupForm=formBuilder.group({  
      name:['',Validators.compose([Validators.required,Validators.maxLength(15),Validators.minLength(1)])],  
      room_name:['',[Validators.required,Validators.maxLength(19)]],     
      });
  }

  ngOnInit() {

  }
    PostData(signupForm:NgForm)  
    {  
      this.name = signupForm.value.name;
      this.room_name = signupForm.value.room_name;
      this.router.navigate(['../home'],{ queryParams:{name:this.name,room_name:this.room_name}});
    }  
}
