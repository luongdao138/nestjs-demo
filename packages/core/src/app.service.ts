import { Injectable } from '@nestjs/common'
import { normalizeString } from '@piom/common'

@Injectable()
export class AppService {
  getHello(): string {
    // return ''
    return normalizeString('Hello world')
  }
}
