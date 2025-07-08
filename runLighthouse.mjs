import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import { URL } from 'url';
import fs from 'fs';
import path from 'path';

const urls = [
  'http://localhost:5173/',
  'http://localhost:5173/login',
  'http://localhost:5173/signup',
  'http://localhost:5173/forgot-password',
  'http://localhost:5173/reset-password',
  'http://localhost:5173/dashboard'
];

const totalScores = [];

async function runLighthouse(url, browser) {
  const endpoint = browser.wsEndpoint();
  const result = await lighthouse(url, {
    port: new URL(endpoint).port,
    output: 'html',
    logLevel: 'error',
  });

  const { lhr, report } = result;

  const categories = lhr.categories;
  const scores = [
    categories.performance.score,
    categories.accessibility.score,
    categories['best-practices'].score,
    categories.seo.score,
  ];

  console.log('scores', scores);
  if (scores.some(score => score === null || score === undefined)) {
    throw new Error(`One or more scores are null or undefined for ${url}`);
  }

  const avgScore = (scores.reduce((sum, s) => sum + s, 0) / scores.length) * 100;
  totalScores.push(avgScore);

  console.log(`🔍 ${url} - Avg Score: ${avgScore.toFixed(2)} / 100`);

  const fileName = url.replace(/https?:\/\//, '').replace(/[\/:]/g, '_') + '.html';
  const reportPath = path.join('./lighthouse-reports', fileName);
  fs.writeFileSync(reportPath, report);
}

(async () => {
  if (!fs.existsSync('lighthouse-reports')) {
    fs.mkdirSync('lighthouse-reports');
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--remote-debugging-port=9222'],
  });

  for (const url of urls) {
    try {
      await runLighthouse(url, browser);
    } catch (err) {
      console.error(`❌ Failed on ${url}:`, err.message);
    }
  }

  await browser.close();

  const appAvg = totalScores.reduce((sum, s) => sum + s, 0) / totalScores.length;
  console.log(`\n🌟 Final Application-Wide Avg Score: ${appAvg.toFixed(2)} / 100`);
})();
