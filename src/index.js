import {
  declare
} from "@babel/helper-plugin-utils";
import {
  types as t
} from "@babel/core";

function camel2Dash(_str) {
  var str = _str[0].toLowerCase() + _str.substr(1);
  return str.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`);
}

export default declare((api, options) => {
  api.assertVersion(7);

  const pluginState = {
    useLazyLoad: {
      existed: false,
      appended: false,
      noUse: () => !pluginState.useLazyLoad.existed && !pluginState.useLazyLoad.appended
    }
  }

  function buildLazyLoadAst() {
    return t.importDeclaration([t.importDefaultSpecifier(t.identifier('lazyload'))], t.stringLiteral('react-lazyable'))
  }

  function buildAsyncAst(spec, path, statics) {
    return t.variableDeclaration(
      "var",
      [
        t.variableDeclarator(
          t.identifier(spec.local.name),
          t.callExpression(
            t.identifier('lazyload'),
            [
              t.objectExpression([
                t.objectProperty(
                  t.identifier('loader'),
                  t.functionExpression(
                    null,
                    [],
                    t.blockStatement([
                      t.returnStatement(
                        t.callExpression(
                          t.identifier('import'),
                          [t.stringLiteral(path)]
                        ))
                    ])
                  )
                ),
                t.objectProperty(
                  t.identifier('statics'),
                  t.stringLiteral(statics)
                ),
                t.objectProperty(
                  t.identifier('identifier'),
                  t.stringLiteral(spec.local.name)
                )
              ])
            ]
          )
        )
      ]
    );
  }

  function buildSyncAst(spec, path) {
    return t.importDeclaration([t.importDefaultSpecifier(t.identifier(spec.local.name))], t.stringLiteral(path))
  }

  function buildStyleImport(path, style) {
    function importStyle(css) {
      return t.importDeclaration([], t.stringLiteral(`${path}/style${css}`));
    }
    if (style === true) {
      return importStyle('');
    } else if (style === 'css') {
      return importStyle('/css')
    }
  }

  function formatComments(spec, async) {
    if (spec.leadingComments && spec.leadingComments.length > 0) {
      var comments = spec.leadingComments
        .filter(c => c.type === 'CommentBlock' &&
          c.value.includes('sync-'))
        .map(c => (c.value = c.value.replace(/^\/\*|\*\/$/gm, '').trim(), c))

      if (!comments.some(c => c.value.startsWith('sync-'))) {
        var filterComments = (comments, identifier) => comments
          .filter(comment => comment.value.startsWith(identifier) && comment.value.includes(':') && comment.value.includes('.'))
          .reduce((acc, item) => acc.concat(
            item.value
            .split(':')
            .pop()
            .split(',')
            .map(comment => comment.trim().split('.').slice(1).join('.').replace(/\b([a-z])/, 'fn.$1'))), [])

        var commentMetas = {
          react: filterComments(comments, 'async-react').filter(c => !c.startsWith('fn.')),
          reactfunc: filterComments(comments, 'async-react').filter(c => c.startsWith('fn.')).map(fn => fn.slice(3)),
          func: filterComments(comments, 'async-func').map(fn => fn.slice(3))
        }

        if (commentMetas.react.length > 0 || commentMetas.reactfunc.length > 0 || commentMetas.func.length > 0) {
          return [JSON.stringify(commentMetas), true]
        }
        if (comments.every(c => c.value === 'async-react')) {
          return ['', true]
        }
        if (comments.every(c => c.value === 'async-func')) {
          throw 'async-func comment syntax error'
        }
      } else {
        return ['', false]
      }
    }
    return ['', async]
  }

  function existLazyLoad(node) {
    if (node.source.value === 'react-lazyable' && node.specifiers.length === 1 && node.specifiers[0].local.name === 'lazyload') {
      pluginState.useLazyLoad.existed = true;
    }
  }

  function initAsts() {
    if (pluginState.useLazyLoad.noUse()) {
      pluginState.useLazyLoad.appended = true;
      return [buildLazyLoadAst()]
    } else {
      return []
    }
  }

  var
    libraryName = options.libraryName || 'antd',
    libraryDirectory = options.libraryDirectory || 'lib',
    style = options.style === undefined ? true : options.style,
    async = options.async === undefined ? true : options.async;

  return {
    name: "import-antd-async",

    visitor: {
      Program: {
        exit() {
          pluginState.useLazyLoad.existed = false
          pluginState.useLazyLoad.appended = false
        }
      },
      ImportDeclaration(path) {
        const {
          node
        } = path;

        // path maybe removed by prev instances.
        if (!node) return;

        const {
          value
        } = node.source;

        existLazyLoad(node);

        if (value === libraryName) {
          const asts = initAsts();
          node.specifiers.forEach(spec => {
            if (t.isImportSpecifier(spec)) {

              const path = `${libraryName}/${libraryDirectory}/${camel2Dash(spec.imported.name)}`;

              var [statics, isAsync] = formatComments(spec, async);

              asts.push(isAsync ? buildAsyncAst(spec, path, statics) : buildSyncAst(spec, path));

              asts.push(buildStyleImport(path, style));
            }
          });

          path.replaceWithMultiple(asts.filter(ast => ast !== undefined));

        }
      }
    }
  };
});