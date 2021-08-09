# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Any new suggestions are welcomed.

## [1.1.0] - 2021-08-08

### Added

- popover for legend for symbols in course names in CourseDatabase
- loading message for spinner in CourseDatabase

### Changed

- favicon

### Fixed

- bug where 2 lessons with no teaching weeks at the same time do not register as clashing
- bug for rendering of 1AU mods with no lessons

### Removed

- timetable download feature, did not work as intended on some browsers

## [1.2.0] - 2021-08-09

### Added

- more colours for courses to accomodate 12 courses
- spinner in button for generating plans
- check for unavailable indexes when loading saved plans

### Changed

- CourseInputGroup to show two columns of 6 inputs each
- CourseInputGroup to be rendered in an Accordion for smaller screens
- UseIndexes now use the courses object to get indexes rather than fetching from the API
- removed unused getVacancies.js under client

### Fixed

- bug for adding courses when CourseInputGroup is full
- vacancy and waitlist headers in PlanDetails
- vacancy and waitlist showing NA even when available in SavedPlansOverview