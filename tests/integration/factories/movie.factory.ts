import { faker } from "@faker-js/faker";
import prisma from "database";

export async function generateMovie(
  name?: string,
  adultsOnly?: boolean,
  rentalId?: number
) {
  const user = await prisma.movie.create({
    data: {
      name: name || faker.word.words({ count: { min: 3, max: 5 } }),
      adultsOnly: adultsOnly || false,
      rentalId: rentalId || null,
    },
  });

  return user;
}
