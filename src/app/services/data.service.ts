import {Injectable} from "@angular/core";
import RestLog from "../models/rest.model";
import {KafkaLog} from "../models/kafka.model";
import {CommunicationsEnum} from "../utility/communications.enum";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";


@Injectable({providedIn: 'root'})
export class DataService {
  private data: (RestLog | KafkaLog)[] = [];
  private selectedCommunication: CommunicationsEnum | undefined;
  private selectedService: string = "Services";
  private services: string[] = [];
  private selectedOperation: string = "Operations";

  public setData(data: (RestLog | KafkaLog)[]): void {
    this.data = data;

    const hasRestLogs = data.some(item => item instanceof RestLog);
    const hasKafkaLogs = data.some(item => item instanceof KafkaLog);

   if (hasRestLogs) {
      this.selectedCommunication = CommunicationsEnum.REST;
    } else if (hasKafkaLogs) {
      this.selectedCommunication = CommunicationsEnum.KAFKA;
    }

    this.setServices();
  }

  public setCommunicationLogs(communication: CommunicationsEnum): void {
    this.selectedCommunication = communication;
  }

  private setServices(): void {

    if (this.data.length > 0)
      this.services = this.data.map(item => item.service).filter((value, index, self) => self.indexOf(value) === index);
  }


  public getData(): (RestLog | KafkaLog)[] {
    return this.data
  }

  public getServices(): string[] {
      return this.services
  }

  public filterDataByService(service: string): (RestLog | KafkaLog)[] {

      this.selectedService = service;
    return this.data.filter(item => item.service === service);
  }


    filterDataByOperation(operation: string) {
       if (this.selectedService === "Services") {
           alert("Please select a service first")
           return;
       }

         return this.data.filter(item => item.service === this.selectedService && item.operation === operation);
    }

    filterDataByBetweenStartAndEndDate(fromDate: NgbDate, toDate: NgbDate) {

        if (this.selectedService === "Services") {
          return this.data.filter(item => item.date >= new Date(fromDate.year, fromDate.month - 1, fromDate.day) && item.date <= new Date(toDate.year, toDate.month - 1, toDate.day));
        }else if (this.selectedOperation === "Operations" && this.selectedService !== "Services") {
          return this.data.filter(item => item.service === this.selectedService && item.date >= new Date(fromDate.year, fromDate.month - 1, fromDate.day) && item.date <= new Date(toDate.year, toDate.month - 1, toDate.day));
        } else if (this.selectedOperation !== "Operations" && this.selectedService !== "Services") {
          return this.data.filter(item => item.service === this.selectedService && item.operation === this.selectedOperation && item.date >= new Date(fromDate.year, fromDate.month - 1, fromDate.day) && item.date <= new Date(toDate.year, toDate.month - 1, toDate.day));
        } else if (this.selectedOperation !== "Operations" && this.selectedService === "Services") {
          return this.data.filter(item => item.operation === this.selectedOperation && item.date >= new Date(fromDate.year, fromDate.month - 1, fromDate.day) && item.date <= new Date(toDate.year, toDate.month - 1, toDate.day));
        }

        return this.data.filter(item => item.date >= new Date(fromDate.year, fromDate.month - 1, fromDate.day) && item.date <= new Date(toDate.year, toDate.month - 1, toDate.day));
    }

  filterDataByEndDate(toDate: NgbDate) {
    if (this.selectedService === "Services") {
      return this.data.filter(item => item.date <= new Date(toDate.year, toDate.month - 1, toDate.day));
    }else if (this.selectedOperation === "Operations" && this.selectedService !== "Services") {
      return this.data.filter(item => item.service === this.selectedService && item.date <= new Date(toDate.year, toDate.month - 1, toDate.day));
    } else if (this.selectedOperation !== "Operations" && this.selectedService !== "Services") {
      return this.data.filter(item => item.service === this.selectedService && item.operation === this.selectedOperation && item.date <= new Date(toDate.year, toDate.month - 1, toDate.day));
    }else if (this.selectedOperation !== "Operations" && this.selectedService === "Services") {
      return this.data.filter(item => item.operation === this.selectedOperation && item.date <= new Date(toDate.year, toDate.month - 1, toDate.day));
    }

    return this.data.filter(item => item.date <= new Date(toDate.year, toDate.month - 1, toDate.day));
  }

  filterDataByStartDate(fromDate: NgbDate) {
    if (this.selectedService === "Services") {
      return this.data.filter(item => item.date >= new Date(fromDate.year, fromDate.month - 1, fromDate.day));
    }else if (this.selectedOperation === "Operations" && this.selectedService !== "Services") {
      return this.data.filter(item => item.service === this.selectedService && item.date >= new Date(fromDate.year, fromDate.month - 1, fromDate.day));
    } else if (this.selectedOperation !== "Operations" && this.selectedService !== "Services") {
      return this.data.filter(item => item.service === this.selectedService && item.operation === this.selectedOperation && item.date >= new Date(fromDate.year, fromDate.month - 1, fromDate.day));
    }else if (this.selectedOperation !== "Operations" && this.selectedService === "Services") {
      return this.data.filter(item => item.operation === this.selectedOperation && item.date >= new Date(fromDate.year, fromDate.month - 1, fromDate.day));
    }

    return this.data.filter(item => item.date >= new Date(fromDate.year, fromDate.month, fromDate.day));
  }
}
