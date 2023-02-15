import { Request, Response, Router } from "express";
import { createGist } from "../../services/gistService";
import Joi from "joi";

const gistSchema = Joi.object({
  slug: Joi.string().required(),

  title: Joi.string().required(),

  body: Joi.string().required(),

  publish: Joi.boolean().required(),

  userid: Joi.string().uuid().required(),
});

const router = Router();

class GistRouter {
  // eslint-disable-line
  get routes() {
    router.get("/", async (req: Request, res: Response) => {
      // eslint-disable-next-line no-useless-catch
      try {
        return res.send({});
      } catch (err) {
        throw err;
      }
    });

    router.post("/create", async (req: Request, res: Response) => {
      try {
        const data = gistSchema.validate(req.body);
        if (data.error) {
          return res.status(400).send(data.error.message);
        }

        const gist = await createGist(data.value);
        res.json(gist).status(200);
      } catch (error) {
        res.status(400).send(error.message);
      }
    });

    return router;
  }
}

export default new GistRouter();
