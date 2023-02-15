import { logger } from "../helpers/logger";
import { PrismaNewClient } from "../prisma/client";

interface ICreateGist {
  slug: string;
  title: string;
  body: string;
  publish: boolean;
  userid: string;
}

export const createGist = async ({
  slug,
  title,
  body,
  publish,
  userid,
}: ICreateGist) => {
  try {
    const newGistData = await PrismaNewClient.prismaIn.gist.create({
      data: {
        slug,
        title,
        body,
        published: publish,
        userid,
      },
    });

    logger.info("Gist created successfully with id " + newGistData.id);
    console.log("Gist created successfully with id " + newGistData.id);

    return newGistData;
  } catch (error) {
    console.log(error);
    logger.error("Failed to create a new Gist");
    console.log("Failed to create a new Gist");

    throw error;
  }
};

interface IUpdateGist {
  id: string;
}

export const updateGist = async ({
  id,
  ...data
}: IUpdateGist & Partial<ICreateGist>) => {
  try {
    const updatedGist = await PrismaNewClient.prismaIn.gist.update({
      where: {
        id,
      },
      data,
    });

    logger.info("Gist created successfully with id " + updatedGist.id);
  } catch (error) {
    logger.error("Failed to create a new Gist");
  }
};

interface IDeleteGist {
  id: string;
}

export const deleteGist = async ({ id }: IDeleteGist) => {
  try {
    await PrismaNewClient.prismaIn.gist.delete({
      where: {
        id,
      },
    });

    logger.info("Gist deleted successfully");
  } catch (error) {
    logger.error("Failed to delete Gist");
  }
};
