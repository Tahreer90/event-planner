const req = require("express/lib/request");
const Events = require("../../models/Event");

exports.controllerGetEvents = async (req, res) => {
  try {
    const events = await Events.find();
    res.json(events);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.controllerDeleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    await Events.findByIdAndDelete(eventId);
    res.status(204).end();
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.controllerUpdateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = req.body;
    console.log(event);
    const eventUpdated = await Events.findByIdAndUpdate(eventId, event, {
      new: true,
    });
    res.status(200).json({ msg: "event updated", payload: eventUpdated });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.controllerGetEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Events.findById(eventId);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.controllerAddEvents = async (req, res) => {
  try {
    const event = req.body;
    const eventCreated = await Events.create(event);
    res.status(201).json({ msg: "product created", payload: eventCreated });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
