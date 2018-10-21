# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 2.4.4 - 2018-10-21
### Changed
- explicitly close channel once all messages were published

## 2.4.0 - 2018-04-22
### Changed
- add emit calls
- update dependencies version

## 2.3.2 - 2018-03-30
### Changed
- update dependencies version

## 2.3.1 - 2018-03-29
### Changed
- update dependencies version

## 2.3.0 - 2018-03-29
### Changed
- allow more args during processor instantiation with spread operator <...>

## 2.2.0 - 2018-02-09
### Changed
- adopt standard code style
- broker.publish accept array of messages

## 2.1.0 - 2018-02-02
### Changed
- change BaseProcessor.run signature (add channel and queueName args)
- don't requeue message on error, must be managed during processor.run

## 2.0.1 - 2018-01-19
### Changed
- update README

## 2.0.0 - 2018-01-12
- start using changelog
### Changed
- use es6 syntax
- use es6 Promise instead of `bluebird`
- update copyright
- update `@rduk/configuration` to latest version (2.1.1)
- update `@rduk/provider` to latest version (3.0.1)
