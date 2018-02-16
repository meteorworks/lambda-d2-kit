require('dotenv').config(); // load .env file

const APP_ID = process.env.APP_ID;
const Alexa = require('alexa-sdk');
const handlers = {
    'xxxxxx': function () {
        this.emit(':tell', 'xxxxx');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', '助けが必要ですか？');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'キャンセルします。');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', '終わります。');
    },
    'Unhandled': function () {
        this.emit(':tell', 'Hello World');
    }
};
exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
// To enable string internationalization (i18n) features, set a resources object.
    alexa.registerHandlers(handlers);
    alexa.execute();
};