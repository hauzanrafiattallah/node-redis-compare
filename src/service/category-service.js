import { prismaClient } from "../application/database.js";

const findAll = async () => {
  const parents = await prismaClient.category.findMany({
    where: {
      parent_id: null,
    },
    select: {
      id: true,
      name: true,
    },
  });

  for (let parent of parents) {
    parent.children = await prismaClient.category.findMany({
      where: {
        parent_id: parent.id,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  return parents;
};

export default {
  findAll,
};
