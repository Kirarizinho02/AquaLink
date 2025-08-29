import { createJsWithTsPreset, type JestConfigWithTsJest } from 'ts-jest'

const presetConfig = createJsWithTsPreset({
  "transform": {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
  },
})

const jestConfig: JestConfigWithTsJest = {
  ...presetConfig,
}

export default jestConfig