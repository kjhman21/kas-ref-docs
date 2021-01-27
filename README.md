# KAS Reference Documentation Repository

## Location of Yaml files

YAML files are located as following:
- English: [public/docs/en](public/docs/en)
- 한국어: [public/docs/ko](public/docs/ko)

## How to run

```bash
# to build meta data for yaml files and caver-java-ext-kas versions, run the command below.
$ npm run genMeta

$ npm start
```

## How to build

```bash
$ npm run build
```

## How to update yaml files

Just put yaml files into the locations. The metadata will be generated through `npm run genMeta`.
You don't need to manually update react-js files.

For caver-java-ext-kas, the versions will dynamically loaded from javadoc.io.