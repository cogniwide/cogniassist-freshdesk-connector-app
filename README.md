## CogniAssist Connector for FreshDesk
Plugin to forward New tickets and Conversation updates to CogniAssist Platform

### Overview

Manage conversations, build relationships and serve your customers and partners better, all from one place.

###  Salient Features

#### Go live with CogniAssist in less time using CogniConnect

CogniConnect is Cogniwide's API builder and manager, a low code API
management platform that makes API creation and integrations faster.


#### Build Trust using Explainable Al Feature
Evidences that throw light on lineage, intent and logic helps trouble
shooters, audit teams and regulators.

####  Transfer to live agent using CogniChat
Customer Emotion & Sentiment based auto-transfer to live agent from
Digital Assistant using CogniChat ensures seamless connectivity.

#### One powerful dashboard to engage your customers
Get Real-time reports, monitor and respond better than ever.

#### State of the Art Security
Choose robust SAAS infrastructure with five layers of cloud security or
on-prem hosting of Digital Assistant  

### Project folder structure explained

    .
    ├── README.md                  This file.
    ├── config                     Installation parameter configs.
    │   ├── iparams.json           Installation parameter config in English language.
    │   └── iparam_test_data.json  Installation parameter data for local testing.
    └── manifest.json              Project manifest.
    └── server                     Business logic for remote request and event handlers.
        ├── lib
        │   └── utils.js
        ├── server.js
        └── test_data
            ├── onAppInstall.json
            ├── onAppUninstall.json
            ├── onContactCreate.json
            ├── onContactUpdate.json
            ├── onConversationCreate.json
            ├── onExternalEvent.json
            ├── onTicketCreate.json
            └── onTicketUpdate.json


### Other Cogniwide Apps

#### Freshchat CogniAssist App

CogniAssist is an Omnichannel Digital Assistant Platform to enhance employee & customer experience. 
[Visit App](https://www.freshworks.com/apps/freshchat/cogniassist/)