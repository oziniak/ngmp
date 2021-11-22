import express from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Container from "typedi";
import { GroupService } from "../../services/group-service";

const groupRouter = express.Router();

const { OK, BAD_REQUEST, NOT_FOUND } = StatusCodes;

groupRouter.get("/", async (req, res) => {
  const groupService = Container.get(GroupService);
  const resp = await groupService.getAll();

  return res.status(200).json(resp);
});

groupRouter.get("/:id", async (req, res) => {
  const groupService = Container.get(GroupService);
  const group = await groupService.getOne(req.params.id);
  if (!group) {
    return res.status(NOT_FOUND).send(getReasonPhrase(NOT_FOUND));
  }
  return res.status(OK).json(group);
});

groupRouter.post("/", async (req, res) => {
  const userDto = req.body;
  const groupService = Container.get(GroupService);
  const newGroup = await groupService.create(userDto);

  return res.status(OK).json(newGroup);
});

groupRouter.put("/:id", async (req, res) => {
  const groupService = Container.get(GroupService);
  try {
    const result = await groupService.update(req.params.id, req.body);
    return res.status(OK).json(result);
  } catch (e) {
    return res.status(BAD_REQUEST).json(getReasonPhrase(BAD_REQUEST));
  }
});

groupRouter.delete("/:id", async (req, res) => {
  const groupService = Container.get(GroupService);
  try {
    const result = await groupService.delete(req.params.id);
    return res.status(OK).json(result);
  } catch (e) {
    return res
      .status(BAD_REQUEST)
      .json({ message: getReasonPhrase(BAD_REQUEST) });
  }
});

export { groupRouter };
