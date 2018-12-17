import validateOptions from 'schema-utils';
import { getOptions } from 'loader-utils';
import path from 'path';
import fs from 'fs';
import toml from 'toml';
const outline = import('@oinkiguana/outline');

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

const commonOpts = [
  'comment_start',
  'interpolation_start',
  'interpolation_end',
  'macro_start',
  'macro_end',
]

const mdOpts = [
  'fence_sequence',
  'block_name_start',
  'block_name_end',
  'comments_as_aside',
  'default_language',
  ...commonOpts,
];

const htmlOpts = [
  'code_tag',
  'language_attribute',
  'name_attribute',
  'block_class',
  'language_class',
  'comments_as_aside',
  'default_language',
  ...commonOpts,
];

const texOpts = [
  'code_environment',
  'default_language',
  ...commonOpts,
];

const birdOpts = [
  'code_marker',
  'code_name_marker',
  ...commonOpts,
];

const opts = {
  md: mdOpts,
  tex: texOpts,
  html: htmlOpts,
  bird: birdOpts,
};

function resolveStyle(...styles) {
  const validStyle = style => (['md', 'tex', 'bird', 'html'].includes(style) ? style : null);
  return styles.reduce((r, style) => r || validStyle(style), null);
}

function resolveLanguage(...languages) {
  return languages.find(lang => !!lang);
}

export default function loader(source) {
  const callback = this.async();
  try {
    const options = getOptions(this) || {};
    validateOptions(schema, options, 'Outline Loader');

    const configFile = path.resolve(options.config || 'Outline.toml');
    this.addDependency(configFile);

    let config = {};
    if (fs.existsSync(configFile)) {
      config = toml.parse(fs.readFileSync(configFile));
    } else if (options.config) {
      throw new Error(`Config file '${options.config}' could not be found at '${configFile}'`);
    }

    const { resourcePath } = this;
    const style = resolveStyle(options.style, path.extname(resourcePath).slice(1), 'md');
    const language = resolveLanguage(options.language, path.extname(path.basename(resourcePath, path.extname(resourcePath))).slice(1), 'js');

    outline.then(outline => {
      let parser;
      switch (style) {
        case 'md':
          parser = new outline.MdParser();
          break;
        case 'tex':
          parser = new outline.TexParser();
          break;
        case 'html':
          parser = new outline.HtmlParser();
          break;
        case 'bird':
          parser = new outline.BirdParser();
          break;
        default:
          return callback(Error(`Unsupported style ${style}`));
      }
      Object
        .entries(config[style] || {})
        .filter(([key]) => opts[style].includes(key))
        .forEach(([key, value]) => {
          parser = parser[`set_${key}`](value);
        });
      callback(null, parser.tangle(source, options.entrypoint || null, language));
    });
  } catch (error) {
    callback(error);
  }
}
