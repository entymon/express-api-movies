import appRoot from 'app-root-path'
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

abstract class BaseRepository {

  protected static instance: any;

  protected constructor (
    protected db = new JsonDB(new Config(`${appRoot.path}/data/db.json`, true, false, '/'))
  ) {
  }
}

export default BaseRepository