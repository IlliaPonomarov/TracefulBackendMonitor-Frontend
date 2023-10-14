import {Component, Input} from "@angular/core";
import {Communications} from "../utility/communications.enum";
import RestLog from "../models/webservice.model";


@Component({
  selector: 'app-filter',
  templateUrl: '../html/filter.component.html',
  styleUrls: ['../css/filter.component.css']
})
export class FilterComponent {
  protected communications: Communications[] = [Communications.KAFKA, Communications.GRAPHQL, Communications.REST, Communications.SOAP]
  protected selectedCommunication: Communications = Communications.REST;
  protected services: string[] = [];
  protected operations: string[] = [];

  @Input() rests: RestLog[] | undefined;

  constructor() { }


    selectCommunication(communication: Communications): void {
        console.log("Selected communication: " + communication);

        this.selectedCommunication = communication;
    }



}
