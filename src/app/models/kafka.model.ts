
export class KafkaLog {
  private readonly _id: string;
  private _service: string;
  private _operation: string;
  private _topic: string;
  private _producer: Producer[];
  private _consumers: Consumer[];

  constructor(id: string, service: string, operation: string, topic: string, producer: Producer[], consumers: Consumer[]) {
    this._id = id;
    this._service = service;
    this._operation = operation;
    this._topic = topic;
    this._producer = producer;
    this._consumers = consumers;
  }


  get service(): string {
    return this._service;
  }

  set service(value: string) {
    this._service = value;
  }

  get operation(): string {
    return this._operation;
  }

  set operation(value: string) {
    this._operation = value;
  }

  get topic(): string {
    return this._topic;
  }

  set topic(value: string) {
    this._topic = value;
  }

  get producer(): Producer[] {
    return this._producer;
  }

  set producer(value: Producer[]) {
    this._producer = value;
  }

  get consumers(): Consumer[] {
    return this._consumers;
  }

  set consumers(value: Consumer[]) {
    this._consumers = value;
  }
}

export class Producer {
  private _messageId: string;
  private _data: string;

  constructor(messageId: string, data: string) {
    this._messageId = messageId;
    this._data = data;
  }


  get messageId(): string {
    return this._messageId;
  }

  set messageId(value: string) {
    this._messageId = value;
  }

  get data(): string {
    return this._data;
  }

  set data(value: string) {
    this._data = value;
  }
}
export class Consumer {
  private _messageId: string;
  private _data: string;

  constructor(messageId: string, data: string) {
    this._messageId = messageId;
    this._data = data;
  }


  get messageId(): string {
    return this._messageId;
  }

  set messageId(value: string) {
    this._messageId = value;
  }

  get data(): string {
    return this._data;
  }

  set data(value: string) {
    this._data = value;
  }
}
