import {Injectable} from "@angular/core";
import RestLog from "../models/rest.model";
import {KafkaLog} from "../models/kafka.model";


@Injectable({providedIn: 'root'})
export class DataService {
  private data: (RestLog | KafkaLog)[] = [];

  public setData(data: (RestLog | KafkaLog)[]): void {
    this.data = data
  }

  public getData(): any[] {
    return this.data
  }

}
