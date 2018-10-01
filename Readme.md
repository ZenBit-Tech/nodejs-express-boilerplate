# Node.js express server template

## Using

### Install

1. Run `npm i`
2. Make a copy of `.env.development` file and name it `.env`

### Routes

Route strucure:

``` JS
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