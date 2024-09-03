require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Lead = require("./models/Lead.model"); // Assuming the schema is saved in models/lead.js

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Backend Done and Dusted For Lead Schema 👨‍💻✅");
});

// Route to create a new lead
app.post("/leads", async (req, res) => {
  try {
    const { email } = req.body;

    console.log("Checking email:", email);

    // Check if email already exists
    const existingLead = await Lead.findOne({ email: email });
    console.log("Existing lead:", existingLead);

    if (existingLead) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newLead = new Lead(req.body);
    await newLead.save();
    res.status(201).send(newLead);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/leads/:id", async (req, res) => {
  try {
    const leadId = req.params.id;

    // Find the lead by ID and return the entire document
    const lead = await Lead.findById(leadId);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (error) {
    console.error("Error fetching lead:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// GET request to fetch all leads
app.get("/leads", async (req, res) => {
  try {
    const leads = await Lead.find(); // Fetch all leads

    res.json(leads); // Return the array of leads
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// GET request to fetch leads by industry
app.get("/leads/industry/:industry", async (req, res) => {
  try {
    const industry = req.params.industry;

    // Find leads with the specified industry
    const leads = await Lead.find({ industry: industry });

    if (leads.length === 0) {
      return res
        .status(404)
        .json({ message: "No leads found for the specified industry" });
    }

    res.json(leads);
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.get("/leads/twitter/:handle", async (req, res) => {
  try {
    const handle = req.params.handle;
    const lead = await Lead.findOne({ twitter: handle }).select("twitter");

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// mongoose
//   .connect(
//     "mongodb+srv://BackendUser:rUOIpCKLc0oVpmtw@clusterkreupai.imb19.mongodb.net/"
//   )
//   .then(() => {
//     console.log("Connected to database");

//     app.listen(3011, () => {
//       console.log("Server is running on port 3011");
//     });
//   })
//   .catch((error) => {
//     console.error("Database connection error:", error);
//   });

mongoose
  .connect(process.env.MONGODB_URI) // Use environment variable for MongoDB URI
  .then(() => {
    console.log("Connected to database");

    app.listen(process.env.PORT, () => {
      // Use environment variable for port
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
