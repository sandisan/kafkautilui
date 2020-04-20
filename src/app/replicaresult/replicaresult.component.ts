import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-replicaresult',
  templateUrl: './replicaresult.component.html',
  styleUrls: ['./replicaresult.component.css']
})
export class ReplicaresultComponent implements OnInit {

  Topics:any;

  constructor(private _router: Router, private route: ActivatedRoute, public rest: RestService) { }

  ngOnInit() {

    this.Topics = JSON.parse(sessionStorage.getItem('replicaresult'));
    
    this.Topics.forEach(childObj=> {
      if(childObj.success == false){
        childObj.message = childObj.topicName + " Already Exists!!!!"
      }
   });
    
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
