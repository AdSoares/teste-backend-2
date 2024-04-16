import { Request, Response } from 'express';
import { container } from 'tsyringe';
import FindEmployeeUseCase from '@application/usecases/employees/find/FindEmployeeUseCase';
import ListEmployeeUseCase from '@application/usecases/employees/list/ListEmployeeUseCase';
import CreateEmployeeUseCase from '@application/usecases/employees/create/CreateEmployeeUseCase';
import UpdateEmployeeUseCase from '@application/usecases/employees/update/UpdateEmployeeUseCase';

class EmployeesController {
  
  public async get(request: Request, response: Response): Promise<Response> {

    try {
      const id = request.params.id;

      const useCase = container.resolve(
        FindEmployeeUseCase,
      );

      const employeeReturn = await useCase.execute({ id });

      return response.status(200).json(employeeReturn);

    } catch(error) {
      response.status(500).send(error);
    }
  }

  public async list(request: Request, response: Response): Promise<Response> {

    try {
      const useCase = container.resolve(
        ListEmployeeUseCase,
      );

      const employeesReturn = await useCase.execute({ });

      return response.status(200).json(employeesReturn);

    } catch(error) {
      response.status(500).send(error);
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {

    try {
      const useCase = container.resolve(
        CreateEmployeeUseCase,
      );

      const employeesReturn = await useCase.execute(request.body);

      return response.status(200).json(employeesReturn);

    } catch(error) {
      response.status(500).send(error);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {

    try {
      const useCase = container.resolve(
        UpdateEmployeeUseCase,
      );

      const employeesReturn = await useCase.execute(request.body);

      return response.status(200).json(employeesReturn);

    } catch(error) {
      response.status(500).send(error);
    }
  }
}

export default EmployeesController;
