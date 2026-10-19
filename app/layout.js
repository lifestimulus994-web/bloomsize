import "./globals.css";
import Providers from "../components/Providers";

export const metadata = {
  title: "Bloomsize — ჯანსაღი კვება შენი რიტმისთვის",
  description: "დიეტები, სამოტივაციო ვიდეოები და პერსონალური კვების გეგმა ერთ სივრცეში.",
  icons: { icon: "/img/logo.png" },
};
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#EAEFE4" };

export default function RootLayout({ children }) {
  return (
    <html lang="ka">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
