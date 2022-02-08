const express = require("express");
const router = express.Router();
const {
  controllerGetEvents,
  controllerAddEvents,
  controllerGetEvent,
  controllerDeleteEvent,
  controllerUpdateEvent,
} = require("./controllers");

router.get("/api/events", controllerGetEvents);

router.get("/api/events/:eventId", controllerGetEvent);

router.post("/api/events", controllerAddEvents);

router.delete("/api/events/:eventId", controllerDeleteEvent);

router.put("/api/events/:eventId", controllerUpdateEvent);

module.exports = router;
