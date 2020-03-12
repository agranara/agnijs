# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.18](https://github.com/agranara/agnijs/compare/@agnijs/agni-ui@1.1.17...@agnijs/agni-ui@1.1.18) (2020-03-12)

### Bug Fixes

- **modal:** fixed modal type definition for size props ([7a0d50e](https://github.com/agranara/agnijs/commit/7a0d50e80ab19e0432d670d96829522b77dc7622))
- **select:** fix option props not updating internal options ([8e0e076](https://github.com/agranara/agnijs/commit/8e0e07674fc58b3677cadd724628fec4f30102b1)), closes [#1](https://github.com/agranara/agnijs/issues/1)
- **select:** fixed wrong initialization keyed options ([f3cffbf](https://github.com/agranara/agnijs/commit/f3cffbf9f26947d671cd8829981469d956bfea69))

### Features

- **datagrid:** added props isloading and loadingdata placeholder ([d5458ec](https://github.com/agranara/agnijs/commit/d5458ec41144b4dadfa080b203c1f6569ed21675))
- **icon,file,upload:** added icon, fileInfo, and upload component ([6a649bd](https://github.com/agranara/agnijs/commit/6a649bd0ffacfebd4e83a5454681e66e565ff49c))
- **modal:** added max width prop ([1dadec3](https://github.com/agranara/agnijs/commit/1dadec33627332faed956c4d24d28696eeee7cb8))
- **usecomponentsize:** change usage ref in props to dom ([2b4dcd2](https://github.com/agranara/agnijs/commit/2b4dcd2f3de7702addc0036c4c2a3e8ee8f76946))

### Performance Improvements

- **select:** enable boolean option value, remove unnecessary rerender ([ce8a8e5](https://github.com/agranara/agnijs/commit/ce8a8e58a744d333a0b9a9471e2bdbbeed0e1a29))

### BREAKING CHANGES

- **usecomponentsize:** Props useComponentSize change from ref to optional dom, result change from
  [width,height] to [{ width, height}, ref]

## [1.1.17](https://github.com/agranara/agnijs/compare/@agnijs/agni-ui@1.1.16...@agnijs/agni-ui@1.1.17) (2020-02-24)

### Bug Fixes

- **positioner:** fix z-index and update behaviour ([0a66ca8](https://github.com/agranara/agnijs/commit/0a66ca8345b0f81c462537e533e080cbc7f3a9a5))

## [1.1.16](https://github.com/agranara/agnijs/compare/@agnijs/agni-ui@1.1.15...@agnijs/agni-ui@1.1.16) (2020-02-20)

### Bug Fixes

- **modal:** added modal component ([477d1a5](https://github.com/agranara/agnijs/commit/477d1a5faa79ca7f4d7ba13e91c4b1f9d885683d))

### Features

- **popup,modal:** base component Popup and Modal ([36f2b1c](https://github.com/agranara/agnijs/commit/36f2b1cc8d53b51ad8748293df72530e508b73d0))

## [1.1.15](https://github.com/agranara/agnijs/compare/@agnijs/agni-ui@1.1.14...@agnijs/agni-ui@1.1.15) (2020-02-18)

**Note:** Version bump only for package @agnijs/agni-ui

## [1.1.14](https://github.com/agranara/agnijs/compare/@agnijs/agni-ui@1.1.13...@agnijs/agni-ui@1.1.14) (2020-02-18)

### Bug Fixes

- **datagrid:** fix initializer not including scroll width prediction ([9b75948](https://github.com/agranara/agnijs/commit/9b759484cd4d52f6d5c7800e22a711487674cd7d))
- **datagrid:** fix type definition does not sync with js ([8f06d34](https://github.com/agranara/agnijs/commit/8f06d34cbf35cfa00caa4562a4e88fa264a70a71))
- **datagrid:** fix wrong implementation of V/H scroll ([067a4b9](https://github.com/agranara/agnijs/commit/067a4b970f29c414e0fb1c174233aa9462118b9c))
- **menuitem:** fix overridden click handler from props ([f5214d2](https://github.com/agranara/agnijs/commit/f5214d248ba60cb4ecdf2b02c5e03d0972902862))
- **spinner:** missing variantColor prop type definition ([51e4ce6](https://github.com/agranara/agnijs/commit/51e4ce62469ef4be5bad353286a9c3785f785f1c))

### Features

- **carousel:** added carousel component ([3606442](https://github.com/agranara/agnijs/commit/3606442561373651fee16318f5518beef74f7592))
- **datagrid:** added DataGrid Component ([14f69ea](https://github.com/agranara/agnijs/commit/14f69ea230270cca48057433286db3f459a8cb1d))

## [1.1.13](https://github.com/agranara/agnijs/compare/@agnijs/agni-ui@1.1.12...@agnijs/agni-ui@1.1.13) (2020-02-12)

### Bug Fixes

- **inputgroup:** fixed children loop check to add padding size ([972d5a1](https://github.com/agranara/agnijs/commit/972d5a1a92eabcebd96b563228168f2d801c60d8))
- return empty when children is not valid element ([e5758a2](https://github.com/agranara/agnijs/commit/e5758a27423c452a497879ac438fba454b034ad9))
- **menu:** fixed menu default zIndex ([b43776a](https://github.com/agranara/agnijs/commit/b43776afd1b1d5033a2e5c903c723ebfd2bf9433))
- **positions:** fixed popper position cause document body overflowed ([fcb597b](https://github.com/agranara/agnijs/commit/fcb597b8a7f589df2e42e87840297b6600bf48c6))
- **tabs:** tabs type definition ([e9fc93c](https://github.com/agranara/agnijs/commit/e9fc93cca1252571b2d053b329ba55b85f67f519))

## [1.1.12](https://github.com/agranara/agnijs/compare/@agnijs/agni-ui@1.1.11...@agnijs/agni-ui@1.1.12) (2020-02-10)

### Bug Fixes

- **datepicker:** fixed select month and year datepicker ([79b5a1b](https://github.com/agranara/agnijs/commit/79b5a1b115989a9510cf8ab4bccc1fb56b8ee05e))
- **positioner:** portal container selector inside positioner ([24c0647](https://github.com/agranara/agnijs/commit/24c0647029d966e1b2fb9cb5aa6be85bc28bccc2))

### Features

- **positioner:** added positioner component ([7aeaa8e](https://github.com/agranara/agnijs/commit/7aeaa8e358edca5b1b01233872af8b4cdf204cab))
- **toast:** added toast component for notification and messsage ([124e270](https://github.com/agranara/agnijs/commit/124e270fcb5a6ed758f70d162d037a6d6c70eb9f))

### improvement

- **menu:** enable nested submenu ([d64e45e](https://github.com/agranara/agnijs/commit/d64e45e0570f27603cfab4555ab316291b551bac))

### BREAKING CHANGES

- **menu:** Replace MenuButton with MenuTrigger. Replace MenuItem children properties for
  submenu render. Replace MenuContainer with MenuList to render initial menus for menu component.
  Currently only support click event for MenuTrigger and hover event for submenu

## [1.1.11](https://github.com/agranara/agnijs/compare/@agnijs/agni-ui@1.1.10...@agnijs/agni-ui@1.1.11) (2020-02-03)

### Features

- **tabs:** added Tabs component ([331ba07](https://github.com/agranara/agnijs/commit/331ba07d98e9c0aeb5b80266da3d6045419d204c))

## [1.1.10](https://github.com/agranara/agnijs/compare/@agnijs/agni-ui@1.1.4...@agnijs/agni-ui@1.1.10) (2020-02-01)

### Bug Fixes

- **nav:** default font size nav ([ec49711](https://github.com/agranara/agnijs/commit/ec49711a2152d9b47d8ba9b1247609199ba88f8e))

## 1.1.9 (2020-02-01)

### Bug Fixes

- **collapse:** fixed css usage inside Collapse ([9e5d67d](https://github.com/agranara/agnijs/commit/9e5d67d874a4e74980006a1d08b483429973a6cf))
- **select:** fixed value cache on value prop change ([0e37a94](https://github.com/agranara/agnijs/commit/0e37a94e56557341a2b9100381e3f6ca267fce6f))

### Features

- **alert:** added alert component ([3e91d17](https://github.com/agranara/agnijs/commit/3e91d170e88b3a0ce1f6a7b1a1ce6944ee2f596f))
- **flex:** flexbox ([9071569](https://github.com/agranara/agnijs/commit/907156979364391e63c89c0291e04400cd7ff0e5))
- **pagination:** added pagination ([56d1ec4](https://github.com/agranara/agnijs/commit/56d1ec46552143375ee97a3692b9328e8b439f65))
- **tag:** added Tag component ([9fd3bcf](https://github.com/agranara/agnijs/commit/9fd3bcf583b5fd417d7015a1973aba3c74ef01c8))
- **textarea:** adding textarea input ([5eaeec5](https://github.com/agranara/agnijs/commit/5eaeec56ffc65d3616fb1d8372fedcd5a7c77762))

### improvement

- **breadcrumb:** separating breadcrumb item and link ([8a33fae](https://github.com/agranara/agnijs/commit/8a33fae663123667209876193fa6923474c79966))

### BREAKING CHANGES

- **breadcrumb:** Properties that used for BreadcrumbItem moved to BreadcrumbLink

## 1.1.8 (2020-01-26)

### Bug Fixes

- **select:** is controlled wrong condition ([92b87e0](https://github.com/agranara/agnijs/commit/92b87e0785cb395aabfe0681f693fb95e3052bea))
- **spinner:** undefined spinner size ([8d16690](https://github.com/agranara/agnijs/commit/8d166908cdcda934d2534288b7e86df567ff10df))
- **theme:** fixed default theme height and font ([6526b88](https://github.com/agranara/agnijs/commit/6526b888787eff6fe423571d94942bc6f4bfbd1f))

## 1.1.7 (2020-01-26)

### Bug Fixes

- select, Datepicker, Card ([645b3ef](https://github.com/agranara/agnijs/commit/645b3ef83ff32acfa2afc920707f0e401c1486b2))

### Code Refactoring

- added type declaration for components ([e01229a](https://github.com/agranara/agnijs/commit/e01229a0f06b60ab2c17dde3b233f8824d62c53b))

### BREAKING CHANGES

- - Original Card component change to "CardSimple" with property "bodyProps" change

## [1.1.4](https://github.com/agranara/agnijs/compare/@agnijs/agni-ui@1.1.3...@agnijs/agni-ui@1.1.4) (2020-01-18)

**Note:** Version bump only for package @agnijs/agni-ui

## [1.1.3](https://github.com/agranara/agnijs/compare/@agnijs/agni-ui@1.1.2...@agnijs/agni-ui@1.1.3) (2020-01-17)

### Bug Fixes

- **uiprovider:** fixed empty tag for React.Fragment ([9563b7b](https://github.com/agranara/agnijs/commit/9563b7b113abda4e69267fd0c5be4b11b1e46410))

## [1.1.2](https://github.com/agranara/agnijs/compare/@agnijs/agni-ui@1.1.1...@agnijs/agni-ui@1.1.2) (2020-01-17)

### Bug Fixes

- **theme, utils:** added theme and utils as export file ([3210bb7](https://github.com/agranara/agnijs/commit/3210bb79ee86dad5ea7ceded182aed5cd54dc146))

## [1.1.1](https://github.com/agranara/agnijs/compare/@agnijs/agni-ui@1.0.1...@agnijs/agni-ui@1.1.1) (2020-01-17)

### Bug Fixes

- **uiprovider.js:** position relative ([b08d79f](https://github.com/agranara/agnijs/commit/b08d79f8dd481df61a47d081f0154ac119612d3b))

## 1.0.2 (2020-01-17)

# 1.1.0 (2020-01-17)

### Bug Fixes

- **uiprovider.js:** position relative ([b08d79f](https://github.com/agranara/agnijs/commit/b08d79f8dd481df61a47d081f0154ac119612d3b))

## 1.0.2 (2020-01-17)

### Bug Fixes

- **package.json:** publish config ([8e0539b](https://github.com/agranara/agnijs/commit/8e0539b7d7af3ca4e8262151b4c3b9a4bf322fdc))

# 1.0.0 (2020-01-17)

## 0.1.1 (2020-01-17)

### Bug Fixes

- **package.json and readme:** fixed missing lint-staged package ([6ff875c](https://github.com/agranara/agnijs/commit/6ff875cca787774c2a1de7bd1e0764a4a157d539))

### Features

- **added agni ui package:** initialize AgniUI package ([867c6b9](https://github.com/agranara/agnijs/commit/867c6b9afa8e1e63fe5325e37a7693e1397d5839))

## [1.0.1](https://github.com/agranara/agnijs/compare/@agnijs/agni-ui@0.1.0...@agnijs/agni-ui@1.0.1) (2020-01-17)

### Bug Fixes

- **package.json:** publish config ([8e0539b](https://github.com/agranara/agnijs/commit/8e0539b7d7af3ca4e8262151b4c3b9a4bf322fdc))

# 1.0.0 (2020-01-17)

## 0.1.1 (2020-01-17)

# 0.1.0 (2020-01-17)

### Bug Fixes

- **package.json and readme:** fixed missing lint-staged package ([6ff875c](https://github.com/agranara/agnijs/commit/6ff875cca787774c2a1de7bd1e0764a4a157d539))

### Features

- **added agni ui package:** initialize AgniUI package ([867c6b9](https://github.com/agranara/agnijs/commit/867c6b9afa8e1e63fe5325e37a7693e1397d5839))
