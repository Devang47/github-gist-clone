import { PrismaClient } from "@prisma/client";

export class PrismaNewClient {
  static prismaIn: PrismaClient;

  static setup() {
    this.prismaIn = new PrismaClient();
  }
}
