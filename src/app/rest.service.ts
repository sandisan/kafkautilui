import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};


@Injectable({
  providedIn: 'root'
})
export class RestService {

  envValue:any;
  endPoint:any;
  private data:any;

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  setData(data){
    this.data = data;
  }

  getData(){
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }

  setEndPoint(code:any){
    if(code=="1") {
      this.endPoint='http://kafka-object-replicator-service-cicd.169-61-227-230.nip.io/api/testConnection?server='
    }else if(code=="2"){
      this.endPoint='http://kafka-object-replicator-service-cicd.169-61-227-230.nip.io/api/es/testConnection?server='
    }
  }

  sourceConnection (source): Observable<any> {
     this.setEndPoint("1");
    return this.http.get(this.endPoint + source).pipe(
      map(res => res),
      catchError(
        this.handleError<any>('SourceConnection')
      )
    );
  }

  TargetConnection (target, apikey): Observable<any> {

    this.setEndPoint("2");
     
    return this.http.get(this.endPoint + target + "&api_key=" + apikey).pipe(
      map(res => res),
      catchError(
        this.handleError<any>('TargetConnection')
      )
    );
  }

  getItems (queryparam): Observable<any> {

    this.endPoint = 'http://kafka-object-replicator-service-cicd.169-61-227-230.nip.io/api/topics?server='
     
    return this.http.get(this.endPoint + queryparam).pipe(
      map(this.extractData),
      catchError(
        this.handleError<any>('getItems')
      )
    );
  }

  


  //target server with apikey
  replicate(url,target,apikey,message,contenttype){
    let header = new HttpHeaders().set('contentType', contenttype)
   
    return this.http.post( url + target + '&api_key=' + apikey,message,{headers:header}).pipe(
      tap(_ => console.log(`replicated successfully`)),
      catchError(
        this.handleError<any>('replicate')
      )
    );
  }



  //Error Handling
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

