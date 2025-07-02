// pages/index.tsx hoặc app/page.tsx (nếu dùng app directory)
"use client";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomePage from "./(user)/user/home/page";

export default function Home() {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>

  )
}