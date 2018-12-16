import compiler from './compiler.js';

test('Properly handles .tex with default options', async () => {
  const stats = await compiler('example.js.tex');
  const output = stats.toJson().modules[0].source;
  expect(output).toBe(`console.log('Hello world');`);
});

test('Properly handles .md with default options', async () => {
  const stats = await compiler('example.js.md');
  const output = stats.toJson().modules[0].source;
  expect(output).toBe(`console.log('Hello world');`);
});

test('Properly handles .html with default options', async () => {
  const stats = await compiler('example.js.html');
  const output = stats.toJson().modules[0].source;
  expect(output).toBe(`console.log('Hello world');`);
});

test('Properly handles .bird with default options', async () => {
  const stats = await compiler('example.js.bird');
  const output = stats.toJson().modules[0].source;
  expect(output).toBe(`console.log('Hello world');`);
});
