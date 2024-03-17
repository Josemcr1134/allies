import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configs-details',
  templateUrl: './configs-details.component.html',
  styleUrls: ['./configs-details.component.css']
})
export class ConfigsDetailsComponent implements OnInit {
  public week:any;
  public monday_schedule:number = 1;
  public tuesday_schedule:number = 1;
  public wednesday_schedule:number = 1;
  public thursday_schedule:number = 1;
  public friday_schedule:number = 1;
  public satuday_schedule:number = 1;
  public sunday_schedule:number = 1;
  constructor() { }

  ngOnInit(): void {
  }

  selectWeek(){
    console.log(this.week.length)
  }

  addHourMonday(number:number){
    if(this.monday_schedule >= 4){
      alert('Has llegado al limite de horarios en un dia');
      this.monday_schedule === 4
    }  else {
      this.monday_schedule = this.monday_schedule +  number
      console.log(this.monday_schedule);
    }
  }
  addTuesday(number:number){
    if(this.tuesday_schedule >= 4){
      alert('Has llegado al limite de horarios en un dia');
      this.tuesday_schedule === 4
    }  else {
      this.tuesday_schedule = this.tuesday_schedule +  number
      console.log(this.tuesday_schedule);
    }
  }
  addWednesday(number:number){
    if(this.wednesday_schedule >= 4){
      alert('Has llegado al limite de horarios en un dia');
      this.wednesday_schedule === 4
    }  else {
      this.wednesday_schedule = this.wednesday_schedule +  number
      console.log(this.wednesday_schedule);
    }
  }
  addThursday(number:number){
    if(this.thursday_schedule >= 4){
      alert('Has llegado al limite de horarios en un dia');
      this.thursday_schedule === 4
    }  else {
      this.thursday_schedule = this.thursday_schedule +  number
      console.log(this.thursday_schedule);
    }
  }
  addFriday(number:number){
    if(this.friday_schedule >= 4){
      alert('Has llegado al limite de horarios en un dia');
      this.friday_schedule === 4
    }  else {
      this.friday_schedule = this.friday_schedule +  number
      console.log(this.friday_schedule);
    }
  }
  addSatuday(number:number){
    if(this.satuday_schedule >= 4){
      alert('Has llegado al limite de horarios en un dia');
      this.satuday_schedule === 4
    }  else {
      this.satuday_schedule = this.satuday_schedule +  number
      console.log(this.satuday_schedule);
    }
  }
  addSunday(number:number){
    if(this.sunday_schedule >= 4){
      alert('Has llegado al limite de horarios en un dia');
      this.sunday_schedule === 4
    }  else {
      this.sunday_schedule = this.sunday_schedule +  number
      console.log(this.sunday_schedule);
    }
  }

}
