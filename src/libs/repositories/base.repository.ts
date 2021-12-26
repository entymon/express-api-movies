import fs from 'fs'
import appRoot from 'app-root-path'
import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import ApiError from '@/errors/api.error'

abstract class BaseRepository {

  protected static instance: any

  protected db: JsonDB

  protected constructor (
    private filename = 'db'
  ) {
    const path = (`${appRoot.path}/data/${this.filename}.json`).replace('/build', '')
    if (!fs.existsSync(path)) {
      throw new ApiError('Database file does not exist', 500, 'ApiError') 
    }
    const config = new Config(path, true, false, '/')
    this.db = new JsonDB(config)
  }
}

export default BaseRepository

