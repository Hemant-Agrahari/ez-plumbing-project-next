"use client";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Inter, Outfit as OutfitFont } from "next/font/google";
import { ThemeProvider } from "react-bootstrap";
import { Header } from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { getTokenCookie, setTokenCookie } from "@/helper/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// const Outfit = OutfitFont({
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   subsets: ["latin"]
// });

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

import "@/styles/globals.css";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import NewFooter from "@/components/Layout/Newfooter";
import CallTOAction from "@/components/CallToActionForm";
const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handlePasswordSubmit = () => {
    if (password === PASSWORD) {
      setTokenCookie("authenticated", true);
      setAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  useEffect(() => {
    const auth = getTokenCookie("authenticated");
    if (auth) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="sk4u_N9HoSFPqfKako6gsLfBPi9onVbr40hURKpuzHI"
        />
        <meta name="msvalidate.01" content="54FCA1907D994E234DF3F8DA34CEE9A1" />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" />

        <GoogleTagManager gtmId="GTM-W6WCW52" />
      </head>
      <ThemeProvider>
        <body className={`${inter.className}`}>
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-W6WCW52"
              height="0"
              width="0"
            // style="display:none;visibility:hidden"
            ></iframe>
          </noscript>
          {authenticated ? (
            <div className="page-wrapper">
              <Header />
              <div className="page-main">{children}</div>
              {/* <Script
                id="script7"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: `{
                     "@context": "https://schema.org",
                     "@type": "WebSite",
                     "url": "https://www.ezplumbingusa.com/",
                     "potentialAction": {
                     "@type": "SearchAction",
                     "target": "https://www.ezplumbingusa.com/search?&q={query}",
                     "query": "required"
                      }
                    }`,
                }}
              ></Script> */}
              <CallTOAction/>
              <NewFooter />
              {/* <Footer /> */}
              <ToastContainer />
            </div>
          ) : (
            <div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter password"
              />
              <button onClick={handlePasswordSubmit}>Submit</button>
            </div>
          )}
        </body>
      </ThemeProvider>
    </html>
  );
}
