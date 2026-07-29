import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'nz6n7tde',
    dataset: 'production'
  },
  studioHost: 'l8pex5f0z739n292fs8sw74c',
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'd8vxtau74mdwzbe1k36anl3x',
  },
})
