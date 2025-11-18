// dependencies
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// story nodes
import { nodesById } from "../utils/test_story_nodes";

const postSendLineChainNode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.body.username;
  const line_chain_node_id = req.body.line_chain_node_id;
  if (!username || !line_chain_node_id) {
    return res.status(400).json({ error: "Bad request." });
  }
  try {
    const line_node = nodesById[line_chain_node_id];
    if (!line_node) {
      return res.status(400).json({ error: "Line chain node not found." });
    }
    return res.status(200).json({ node: line_node });
  } catch (err) {
    next(err);
  }
};

const postChoice = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username;
  const choice_node_id = req.body.choice_node_id;
  const choice_index = req.body.choice_index;
  if (!username || !choice_node_id || !choice_index) {
    return res.status(400).json({ error: "Bad request." });
  }
  try {
    // find next line chain node
    const choice_node = nodesById[choice_node_id];
    if (!choice_node || choice_node.type !== "choice") {
      return res.status(400).json({ error: "Choice node not found." });
    }
    const picked_choice_option = choice_node.choices[choice_index];
    if (!picked_choice_option) {
      return res.status(400).json({ error: "Choice index out of bounds." });
    }
    const next_line_chain_node = nodesById[picked_choice_option.node_id];
    // to do: edit player object
    return res.status(200).json({ node: next_line_chain_node });
  } catch (err) {
    next(err);
  }
};

const postSplit = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username;
  const split_node_id = req.body.split_node_id;
  if (!username || !split_node_id) {
    return res.status(400).json({ error: "Bad request." });
  }
  try {
    const split_node = nodesById[split_node_id];
    if (!split_node || split_node.type !== "split") {
      return res.status(400).json({ error: "Split node not found." });
    }
    // to do: check stats in DB against split node's requirement and find the next line chain node; for now it just returns true node
    const next_line_chain_node_id = split_node.trueNodeId;
    const next_line_chain_node = nodesById[next_line_chain_node_id];
    if (!next_line_chain_node || !next_line_chain_node_id) {
      return res.status(400).json({ error: "Line chain node not found." });
    }
    return res.status(200).json({ node: next_line_chain_node });
  } catch (err) {
    next(err);
  }
};

export default {
  postSendLineChainNode,
  postChoice,
  postSplit,
};
