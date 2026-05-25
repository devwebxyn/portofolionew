"use client";

import { useEffect } from "react";
// no router usage here

export function RouteProgress() {
  // Minimal CSS-in-JS for a top progress bar
  useEffect(() => {
    const bar = document.createElement('div');
    bar.id = 'route-progress-bar';
    Object.assign(bar.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      height: '3px',
      width: '0%',
      zIndex: '9999',
      background: 'linear-gradient(90deg, #00A9FF, #9E00FF, #FFD700)',
      boxShadow: '0 0 12px rgba(0,169,255,0.6)',
      transition: 'width 0.25s ease-out, opacity 0.4s ease-out',
      opacity: '0',
    } as CSSStyleDeclaration);
    document.body.appendChild(bar);

  let timer: number | undefined;
    const start = () => {
      if (!bar) return;
      bar.style.opacity = '1';
      bar.style.width = '10%';
      timer = window.setInterval(() => {
        const curr = parseFloat(bar.style.width || '0');
        if (curr < 90) bar.style.width = `${curr + Math.random() * 10}%`;
      }, 300);
    };
    const done = () => {
      if (!bar) return;
      window.clearInterval(timer);
      bar.style.width = '100%';
      setTimeout(() => {
        bar.style.opacity = '0';
        bar.style.width = '0%';
      }, 350);
    };

    const onStart = () => start();
    const onDone = () => done();

    // Since we're in app router, patch push/back events
  const pushState = history.pushState as (this: History, data: unknown, unused: string, url?: string | URL | null) => void;
    history.pushState = function (
      data: unknown,
      unused: string,
      url?: string | URL | null
    ) {
      onStart();
  const res = pushState.call(window.history, data, unused, url);
      requestAnimationFrame(onDone);
      return res;
    } as History['pushState'];
  const replaceState = history.replaceState as (this: History, data: unknown, unused: string, url?: string | URL | null) => void;
    history.replaceState = function (
      data: unknown,
      unused: string,
      url?: string | URL | null
    ) {
      onStart();
  const res = replaceState.call(window.history, data, unused, url);
      requestAnimationFrame(onDone);
      return res;
    } as History['replaceState'];

    window.addEventListener('popstate', onStart);
    window.addEventListener('load', onDone);

    return () => {
      window.removeEventListener('popstate', onStart);
      window.removeEventListener('load', onDone);
      document.getElementById('route-progress-bar')?.remove();
      history.pushState = pushState;
      history.replaceState = replaceState;
    };
  }, []);

  return null;
}
