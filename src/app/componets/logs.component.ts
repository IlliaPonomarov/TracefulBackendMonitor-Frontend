import {Component, Input} from "@angular/core";
import RestLog from "../models/rest.model";
import {KafkaLog} from "../models/kafka.model";

@Component({
    selector: 'app-logs',
    templateUrl: '../html/logs.component.html',
    styleUrls: ['../css/logs.component.css']
})
export class LogsComponent{

    @Input() restLogs: RestLog[] | undefined;

    constructor() { }



}
