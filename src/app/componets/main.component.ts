import {Component} from "@angular/core";
import {CommunicationsEnum} from "../utility/communications.enum";
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

  protected selectedCommunication: CommunicationsEnum | undefined;
  protected communicationService: CommunicationService<RestLog | KafkaLog> | undefined;

  data: (RestLog | KafkaLog)[] | undefined;
  services: string[] = [];

  constructor(private communicationFactoryService: CommunicationFactory, protected dataService: DataService) { }

  selectCommunication(communication: any): void {
        console.log("Selected communication: " + communication);

        if (communication === CommunicationsEnum.REST) {
          this.communicationService = this.communicationFactoryService.getRestCommunicationService(communication);
          this.getAllLogs();
        }

        if (communication === CommunicationsEnum.KAFKA) {
          this.communicationService = this.communicationFactoryService.getKafkaCommunicationService(communication);
          this.getAllLogs();
        }

        this.selectedCommunication = communication;
  }

    private getAllLogs(): void {
      if (this.communicationService === undefined) {
        console.log("Communication service is undefined ( REST )");
        return;
      }

      this.communicationService.findAll().subscribe({
        next: (logs: (RestLog | KafkaLog)[]) => {

          this.dataService.setData(logs);
          this.data = this.dataService.getData();
          this.services = this.dataService.getServices();
          this.dataService.setCommunicationLogs(this.selectedCommunication as CommunicationsEnum);

        },
        error: (err: any) => console.log(err),
        complete: () => console.log("Communication service completed ( REST )")
      });
    }
}
