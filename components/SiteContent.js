"use client";
import { useEffect } from "react";
import { boot } from "../lib/content";

export default function SiteContent() {
  useEffect(() => { boot(); }, []);
  return null;
}
