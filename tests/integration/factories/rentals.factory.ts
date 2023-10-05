import prisma from "database";
import { faker } from "@faker-js/faker";

export async function generateRental(userId: number, endDate?: Date) {
  const user = await prisma.rental.create({
    data: {
      endDate: endDate || faker.date.future(),
      userId: userId,
    },
  });

  return user;
}
