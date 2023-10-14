import {Component, OnInit} from "@angular/core";
import {Communications} from "../utility/communications.enum";
import RestLog from "../models/webservice.model";
import {WebService} from "../services/rest.webservice.service";

@Component({
    selector: 'app-main',
    templateUrl: '../html/main.component.html',
    styleUrls: ['../css/main.component.css'],
    providers: [WebService]
})
export class MainComponent implements OnInit {

  protected communications: Communications[] = [Communications.KAFKA, Communications.GRAPHQL, Communications.REST, Communications.SOAP]
  protected selectedCommunication: Communications | undefined;
  rests: RestLog[] | undefined;

  constructor(private webService: WebService) { }

  ngOnInit(): void {
    if (this.selectedCommunication === Communications.REST)
        this.getAllRestLogs();
  }

  selectCommunication(communication: any): void {
        console.log("Selected communication: " + communication);

        if (communication === Communications.REST)
            this.getAllRestLogs();

        this.selectedCommunication = communication;
  }

    private getAllRestLogs(): void {
        this.webService.getWebServices().subscribe({next: (data: RestLog[]) => this.rests = data});
    }

}
