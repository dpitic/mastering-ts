// Global variables
// ================
var GlobalLogger = (function () {
    function GlobalLogger() {
    }
    GlobalLogger.logGlobalsToConsole = function () {
        for (var _i = 0, CONTACT_EMAIL_ARRAY_1 = CONTACT_EMAIL_ARRAY; _i < CONTACT_EMAIL_ARRAY_1.length; _i++) {
            var email = CONTACT_EMAIL_ARRAY_1[_i];
            console.log("found contact: " + email);
        }
    };
    return GlobalLogger;
}());
// Structured data
// ===============
var ContactLogger = (function () {
    function ContactLogger() {
    }
    ContactLogger.logContactData = function () {
        for (var _i = 0, CONTACT_DATA_1 = CONTACT_DATA; _i < CONTACT_DATA_1.length; _i++) {
            var contact = CONTACT_DATA_1[_i];
            console.log("DisplayText: " + contact.DisplayText +
                (", Email: " + contact.Email));
        }
    };
    return ContactLogger;
}());
window.onload = function () {
    GlobalLogger.logGlobalsToConsole();
    ContactLogger.logContactData();
};
