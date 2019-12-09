# EMS for :Different 

## Quick Setup

1.First install all packages
```
npm install
```

2.Run Redis (Application using in-memory database)


## Running The APP

```
npm run start
```

## Running The TESTS

```
npm run test
```

# ENDPOINTS

```
POST http://localhost:2010/v1/emails  
GET http://localhost:2010/v1/emails/:id
DELETE http://localhost:2010/v1/emails/:id
POST http://localhost:2010/v1/emails/webhook
```

## NOTE
I have used email provider as `sendgrid`, In free accounts there is some limitations.
They only allow to get sent email status only for paid accounts. as a solution for that i have used webhooks to update scheduled email status.
`WEBHOOKS` won't fire rightaway it takes 10-30 seconds to send email status because of that in system will delay to update email status.