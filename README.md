[![Build Status](https://travis-ci.org/telemark/tfk-laurentius.svg?branch=master)](https://travis-ci.org/telemark/tfk-laurentius)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# tfk-laurentius

## Innhold
- [Arbeidsflyt](docs/workflow.md)
- [Regler](docs/rules.md)

## Docker
Build

```sh
$ docker build -t tfk-laurentius .
```

### Usage
```sh
$ docker run --env-file=docker.env --volume=/test/data/jobs:/src/test/data/jobs --rm tfk-laurentius
```

This will start a container. Do the job. Stop the container and remove it.
