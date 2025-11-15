// dependencies
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// types
import { Player } from "../utils/data_structures";
import { LineNode, ChoiceNode, SplitNode } from "../utils/data_structures";

const emptyAsyncMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({ message: "empty" });
  } catch (err) {
    next(err);
  }
};

export default { emptyAsyncMiddleware };
