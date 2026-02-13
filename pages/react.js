import { useEffect, useState } from "react";

export default function ReactPage() {
  const [done, setDone] = useState(false);
  const [result, setResult] = useState("");
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const url = params.get("url");

    async function run() {
      const res = await fetch(`https://zamxzyhost.my.id/api/Bypass?url=${encodeURIComponent(url)}`);
      const data = await res.text();

      await fetch("/api/save", {
        method: "POST",
        body: JSON.stringify({ result: data }),
      });

      let t = 10;
      const interval = setInterval(() => {
        t--;
        setSeconds(t);
        if (t <= 0) {
          clearInterval(interval);
          setResult(data);
          setDone(true);
        }
      }, 1000);
    }

    run();
  }, []);

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      background: "#0d0d0d",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontFamily: "monospace",
      textAlign: "center"
    }}>
      {!done ? (
        <div style={{
          padding: "40px 80px",
          border: "2px solid red",
          borderRadius: "20px",
          boxShadow: "0 0 30px red"
        }}>
          <h1>Please wait {seconds}s</h1>
          <h2>BACON HUB</h2>
        </div>
      ) : (
        <pre>{result}</pre>
      )}
    </div>
  );
}
