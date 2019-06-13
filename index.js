#!/usr/bin/env node

'use strict';

var currentNodeVersion = process.versions.node;
var semver = currentNodeVersion.split('.');
var major = semver[0];

if (major < 8) {
    console.error(
        '您正在运行的 Node ' +
        currentNodeVersion +
        '.\n' +
        '创建项目需要 Node 8 或以上版本。 \n' +
        '请更新你的 Node 版本。'
    );
    process.exit(1);
}

require('./createProject');