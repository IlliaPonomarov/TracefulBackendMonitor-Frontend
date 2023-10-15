import {Component, Input} from "@angular/core";
import RestLog from "../models/webservice.model";

@Component({
    selector: 'app-logs',
    templateUrl: '../html/logs.component.html',
    styleUrls: ['../css/logs.component.css']
})
export class LogsComponent{

    @Input() rests: RestLog[] | undefined;

    constructor() { }



}
