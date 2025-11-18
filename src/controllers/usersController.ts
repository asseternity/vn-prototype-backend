// dependencies
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
          player_name: "test",
          username: "test",
          email: "test@test.com",
          password: "123456",
        },
      });
    }
    return res.status(200).json({ username: testUser.name });
  } catch (err) {
    next(err);
  }
};

export default {
  getTestUserData,
};
