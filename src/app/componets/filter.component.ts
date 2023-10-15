import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Communications} from "../utility/communications.enum";
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
  protected communications: Communications[] = [Communications.KAFKA, Communications.GRAPHQL, Communications.REST, Communications.SOAP]
  @Output() selectedCommunicationEvent = new EventEmitter<Communications>();
  protected selectedCommunication: Communications | undefined;

  protected services: string[] = [];
  protected selectedService: string = "Services";

  protected operations: string[] = [];
  protected selectedOperation: string = "";

  @Input() communicationLogs: RestLog[] | KafkaLog [] | undefined;

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    this.selectedCommunication = Communications.NONE;
    console.log("rests: " + this.communicationLogs)
  }

  selectCommunication(communication: Communications): void {
        console.log("Selected communication: " + communication);
        this.selectedCommunication = communication;
        this.selectedCommunicationEvent.emit(communication);

    console.log("99 rests: " + this.communicationLogs)
        if (communication === Communications.REST) {
          this.services = this.filterService.getServices(this.communicationLogs as RestLog[]);
          console.log("services: " + this.services);
        }
  }

  selectService(service: string): void {
      this.selectedService = service;
  }




}
