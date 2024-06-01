import { fail } from "@sveltejs/kit";
import { request as graphqlRequest } from "graphql-request";

export const prerender = false;

// Data naar Hygraph sturen
export const actions = {
  default: async ({ request, url }) => {
    const formData = await request.formData();
    let name = formData.get("name");
    let email = formData.get("email");
    let text = formData.get("text");

    // Zorg dat je een enter kan zetten in de textarea
    text = text.replace(/\r?\n/g, "\\n");

    // Check of de naam minimaal 2 karakters bevat
    if (name.length < 2)
      return fail(400, {
        error: true,
        message: "Naam moet minstens 2 karaters bevatten",
        name,
        email,
        text,
      });

    // Maak nieuwe content aan voor Hygraph
    const mutation = `
      mutation {
        createMessage(data: { name: "${name}", email: "${email}", text: "${text}"}) {
          id
          name
          email
          text
        }
      }
    `;

    // Hygraph url
    const endpoint =
      "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clwemxl0n04vu07wbhmoqz38a/master";

    // Hygraph autorisatie
    const HYGRAPH_TOKEN = import.meta.env.VITE_HYGRAPH_KEY;
    const headers = {
      Authorization: `Bearer ${HYGRAPH_TOKEN}`,
    };

    // Voer de mutatie uit
    const postData = await graphqlRequest(
      endpoint,
      mutation,
      undefined,
      headers
    );
    return { success: true, postData };
  },
};