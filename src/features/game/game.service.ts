import { GameRepository } from "./game.repository";

interface Person {
  name: string;
  image: string;
}

interface Game {
  id?: number;
  status: "waiting";
  people: Person[];
  correctPersonIndex: number;
}

export class GameService {
  private repository = new GameRepository();

  async createGame(): Promise<Game> {
    const people = [
        {
          name: "Alice",
          image: "alice.png",
        },
        {
          name: "Bob",
          image: "bob.png",
        },
        {
          name: "Cecilia",
          image: "cecilia.png",
        },
        {
          name: "Dan",
          image: "dan.png",
        },
        {
          name: "Emma",
          image: "emma.png",
        },
        {
          name: "Frank",
          image: "frank.png",
        },
        {
          name: "Grace",
          image: "grace.png",
        },
        {
          name: "Henry",
          image: "henry.png",
        },
        {
          name: "Iris",
          image: "iris.png",
        },
        {
          name: "Jack",
          image: "jack.png",
        },
        {
          name: "Kate",
          image: "kate.png",
        },
        {
          name: "Leo",
          image: "leo.png",
        },
        {
          name: "Marcus",
          image: "marcus.png",
        },
        {
          name: "Noah",
          image: "noah.png",
        },
        {
          name: "Olivia",
          image: "olivia.png",
        },
        {
          name: "Peter",
          image: "peter.png",
        },
        {
          name: "Quinn",
          image: "quinn.png",
        },
        {
          name: "Ruby",
          image: "ruby.png",
        },
        {
          name: "Sol",
          image: "sol.png",
        },
        {
          name: "Tina",
          image: "tina.png",
        },
        {
          name: "Uma",
          image: "uma.png",
        },
        {
          name: "Victor",
          image: "victor.png",
        },
        {
          name: "Wendy",
          image: "wendy.png",
        },
        {
          name: "Xavier",
          image: "xavier.png",
        },
        {
          name: "Yara",
          image: "yara.png",
        },
        {
          name: "Zoe",
          image: "zoe.png",
        },
      ];

    const game = {
      status: "waiting" as const,
      people,
      correctPersonIndex: Math.floor(Math.random() * people.length),
    };

    return await this.repository.save(game);
  }
}
