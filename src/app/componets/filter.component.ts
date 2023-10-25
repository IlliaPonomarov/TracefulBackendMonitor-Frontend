import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CommunicationsEnum} from "../utility/communications.enum";
import RestLog from "../models/rest.model";
import {FilterService} from "../services/filter.service";
import {RestService} from "../services/webservice.service";
import {KafkaLog} from "../models/kafka.model";


@Component({
  selector: 'app-filter',
  templateUrl: '../html/filter.component.html',
  styleUrls: ['../css/filter.component.css'],
  providers: [FilterService, RestService]
})
export class FilterComponent implements OnInit {
  protected communications: CommunicationsEnum[] = [CommunicationsEnum.KAFKA, CommunicationsEnum.GRAPHQL, CommunicationsEnum.REST, CommunicationsEnum.SOAP]
  @Output() selectedCommunicationEvent = new EventEmitter<CommunicationsEnum>();
  protected selectedCommunication: CommunicationsEnum | undefined;

  protected services: string[] = [];
  protected selectedService: string = "Services";

  protected operations: string[] = [];
  protected selectedOperation: string = "";

  @Input() communicationLogs: ( RestLog | KafkaLog )[] | undefined;

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    this.selectedCommunication = CommunicationsEnum.NONE;
    console.log("rests: " + this.communicationLogs)
  }

  selectCommunication(communication: CommunicationsEnum): void {
        console.log("Selected communication: " + communication);
        this.selectedCommunication = communication;
        this.selectedCommunicationEvent.emit(communication);

    console.log("99 rests: " + this.communicationLogs)
        if (communication === CommunicationsEnum.REST) {
          this.services = this.filterService.getServices(this.communicationLogs as RestLog[]);
          console.log("services: " + this.services);
        }
  }

  selectService(service: string): void {
      this.selectedService = service;
  }




}
