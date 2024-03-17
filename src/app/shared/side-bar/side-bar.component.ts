import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  // # Medicals - Allie Specialist
  // LEGAL_STAFF = 2
  // SUBORDINATE_DOCTOR = 3
  // NATURAL_DOCTOR = 4
  SpecialistType:number = 0;
  constructor() { }

  ngOnInit(): void {

    this.SpecialistType = Number(localStorage.getItem('user_type')) ;
    console.log(this.SpecialistType)
  }

}
