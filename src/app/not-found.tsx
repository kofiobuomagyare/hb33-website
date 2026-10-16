import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "#faf6ec",
          color: "#20180f",
          margin: 0,
        }}
      >
        <main
          style={{
            maxWidth: 640,
            margin: "0 auto",
            padding: "4rem 1.5rem",
            textAlign: "center",
          }}
        >
          <p style={{ letterSpacing: "0.2em", fontSize: 12, fontWeight: 700 }}>404 · HB33</p>
          <h1 style={{ fontSize: "2rem", marginTop: "1rem" }}>
            This page didn’t make it into the container.
          </h1>
          <p style={{ marginTop: "1rem" }}>
            <Link href="/en" style={{ fontWeight: 700 }}>
              Back to home
            </Link>{" "}
            ·{" "}
            <Link href="/fr" style={{ fontWeight: 700 }}>
              Retour à l’accueil
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
