# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Repository baseline files for license, security reporting, editor settings, Git attributes, and changelog tracking.
- Lightweight static validation tooling with a local `npm run validate` command and a GitHub Actions workflow for push and pull request checks.
- Public documentation screenshots under `assets/screenshots/` for the gallery and editor views.

### Changed
- README links for the project license, changelog, and security policy.
- Public demo sharing is now disabled by default until a restricted Cloudinary preset is verified, and the documentation explains the required safeguards.
- GitHub repository metadata now uses the public demo homepage, a fuller About description, and portfolio-relevant topics.
- README now includes a visible GitHub Pages live demo link.
- README now follows a fuller GRS-style repository structure, including project status, stack, validation guidance, AI notice, and roadmap sections.
- README now documents the repository static validation command and CI quality gate.
- README now displays current app screenshots and the favicon asset was optimized to a smaller square icon without changing its path.
- README now documents the initial `v0.1.0` version decision, tag format, and minimal release checklist.
- README now includes a dedicated development environment section covering the no-build static workflow, local server guidance, asset loading, and why no lockfile is required.

## [0.1.0] - 2025-11-15

### Added
- Initial public version of the Memester client-side meme generator.
- Gallery browsing, meme editing, sticker support, local saving, download, and sharing flows.
