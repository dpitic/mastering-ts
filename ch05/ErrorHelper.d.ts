// The module keyword
// ==================

declare module ErrorHelper {
  function containsErrors(response: IResponse);
  function trace(message: IResponse);
}

// Interfaces
// ==========

interface IResponse {
  responseText: IFailureMessage;
}

interface IFailureMessage {
  failure: boolean;
  errorMesage: string;
}
