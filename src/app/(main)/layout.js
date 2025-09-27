
import Nav from "@/components/Nav";
import "../globals.css";
import Providers from "../providers";
import Footer from "@/components/footer";


export const metadata = {
  title: "Prompt-Engine",
  description: "Your one stop solution for all your prompt needs",
};

async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white text-center flex flex-col min-h-screen ">
        <Providers> 
          <Nav />
          <main className="flex-grow">
          {children}
          </main>
          <Footer className=''/>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
