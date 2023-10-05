import { faker } from "@faker-js/faker";
import prisma from "database";

export async function generateMovie(
  rentalId?: number,
  name?: string,
  adultsOnly?: boolean
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
