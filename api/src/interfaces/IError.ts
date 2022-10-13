interface IError extends Error {
  status: string;
  statusCode: number;
}

export default IError;
