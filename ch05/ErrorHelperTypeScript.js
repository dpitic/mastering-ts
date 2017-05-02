// The module keyword
// ==================
window.onload = function () {
    var failureMessage = {
        responseText: {
            "failure": true,
            "errorMessage": "Error Message from Typescript"
        }
    };
    if (ErrorHelper.containsErrors(failureMessage))
        ErrorHelper.trace(failureMessage);
};
