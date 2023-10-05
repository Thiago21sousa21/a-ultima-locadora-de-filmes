import prisma from "database";
import { faker } from "@faker-js/faker";

type User = {
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  cpf?: string;
  email?: string;
};

export async function generateUser({
  firstName,
  lastName,
  birthDate,
  cpf,
  email,
}: User) {
  const user = await prisma.user.create({
    data: {
      firstName: firstName || faker.person.firstName(),
      lastName: lastName || faker.person.lastName(),
      birthDate: birthDate || faker.date.birthdate(),
      cpf: cpf || faker.number.int(11).toString(),
      email: email || faker.internet.email(),
    },
  });

  return user;
}
