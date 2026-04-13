import {validateManifests} from './validate-manifests.js';
import {checkManifestsForProblems} from './check-manifest-problems.js';

await validateManifests();
await checkManifestsForProblems();
