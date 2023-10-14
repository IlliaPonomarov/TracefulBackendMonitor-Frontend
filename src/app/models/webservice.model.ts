import {Communications, RestMethods} from "../utility/communications.enum";



export default class RestLog {

    private _id: string;
    private _service: string;
    private _request: Request;
    private _response: Response;
    private _date: Date;

    constructor(id: string, service: string, request: Request, response: Response, date: Date) {
        this._id = id;
        this._service = service;
        this._request = request;
        this._response = response;
        this._date = date;
    }

    public getId(): string {
        return this._id;
    }


  get id(): string {
    return this._id;
  }
  get service(): string {
    return this._service;
  }

  set service(value: string) {
    this._service = value;
  }

  get request(): Request {
    return this._request;
  }

  set request(value: Request) {
    this._request = value;
  }

  get response(): Response {
    return this._response;
  }

  set response(value: Response) {
    this._response = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }
}
export class Request {

    private _url: string;
    private _method: RestMethods;
    private _parameters: string;
    private _headers: string;
    private _body: string;

    constructor(url: string, method: RestMethods, parameters: string, headers: string, body: string) {
        this._url = url;
        this._method = method;
        this._parameters = parameters;
        this._headers = headers;
        this._body = body;
    }

    get url(): string {
        return this._url;
    }

    get method(): RestMethods {
        return this._method;
    }

    get parameters(): string {
        return this._parameters;
    }

    get headers(): string {
        return this._headers;
    }

    get body(): string {
        return this._body;
    }


  set url(value: string) {
    this._url = value;
  }

  set method(value: RestMethods) {
    this._method = value;
  }

  set parameters(value: string) {
    this._parameters = value;
  }

  set headers(value: string) {
    this._headers = value;
  }

  set body(value: string) {
    this._body = value;
  }
}

export class Response {

  private _statusCode: number;
  private _headers: string;
  private _body: string;
  private _errorDescription: string;
  private _date: Date;


  constructor(statusCode: number, headers: string, body: string, errorDescription: string, date: Date) {
    this._statusCode = statusCode;
    this._headers = headers;
    this._body = body;
    this._errorDescription = errorDescription;
    this._date = date;
  }


  get statusCode(): number {
    return this._statusCode;
  }

  set statusCode(value: number) {
    this._statusCode = value;
  }

  get headers(): string {
    return this._headers;
  }

  set headers(value: string) {
    this._headers = value;
  }

  get body(): string {
    return this._body;
  }

  set body(value: string) {
    this._body = value;
  }

  get errorDescription(): string {
    return this._errorDescription;
  }

  set errorDescription(value: string) {
    this._errorDescription = value;
  }

  get date(): Date {
    return this._date;
  }
  set date(value) {
    this._date = value;
  }
}
