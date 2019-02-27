'use strict';

var APP_ID = 'amzn1.ask.skill.87b36bb8-dfdd-442b-bda8-93cc20ad84f3'; // replace with your APP_ID
var AlexaSkill = require('./AlexaSkill');
var http = require('http');

var gameOfThrones = function () {
    AlexaSkill.call(this, APP_ID);
};

gameOfThrones.prototype = Object.create(AlexaSkill.prototype);
gameOfThrones.prototype.constructor = gameOfThrones;

gameOfThrones.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);

    // Any session init logic would go here.
};
gameOfThrones.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleWelcomeRequest(response);
        };

gameOfThrones.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);

    //Any session cleanup logic would go here.
};

gameOfThrones.prototype.intentHandlers = {
    
	"testIntent": function (intent, session, response) {
        testIntentResponse(intent, session, response);
    },
    "houseIntent": function (intent, session, response) {
        houseIntentResponse(intent, session, response);
    },
    "whatHouseIntent": function (intent, session, response) {
        whatHouseIntentResponse(intent, session, response);
    },
    "YesIntent": function (intent, session, response) {
        responseToYes(intent, session, response);
    },
    "NoIntent": function (intent, session, response) {
        responseToNo(intent, session, response);
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        tellAvailableCommands(response);
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },
    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Thank you for using the Kristas Cafe Alexa Application. Goodbye";
        response.tell(speechOutput);
    }
};

function handleWelcomeRequest(response) {
    var speechOutput = {
        speech: "Welcome Game of Thrones",
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
        },
        repromptOutput = {
            speech: "You can say, what is on promotion, where is the nearest location or I would like to place an order. What would you like to do?",
            type: AlexaSkill.speechOutputType.PLAIN_TEXT
        };

    response.ask(speechOutput, repromptOutput);
}
function testIntentResponse(intent, session, response) {
    //console.log('Sauce: ' + intent.slots.favSauce.value);
    var speechOutput = {
        speech: "Test",
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    response.ask(speechOutput);
}

function houseIntentResponse(intent, session, response) {
    console.log('House: ' + intent.slots.House.value);
    var userHouse = intent.slots.House.value;
    session.attributes.House = intent.slots.House.value;
    var speechOutput = {
        speech: "Welcome to house " + userHouse,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    response.ask(speechOutput);
}

function whatHouseIntentResponse(intent, session, response) {
    console.log('House: ' + intent.slots.House.value);
    var userHouse = intent.slots.House.value;
    var speechOutput = {
        speech: "Welcome to house " + userHouse,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    response.ask(speechOutput);
}

function whatHouseIntentResponse(intent, session, response) {
    console.log('House: ' + userHouse);
    var userHouse = session.attributes.House;
    var speechOutput = {
        speech: "Welcome to house " + userHouse,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    response.ask(speechOutput);
}


function responseToNo(intent, session, response) {
  if (session.attributes.stage === "ordercombo") {
        speechOutput = "Okay, special number two is two racks of ribs with your favorite sauce and an order of fries for $27.99. Would you like to order this special combo?";
        session.attributes.stage = "order";
        response.ask(speechOutput);
  }
    if (session.attributes.stage === 2) {
        speechOutput = "Okay, we have no other special combo options available at this time. Please visit your nearest Kristas Cafe to see our other menu options. To locate the closest Kristas Cafe, please say, where is the nearest location.";
        response.ask(speechOutput);
        
    } 
       if (session.attributes.stage === 'order') {
        speechOutput = "Okay, what would you like to order?";
        response.ask(speechOutput);
	 } 
       if (session.attributes.stage === 'sauce') {
        speechOutput = "Okay, what sauce would you like?";
        response.ask(speechOutput);
    }
        if (session.attributes.stage === 'sauce2') {
        speechOutput = "Okay, thanks for visiting Krista's Cafe. Your order will be ready soon, we look forward to seeing you. Have a great day!";
        response.ask(speechOutput);
    }
     if (session.attributes.stage === 'orderdone') {
        speechOutput = "Okay, thanks for visiting Krista's Cafe. Your order will be ready soon, we look forward to seeing you. Have a great day!";
        response.ask(speechOutput);
    }
    var speechOutput = {
        speech: speechOutput,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
}
function responseToYes(intent, session, response) {
   if (session.attributes.stage === 1) {
        speechOutput = "Sure, let me place that order for you. Your order will be available for pickup at your favorite Kristas Cafe store in 20 minutes. Is there anything else you'd like to do such as, find a location or see what's on promo?";
        session.attributes.stage = "orderdone";
        response.ask(speechOutput);
  }
  if (session.attributes.stage === 'orderdone') {
        speechOutput = "Okay, what else would you like to do? You can say, what is on promotion, where is the nearest location or I would like to place another order.";
        session.attributes.stage = "sauce";
		response.ask(speechOutput);
    } 
    if (session.attributes.stage === 'order') {
        speechOutput = "Okay, would you like your favorite sauce on that?";
        session.attributes.stage = "sauce";
		response.ask(speechOutput);
    } 
        if (session.attributes.stage === 'ordercombo') {
        speechOutput = "Okay, would you like your favorite sauce on that?";
        session.attributes.stage = "sauce";
		response.ask(speechOutput);
    }
     if (session.attributes.stage === 'sauce') {
        speechOutput = "Sure, let me place that order for you with your favorite sauce. Your order will be available for pickup at your favorite Kristas Cafe store in 20 minutes. Is there anything else you'd like to do such as, find a location or see what's on promo?";
        session.attributes.stage = "sauce2";
		response.ask(speechOutput);
    } 
    if (session.attributes.stage === 'sauce2') {
        speechOutput = "Okay, what else would you like to do? You can say, what is on promotion, where is the nearest location or I would like to place another order.";
        session.attributes.stage = "sauce2";
		response.ask(speechOutput);
    } 
    var speechOutput = {
        speech: speechOutput,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
}
function tellAvailableCommands(response) {
    var speechText = "You can say, what is on promotion, where is the nearest location or I would like to place an order. What would you like to do?";

    var speechOutput = {
        speech: speechText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    var repromptOutput = {
        speech: speechText,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT
    };
    response.ask(speechOutput, repromptOutput);
}

exports.handler = function (event, context) {
    var skill = new gameOfThrones();
    skill.execute(event, context);
};