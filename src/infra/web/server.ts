
import '@infra/containers';
import { app } from './express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger_output.json';
import { Database } from '../database/database'

dotenv.config();
const port: number = Number(process.env.PORT) || 3333;

let database = new Database();
database.setupDb();

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});