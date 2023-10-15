import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Communications} from "../utility/communications.enum";
import RestLog from "../models/webservice.model";
import {FilterService} from "../services/filter.service";
import {RestService} from "../services/webservice.service";


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

  @Input() rests: RestLog[] | undefined;

  constructor(private filterService: FilterService) { }

  ngOnInit() {
    this.selectedCommunication = Communications.NONE;
    console.log("rests: " + this.rests)
  }

  selectCommunication(communication: Communications): void {
        console.log("Selected communication: " + communication);
        this.selectedCommunication = communication;
        this.selectedCommunicationEvent.emit(communication);

    console.log("99 rests: " + this.rests)
        if (communication === Communications.REST) {
          this.services = this.filterService.getServices(this.rests);
          console.log("services: " + this.services);
        }
  }

  selectService(service: string): void {
      this.selectedService = service;
  }




}
