import RestLog from "../models/webservice.model";


export class FilterService {

  filterRestLogsByService(restLogs: RestLog[], service: string): RestLog[] {
    return restLogs.filter(restLog => restLog.service === service);
  }

  getServiceOperations(restLogs: RestLog[], service: string): string[] {
       let operations: string[] = [];

        restLogs.forEach(restLog => {
          if (restLog.service === service && !operations.includes(restLog.operation)) {
            operations.push(restLog.operation);
          }
        });

        return operations;
  }
}
