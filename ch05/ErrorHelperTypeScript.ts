// The module keyword
// ==================

window.onload = () => {
    var failureMessage = {
        responseText: {
            "failure": true,
            "errorMessage": "Error Message from Typescript"
        }
    }

    if (ErrorHelper.containsErrors(failureMessage))
        ErrorHelper.trace(failureMessage);
}