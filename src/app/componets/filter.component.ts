import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CommunicationsEnum} from "../utility/communications.enum";
import RestLog from "../models/rest.model";
import {FilterService} from "../services/filter.service";
import {RestService} from "../services/webservice.service";
import {KafkaLog} from "../models/kafka.model";
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,

} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-filter',
  templateUrl: '../html/filter.component.html',
  styleUrls: ['../css/filter.component.css'],
  providers: [FilterService, RestService],
  styles: [
    `
      .dp-hidden {
        width: 0;
        margin: 0;
        border: none;
        padding: 0;
      }
      .custom-day {
        text-align: center;
        padding: 0.185rem 0.25rem;
        display: inline-block;
        height: 2rem;
        width: 2rem;
      }
      .custom-day.focused {
        background-color: #e6e6e6;
      }
      .custom-day.range,
      .custom-day:hover {
        background-color: rgb(2, 117, 216);
        color: white;
      }
      .custom-day.faded {
        background-color: rgba(2, 117, 216, 0.5);
      }
    `,
  ],
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
  @Output() selectedServiceEvent = new EventEmitter<string>();

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  hoveredDate: NgbDate | null = null;


  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

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
      this.selectedServiceEvent.emit(service);
  }





}
