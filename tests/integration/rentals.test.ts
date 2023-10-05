import supertest from 'supertest';
import app from 'app';


const server = supertest(app)

describe(" get /rentals", () => {
  it("should pegar todos os algueis", async () => {
    const { body, status } = await server.get('/rentals')
    expect(status).toBe(200)
    expect(body).toEqual([] || expect.arrayContaining([
      expect.objectContaining({
          id: expect.any(Number),
          date: expect.any(Date),
          endDate: expect.any(Date),
          userId: expect.any(Number),
          closed: expect.any(Boolean),   
        })
      ])
    );
  });
})