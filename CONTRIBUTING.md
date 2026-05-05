# Contributing

The module replacements data set is used widely across the ecosystem, so it is important we follow a consistent process when making changes to it. This especially matters when adding new replacements, as we're effectively recommending that the ecosystem mass migrates away from the old module.

## Adding a module to be replaced

If you want to add a new replacement, please open an issue first to discuss it.

In the issue you create, it is important to include as much justification as you can for why it should be replaced and what the replacement should be.

Basic information you should include in the issue:

- The name of the module you want to replace.
- The name of the module or native API you want to replace it with.
- Which manifest you think it belongs in (see below)
- Why you think it should be replaced (e.g. security, performance, etc.)
- Availability of the replacement (e.g. is it available in all LTS versions of Node, or only newer ones?)
- A code example of how to migrate from the old module to the new one.

When evaluating if something should be replaced, we look for things like:

- Is it no longer maintained?
- Does it have security issues?
- Is it significantly larger or slower than the replacement?
- Is it a very small module that should be inlined?
- Does it have a native alternative that is widely supported?
- Does it have significant adoption (usually more than 10k downloads per week)?

When evaluating the replacement, we look for things like:

- If not native, does it have significant adoption already (usually more than 10k downloads per week)?
- If it is native, is it available in all modern engines (usually those which are LTS)?
- Does it replace all primary functionality of the old module?
- Is it maintained and does it have a good track record of security and stability?
- Is it smaller and/or faster than the old module?

We may also take other things into consideration, so this is not an exhaustive list.

### Choosing a manifest

We have three types of manifest:

- `native`: for replacements that are native APIs in all engines, or are built into the runtime (e.g. Node)
- `micro-utilities`: for replacements of modules that are overly small and should generally be inlined
- `preferred`: for replacements of modules that are more performant than the old module

### Choosing a replacement type

There are different types of replacements available:

- `removal`: for removing the old module without a replacement (e.g. modules which check if a now widely supported API is available)
- `simple`: for replacing the old module with inline code
- `native`: for replacing the old module with native APIs (e.g. standard web APIs, or Node built-ins)
- `documented`: for replacing the old module with a documented alternative

When using the `documented` type, you should generally follow these guidelines:

- The mapping should have a `url` which points to an e18e documentation page (i.e. those in the [modules](https://github.com/e18e/module-replacements/tree/main/docs/modules) directory of the repo) which describes the replacement and how to migrate to it. Documentation here will be automatically synced weekly to the e18e website.
- The replacement does not necessarily need a `url` itself
- The replacement does not need a `description`

When using the `native` type:

- The mapping generally does not need a `url`
- The replacement should have a `url` to its external documentation (e.g. MDN or Node docs)
- If it's a web standard, then the replacement should have a `webFeatureId` (these come from the [`web-features` dataset](https://github.com/web-platform-dx/web-features/tree/main/features)), and a `url` to MDN
- If it's a Node built-in, then the replacement should have a `nodeFeatureId` (these are of the form `{ moduleName: string, exportName?: string }`. For example, `fs` would be `{"moduleName": "fs"}`, while `fs.readFile` would be `{"moduleName": "fs", "exportName": "readFile"}`), and a `url` to the Node docs

When using the `simple` type:

- The replacement should be of the form `snippet::{name}` where `name` is a suitable descriptive name for what the snippet does (e.g. `snippet:is-odd` for a snippet that checks if a number is odd)
- The replacement description should be a short human-readable description of what the snippet does, and how it replaces the old module (e.g. "You can use arr.at(-1) to get the last element of an array")
- The replacement should have an `example` which is purely code (i.e. it should be valid JS in its entirety) and should show the snippet

When using the `removal` type:

- There should usually be one replacement to one mapping, with the same ID (e.g. the `airbnb-js-shims` [replacement](https://github.com/e18e/module-replacements/blob/131e2d8bb4a4793f54b7193ab9b7433c3f2ae839/manifests/native.json#L1366-L1370) has the same ID as the [mapping](https://github.com/e18e/module-replacements/blob/131e2d8bb4a4793f54b7193ab9b7433c3f2ae839/manifests/native.json#L1632-L1636))
- The replacement description should briefly explain why the module is no longer needed

## Removing a replacement

It is rare, but sometimes it may make sense to remove a replacement from the dataset.

Usually, this happens if the original module has since been improved or regained maintenance, or if the replacement is no longer maintained or has security issues.

If you want to remove a replacement, please open an issue first to discuss it.

Explain why you think it should be removed and provide any relevant information or evidence to support your case.

## Adding a replacement to an existing module

If you want to add a replacement to an existing module, please open an issue first to discuss it. You should generally follow all the same guidelines as when adding a new module, but you should also explain why you think the new replacement should be added in addition to the existing ones.

Just like when adding a new module, we will evaluate the replacement based on similar criteria, such as adoption, availability, functionality, maintenance, security, and performance.

## Running tests

We currently validate the data through a set of lint scripts which you can run with `pnpm lint`. This will check for things like:

- All manifests conform to the JSON schema
- Valid references (`webFeatureId`, `nodeFeatureId`, docs, etc.)
- No duplicate mappings or replacements
- Documentation is up to date

These checks are not exhaustive, we will also validate other things and do some manual checks when reviewing PRs.
