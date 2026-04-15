"use client";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default function NotFound() {
  redirect("/404-not-found");
  return null;
}