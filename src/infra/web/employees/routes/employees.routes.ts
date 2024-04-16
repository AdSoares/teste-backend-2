import { Router, Request, Response } from 'express';

import EmployeesController from '@infra/web/employees/controllers/EmployeesController';

const employeesRouter = Router();

const employeesController = new EmployeesController();

employeesRouter.get('/:id', employeesController.get);
employeesRouter.get('/', employeesController.list);
employeesRouter.post('/', employeesController.create);
employeesRouter.put('/', employeesController.update);
employeesRouter.patch('/', employeesController.update);

export default employeesRouter;
