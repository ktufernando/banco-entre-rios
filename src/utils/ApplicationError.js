class ApplicationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
class CodeError extends ApplicationError {
  constructor(message, code = 500, payload) {
    super(message);
    this.code = code;
    this.payload = payload;
    this.date = new Date();
  }
}

module.exports = {
  CodeError
}