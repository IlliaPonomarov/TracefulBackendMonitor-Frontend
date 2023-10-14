import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Communications} from "../utility/communications.enum";
import RestLog from "../models/webservice.model";
import {FilterService} from "../services/filter.service";
import {WebService} from "../services/rest.webservice.service";


@Component({
  selector: 'app-filter',
  templateUrl: '../html/filter.component.html',
  styleUrls: ['../css/filter.component.css'],
  providers: [FilterService, WebService]
})
export class FilterComponent implements OnInit {
  protected communications: Communications[] = [Communications.KAFKA, Communications.GRAPHQL, Communications.REST, Communications.SOAP]
  @Output() selectedCommunicationEvent = new EventEmitter<Communications>();
    protected selectedCommunication: Communications | undefined;

  protected services: string[] = [];
  protected selectedService: string = "Services";

  protected operations: string[] = [];
  protected selectedOperation: string = "";

  @Input() rests: RestLog[] | undefined;

  constructor(private filterService: FilterService, private webService: WebService) { }

  ngOnInit() {

    this.webService.getWebServices().subscribe({next: (data: RestLog[]) => this.rests = data});

  }

  selectCommunication(communication: Communications): void {
        console.log("Selected communication: " + communication);
        this.selectedCommunication = communication;
        this.selectedCommunicationEvent.emit(communication);
  }

  selectService(service: string): void {
      this.selectedService = service;
  }




}
