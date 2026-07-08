export class StatusService {
  getStatus() {
    return {
      status: "ok",
      system: "CoreFlow API",
      version: "1.0.0"
    };
  }
}