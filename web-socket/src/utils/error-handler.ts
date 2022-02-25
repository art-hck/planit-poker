import { GaxiosError } from 'gaxios/build/src/common';
import { JsonWebTokenError } from 'jsonwebtoken';
import { NotFoundError, RoutePayload } from '../models';
import { DeniedError } from '../models/denied-error.ts';
import { routes } from '../routes';
import { log } from './log';

export function errorHandler(e: unknown, route: RoutePayload) {
  if (e instanceof Error) {
    switch (true) {
      case e instanceof DeniedError:
        log.error('WebSocket', `Доступ запрещен`, route.userId);
        route.send('denied', {});
        break;
      case e instanceof NotFoundError:
        log.error('WebSocket', `Сущность не найдена`, e.message);
        break;
      case e instanceof GaxiosError:
      case e instanceof JsonWebTokenError:
        route.session.token = route.session.refreshToken = undefined;
        route.send('invalidToken', {});
        routes.bye(route);
        log.error('WebSocket', `Недействительный токен или ошибка google авторизации`);
        break;
      default:
        log.error('WebSocket', e.stack);
        throw e;
    }
  } else throw e;
}
