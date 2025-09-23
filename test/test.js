const test = require('brittle')
const Corestore = require('corestore')
const Localdrive = require('localdrive')
const Mirrordrive = require('mirror-drive')
const DriveAnalyzer = require('../index.js')
const Hyperdrive = require('hyperdrive')
const path = require('bare-path')
const getTmpDir = require('test-tmp')

test('should generate map of esm app', async (t) => {
  const storage = await getTmpDir(t)
  const store = new Corestore(storage)
  await store.ready()

  const app = path.join(__dirname, 'fixtures', 'esm-app')
  const localdrive = new Localdrive(app)
  const drive = new Hyperdrive(store.session())
  await localdrive.ready()
  await drive.ready()

  const mirror = new Mirrordrive(localdrive, drive)
  await mirror.done()

  const analyzer = new DriveAnalyzer(drive)
  analyzer.ready()

  const encoded = await analyzer.analyze(['app.js'])
  const decoded = DriveAnalyzer.decode(encoded.meta, encoded.data)

  t.ok(decoded.data.length !== 0)
  t.ok(decoded.meta.length !== 0)

  await drive.close()
  await store.close()
})

test('should generate map of cjs app', async (t) => {
  const storage = await getTmpDir(t)
  const store = new Corestore(storage)
  await store.ready()

  const app = path.join(__dirname, 'fixtures', 'cjs-app')
  const localdrive = new Localdrive(app)
  const drive = new Hyperdrive(store.session())
  await localdrive.ready()
  await drive.ready()

  const mirror = new Mirrordrive(localdrive, drive)
  await mirror.done()

  const analyzer = new DriveAnalyzer(drive)
  analyzer.ready()

  const encoded = await analyzer.analyze(['app.js'])
  const decoded = DriveAnalyzer.decode(encoded.meta, encoded.data)

  t.ok(decoded.data.length !== 0)
  t.ok(decoded.meta.length !== 0)

  await drive.close()
  await store.close()
})

test('preload asset', async (t) => {
  const storage = await getTmpDir(t)
  const store = new Corestore(storage)
  await store.ready()

  const app = path.join(__dirname, 'fixtures', 'preload-app')
  const localdrive = new Localdrive(app)
  const drive = new Hyperdrive(store.session())
  await localdrive.ready()
  await drive.ready()

  const mirror = new Mirrordrive(localdrive, drive)
  await mirror.done()

  const analyzer = new DriveAnalyzer(drive)
  analyzer.ready()

  const encoded = await analyzer.analyze(['app.js'], ['/assets/asset.txt'])
  const decoded = DriveAnalyzer.decode(encoded.meta, encoded.data)

  t.ok(decoded.data.length !== 0)
  t.ok(decoded.meta.length !== 0)

  await drive.close()
  await store.close()
})

test('html entrypoint', async (t) => {
  const storage = await getTmpDir(t)
  const store = new Corestore(storage)
  await store.ready()

  const app = path.join(__dirname, 'fixtures', 'pear-desktop-app')
  const localdrive = new Localdrive(app)
  const drive = new Hyperdrive(store.session())
  await localdrive.ready()
  await drive.ready()

  const mirror = new Mirrordrive(localdrive, drive)
  await mirror.done()

  const analyzer = new DriveAnalyzer(drive)
  analyzer.ready()

  const encoded = await analyzer.analyze(['index.html'])
  const decoded = DriveAnalyzer.decode(encoded.meta, encoded.data)

  t.ok(decoded.data.length !== 0)
  t.ok(decoded.meta.length !== 0)

  await drive.close()
  await store.close()
})

test('html entrypoint in subdir', async (t) => {
  const storage = await getTmpDir(t)
  const store = new Corestore(storage)
  await store.ready()

  const app = path.join(__dirname, 'fixtures', 'pear-desktop-app-subdir')
  const localdrive = new Localdrive(app)
  const drive = new Hyperdrive(store.session())
  await localdrive.ready()
  await drive.ready()

  const mirror = new Mirrordrive(localdrive, drive)
  await mirror.done()

  const analyzer = new DriveAnalyzer(drive)
  analyzer.ready()

  const encoded = await analyzer.analyze(['/src/index.html'])
  const decoded = DriveAnalyzer.decode(encoded.meta, encoded.data)

  t.ok(decoded.data.length !== 0)
  t.ok(decoded.meta.length !== 0)

  await drive.close()
  await store.close()
})

test('preload folder', async (t) => {
  const storage = await getTmpDir(t)
  const store = new Corestore(storage)
  await store.ready()

  const app = path.join(__dirname, 'fixtures', 'preload-app')
  const localdrive = new Localdrive(app)
  const drive = new Hyperdrive(store.session())
  await localdrive.ready()
  await drive.ready()

  const mirror = new Mirrordrive(localdrive, drive)
  await mirror.done()

  const analyzer = new DriveAnalyzer(drive)
  analyzer.ready()

  const encoded = await analyzer.analyze([], ['/assets'])
  const decoded = DriveAnalyzer.decode(encoded.meta, encoded.data)

  t.ok(decoded.data.length !== 0)
  t.ok(decoded.meta.length !== 0)

  await drive.close()
  await store.close()
})
