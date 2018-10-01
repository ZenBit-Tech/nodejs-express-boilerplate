# Node.js express server template

## Features

* Cron
* Bearer Token Authentication
* OAuth 2.0
  * Google
  * LinkedIn
  * Twitter
  * Facebook
* MongoDB
* Sequlize
* Input Validation

## Using

### Install

1. Run `npm i`
2. Make a copy of `.env.development` file and name it `.env`

### Run

- Run `npm run dev` to run in the development mode;
- Run `npm start` to run in the production mode.

### Routes

Route strucure:

```JS
{
  handler: 'handlers/auth/login', // handler function path | require
  middlewares: [],                // array of middlewares  | optional
  events: {
    http: {                // http event
      path: '/auth/login', // route         | require for http
      method: 'POST'       // event method  | require for http
    },
    shedule: {             // shedule event    | optional
      rate: ''             // cron rate string | require for shedule
      enabled: true        // enabled flag     | require for shedule
    }
  }
}
```

Cron rate string structure

```
* * * * * *
| | | | | |
| | | | | day of week
| | | | month
| | | day of month
| | hour
| minute
second ( optional )
```

@ DomIn3339 2018
