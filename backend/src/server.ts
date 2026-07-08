import app from "./app";

const PORT = 3333

app.listen(PORT, () => {
    console.log(`CoreFlow API running on http://localhost:${PORT}`);
})