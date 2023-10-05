import supertest from 'supertest';
import app from 'app';
import { faker } from '@faker-js/faker';


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

describe(" get /rentals/:id", () => {
  it("", async () => {

    const id = 'nan'

    const { body, status } = await server.get(`/rentals/${id}`)
    expect(status).toBe(400)
    // expect(body).toEqual([] || expect.arrayContaining([
    //   expect.objectContaining({
    //       id: expect.any(Number),
    //       date: expect.any(Date),
    //       endDate: expect.any(Date),
    //       userId: expect.any(Number),
    //       closed: expect.any(Boolean),   
    //     })
    //   ])
    // );
  });
})