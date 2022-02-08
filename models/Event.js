const { Schema, model } = require("mongoose");

const isNameValid = (name) => {
  return name.includes("event") ? false : true;
};

const isEmailValid = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

function lessThanNumOfSeats(bookedSeats) {
  return bookedSeats <= this.numOfSeats;
}

function startDateAfterToday(startDate) {
  let today = new Date();
  today =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return Date.parse(today) < Date.parse(startDate);
}

function endDateAfterStartDate(endDate) {
  return Date.parse(this.startDate) < Date.parse(endDate);
}

const EventSchema = new Schema({
  organizer: { type: String, maxlength: 20, unique: true },
  name: {
    type: String,
    validate: { validator: isNameValid, message: "name is not valid" },
  },
  email: {
    type: String,
    validate: { validator: isEmailValid, message: "Email is not valid" },
  },
  image: { type: String, required: true },
  numOfSeats: { type: Number, min: 5 },
  bookedSeats: {
    type: Number,
    default: 0,
    validate: [
      lessThanNumOfSeats,
      "number of booked seats larger than number of seats available",
    ],
  },
  startDate: {
    type: Date,
    validate: {
      validator: startDateAfterToday,
      message: "start date is before today",
    },
  },
  endDate: {
    type: Date,
    validate: {
      validator: endDateAfterStartDate,
      message: "end date is before start date",
    },
  },
});

module.exports = model("Event", EventSchema);
