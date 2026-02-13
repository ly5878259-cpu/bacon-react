let stored = "";

export default function handler(req, res) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    stored = body.result;
    res.status(200).end();
  }
}
