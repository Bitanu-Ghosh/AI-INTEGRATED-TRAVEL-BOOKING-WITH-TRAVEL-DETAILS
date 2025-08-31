// src/aihelper.js
import { genAI } from "./gemini";

export async function generateItinerary(destination, days, interest) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Create a ${days}-day itinerary for ${destination} focused on ${interest} activities.(give without bold letters (**))`;

    const result = await model.generateContent(prompt);

    // Gemini SDK returns text like this:
    const text = result.response.text();

    if (text) {
      return text
        .split("\n")
        .filter(line => line.trim() !== "");
    } else {
      return [`AI could not generate itinerary for ${destination}`];
    }
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return [`Error generating itinerary. Try again later.`];
  }
}
