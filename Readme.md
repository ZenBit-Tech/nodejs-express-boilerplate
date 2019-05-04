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

### Handler file exports

File by path in `handler` field should export `handler` function.

For validation on this route you can export object called `validation`, e.g.
```JS
  module.exports.validation = {
    validationSchema, // some yup validation schema
    requestField: 'some.request.field', // path to field to validate, default 'body'
    preprocessFunc: (filedValue) => fieldValue // some func to process body before validation, should return next field value
  }
```

Also you can export `middleware` - array of middlewares for the route. This middlewares will be invoked after middlewares in `routes.js` file.

@ DomIn3339 2019
