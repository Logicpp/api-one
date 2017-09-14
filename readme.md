# InterCity Server

## Setup

**Backend**: Nodejs + Express

**Database**: MongoDB

**Database Library**: Mongoose

### Development

**Database Server**: 130.211.102.183

### Config Paths

#### App Configs

Contains database urls, password and other app related configs.

```bash
api.config.js
```

#### Routes Configs

Contains the configuration for the routes

```bash
routes.config.js
```

## Getting Started

```bash
pm2 start pm2.config.json
```