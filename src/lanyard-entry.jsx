import React from 'react';
import { createRoot } from 'react-dom/client';
import Lanyard from './components/Lanyard.jsx';
import photographUrl from '../photograph.png';

const host = document.getElementById('idc');
const mount = document.getElementById('lanyard-root');

function photoFace() {
  return new Promise((resolve, reject) => {
    const photo = new Image();
    photo.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1440;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas unavailable'));
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      // Cover the entire portrait card with a centered, high-resolution crop.
      const cropWidth = photo.height * canvas.width / canvas.height;
      const cropLeft = (photo.width - cropWidth) / 2;
      ctx.drawImage(photo, cropLeft, 0, cropWidth, photo.height, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255,210,63,.82)';
      ctx.lineWidth = 5;
      ctx.strokeRect(18, 18, 988, 1404);
      resolve(canvas.toDataURL('image/png'));
    };
    photo.onerror = reject;
    photo.src = photographUrl;
  });
}

function backFace() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1440;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  const bg = ctx.createLinearGradient(0, 0, 1024, 1440);
  bg.addColorStop(0, '#162b43');
  bg.addColorStop(1, '#07101d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1024, 1440);
  ctx.strokeStyle = 'rgba(79,183,232,.55)';
  ctx.lineWidth = 4;
  ctx.strokeRect(38, 38, 948, 1364);
  ctx.strokeStyle = 'rgba(255,210,63,.72)';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.ellipse(512, 570, 350, 115, -0.28, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#3fb7e8';
  ctx.beginPath();
  ctx.arc(512, 570, 218, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#206b9a';
  ctx.beginPath();
  ctx.arc(570, 520, 218, 0, Math.PI * 2);
  ctx.fill();
  ctx.textAlign = 'center';
  ctx.font = '92px "Press Start 2P", monospace';
  ctx.fillStyle = '#f2f4ff';
  ctx.fillText('S K', 512, 1030);
  ctx.font = '25px "Press Start 2P", monospace';
  ctx.fillStyle = '#ffd23f';
  ctx.fillText('SIDDHANT KOLI', 512, 1135);
  ctx.font = '36px "VT323", monospace';
  ctx.fillStyle = 'rgba(226,236,249,.72)';
  ctx.fillText('AI  /  WEB  /  SYSTEMS', 512, 1200);
  return canvas.toDataURL('image/png');
}

if (host && mount) {
  const root = createRoot(mount);
  let isMounted = false;
  let frontImage = '';
  let backImage = '';
  const update = () => {
    const visible = Number.parseFloat(host.style.opacity || '0') > 0.015;
    if (visible === isMounted) return;
    isMounted = visible;
    root.render(visible ? <Lanyard
      frontImage={frontImage}
      backImage={backImage}
      imageFit="cover"
      cardColor="#0b1424"
      orientation="portrait"
      finish="glossy"
      cornerRadius={0.3}
      size={0.46}
      anchor="center"
      strapLength={0.15}
      strapColor="#111111"
      strapWidth={0.65}
      metal="silver"
      gravity={1}
      damping={0.5}
      elasticity={0.5}
      breeze={0.5}
      interactive
      intro
    /> : null);
  };

  document.fonts?.ready.then(async () => {
    try {
      frontImage = await photoFace();
      backImage = backFace();
      const observer = new MutationObserver(update);
      observer.observe(host, { attributes: true, attributeFilter: ['style'] });
      update();
    } catch (error) {
      console.error('Could not prepare the Lanyard photo card.', error);
    }
  });
}