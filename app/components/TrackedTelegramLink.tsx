"use client";

import { trackEvent } from "../lib/analytics";

export default function TrackedTelegramLink({ location, children }: { location: string; children: React.ReactNode }) {
  return (
    <a
      href="https://t.me/tezdasotdim"
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent("telegram_click", { click_location: location })}
    >
      {children}
    </a>
  );
}
