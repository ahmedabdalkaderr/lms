const User = require("../models/userModel");
class APIFeatures {
  constructor(mongooseQuery, query) {
    this.mongooseQuery = mongooseQuery;

    this.query = query;
  }

  filter() {
    const queryStringObj = { ...this.query };
    const excludedFields = ["page", "limit", "fields", "sort"];
    excludedFields.forEach((field) => delete queryStringObj[field]);
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|ne)\b/g, (match) => `$${match}`);
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.query.sort) {
      const sortBy = this.query.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.query.fields) {
      const fields = this.query.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  search(modelName="") {
    if (this.query.keyword) {
      this.mongooseQuery = modelName.find({
        name: { $regex: this.query.keyword, $options: "i" },
      });
    }

    return this;
  }
}

module.exports = APIFeatures;
