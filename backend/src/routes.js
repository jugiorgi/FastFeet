import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import RecipientsController from './app/controllers/RecipientsController';
import SessionController from './app/controllers/SessionController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliverymanOrdersController from './app/controllers/DeliverymanOrdersController';
import OrdersDeliveries from './app/controllers/OrdersDeliveries';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';
import StartOrderController from './app/controllers/StartOrderController';
import EndOrderController from './app/controllers/EndOrderController';
import authMiddleware from './app/middlewares/auth';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';
import DeliveryProblemByIdController from './app/controllers/DeliveryProblemByIdController';
import CancelDeliveryController from './app/controllers/CancelDeliveryController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/deliveryman/:id/orders', DeliverymanOrdersController.index);
routes.get('/deliveryman/:id', DeliverymanController.show);
routes.get('/deliveryman/:id/deliveries', OrdersDeliveries.index);

routes.post('/delivery/:id/problems', DeliveryProblemsController.store);
routes.get('/delivery/problems', DeliveryProblemsController.index);
routes.get('/delivery/:id/problems', DeliveryProblemByIdController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.put('/order/:id', OrderController.update);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/recipients', RecipientsController.index);
routes.post('/recipients', RecipientsController.store);
routes.put('/recipients/:id', RecipientsController.update);
routes.delete('/recipients/:id', RecipientsController.delete);

routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.get('/order', OrderController.index);
routes.post('/order', OrderController.store);

routes.delete('/order/:id', OrderController.delete);

routes.put('/order/start/:id', StartOrderController.update);
routes.put('/order/end/:id', EndOrderController.update);

routes.delete('/problem/:id/cancel-delivery', CancelDeliveryController.delete);

export default routes;
