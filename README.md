# ui-linked-data

© 2024 EBSCO Information Services.

This software is distributed under the terms of the Apache License, Version 2.0. See the file "[LICENSE](LICENSE)" for more information.

## Introduction

This is a [Stripes](https://github.com/folio-org/stripes-core/) UI module for handling operations with Linked data resources.

This module acts as an adapter for [ui-linked-data](https://github.com/folio-org/ui-linked-data) module. Essentially, most of the functionality of this module is defined there.

## Development

If you would like to run a development build of this module while making changes to the [ui-linked-data](https://github.com/folio-org/ui-linked-data) within it, there are a few steps to take:

0. 
1. Clone the [ui-linked-data](https://github.com/folio-org/ui-linked-data) module repository to your computer.
2. Within the cloned [ui-linked-data](https://github.com/folio-org/ui-linked-data) module directory, run:
    ```sh
    yarn link
    ```
3. Within this module's directory, run:
    ```sh
    yarn link @folio/linked-data
    ```
4. Perform the code changes you need.
5. Build the [ui-linked-data](https://github.com/folio-org/ui-linked-data) module as a library. The steps are described [here](https://github.com/folio-org/ui-linked-data?tab=readme-ov-file#as-an-embedded-application).
6. After the [ui-linked-data](https://github.com/folio-org/ui-linked-data) module finishes its build, the Stripes build should pick up the changes and reload itself.

## Additional information

See the related [ui-linked-data](https://github.com/folio-org/ui-linked-data) module.

Other [modules](https://dev.folio.org/source-code/#client-side).

See project [UILD](https://issues.folio.org/browse/UILD)
at the [FOLIO issue tracker](https://dev.folio.org/guidelines/issue-tracker).

Other FOLIO Developer documentation is at [dev.folio.org](https://dev.folio.org/)