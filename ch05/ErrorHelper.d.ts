// The module keyword
// ==================

declare module ErrorHelper {
    function containsErrors(response);
    function trace(message);
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

declare module ErrorHelper {
    function containsErrors(response: IResponse);
    function trace(message: IResponse);
}