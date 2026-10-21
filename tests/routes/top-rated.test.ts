import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import fs from 'fs';
import app from '../../src/server.js';
import { initDb, getDb, closeDb } from '../../src/db/index.js';
import { createReview } from '../../src/models/review.js';
import { createBook } from '../../src/models/book.js';
import { createUser } from '../../src/models/user.js';

const DB_PATH = '/tmp/test-top-rated.db';

beforeEach(() => {
  initDb(DB_PATH);
});

afterEach(() => {
  closeDb();
  try {
    fs.unlinkSync(DB_PATH);
  } catch (e) {
    // ignore
  }
});

describe('GET /top-rated', () => {
  it('ranks books with enough reviews by average rating', async () => {
    const res = await request(app).get('/top-rated');
    expect(res.status).toBe(200);
    // Seed data: Dune (5, 5) outranks The Pragmatic Programmer (5, 4)
    const duneAt = res.text.indexOf('Dune');
    const pragmaticAt = res.text.indexOf('The Pragmatic Programmer');
    expect(duneAt).toBeGreaterThan(-1);
    expect(pragmaticAt).toBeGreaterThan(duneAt);
    expect(res.text).toContain('5.0 / 5 (2 reviews)');
  });

  it('leaves out books with only one review', async () => {
    const res = await request(app).get('/top-rated');
    // Neuromancer has a single 5-star review in the seed data
    expect(res.text).not.toContain('Neuromancer');
  });

  it('includes a book once it reaches the minimum number of reviews', async () => {
    // Neuromancer is book 17; Carol (user 3) already reviewed it
    createReview(getDb(), 1, 17, 3);
    const res = await request(app).get('/top-rated');
    expect(res.text).toContain('Neuromancer');
    expect(res.text).toContain('4.0 / 5 (2 reviews)');
  });

  it('breaks title ties alphabetically regardless of upper/lower case', async () => {
    const db = getDb();
    const lower = addBook('apple lower');
    const upper = addBook('Banana Upper');
    for (const bookId of [lower, upper]) {
      createReview(db, 1, bookId, 5);
      createReview(db, 2, bookId, 5);
    }
    const res = await request(app).get('/top-rated');
    // All tied at 5.0 with 2 reviews: apple lower, Banana Upper, Dune
    expect(res.text.indexOf('apple lower')).toBeLessThan(res.text.indexOf('Banana Upper'));
    expect(res.text.indexOf('apple lower')).toBeLessThan(res.text.indexOf('Dune'));
  });

  it('shows stars that match the rounded average', async () => {
    const db = getDb();
    // 5 reviews of 4 and 6 reviews of 3 average 3.4545..., shown as 3.5
    const bookId = addBook('Rounding Test');
    for (let i = 0; i < 11; i++) {
      const user = createUser(db, `rounder${i}`, `Rounder ${i}`);
      createReview(db, user.id, bookId, i < 5 ? 4 : 3);
    }
    const res = await request(app).get('/top-rated');
    const card = res.text.slice(res.text.indexOf('Rounding Test'));
    expect(card).toContain('3.5 / 5 (11 reviews)');
    expect(card).toContain('★★★★☆');
  });
});

function addBook(title: string): number {
  return createBook(getDb(), {
    title,
    author: 'Test Author',
    isbn: null,
    cover_url: null,
    description: null,
    published_year: null,
  }).id;
}
