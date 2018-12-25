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

test('Can read in a config file', async () => {
  const stats = await compiler('example-alt.js.md', { config: './test/Config.toml' });
  const output = stats.toJson().modules[0].source;
  expect(output).toBe(`console.log('Hello world');`);
});

test('Can output weaved documentation', async () => {
  const stats = await compiler('example.js.md', { output: 'weave' });
  const output = stats.toJson().modules[0].source;
  expect(output).not.toBe(`console.log('Hello world');`);
});
