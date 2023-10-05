import rentalsRepository from "repositories/rentals-repository";
import rentalsService from "../../src/services/rentals-service";

describe("Rentals Service Unit Tests", () => {
  it("deve lançar erro quando o usuario estiver com pagamento pendente", () => {
    const userId = 99999;

    jest
      .spyOn(rentalsRepository, "getRentalsByUserId")
      .mockImplementationOnce((): any => {
        return [1, 2, 3, 4];
      });

    const result = rentalsService.checkUserAbleToRental(userId);

    expect(result).rejects.toEqual({
      name: "PendentRentalError",
      message: "The user already have a rental!",
    });
  });
});
