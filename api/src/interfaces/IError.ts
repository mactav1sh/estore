interface IError extends Error {
  status?: string;
  statusCode: number;
  message: string;
  isOperational?: boolean;
  code?: number;
  path?: string;
  value?: string;
  keyValue?: {
    [key: string]: string;
  };
  errors?: any;
}

export default IError;
