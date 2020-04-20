import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  private source_server: any;
  server: string;
  ItemsArray: any;
  data : any;
  target:any

  constructor(private _router: Router, private route: ActivatedRoute, public rest: RestService) {
    this.source_server = sessionStorage.getItem('source');
    this.GetItems();
   }

  ngOnInit() {
    
    this.target=sessionStorage.getItem("target")
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

  Checked(item) {
    if (item.status == true) {
      item.status =false;
    }
    else if (item.status == false) {
      item.status =true;
    }
  }

  GetItems() {
    this.rest.getItems(this.source_server)
        .subscribe((data: any) => {
            this.ItemsArray = data;
            this.ItemsArray.forEach(childObj=> {
              childObj.status = false;
           });
    });
  }

  GoToReplica() {

    /*let checkedItems = this.ItemsArray.filter(item => { return item.status; });
      if (!checkedItems || checkedItems.length === 0) { return checkedItems; }*/

    this.data = this.ItemsArray.filter(item => { return item.status == true; });
    this.rest.setData(this.data);
    this._router.navigate(['/replica'], { queryParams: { target: this.target } });
  }

}
