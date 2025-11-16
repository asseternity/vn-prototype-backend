// dependencies
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getEmptyAsyncMiddleware = async (
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

const getTestUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let testUser = await prisma.user.findFirst();
    if (!testUser) {
      testUser = await prisma.user.create({
        data: {
          name: "test",
        },
      });
    }
    return res.status(200).json({ username: testUser.name });
  } catch (err) {
    next(err);
  }
};

export default {
  getEmptyAsyncMiddleware,
  getTestUserData,
};
