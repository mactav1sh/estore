import { Mongoose, Query, QueryOptions } from 'mongoose';

export default class QueryMethods {
  constructor(public query: any, public queryObj: QueryOptions) {
    this.query = query;
    this.queryObj = queryObj;
  }

  filter() {
    // excluding special queries such as page, because if it's not excluded it will search for example "page" property inside the product object which will not return any results
    const reqQuery = { ...this.queryObj };
    // 1) creating an array of the excluded queries and deleting it from the reqQuery obj
    const excluded = ['page', 'sort', 'limit', 'fields'];
    excluded.forEach((field) => delete reqQuery[field]);
    // 2) replacing lte,gte,... to $lte (mongo operators) to be allow their functionality
    const queryStr = JSON.stringify(reqQuery).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (word) => '$' + word
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryObj.sort) {
      const sort = (this.queryObj.sort as string).split(',').join(' ');
      this.query = this.query.sort(sort);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryObj.fields) {
      const fields = (this.queryObj.fields as string).split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = Number(this.queryObj.page) || 1;
    const limit = Number(this.queryObj.limit) || 100;
    this.query = this.query.skip((page - 1) * limit).limit(limit);
    return this;
  }
}
