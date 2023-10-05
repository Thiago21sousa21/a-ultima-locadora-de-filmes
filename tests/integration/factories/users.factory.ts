import prisma from "database";
import { faker } from "@faker-js/faker";
import { generateRental } from "./rentals.factory";
import { generateMovie } from "./movie.factory";

export async function generateUser() {
  const user = await prisma.user.create({
    data: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      birthDate: faker.date.birthdate(),
      cpf: faker.number.int(11).toString(),
      email: faker.internet.email(),
    },
  });

  return user;
}

export async function generateUserWithRentalAndMovie() {
  const user = await prisma.user.create({
    data: {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      birthDate: faker.date.birthdate(),
      cpf: faker.number.int(11).toString(),
      email: faker.internet.email(),
    },
  });

  const rental = await generateRental(user.id);
  await generateMovie(rental.id);

  return user;
}
