import express from 'express'
import cors from 'cors'
import registerRoutes from './routes'
import addErrorHandler from './middleware/error-handler'

export default class App {
  public constructor (
    public app: express.Express = express(),
    public testMode: boolean = false
  ) {
    this.middleware()
    this.routes()
    this.addErrorHandler()
  }

  public start (): void {
    this.app.listen(3000, () => {
      console.log('Listining on 3000')
    })
  }

  public getServer (): express.Express {
    return this.app
  }

  private middleware (): void {
    this.app.use(express.json({ limit: '100mb' }))
    this.app.use(express.urlencoded({ limit: '100mb', extended: true }))
    this.app.use(cors())
    // TODO: authorisation middleware
  }

  private routes (): void {
    registerRoutes(this.app)
  }

  private addErrorHandler (): void {
    this.app.use(addErrorHandler)
  }
}
