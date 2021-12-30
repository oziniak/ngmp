import express, { Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Container from "typedi";
import { catchErrors } from "../../decorators/catch-errors";
import { logTime } from "../../decorators/log-time";
import { GroupService } from "../../services/group-service";

const groupRouter = express.Router();

const { OK, BAD_REQUEST, NOT_FOUND } = StatusCodes;

@catchErrors
@logTime
class GroupRouterHandler {
  async handleGetGroups(req: Request, res: Response) {
    const groupService = Container.get(GroupService);
    const resp = await groupService.getAll();

    return res.status(OK).json(resp);
  }

  async handleGetGroup(req: Request, res: Response) {
    const groupService = Container.get(GroupService);
    const group = await groupService.getOne(req.params.id);
    if (!group) {
      return res.status(NOT_FOUND).send(getReasonPhrase(NOT_FOUND));
    }
    return res.status(OK).json(group);
  }

  async handleCreateGroup(req: Request, res: Response) {
    const userDto = req.body;
    const groupService = Container.get(GroupService);
    const newGroup = await groupService.create(userDto);

    return res.status(OK).json(newGroup);
  }

  async handleUpdateGroup(req: Request, res: Response) {
    const groupService = Container.get(GroupService);
    try {
      const result = await groupService.update(req.params.id, req.body);
      return res.status(OK).json(result);
    } catch (e) {
      return res.status(BAD_REQUEST).json(getReasonPhrase(BAD_REQUEST));
    }
  }

  async handleDeleteGroup(req: Request, res: Response) {
    const groupService = Container.get(GroupService);
    try {
      const result = await groupService.delete(req.params.id);
      return res.status(OK).json(result);
    } catch (e) {
      return res
        .status(BAD_REQUEST)
        .json({ message: getReasonPhrase(BAD_REQUEST) });
    }
  }
}

const handler = new GroupRouterHandler();

groupRouter.get("/", handler.handleGetGroups);
groupRouter.get("/:id", handler.handleGetGroup);
groupRouter.post("/", handler.handleCreateGroup);
groupRouter.put("/:id", handler.handleUpdateGroup);
groupRouter.delete("/:id", handler.handleDeleteGroup);

export { groupRouter };
