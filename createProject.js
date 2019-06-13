'use strict';

const chalk = require('chalk');
const commander = require('commander');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const validateProjectName = require('validate-npm-package-name');
const packageJson = require('./package.json');
const errorLogFilePatterns = [
    'npm-debug.log',
];

let projectName;
let template = 'vueTemplate';

const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<项目目录>')
    .usage(`${chalk.green('<项目目录>')} [options]`)
    .action(name => {
        projectName = name;
    })
    .option('-r, --use-react', '使用react.js 项目')
    .option('--info', '输出环境调试信息')
    .allowUnknownOption()
    .on('--help', () => {
        console.log();
        console.log(`   ${chalk.green('<项目目录>')} 必需输入`);
        console.log();
        console.log(
            `   默认创建vue.js 项目，如果想要创建react.js 项目，请使用 ${chalk.green('-r  或 --use-react')}
            `
        );
        console.log();
    })
    .parse(process.argv);


if (program.info) {
    console.log(chalk.bold('\n 环境信息：'));
    return envinfo
        .run(
            {
                System: ['OS', 'CPU'],
                Binaries: ['Node', 'npm'],
                Browsers: ['Chrome', 'Edge', 'Internet Explorer', 'Firefox', 'Safari'],
                npmPackages: ['react', 'react-dom', 'react-scripts'],
                npmGlobalPackages: ['free-cli'],
            },
            {
                duplicates: true,
                showNotFound: true,
            }
        )
        .then(console.log);
}

if (program.useReact) {
    template = 'reactTemplate'
}

if (typeof projectName === 'undefined') {
    console.error('请指定项目的目录：');
    console.log(
        `  ${chalk.cyan(program.name())} ${chalk.green('<项目目录>')}`
    );
    console.log();
    console.log('例如：');
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-app')}`);
    console.log();
    console.log(
        `运行 ${chalk.cyan(`${program.name()} --help`)} 查看所有选项`
    );
    process.exit(1);
}

createApp(
    projectName,
    template
);

function createApp(
    name,
    template
) {
    const root = path.resolve(name);
    const appName = path.basename(root);
    const ownPath = path.dirname(
        require.resolve(path.join(__dirname, 'package.json'))
    );


    checkAppName(appName);
    fs.ensureDirSync(name);
    if (!isSafeToCreateProjectIn(root, name)) {
        process.exit(1);
    }
    console.log(`正在 ${chalk.green(root)} 创建一个新的应用程序...`);
    console.log();

    process.cwd();
    process.chdir(root);

    const templatePath = path.resolve(ownPath, 'template', template);

    if (fs.existsSync(templatePath)) {
        fs.copySync(templatePath, root);
    } else {
        console.error(
            `无法定位提供的模板: ${chalk.green(templatePath)}`
        );
        return;
    }

    const appPackage = require(path.join(root, 'package.json'));
    const appPackageLock = require(path.join(root, 'package-lock.json'));

    appPackage.name = appName;
    appPackageLock.name = appName;
    fs.writeFileSync(
        path.join(root, 'package.json'),
        JSON.stringify(appPackage, null, 2) + os.EOL
    );
    fs.writeFileSync(
        path.join(root, 'package-lock.json'),
        JSON.stringify(appPackageLock, null, 2) + os.EOL
    );

    console.log(`${appName} 已在 ${root} 成功创建。`);
    console.log('您可以：');
    console.log();
    console.log(chalk.cyan('  cd'), appName);
    console.log();
    console.log('进入目录，然后执行');
    console.log()
    console.log(chalk.cyan('  npm install'));
    console.log(chalk.cyan('  npm run start'));
    console.log()
    console.log('运行项目！');

}

function checkAppName(appName) {

    const validationResult = validateProjectName(appName);

    if (!validationResult.validForNewPackages) {
        console.error(
            `由于npm命名的限制，无法创建项目 ${chalk.red(
                `"${appName}"`
            )}。`
        );
        printValidationResults(validationResult.errors);
        printValidationResults(validationResult.warnings);
        process.exit(1);
    }

    const dependencies = [packageJson.name].sort();
    if (dependencies.indexOf(appName) >= 0) {
        console.error(
            chalk.red(` 该项目名称不允许`) +
            chalk.cyan(dependencies.map(depName => `  ${depName}`).join('\n')) +
            chalk.red('\n\n 请选择一个不同的项目名称。')
        );
        process.exit(1);
    }
}

function printValidationResults(results) {
    if (typeof results !== 'undefined') {
        results.forEach(error => {
            console.error(chalk.red(`  *  ${error}`));
        });
    }
}

function isSafeToCreateProjectIn(root, name) {
    const validFiles = [
        '.DS_Store',
        'Thumbs.db',
        '.git',
        '.gitignore',
        '.idea',
        'README.md',
        'LICENSE',
        '.hg',
        '.hgignore',
        '.hgcheck',
        '.npmignore',
        'mkdocs.yml',
        'docs',
        '.travis.yml',
        '.gitlab-ci.yml',
        '.gitattributes',
    ];

    const conflicts = fs
        .readdirSync(root)
        .filter(file => !validFiles.includes(file))
        .filter(file => !/\.iml$/.test(file))
        .filter(
            file => !errorLogFilePatterns.some(pattern => file.indexOf(pattern) === 0)
        );


    if (conflicts.length > 0) {
        console.log(
            `目录 ${chalk.green(name)} 包含文件冲突`
        );
        console.log();
        for (const file of conflicts) {
            console.log(`  ${file}`);
        }
        console.log();
        console.log(
            '试着用一个新目录的名字,或者删除上面列出的文件。'
        );

        return false;
    }

    const currentFiles = fs.readdirSync(path.join(root));
    currentFiles.forEach(file => {
        errorLogFilePatterns.forEach(errorLogFilePattern => {
            if (file.indexOf(errorLogFilePattern) === 0) {
                fs.removeSync(path.join(root, file));
            }
        });
    });
    return true;
}


