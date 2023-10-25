import {Injectable} from "@angular/core";
import RestLog from "../models/rest.model";
import {KafkaLog} from "../models/kafka.model";
import {CommunicationsEnum} from "../utility/communications.enum";


@Injectable({providedIn: 'root'})
export class DataService {
  private data: (RestLog | KafkaLog)[] = [];
  private selectedCommunication: CommunicationsEnum | undefined;
  private services: string[] = [];


  // refactor :)
  public setData(data: (RestLog | KafkaLog)[]): void {

      this.data = data
      if (data.some(item => item instanceof RestLog))
        this.selectedCommunication = CommunicationsEnum.REST;
      else if (data.some(item => item instanceof KafkaLog))
        this.selectedCommunication = CommunicationsEnum.KAFKA;


  }

  public setCommunicationLogs(communication: CommunicationsEnum): void {
    this.selectedCommunication = communication;
  }



  public getData(): (RestLog | KafkaLog)[] {
    return this.data
  }



}
