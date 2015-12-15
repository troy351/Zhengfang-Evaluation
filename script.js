loadjs('http://cdn.bootcss.com/jquery/1.11.3/jquery.min.js', function () {
    // jquery loaded
    var courseCount = $('#iframeautoheight')[0].contentWindow.document.getElementById('pjkc').length;
    for (var k = 1; k <= courseCount; k++) {
        setTimeout(function () {
            var random = Math.ceil(Math.random() * 11) + 1;
            var frame = $($('#iframeautoheight')[0].contentWindow.document);
            var teacherCount = frame.find('#DataGrid1 .datelisthead').children().length - 3;
            for (var i = 2; i <= 12; i++) {
                for (var j = 1; j <= teacherCount; j++) {
                    var selectId = '#DataGrid1__ctl' + i;
                    if (j <= 2) {
                        selectId += '_JS' + j;
                    } else {
                        selectId += '_js' + j;
                    }
                    frame.find(selectId).get(0).selectedIndex = random == i ? 2 : 1;
                }
            }
            frame.find('#Button1').trigger('click');
        }, k * 1000);
    }
});

// loadjs model
(function (win, doc) {
    var head = doc.head,
        devnull = function () {
        },
        bundleIdCache = {},
        bundleResultCache = {},
        bundleCallbackQueue = {};


    /**
     * Subscribe to bundle load event.
     * @param {string[]} bundleIds - Bundle ids
     * @param {Function} callbackFn - The callback function
     */
    function subscribe(bundleIds, callbackFn) {
        // listify
        bundleIds = bundleIds.push ? bundleIds : [bundleIds];

        var depsNotFound = [],
            i = bundleIds.length,
            numWaiting = i,
            fn, bundleId, r, q;

        // define callback function
        fn = function (bundleId, pathsNotFound) {
            if (pathsNotFound.length) depsNotFound.push(bundleId);

            numWaiting -= 1;
            if (numWaiting === 0) callbackFn(depsNotFound);
        };

        // register callback
        while (i--) {
            bundleId = bundleIds[i];

            // execute callback if in result cache
            r = bundleResultCache[bundleId];
            if (r) {
                fn(bundleId, r);
                continue;
            }

            // add to callback queue
            q = bundleCallbackQueue[bundleId] = bundleCallbackQueue[bundleId] || [];
            q.push(fn);
        }
    }


    /**
     * Publish bundle load event.
     * @param {string} bundleId - Bundle id
     * @param {string[]} pathsNotFound - List of files not found
     */
    function publish(bundleId, pathsNotFound) {
        // exit if id isn't defined
        if (!bundleId) return;

        var q = bundleCallbackQueue[bundleId];

        // cache result
        bundleResultCache[bundleId] = pathsNotFound;

        // exit if queue is empty
        if (!q) return;

        // empty callback queue
        while (q.length) {
            q[0](bundleId, pathsNotFound);
            q.splice(0, 1);
        }
    }


    /**
     * Load individual JavaScript file.
     * @param {string} path - The file path
     * @param {Function} callbackFn - The callback function
     */
    function loadScript(path, callbackFn) {
        var s = doc.createElement('script');
        s.src = path;

        s.onload = s.onerror = function (ev) {
            // remove script
            s.parentNode.removeChild(s);

            // de-reference script
            s = null;

            // execute callback
            callbackFn(path, ev.type);
        };

        // add to document
        head.appendChild(s);
    }


    /**
     * Load multiple JavaScript files.
     * @param {string[]} paths - The file paths
     * @param {Function} callbackFn - The callback function
     */
    function loadScripts(paths, callbackFn) {
        // listify paths
        paths = paths.push ? paths : [paths];

        var i = paths.length, numWaiting = i, pathsNotFound = [], fn;

        // define callback function
        fn = function (path, result) {
            if (result === 'error') pathsNotFound.push(path);

            numWaiting -= 1;
            if (numWaiting === 0) callbackFn(pathsNotFound);
        };

        // load scripts
        while (i--) loadScript(paths[i], fn);
    }


    /**
     * Initiate script load and register bundle.
     * @param {(string|string[])} paths - The file paths
     * @param {(string|Function)} [arg1] - The bundleId or success callback
     * @param {Function} [arg2] - The success or fail callback
     * @param {Function} [arg3] - The fail callback
     */
    function loadjs(paths, arg1, arg2, arg3) {
        var bundleId, successFn, failFn;

        // bundleId
        if (arg1 && !arg1.call) bundleId = arg1;

        // successFn, failFn
        if (bundleId) successFn = arg2;
        else successFn = arg1;

        // failFn
        if (bundleId) failFn = arg3;
        else failFn = arg2;

        // throw error if bundle is already defined
        if (bundleId) {
            if (bundleId in bundleIdCache) {
                throw new Error("LoadJS: Bundle already defined");
            } else {
                bundleIdCache[bundleId] = true;
            }
        }

        // load scripts
        win.setTimeout(function () {
            loadScripts(paths, function (pathsNotFound) {
                if (pathsNotFound.length) (failFn || devnull)(pathsNotFound);
                else (successFn || devnull)();

                // publish bundle load event
                publish(bundleId, pathsNotFound);
            });
        }, 0);  // fires after window 'load' event
    }


    /**
     * Execute callbacks when dependencies have been satisfied.
     * @param {(string|string[])} deps - List of bundle ids
     * @param {Function} [successFn] - Success callback
     * @param {Function} [failFn] - Fail callback
     */
    loadjs.ready = function (deps, successFn, failFn) {
        // subscribe to bundle load event
        subscribe(deps, function (depsNotFound) {
            // execute callbacks
            if (depsNotFound.length) (failFn || devnull)(depsNotFound);
            else (successFn || devnull)();
        });

        return loadjs;
    };


    /**
     * Manually satisfy bundle dependencies.
     * @param {string} bundleId - The bundle id
     */
    loadjs.done = function done(bundleId) {
        publish(bundleId, []);
    };


    // export
    win.loadjs = loadjs;
})(window, document);