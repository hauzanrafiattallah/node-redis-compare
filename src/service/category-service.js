import Redis from "ioredis";
import { prismaClient } from "../application/database.js";

const redis = new Redis({
  host: "localhost",
  port: 6379,
  db: 0,
});

const findAll = async () => {
  const json = await redis.get("categories");
  if (json) {
    return JSON.parse(json);
  }

  const parents = await prismaClient.category.findMany({
    where: {
      parent_id: null,
    },
    select: {
      id: true,
      name: true,
      children: true,
    },
  });

  // Save in redis
  await redis.setex("categories", 60 * 60, JSON.stringify(parents));

  // for (let parent of parents) {
  //   parent.children = await prismaClient.category.findMany({
  //     where: {
  //       parent_id: parent.id,
  //     },
  //     select: {
  //       id: true,
  //       name: true,
  //     },
  //   });
  // }

  return parents;
};

export default {
  findAll,
};
