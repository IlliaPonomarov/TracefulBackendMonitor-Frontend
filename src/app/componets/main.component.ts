import {Component, OnInit} from "@angular/core";
import {Communications} from "../utility/communications.enum";
import RestLog from "../models/rest.model";
import {CommunicationFactory, CommunicationService, RestService} from "../services/webservice.service";
import {KafkaLog} from "../models/kafka.model";

@Component({
    selector: 'app-main',
    templateUrl: '../html/main.component.html',
    styleUrls: ['../css/main.component.css'],
    providers: [RestService]
})
export class MainComponent implements OnInit {

  protected communications: Communications[] = [Communications.KAFKA, Communications.GRAPHQL, Communications.REST, Communications.SOAP]
  protected selectedCommunication: Communications | undefined;
  protected communicationService: CommunicationService<RestLog | KafkaLog> | undefined;

  restLogs: RestLog[] | undefined;
  kafkaLogs: KafkaLog[] | undefined;

  constructor(private communicationFactoryService: CommunicationFactory) { }

  ngOnInit(): void {
    if (this.selectedCommunication === Communications.REST)
        this.getRestAllLogs();
  }

  selectCommunication(communication: any): void {
        console.log("Selected communication: " + communication);

        if (communication === Communications.REST) {
          this.communicationService = this.communicationFactoryService.getRestCommunicationService(communication);
          this.getRestAllLogs();
        }

        if (communication === Communications.KAFKA) {
          this.communicationService = this.communicationFactoryService.getKafkaCommunicationService(communication);
          this.getRestAllLogs();
        }

        this.selectedCommunication = communication;
  }

  resetCommunication(): void {
      if (this.selectedCommunication !== Communications.REST && this.restLogs?.length !== 0 || this.selectedCommunication === undefined)
          this.restLogs = [];

  }

    private getRestAllLogs(): void {
      type RestLogOrKafkaLog = undefined;

      if (this.communicationService === undefined) {
        console.log("Communication service is undefined ( REST )");
        return;
      }

      this.communicationService.findAll().subscribe({
        next: (logs: (RestLog | KafkaLog)[]) => {
          if (this.selectedCommunication === Communications.REST) {
            this.restLogs = logs.filter(log => log instanceof RestLog) as RestLog[];
          }
          if (this.selectedCommunication === Communications.KAFKA) {
            this.kafkaLogs = logs.filter(log => log instanceof KafkaLog) as KafkaLog[];
          }
        },
        error: (err: any) => console.log(err),
        complete: () => console.log("Communication service completed ( REST )")
      });


    }

}
