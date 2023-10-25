import {Component, Input} from "@angular/core";
import RestLog from "../models/rest.model";
import {KafkaLog} from "../models/kafka.model";
import {CommunicationsEnum} from "../utility/communications.enum";

@Component({
    selector: 'app-logs',
    templateUrl: '../html/logs.component.html',
    styleUrls: ['../css/logs.component.css']
})
export class LogsComponent{

    @Input() communicationLogs: any[] | undefined;
    @Input() selectedCommunication: CommunicationsEnum | undefined;
    protected readonly CommunicationsEnum = CommunicationsEnum;


    constructor() { }


}
