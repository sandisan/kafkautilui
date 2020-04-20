import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: [ './connection.component.css' ]
})
export class ConnectionComponent implements OnInit {
    connectionForm : FormGroup;
    source_input : any;
    target_input : any;
    apikey_input : any;
    test1 : any = 0;
    test2 : any = 0;
    showdiv2 : boolean;
    showdiv3 : boolean;
    data : any;
   
    constructor(private _router:Router, public rest:RestService, public toastr: ToastrManager, private fb: FormBuilder) { 
      this.connectionForm = this.fb.group({
        source : ['', Validators.required],
        target : ['', Validators.required],
        apikey : ['', Validators.required]
      });
    }

  ngOnInit() {
    this.connectionForm.patchValue({
      source: '',
      target: '',
      apikey: ''
    })
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

  TestConnection() {
    
    this.source_input = this.connectionForm.value.source;
    this.target_input = this.connectionForm.value.target;
    this.apikey_input = this.connectionForm.value.apikey;
    
    this.rest.sourceConnection(this.source_input).subscribe(
      (res_source: any) => {
        debugger;
        if (res_source == true) {
          this.rest.TargetConnection(this.target_input, this.apikey_input).subscribe(
            (res_target: any) => {
              debugger;
              if (res_target ==true) {
                this.showdiv2 = !this.showdiv2;
                this.showdiv3 = !this.showdiv3;
                this.connectionForm.get('source').disable();
                this.connectionForm.get('target').disable();
                this.connectionForm.get('apikey').disable();
                this.toastr.successToastr("Connection Successful", 'Success!');
              }
              else {
                this.toastr.errorToastr("Connection to target server Failed..", 'Error!');
              }
            },
            error => {
              this.toastr.errorToastr("Connection to target server Failed..", 'Error!');
            }
          );
        }
        else {
          this.toastr.errorToastr("Connection to source server Failed..", 'Error!');
        }
      },
      error => {
        this.toastr.errorToastr("Connection to source server Failed..", 'Error!');
      }
      
    );
          
  }

  Proceed() {

    this.source_input = this.connectionForm.value.source;
    this.target_input = this.connectionForm.value.target;
    this.apikey_input = this.connectionForm.value.apikey;
    sessionStorage.setItem('target', this.target_input);
    sessionStorage.setItem('source', this.source_input);
    sessionStorage.setItem('apikey', this.apikey_input);

    this._router.navigate(['/topics'], { queryParams: { server: this.source_input } });

  }



}
