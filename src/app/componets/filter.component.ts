import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CommunicationsEnum} from "../utility/communications.enum";
import RestLog from "../models/rest.model";
import {FilterService} from "../services/filter.service";
import {RestService} from "../services/webservice.service";
import {KafkaLog} from "../models/kafka.model";
import {DataService} from "../services/data.service";


@Component({
  selector: 'app-filter',
  templateUrl: '../html/filter.component.html',
  styleUrls: ['../css/filter.component.css'],
  providers: [FilterService, RestService]
})
export class FilterComponent implements OnInit {
  protected communications: CommunicationsEnum[] = [CommunicationsEnum.KAFKA, CommunicationsEnum.GRAPHQL, CommunicationsEnum.REST, CommunicationsEnum.SOAP]
  protected selectedCommunication: CommunicationsEnum | undefined;
  protected selectedService: string = "Services";
  protected operations: string[] = [];
  protected selectedOperation: string = "";

  @Input() communicationLogs: ( RestLog | KafkaLog )[] | undefined;
  @Input() services: string[] = [];

  @Output() selectedCommunicationEvent = new EventEmitter<CommunicationsEnum>();


    constructor(private filterService: FilterService,  protected dataService: DataService) { }

  ngOnInit() {
    this.selectedCommunication = CommunicationsEnum.NONE;
    console.log("rests: " + this.communicationLogs)
  }

  selectCommunication(communication: CommunicationsEnum): void {
        console.log("Selected communication: " + communication);
        this.selectedCommunication = communication;
        this.selectedCommunicationEvent.emit(communication);
  }

  selectService(service: string): void {
      this.selectedService = service;
  }




}
