const validateOptions = require('schema-utils');
const { getOptions } = require('loader-utils');
const { spawnSync } = require('child_process');
const path = require('path');

const schema = {
  type: 'object',
  properties: {
    config: { type: 'string' },
    style: { type: 'string' },
    language: { type: 'string' },
    entrypoint: { type: 'string' },
  },
  additionalProperties: false,
};

function resolveStyle(...styles) {
  const validStyle = style => (['md', 'tex', 'bird', 'html'].includes(style) ? style : null);
  return styles.reduce((r, style) => r || validStyle(style), null);
}

function resolveLanguage(...languages) {
  return languages.find(lang => !!lang);
}

function loader(source) {
  const options = getOptions(this) || {};
  validateOptions(schema, options, 'Outline Loader');

  const { resourcePath } = this;
  const style = resolveStyle(options.style, path.extname(resourcePath).slice(1), 'md');
  const language = resolveLanguage(options.language, path.extname(path.basename(resourcePath, path.extname(resourcePath))).slice(1), 'js');

  const configFile = options.config || 'Outline.toml';
  this.addDependency(path.resolve(configFile));

  const args = ['-l', language, '-s', style];
  if (options.config) { args.push('-c', options.config); }
  if (options.entrypoint) { args.push('-e', options.entrypoint); }

  const { status, stdout, stderr } = spawnSync('outline', args, { input: source });
  if (status || stderr.length) { throw new Error(stderr.toString()); }
  return stdout.toString();
}

module.exports = loader;
