import { Router } from 'express';

import employeesRouter from '@infra/web/employees/routes';

const routes = Router();

routes.get('/', (request, response) => {
  response.json({
    title: 'API de cadastro de funcionários',
    description: 'Teste realizado por Adnilson Soares - 16/04/2024'
  })
});
routes.use('/', employeesRouter);

export default routes;
