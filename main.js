const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();
// Path to the service account key JSON file
const SERVICE_ACCOUNT_FILE = process.env.SERVICE_ACCOUNT_FILE;

// SCOPES define the level of access you are requesting from the Google Calendar API
const SCOPES = ["https://www.googleapis.com/auth/calendar"];

// Initialize the Google Calendar API
const auth = new google.auth.GoogleAuth({
  keyFile: __dirname + SERVICE_ACCOUNT_FILE,
  scopes: SCOPES,
});

// Create a new calendar instance
const calendar = google.calendar({ version: "v3", auth });

// Function to create an event
async function createEvent() {
  const event = {
    summary: "Test Event",
    description: "This is a test event 2",
    start: {
      dateTime: "2024-05-19T10:00:00",
      timeZone: "America/New_York",
    },
    end: {
      dateTime: "2024-05-19T11:00:00",
      timeZone: "America/New_York",
    },
  };

  try {
    // Insert the event
    const res = await calendar.events.insert({
      calendarId: process.env.CALENDAR_ID,
      requestBody: event,
    });

    console.log("Event created: %s", res.data.htmlLink);

    const list = await calendar.events.list({
      calendarId: process.env.CALENDAR_ID,
    });

    console.log(list.data);
  } catch (err) {
    console.error("Error creating event:", err);
  }
}

// Call the function to create the event
createEvent();
