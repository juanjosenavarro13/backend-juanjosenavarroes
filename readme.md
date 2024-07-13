# Github actions

[![Run Lint, Format, and Test](https://github.com/juanjosenavarro13/backend-juanjosenavarroes/actions/workflows/CI.yml/badge.svg)](https://github.com/juanjosenavarro13/backend-juanjosenavarroes/actions/workflows/CI.yml)
[![CD](https://github.com/juanjosenavarro13/backend-juanjosenavarroes/actions/workflows/CD.yml/badge.svg)](https://github.com/juanjosenavarro13/backend-juanjosenavarroes/actions/workflows/CD.yml)
[![CodeQL](https://github.com/juanjosenavarro13/backend-juanjosenavarroes/actions/workflows/codeQL.yml/badge.svg)](https://github.com/juanjosenavarro13/backend-juanjosenavarroes/actions/workflows/codeQL.yml)

# Git flow

```mermaid
gitGraph
    commit
    commit
    branch feat
    checkout feat
    commit
    commit
    checkout main
    merge feat
    commit
    commit
```

```mermaid
flowchart LR
    main[Main]
    e2etest[E2E Test]
    unittest[Unit Test]
    codeQl[Code QL]
    featureBranch[Feature Branch]
    pr[Pull Request]

    main --> featureBranch
    featureBranch --> pr
    pr --> unittest
    unittest -->|deploy| main
    main --> e2etest
    main --> codeQl
```
