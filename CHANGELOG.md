# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Any new suggestions are welcomed.

## [1.2.1] - 2021-08-09

### Fixed

- bug when loading saved plans while vacancies api is down

## [1.2.0] - 2021-08-09

### Added

- more colours for lessons for timetable to accomodate 12 courses
- check for unavailable indexes when loading previously saved plans
- left/right arrow keyboard presses toggle between generated plans, tip added in TimetablePage for bigger screens

### Changed

- button for generating plans is disabled and includes a spinner while timetable plans are generated
- CourseInputGroup to show two columns of 6 inputs each
- CourseInputGroup to be rendered in an Accordion for smaller screens
- timetablesGenerator and UseIndexes now uses the courses object to get courses/indexes rather than fetching from the API

### Fixed

- bug for adding courses when CourseInputGroup is full
- vacancy and waitlist headers in PlanDetails
- vacancy and waitlist showing NA even when available in SavedPlansOverview

### Removed

- Unused getVacancies.js under client

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