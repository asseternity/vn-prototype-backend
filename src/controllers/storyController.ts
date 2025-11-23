// dependencies
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// events
import { events_lookup } from "../events/_event_lookup";

const getSendEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const event_id = req.params.event_id;
  if (!event_id) {
    return res.status(400).json({ error: "Bad request." });
  }
  const event = events_lookup[event_id];
  if (!event) {
    return res.status(400).json({ error: "Event not found." });
  }
  return res.status(200).json({ event: event });
};

export default { getSendEvent };
