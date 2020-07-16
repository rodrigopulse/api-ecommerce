import express from 'express'
import mongoose from 'mongoose'

import dotenv from 'dotenv'

import routes from './routes'

dotenv.config()

class App {
  public express: express.Application
  public constructor () {
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares ():void {
    this.express.use(express.json())
  }

  private database ():void {
    const user = process.env.DB_USER
    const password = process.env.DB_PASSWORD
    const host = process.env.DB_HOST
    mongoose.connect(`mongodb+srv://${user}:${password}@${host}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  }

  private routes ():void {
    this.express.use(routes)
  }
}

export default new App().express
