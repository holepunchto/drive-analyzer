# Drive Analyzer

Static analysis of a Hyperdrive. Performs static analysis on a Hyperdrive to generate a delta-encoded warm-up map for a specified entrypoint and preloads.

```
npm i drive-analyzer
```

## Usage

```js
const analyzer = new DriveAnalyzer(drive)
analyzer.ready()
const encoded = await analyzer.analyze(['app.js']) // delta encoded warm-up map
const decoded = DriveAnalyzer.decode(deflated)// delta decoded warm-up map
```

## API
### analyzer.analyze(entrypoint, [assets])

Generates a delta-encoded warm-up map for the specified entrypoint.

- entrypoints (Array) (string): The starting points for the dependency-stream analysis.
- assets (Array) (optional): Additional assets to include in the warm-up map. If a folder is specified, all files and subfolders within that folder will be included.

### DriveAnalyzer.decode(map)

Decodes a delta-encoded warm-up map.

- map (object): A delta-encoded warm-up map generated.

## License

Apache-2.0
