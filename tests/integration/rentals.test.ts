import supertest from "supertest";
import app from "app";
import {
  generateUser,
  generateUserWithRentalAndMovie,
} from "./factories/users.factory";
import prisma from "database";
import { generateRental } from "./factories/rentals.factory";
import { generateMovie } from "./factories/movie.factory";

const server = supertest(app);

beforeEach(async () => {
  await prisma.movie.deleteMany();
  await prisma.rental.deleteMany();
  await prisma.user.deleteMany();
});

describe("GET /rentals test", () => {
  it("deve retornar um array vazio quando não houver alugueis", async () => {
    const { body, status } = await server.get("/rentals");
    expect(status).toBe(200);
    expect(body).toEqual([]);
  });

  it("deve pegar todos os algueis", async () => {
    await generateUserWithRentalAndMovie();

    const { body, status } = await server.get("/rentals");
    expect(status).toBe(200);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          date: expect.any(String),
          endDate: expect.any(String),
          userId: expect.any(Number),
          closed: expect.any(Boolean),
        }),
      ])
    );
  });
});

describe("GET /rentals/:id test", () => {
  it("deve retornar 400 quando id invalido ", async () => {
    const id = "nan";

    const { status } = await server.get(`/rentals/${id}`);
    expect(status).toBe(400);
  });

  it("deve retornar 404 quando id inexistente ", async () => {
    const id = 999999999;

    const { status } = await server.get(`/rentals/${id}`);
    expect(status).toBe(404);
  });

  it("deve retornar um rental quando id for valido", async () => {
    const user = await generateUser();
    const rental = await generateRental(user.id);
    const id = rental.id;

    const { status, body } = await server.get(`/rentals/${id}`);
    expect(status).toBe(200);
    expect(body).toEqual({
      id: rental.id,
      date: rental.date.toISOString(),
      endDate: rental.endDate.toISOString(),
      userId: rental.userId,
      closed: rental.closed,
    });
  });
});

describe("POST /rentals test", () => {
  it("deve retornar status 402 quando o filme já estiver alugado", async () => {
    const user = await generateUser();
    const rental = await generateRental(user.id);
    const movie = await generateMovie(rental.id);

    const moviesId = movie.id;

    const { status } = await server.post("/rentals").send({
      userId: user.id,
      moviesId: [moviesId],
    });

    expect(status).toBe(402);
  });

  it("deve retornar status 404 quando não for encontrado o filme", async () => {
    const user = await generateUser();
    const moviesId = 99999;

    const { status, body } = await server.post("/rentals").send({
      userId: user.id,
      moviesId: [moviesId],
    });

    expect(status).toBe(404);
  });

  it("deve retornar status 422 quando não for enviado o moviesId", async () => {
    const user = await generateUser();

    const { status } = await server.post("/rentals").send({
      userId: user.id,
    });

    expect(status).toBe(422);
  });

  it("deve retornar status 201 quando enviado um alguel no formato correto", async () => {
    const user = await generateUser();
    const movie = await generateMovie();

    const { status, body } = await server.post("/rentals").send({
      userId: user.id,
      moviesId: [movie.id],
    });

    expect(status).toBe(201);
  });
});

describe("POST /rentals/finish test", () => {
  it("deve retornar 404 quando o rentalId for valido porém inexistente", async () => {
    const rentalId = 99999;

    const { status } = await server.post("/rentals/finish").send({
      rentalId: rentalId,
    });

    expect(status).toBe(404);
  });

  it("deve retornar 200 quando o rentalId for valido", async () => {
    const user = await generateUser();
    const rental = await generateRental(user.id);
    await generateMovie(rental.id);

    const { status } = await server.post("/rentals/finish").send({
      rentalId: rental.id,
    });

    expect(status).toBe(200);
  });
});
