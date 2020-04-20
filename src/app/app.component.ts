import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent implements OnInit {
  title = 'kafkautilui';
  
  constructor(private _router:Router) { }

  ngOnInit() {}

  NavigateToKafkaHomePage() {
    this._router.navigateByUrl('/kafkadetails').then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }
  
}
