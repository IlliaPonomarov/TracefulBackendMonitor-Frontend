import {Injectable} from "@angular/core";
import {HttpClient, HttpHandler} from '@angular/common/http';
import {map, Observable} from "rxjs";
import RestLog, {Request, Response} from "../models/rest.model";
import {Consumer, KafkaLog, Producer} from "../models/kafka.model";
import {CommunicationsEnum} from "../utility/communications.enum";


export interface CommunicationService<T> {
  findAll(): Observable<T[]>;
}
@Injectable()
export class RestService implements CommunicationService<RestLog>{

    private rests: RestLog[] = [];
    constructor(private http: HttpClient) { }

  public findAll(): Observable<RestLog[]> {
      return this.http.get('assets/webservice.json')
          .pipe(map((response: any) => {
            console.log("response: " + response)
            let logs = response['logs'];
            let rests = logs['rest'];
            console.log("rests: " + JSON.stringify(rests));

            return rests.map(function (rest: any): RestLog {
                let request: Request = new Request(rest.request.url, rest.request.method, rest.request.parameters, rest.request.headers, rest.request.body);
                let response: Response = new Response(rest.response.status, rest.response.headers, rest.response.body, rest.response.error, rest.response.date);

                return new RestLog(rest.id, rest.service, rest.operation, request, response, rest.date);
              }
            )
          }))
    }
}

@Injectable()
export  class KafkaService implements CommunicationService<KafkaLog>{

  constructor(private http: HttpClient) { }
  findAll(): Observable<KafkaLog[]> {
    return this.http.get('assets/webservice.json')
      .pipe(map((response: any) => {
        let logs = response['logs'];
        let kafkaLogs = logs['kafka'];


        return kafkaLogs.map(function (kafkaLog: any): KafkaLog {
          let producers: Producer[] = kafkaLog.producers;
          let consumers: Consumer[] = kafkaLog.consumers;;

            return new KafkaLog(kafkaLog.id, kafkaLog.service, kafkaLog.operation, kafkaLog.topic, producers, consumers, kafkaLog.date);
          }
        );
      }
      ));
  }
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationFactory {

  constructor(protected _restService: RestService, protected _kafkaService: KafkaService) {
  }
  public  getRestCommunicationService(communication: CommunicationsEnum): CommunicationService<RestLog> {
    return this._restService;
  }

  public getKafkaCommunicationService(communication: CommunicationsEnum): CommunicationService<KafkaLog> {
    return this._kafkaService;
  }


  get restService(): RestService {
    return this._restService;
  }

  set restService(value: RestService) {
    this._restService = value;
  }

  get kafkaService(): KafkaService {
    return this._kafkaService;
  }

  set kafkaService(value: KafkaService) {
    this._kafkaService = value;
  }
}
