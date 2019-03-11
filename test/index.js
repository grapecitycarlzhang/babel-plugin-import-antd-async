import {
    transformFileSync
} from "@babel/core"
import {
    readFileSync
} from "fs"
import {
    join
} from "path"
import assert from "assert"
import plugin from "../lib/index"

function trim(str) {
    return str.trim().replace(/[\r\n\s]*/g, '');
}

function validCase(caseName, libraryDirectory, style, async) {
    var actualFile = join(join(__dirname, 'fixtures'), `import/${caseName}/input.js`);
    var expectedFile = join(join(__dirname, 'fixtures'), `import/${caseName}/output.js`);

    var actual = trim(transformFileSync(actualFile, {
        plugins: [
            [plugin, {
                libraryName: 'antd',
                libraryDirectory: libraryDirectory,
                style: style,
                async: async
            }, 'antd'],
        ],
        babelrc: false,
    }).code).split('');

    var expected = ('importlazyloadfrom"react-lazyable";' + trim(readFileSync(expectedFile, 'utf-8'))).split('');
    for (let index = 0; index < actual.length; index++) {
        if (expected[index] !== actual[index]) {
            console.error(`------Test case: ${caseName} throw errors as follows:`)
            assert.equal(actual.join('').slice(index), expected.join('').slice(index))
            break;
        }
    }

    // assert.equal(actual, expected)
}
describe('lazyload', function () {
    validCase('lazyload', 'lib', true)
})

describe('lazyload-comments', function () {
    validCase('lazyload-comments', 'lib', true)
})

describe('lazyload-comments-defaultsync', function () {
    validCase('lazyload-comments-defaultsync', undefined, true, false)
})

describe('lazyload-es-style', function () {
    validCase('lazyload-es-style', 'es', true)
})

describe('lazyload-lib-css', function () {
    validCase('lazyload-lib-css', 'lib', 'css')
})

describe('lazyload-lib-nostyle', function () {
    validCase('lazyload-lib-nostyle', undefined, false)
})