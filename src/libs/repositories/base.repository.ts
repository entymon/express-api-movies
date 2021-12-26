import fs from 'fs'
import appRoot from 'app-root-path'
import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import ApiError from '@/errors/api.error'

abstract class BaseRepository {

  protected static instance: any

  protected db: JsonDB

  protected constructor (
    private path = (`${appRoot.path}/data/db.json`).replace('/build', '')
  ) {
    if (!fs.existsSync(this.path)) {
      throw new ApiError('Database file does not exist', 500, 'ApiError') 
    }
    const config = new Config(this.path, true, false, '/')
    this.db = new JsonDB(config)
  }
}

export default BaseRepository

