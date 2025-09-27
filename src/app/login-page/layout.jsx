import "../globals.css";
import Providers from "../providers";

export const metadata = {
  title: "Auth - Prompt-Engine", // Specific title for auth pages
  description: "Login or Sign Up to Prompt-Engine",
};

export default function AuthRootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
