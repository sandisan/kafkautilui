import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kafkadetails',
  templateUrl: './kafkadetails.component.html',
  styleUrls: [ './kafkadetails.component.css' ]
})
export class KafkadetailsComponent implements OnInit {

  constructor(private _router : Router) { }

  ngOnInit() {
  }

  NavigateToKafkaHomePage() {
    this._router.navigateByUrl('/kafkadetails').then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

  NavigateToConnection() {
    this._router.navigateByUrl('/connection').then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

}
