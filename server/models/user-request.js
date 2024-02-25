import mongoose from "mongoose";
const { Schema } = mongoose;

// ! 1. Schema: Defining data types in Database of each records.
// ! 2. After that need to do validation
const tutRequest = new Schema({
  technology: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  create_at: {
    type: Date,
    required: true,
  },
});

// Table Name
const tutRequestModel = mongoose.model("tutorial-request", tutRequest);

// * Like INSERT_QUERY in SQL
export const createTutorialRequest = async (data) => {
  try {
    const result = await tutRequestModel.create(data);
    console.log("Result of createTutorialRequest Method: " + result);
  } catch (error) {
    // checking validation
    throw error;
  }
};

export const getAllRequestData = async () => {
  try {
    const requestData = await tutRequestModel.find({});
    return requestData;
  } catch (error) {
    console.log(error);
  }
};

export const updateDataById = async (id, data) => {
  try {
    const filter = { _id: id };

    const result = await tutRequestModel.findOneAndUpdate(filter, data, {
      new: true,
    });
    // console.log("Result from update based on ID: " + result);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteDataById = async (id) => {
  try {
    const result = await tutRequestModel.findByIdAndDelete(id);
    return result;
    console.log("Deleted");
  } catch (error) {
    throw error;
  }
};
