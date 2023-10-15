import RestLog from "../models/rest.model";


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

    getServices(rests: RestLog[] | undefined) {
        let services: string[] = [];

        console.log("rests: " + rests)

        if (rests !== undefined) {
            rests.forEach(rest => {
                services.push(rest.service);
            });
        }

        console.log("services: " + services)

        return services;
    }
}
