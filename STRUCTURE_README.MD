# FOLDERS STRUCTURE

* `Config` - project configs
* `Constants` - project constants
* `DB` - manage DB connection
* `Handlers` - endpoint handlers
* `Libs` - project libs like `logger` or `passport`
* `Logs` - log files
* `Managers` - project managers
* `Middlewares` - express middlewares
* `Models` - DB models

# PROJECT ARCHITECTURE

We're using MVC pattern.

0. `Models` - lower layer representing DB cals
1. `Managers` - middle layer; contains all business logic; calls models
2. `Handlers` - top layer; handle express requests and calls managers