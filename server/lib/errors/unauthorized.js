class Unauthorized extends Error {
  constructor() {
    super('User lacks sufficient privileges to access this resource');
    this.status = 401;
  }
}

module.exports = Unauthorized;

