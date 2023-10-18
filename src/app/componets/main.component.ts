import {Component} from "@angular/core";
import {Communications} from "../utility/communications.enum";
import RestLog from "../models/rest.model";
import {CommunicationFactory, CommunicationService, RestService} from "../services/webservice.service";
import {KafkaLog} from "../models/kafka.model";
import {DataService} from "../services/data.service";

@Component({
    selector: 'app-main',
    templateUrl: '../html/main.component.html',
    styleUrls: ['../css/main.component.css'],
    providers: [RestService]
})
export class MainComponent {

  protected selectedCommunication: Communications | undefined;
  protected communicationService: CommunicationService<RestLog | KafkaLog> | undefined;

  restLogs: RestLog[] | undefined;
  kafkaLogs: KafkaLog[] | undefined;

  constructor(private communicationFactoryService: CommunicationFactory, protected dataService: DataService) { }

  selectCommunication(communication: any): void {
        console.log("Selected communication: " + communication);

        if (communication === Communications.REST) {
          this.communicationService = this.communicationFactoryService.getRestCommunicationService(communication);
          this.getRestAllLogs();
        }

        if (communication === Communications.KAFKA) {
          this.restLogs = undefined;
          this.communicationService = this.communicationFactoryService.getKafkaCommunicationService(communication);
          this.getRestAllLogs();
        }

        this.selectedCommunication = communication;
  }

    private getRestAllLogs(): void {
      if (this.communicationService === undefined) {
        console.log("Communication service is undefined ( REST )");
        return;
      }

      this.communicationService.findAll().subscribe({
        next: (logs: (RestLog | KafkaLog)[]) => {
          if (this.selectedCommunication === Communications.REST) {
            this.restLogs = logs.filter(log => log instanceof RestLog) as RestLog[];
            this.dataService.setData(this.restLogs);

          }
          if (this.selectedCommunication === Communications.KAFKA) {
            this.kafkaLogs = logs.filter(log => log instanceof KafkaLog) as KafkaLog[];
            this.dataService.setData(this.kafkaLogs);
          }
        },
        error: (err: any) => console.log(err),
        complete: () => console.log("Communication service completed ( REST )")
      });



    }

}
