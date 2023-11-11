import {Component, Input} from "@angular/core";
import {CommunicationsEnum} from "../utility/communications.enum";
import { DecimalPipe, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-logs',
    templateUrl: '../html/logs.component.html',
    styleUrls: ['../css/logs.component.css']
})
export class LogsComponent{

    @Input() communicationLogs: any[] | undefined;
    @Input() selectedCommunication: CommunicationsEnum | undefined;
    protected readonly CommunicationsEnum = CommunicationsEnum;
    page = 1;
    pageSize = 4;
    collectionSize = 0;



    constructor() {
      this.collectionSize = this.communicationLogs?.length as number;
    }

  refreshLogs() {

      if (this.communicationLogs === undefined) {
        console.log("Communication logs are undefined");
        return;
      }
    this.communicationLogs = this.communicationLogs.map((log, i) => ({ id: i + 1, ...log })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }


}
