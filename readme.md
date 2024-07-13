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
    main[Main] --> featureBranch(Feature branch)
    featureBranch --> pr
    pr(Pull Request) --> githubUnitTest
    githubUnitTest(Unit test) --> main
    main --> githubUnitTest(Unit test)
    main --> |Deplay 5 min| githubE2ETest(E2E test)

```
