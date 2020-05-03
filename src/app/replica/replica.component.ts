import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-replica',
  templateUrl: './replica.component.html',
  styleUrls: ['./replica.component.css']
})
export class ReplicaComponent implements OnInit {

  private target_server: any;
  target:any;
  CheckedItems:any;
  source:any;
  apikey:any;
  url:any;
  contenttype:any;

  constructor(private _router: Router, private route: ActivatedRoute, public toastr: ToastrManager, public rest: RestService) { 

    this.CheckedItems = this.rest.getData();
    this.target_server = sessionStorage.getItem('target');
    this.apikey = sessionStorage.getItem('apikey');

  }

  ngOnInit() {

    this.url = 'http://kafka-object-replicator-service-cicd.169-61-227-230.nip.io/api/topics/create?server='
    this.contenttype = "application/json; charset=utf-8"
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

  BacktoTopic() {
    this.source = sessionStorage.getItem('source');
    this._router.navigate(['/topics'], { queryParams: { server: this.source } });
  }

  Replicate() {
  
    this.rest.replicate(this.url, this.target_server, this.apikey, this.CheckedItems, this.contenttype).subscribe(
      data => {

        
          sessionStorage.setItem('replicaresult',JSON.stringify(data));
          this._router.navigateByUrl('/replicateresult')
        
        
        console.log("Replicated successfully ", data);
      },
      error => {
        this.toastr.errorToastr("Error while relocating", 'Oops!');
        console.log("POST Request is Failed ", error);
      }
    );
  }

}
