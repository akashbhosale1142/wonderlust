class ExpressError extends Error{
  constructor(status, massage){
    super(massage);
    this.status = status;
  }
}

module.exports = ExpressError