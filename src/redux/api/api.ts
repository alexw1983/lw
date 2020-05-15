/**
 * Loads players from the API
 */
export const getPlayers = async () => {
  console.log("GOT HERE");
  return {
      json: [
          {
              id: "1",
              name: "Alex Wilson",
          },
          {
              id: "2",
              name: "Sayer Hilton",
          },
          {
              id: "3",
              name: "Robin Wilson Thorn",
          },
      ],
  };
};
