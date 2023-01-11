window.hlsSourceHandler = (function (r) {
    var i = {}
    function n(t) {
        if (i[t]) return i[t].exports
        var e = (i[t] = { i: t, l: !1, exports: {} })
        return r[t].call(e.exports, e, e.exports, n), (e.l = !0), e.exports
    }
    return (
        (n.m = r),
        (n.c = i),
        (n.d = function (t, e, r) {
            n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r })
        }),
        (n.r = function (t) {
            'undefined' != typeof Symbol &&
                Symbol.toStringTag &&
                Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
                Object.defineProperty(t, '__esModule', { value: !0 })
        }),
        (n.t = function (e, t) {
            if ((1 & t && (e = n(e)), 8 & t)) return e
            if (4 & t && 'object' == typeof e && e && e.__esModule) return e
            var r = Object.create(null)
            if (
                (n.r(r),
                    Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
                    2 & t && 'string' != typeof e)
            )
                for (var i in e)
                    n.d(
                        r,
                        i,
                        function (t) {
                            return e[t]
                        }.bind(null, i),
                    )
            return r
        }),
        (n.n = function (t) {
            var e =
                t && t.__esModule
                    ? function () {
                        return t.default
                    }
                    : function () {
                        return t
                    }
            return n.d(e, 'a', e), e
        }),
        (n.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }),
        (n.p = ''),
        n((n.s = 0))
    )
})([
    function (t, e, r) {
        'use strict'
        r = r(1)
        window.videojs &&
            (r.registerConfigPlugin(window.videojs),
                r.registerSourceHandler(window.videojs)),
            (t.exports = { register: r.registerSourceHandler })
    },
    function (t, e, r) {
        'use strict'
        var k =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t
                }
                : function (t) {
                    return t &&
                        'function' == typeof Symbol &&
                        t.constructor === Symbol &&
                        t !== Symbol.prototype
                        ? 'symbol'
                        : typeof t
                },
            w = r(2)
        function i(t) {
            var e = this
            t &&
                (e.srOptions_ || (e.srOptions_ = {}),
                    e.srOptions_.hlsjsConfig || (e.srOptions_.hlsjsConfig = t.hlsjsConfig),
                    e.srOptions_.captionConfig ||
                    (e.srOptions_.captionConfig = t.captionConfig))
        }
        t.exports = {
            registerSourceHandler: function (I) {
                var t,
                    P = {}
                function r(t, n) {
                    n.name_ = 'StreamrootHlsjs'
                    var a,
                        s = n.el(),
                        r = {},
                        i = null,
                        o = null,
                        l = null,
                        u = null,
                        d = null,
                        c = null,
                        f = I(n.options_.playerId),
                        h = f.qualityLevels && f.qualityLevels()
                    h && f.hlsQualitySelector && (n.hls = {})
                    var p,
                        e,
                        g = !1
                    function y(t) {
                        1 === r[w.ErrorTypes.MEDIA_ERROR]
                            ? a.recoverMediaError()
                            : 2 === r[w.ErrorTypes.MEDIA_ERROR]
                                ? (a.swapAudioCodec(), a.recoverMediaError())
                                : 2 < r[w.ErrorTypes.MEDIA_ERROR] &&
                                ((n.error = function () {
                                    return t
                                }),
                                    n.trigger('error'))
                    }
                    function m(t) {
                        a.nextLevel = t
                    }
                    function v(t, e) {
                        return (
                            !!h &&
                            ('boolean' == typeof e &&
                                ((h[t]._enabled = e),
                                    (function () {
                                        for (var t = !0, e = 0; e < h.length; e++)
                                            if (!h[e]._enabled) {
                                                t = !1
                                                break
                                            }
                                        if (t) a.currentLevel = -1
                                        else {
                                            for (var r = h.length - 1; 0 <= r && !h[r]._enabled; r--);
                                            a.currentLevel = r
                                        }
                                    })()),
                                h[t]._enabled)
                        )
                    }
                    function _(t, e) {
                        h &&
                            ((h.selectedIndex_ = e.level),
                                h.trigger({ selectedIndex: e.level, type: 'change' }))
                    }
                    function E() {
                        var i, t
                        o &&
                            ((i = []),
                                1 < o.levels.length &&
                                ((t = {
                                    id: -1,
                                    label: 'auto',
                                    selected: -1 === a.manualLevel,
                                }),
                                    i.push(t)),
                                o.levels.forEach(function (t, e) {
                                    var r = {}
                                        ; (r.id = e),
                                            (r.selected = e === a.manualLevel),
                                            (r.label = (t = t).height
                                                ? t.height + 'p'
                                                : t.width
                                                    ? Math.round((9 * t.width) / 16) + 'p'
                                                    : t.bitrate
                                                        ? t.bitrate / 1e3 + 'kbps'
                                                        : 0),
                                            i.push(r)
                                }),
                                (t = { qualityData: { video: i }, qualitySwitchCallback: m }),
                                n.trigger('loadedqualitydata', t),
                                s.removeEventListener('playing', E))
                    }
                    function T() {
                        for (var t = n.audioTracks(), e = 0; e < t.length; e++)
                            if (t[e].enabled) {
                                a.audioTrack = e
                                break
                            }
                    }
                    function S() {
                        var t = a.audioTracks,
                            e = n.audioTracks()
                        if (1 < t.length && 0 === e.length) {
                            for (var r = 0; r < t.length; r++)
                                e.addTrack(
                                    new I.AudioTrack({
                                        id: r,
                                        kind: 'alternative',
                                        label: t[r].name || t[r].lang,
                                        language: t[r].lang,
                                        enabled: r === a.audioTrack,
                                    }),
                                )
                            e.addEventListener('change', T)
                        }
                    }
                    function b(t) {
                        return t.label || t.language
                    }
                    function A(t, e) {
                        return b(t) === b(e) && t.kind === e.kind
                    }
                    function R() {
                        for (var t = f.textTracks(), e = null, r = 0; r < t.length; r++)
                            if ('showing' === t[r].mode) {
                                e = t[r]
                                break
                            }
                        for (var i = s.textTracks, n = 0; n < i.length; n++)
                            ('subtitles' !== i[n].kind && 'captions' !== i[n].kind) ||
                                (i[n].mode = e && A(i[n], e) ? 'showing' : 'disabled')
                    }
                    function L() {
                        a.startLoad(-1), s.removeEventListener('play', L)
                    }
                    function D() {
                        for (
                            var t = (function (t) {
                                for (var e = [], r = 0; r < t.length; r++)
                                    ('subtitles' !== t[r].kind && 'captions' !== t[r].kind) ||
                                        e.push(t[r])
                                return e
                            })(s.textTracks),
                            e = f.textTracks(),
                            r = 0;
                            r < t.length;
                            r++
                        ) {
                            for (var i, n = !1, a = 0; a < e.length; a++)
                                if (A(t[r], e[a])) {
                                    n = !0
                                    break
                                }
                            n ||
                                ((i = t[r]),
                                    f.addRemoteTextTrack(
                                        {
                                            kind: i.kind,
                                            label: b(i),
                                            language: i.language,
                                            srclang: i.language,
                                        },
                                        !1,
                                    ))
                        }
                        R(), g || (e.addEventListener('change', R), (g = !0))
                    }
                    function O(t, e) {
                        ; (o = e),
                            (function () {
                                if (o && (h = f.qualityLevels && f.qualityLevels())) {
                                    n.hls = {}
                                    for (var t = 0; t < o.levels.length; t++) {
                                        var e = o.levels[t],
                                            r = 'hlsjs-' + t,
                                            e = {
                                                id: r,
                                                label: r,
                                                width: e.width,
                                                height: e.height,
                                                bandwidth: e.bitrate,
                                                bitrate: e.bitrate,
                                                _enabled: !1,
                                            }
                                            ; (e.enabled = v.bind(this, t)), h.addQualityLevel(e)
                                    }
                                }
                            })()
                    }
                    ; (this.duration = function () {
                        return i || s.duration || 0
                    }),
                        (this.seekable = function () {
                            if (a.media) {
                                if (!l) return I.createTimeRanges(0, a.media.duration)
                                var t = Math.round(a.media.duration - u),
                                    e = Math.round(a.media.duration - d)
                                return I.createTimeRanges(t, e)
                            }
                            return I.createTimeRanges()
                        }),
                        (this.dispose = function () {
                            s.removeEventListener('play', L),
                                s.textTracks.removeEventListener('addtrack', D),
                                s.removeEventListener('playing', E),
                                f.textTracks().removeEventListener('change', R),
                                (g = !1),
                                f.audioTracks().removeEventListener('change', T),
                                a.destroy()
                        }),
                        s.addEventListener('error', function (t) {
                            var e = t.currentTarget.error
                            switch (e.code) {
                                case e.MEDIA_ERR_ABORTED:
                                    0
                                    break
                                case e.MEDIA_ERR_DECODE:
                                    y(e)
                                    break
                                case e.MEDIA_ERR_NETWORK:
                                    0
                                    break
                                case e.MEDIA_ERR_SRC_NOT_SUPPORTED:
                                    0
                                    break
                                default:
                                    e.message
                            }
                        }),
                        (e =
                            (f.srOptions_ && f.srOptions_.hlsjsConfig) ||
                            n.options_.hlsjsConfig),
                        (c = e
                            ? (function (t) {
                                for (var e = {}, r = Object.keys(t), i = 0; i < r.length; i++)
                                    e[r[i]] = t[r[i]]
                                return e
                            })(e)
                            : {}),
                        -1 !== ['', 'auto'].indexOf(s.preload) ||
                        s.autoplay ||
                        void 0 !== c.autoStartLoad ||
                        (c.autoStartLoad = !1),
                        (e =
                            (f.srOptions_ && f.srOptions_.captionConfig) ||
                            n.options_.captionConfig) &&
                        (c.cueHandler =
                            ((p = e),
                            {
                                newCue: function (t, e, r, i) {
                                    for (
                                        var n,
                                        a,
                                        s,
                                        o = window.VTTCue || window.TextTrackCue,
                                        l = 0;
                                        l < i.rows.length;
                                        l++
                                    )
                                        if (((s = ''), !(n = i.rows[l]).isEmpty())) {
                                            for (var u = 0; u < n.chars.length; u++)
                                                s += n.chars[u].uchar
                                            if (
                                                ((a = new o(e, r, s.trim())),
                                                    null != p &&
                                                    'object' === (void 0 === p ? 'undefined' : k(p)))
                                            )
                                                for (var d = Object.keys(p), c = 0; c < d.length; c++)
                                                    a[d[c]] = p[d[c]]
                                            t.addCue(a), r === e && t.addCue(new o(r + 5, ''))
                                        }
                                },
                            })),
                        !1 === c.autoStartLoad && s.addEventListener('play', L),
                        s.addEventListener('playing', E),
                        (a = new w(c)),
                        (function (t) {
                            if (void 0 !== P[t])
                                for (var e = 0; e < P[t].length; e++) P[t][e](f, a)
                        })('beforeinitialize'),
                        a.on(w.Events.ERROR, function (t, e) {
                            !(function (t) {
                                var e = {
                                    message:
                                        'HLS.js error: ' +
                                        t.type +
                                        ' - fatal: ' +
                                        t.fatal +
                                        ' - ' +
                                        t.details,
                                }
                                if ((r[t.type] ? (r[t.type] += 1) : (r[t.type] = 1), t.fatal))
                                    switch (t.type) {
                                        case w.ErrorTypes.NETWORK_ERROR:
                                            ; (e.code = 2),
                                                (n.error = function () {
                                                    return e
                                                }),
                                                n.trigger('error')
                                            break
                                        case w.ErrorTypes.MEDIA_ERROR:
                                            ; (e.code = 3), y(e)
                                            break
                                        default:
                                            a.destroy(),
                                                (n.error = function () {
                                                    return e
                                                }),
                                                n.trigger('error')
                                    }
                            })(e)
                        }),
                        a.on(w.Events.AUDIO_TRACKS_UPDATED, S),
                        a.on(w.Events.MANIFEST_PARSED, O),
                        a.on(w.Events.LEVEL_LOADED, function (t, e) {
                            c.liveSyncDuration
                                ? (d = c.liveSyncDuration)
                                : c.liveSyncDurationCount &&
                                (d = c.liveSyncDurationCount * e.details.targetduration),
                                (l = e.details.live),
                                (u = e.details.totalduration),
                                (i = l ? 1 / 0 : e.details.totalduration)
                        }),
                        a.once(w.Events.FRAG_LOADED, function () {
                            n.trigger('loadedmetadata')
                        }),
                        a.on(w.Events.LEVEL_SWITCHED, _),
                        a.attachMedia(s),
                        s.textTracks.addEventListener('addtrack', D),
                        a.loadSource(t.src)
                }
                if (
                    ((r.addHook = function (t, e) {
                        ; (P[t] = P[t] || []), P[t].push(e)
                    }),
                        (r.removeHook = function (t, e) {
                            if (void 0 === P[t]) return !1
                            e = P[t].indexOf(e)
                            return -1 !== e && (P[t].splice(e, 1), !0)
                        }),
                        w.isSupported())
                ) {
                    if ('function' == typeof I.getTech) t = I.getTech('Html5')
                    else {
                        if ('function' != typeof I.getComponent) return
                        t = I.getComponent('Html5')
                    }
                    t &&
                        (t.registerSourceHandler(
                            {
                                canHandleSource: function (t) {
                                    t = /^application\/x-mpegURL|application\/vnd\.apple\.mpegurl$/i.test(
                                        t.type,
                                    )
                                        ? 'probably'
                                        : /\.m3u8/i.test(t.src)
                                            ? 'maybe'
                                            : ''
                                    return t
                                },
                                handleSource: function (t, e) {
                                    return (
                                        e.hlsProvider && e.hlsProvider.dispose(),
                                        (e.hlsProvider = new r(t, e)),
                                        e.hlsProvider
                                    )
                                },
                            },
                            0,
                        ),
                            (I.Html5Hlsjs = r))
                }
            },
            registerConfigPlugin: function (t) {
                ; (t.registerPlugin || t.plugin)('streamrootHls', i)
            },
        }
    },
    function (t, e, r) {
        !function (e) {
            var r,
                a = a || {}
                ; (a.scope = {}),
                    (a.arrayIteratorImpl = function (t) {
                        var e = 0
                        return function () {
                            return e < t.length ? { done: !1, value: t[e++] } : { done: !0 }
                        }
                    }),
                    (a.arrayIterator = function (t) {
                        return { next: a.arrayIteratorImpl(t) }
                    }),
                    (a.ASSUME_ES5 = !1),
                    (a.ASSUME_NO_NATIVE_MAP = !1),
                    (a.ASSUME_NO_NATIVE_SET = !1),
                    (a.SIMPLE_FROUND_POLYFILL = !1),
                    (a.defineProperty =
                        a.ASSUME_ES5 || 'function' == typeof Object.defineProperties
                            ? Object.defineProperty
                            : function (t, e, r) {
                                t != Array.prototype &&
                                    t != Object.prototype &&
                                    (t[e] = r.value)
                            }),
                    (a.getGlobal = function (t) {
                        return ('undefined' == typeof window || window !== t) &&
                            void 0 !== e &&
                            null != e
                            ? e
                            : t
                    }),
                    (a.global = a.getGlobal(this)),
                    (a.SYMBOL_PREFIX = 'jscomp_symbol_'),
                    (a.initSymbol = function () {
                        ; (a.initSymbol = function () { }),
                            a.global.Symbol || (a.global.Symbol = a.Symbol)
                    }),
                    (a.SymbolClass = function (t, e) {
                        ; (this.$jscomp$symbol$id_ = t),
                            a.defineProperty(this, 'description', {
                                configurable: !0,
                                writable: !0,
                                value: e,
                            })
                    }),
                    (a.SymbolClass.prototype.toString = function () {
                        return this.$jscomp$symbol$id_
                    }),
                    (a.Symbol =
                        ((r = 0),
                            function t(e) {
                                if (this instanceof t)
                                    throw new TypeError('Symbol is not a constructor')
                                return new a.SymbolClass(a.SYMBOL_PREFIX + (e || '') + '_' + r++, e)
                            })),
                    (a.initSymbolIterator = function () {
                        a.initSymbol()
                        var t =
                            (t = a.global.Symbol.iterator) ||
                            (a.global.Symbol.iterator = a.global.Symbol('Symbol.iterator'))
                        'function' != typeof Array.prototype[t] &&
                            a.defineProperty(Array.prototype, t, {
                                configurable: !0,
                                writable: !0,
                                value: function () {
                                    return a.iteratorPrototype(a.arrayIteratorImpl(this))
                                },
                            }),
                            (a.initSymbolIterator = function () { })
                    }),
                    (a.initSymbolAsyncIterator = function () {
                        a.initSymbol()
                        a.global.Symbol.asyncIterator ||
                            (a.global.Symbol.asyncIterator = a.global.Symbol(
                                'Symbol.asyncIterator',
                            ))
                        a.initSymbolAsyncIterator = function () { }
                    }),
                    (a.iteratorPrototype = function (t) {
                        return (
                            a.initSymbolIterator(),
                            ((t = { next: t })[a.global.Symbol.iterator] = function () {
                                return this
                            }),
                            t
                        )
                    }),
                    (a.iteratorFromArray = function (e, r) {
                        a.initSymbolIterator(), e instanceof String && (e += '')
                        var i = 0,
                            n = {
                                next: function () {
                                    if (i < e.length) {
                                        var t = i++
                                        return { value: r(t, e[t]), done: !1 }
                                    }
                                    return (
                                        (n.next = function () {
                                            return { done: !0, value: void 0 }
                                        }),
                                        n.next()
                                    )
                                },
                            }
                        return (
                            (n[Symbol.iterator] = function () {
                                return n
                            }),
                            n
                        )
                    }),
                    (a.polyfill = function (t, e, r, i) {
                        if (e) {
                            for (r = a.global, t = t.split('.'), i = 0; i < t.length - 1; i++) {
                                var n = t[i]
                                n in r || (r[n] = {}), (r = r[n])
                            }
                            ; (e = e((i = r[(t = t[t.length - 1])]))) != i &&
                                null != e &&
                                a.defineProperty(r, t, {
                                    configurable: !0,
                                    writable: !0,
                                    value: e,
                                })
                        }
                    }),
                    a.polyfill(
                        'Array.prototype.keys',
                        function (t) {
                            return (
                                t ||
                                function () {
                                    return a.iteratorFromArray(this, function (t) {
                                        return t
                                    })
                                }
                            )
                        },
                        'es6',
                        'es3',
                    ),
                    (a.underscoreProtoCanBeSet = function () {
                        var t = {}
                        try {
                            return (t.__proto__ = { a: !0 }), t.a
                        } catch (t) { }
                        return !1
                    }),
                    (a.setPrototypeOf =
                        'function' == typeof Object.setPrototypeOf
                            ? Object.setPrototypeOf
                            : a.underscoreProtoCanBeSet()
                                ? function (t, e) {
                                    if (((t.__proto__ = e), t.__proto__ !== e))
                                        throw new TypeError(t + ' is not extensible')
                                    return t
                                }
                                : null),
                    a.polyfill(
                        'Object.setPrototypeOf',
                        function (t) {
                            return t || a.setPrototypeOf
                        },
                        'es6',
                        'es5',
                    ),
                    a.polyfill(
                        'Array.prototype.values',
                        function (t) {
                            return (
                                t ||
                                function () {
                                    return a.iteratorFromArray(this, function (t, e) {
                                        return e
                                    })
                                }
                            )
                        },
                        'es8',
                        'es3',
                    ),
                    'undefined' != typeof window &&
                    (t.exports = (function (r) {
                        function n(t) {
                            if (i[t]) return i[t].exports
                            var e = (i[t] = { i: t, l: !1, exports: {} })
                            return (
                                r[t].call(e.exports, e, e.exports, n), (e.l = !0), e.exports
                            )
                        }
                        var i = {}
                        return (
                            (n.m = r),
                            (n.c = i),
                            (n.d = function (t, e, r) {
                                n.o(t, e) ||
                                    Object.defineProperty(t, e, { enumerable: !0, get: r })
                            }),
                            (n.r = function (t) {
                                'undefined' != typeof Symbol &&
                                    Symbol.toStringTag &&
                                    Object.defineProperty(t, Symbol.toStringTag, {
                                        value: 'Module',
                                    }),
                                    Object.defineProperty(t, '__esModule', { value: !0 })
                            }),
                            (n.t = function (e, t) {
                                if (
                                    (1 & t && (e = n(e)),
                                        8 & t || (4 & t && 'object' == typeof e && e && e.__esModule))
                                )
                                    return e
                                var r = Object.create(null)
                                if (
                                    (n.r(r),
                                        Object.defineProperty(r, 'default', {
                                            enumerable: !0,
                                            value: e,
                                        }),
                                        2 & t && 'string' != typeof e)
                                )
                                    for (var i in e)
                                        n.d(
                                            r,
                                            i,
                                            function (t) {
                                                return e[t]
                                            }.bind(null, i),
                                        )
                                return r
                            }),
                            (n.n = function (t) {
                                var e =
                                    t && t.__esModule
                                        ? function () {
                                            return t.default
                                        }
                                        : function () {
                                            return t
                                        }
                                return n.d(e, 'a', e), e
                            }),
                            (n.o = function (t, e) {
                                return Object.prototype.hasOwnProperty.call(t, e)
                            }),
                            (n.p = '/dist/'),
                            n((n.s = './src/hls.js'))
                        )
                    })({
                        './node_modules/eventemitter3/index.js': function (t, e, r) {
                            function i() { }
                            function a(t, e, r) {
                                ; (this.fn = t), (this.context = e), (this.once = r || !1)
                            }
                            function n(t, e, r, i, n) {
                                if ('function' != typeof r)
                                    throw new TypeError('The listener must be a function')
                                return (
                                    (r = new a(r, i || t, n)),
                                    (e = f ? f + e : e),
                                    t._events[e]
                                        ? t._events[e].fn
                                            ? (t._events[e] = [t._events[e], r])
                                            : t._events[e].push(r)
                                        : ((t._events[e] = r), t._eventsCount++),
                                    t
                                )
                            }
                            function l(t, e) {
                                0 == --t._eventsCount
                                    ? (t._events = new i())
                                    : delete t._events[e]
                            }
                            function s() {
                                ; (this._events = new i()), (this._eventsCount = 0)
                            }
                            var o = Object.prototype.hasOwnProperty,
                                f = '~'
                            Object.create &&
                                ((i.prototype = Object.create(null)),
                                    new i().__proto__ || (f = !1)),
                                (s.prototype.eventNames = function () {
                                    var t,
                                        e,
                                        r = []
                                    if (0 === this._eventsCount) return r
                                    for (e in (t = this._events))
                                        o.call(t, e) && r.push(f ? e.slice(1) : e)
                                    return Object.getOwnPropertySymbols
                                        ? r.concat(Object.getOwnPropertySymbols(t))
                                        : r
                                }),
                                (s.prototype.listeners = function (t) {
                                    if (!(t = this._events[f ? f + t : t])) return []
                                    if (t.fn) return [t.fn]
                                    for (var e = 0, r = t.length, i = Array(r); e < r; e++)
                                        i[e] = t[e].fn
                                    return i
                                }),
                                (s.prototype.listenerCount = function (t) {
                                    return (t = this._events[f ? f + t : t])
                                        ? t.fn
                                            ? 1
                                            : t.length
                                        : 0
                                }),
                                (s.prototype.emit = function (t, e, r, i, n, a) {
                                    var s = f ? f + t : t
                                    if (!this._events[s]) return !1
                                    var s = this._events[s],
                                        o = arguments.length
                                    if (s.fn) {
                                        switch (
                                        (s.once && this.removeListener(t, s.fn, void 0, !0), o)
                                        ) {
                                            case 1:
                                                return s.fn.call(s.context), !0
                                            case 2:
                                                return s.fn.call(s.context, e), !0
                                            case 3:
                                                return s.fn.call(s.context, e, r), !0
                                            case 4:
                                                return s.fn.call(s.context, e, r, i), !0
                                            case 5:
                                                return s.fn.call(s.context, e, r, i, n), !0
                                            case 6:
                                                return s.fn.call(s.context, e, r, i, n, a), !0
                                        }
                                        for (var l = 1, u = Array(o - 1); l < o; l++)
                                            u[l - 1] = arguments[l]
                                        s.fn.apply(s.context, u)
                                    } else
                                        for (var d = s.length, l = 0; l < d; l++)
                                            switch (
                                            (s[l].once &&
                                                this.removeListener(t, s[l].fn, void 0, !0),
                                                o)
                                            ) {
                                                case 1:
                                                    s[l].fn.call(s[l].context)
                                                    break
                                                case 2:
                                                    s[l].fn.call(s[l].context, e)
                                                    break
                                                case 3:
                                                    s[l].fn.call(s[l].context, e, r)
                                                    break
                                                case 4:
                                                    s[l].fn.call(s[l].context, e, r, i)
                                                    break
                                                default:
                                                    if (!u) {
                                                        var c = 1
                                                        for (u = Array(o - 1); c < o; c++)
                                                            u[c - 1] = arguments[c]
                                                    }
                                                    s[l].fn.apply(s[l].context, u)
                                            }
                                    return !0
                                }),
                                (s.prototype.on = function (t, e, r) {
                                    return n(this, t, e, r, !1)
                                }),
                                (s.prototype.once = function (t, e, r) {
                                    return n(this, t, e, r, !0)
                                }),
                                (s.prototype.removeListener = function (t, e, r, i) {
                                    if (((t = f ? f + t : t), !this._events[t])) return this
                                    if (!e) return l(this, t), this
                                    var n = this._events[t]
                                    if (n.fn)
                                        n.fn !== e ||
                                            (i && !n.once) ||
                                            (r && n.context !== r) ||
                                            l(this, t)
                                    else {
                                        for (var a = 0, s = [], o = n.length; a < o; a++)
                                            (n[a].fn !== e ||
                                                (i && !n[a].once) ||
                                                (r && n[a].context !== r)) &&
                                                s.push(n[a])
                                        s.length
                                            ? (this._events[t] = 1 === s.length ? s[0] : s)
                                            : l(this, t)
                                    }
                                    return this
                                }),
                                (s.prototype.removeAllListeners = function (t) {
                                    return (
                                        t
                                            ? ((t = f ? f + t : t), this._events[t] && l(this, t))
                                            : ((this._events = new i()), (this._eventsCount = 0)),
                                        this
                                    )
                                }),
                                (s.prototype.off = s.prototype.removeListener),
                                (s.prototype.addListener = s.prototype.on),
                                (s.prefixed = f),
                                (s.EventEmitter = s),
                                (t.exports = s)
                        },
                        './node_modules/node-libs-browser/node_modules/events/events.js': function (
                            t,
                            e,
                        ) {
                            function r() {
                                ; (this._events = this._events || {}),
                                    (this._maxListeners = this._maxListeners || void 0)
                            }
                            function a(t) {
                                return 'function' == typeof t
                            }
                            function s(t) {
                                return 'object' == typeof t && null !== t
                            }
                            ; (((t.exports = r).EventEmitter = r).prototype._events = void 0),
                                (r.prototype._maxListeners = void 0),
                                (r.defaultMaxListeners = 10),
                                (r.prototype.setMaxListeners = function (t) {
                                    if ('number' != typeof t || t < 0 || isNaN(t))
                                        throw TypeError('n must be a positive number')
                                    return (this._maxListeners = t), this
                                }),
                                (r.prototype.emit = function (t) {
                                    if (
                                        (this._events || (this._events = {}),
                                            'error' === t &&
                                            (!this._events.error ||
                                                (s(this._events.error) && !this._events.error.length)))
                                    ) {
                                        var e = arguments[1]
                                        if (e instanceof Error) throw e
                                        var r = Error(
                                            'Uncaught, unspecified "error" event. (' + e + ')',
                                        )
                                        throw ((r.context = e), r)
                                    }
                                    if (void 0 === (r = this._events[t])) return !1
                                    if (a(r))
                                        switch (arguments.length) {
                                            case 1:
                                                r.call(this)
                                                break
                                            case 2:
                                                r.call(this, arguments[1])
                                                break
                                            case 3:
                                                r.call(this, arguments[1], arguments[2])
                                                break
                                            default:
                                                ; (e = Array.prototype.slice.call(arguments, 1)),
                                                    r.apply(this, e)
                                        }
                                    else if (s(r))
                                        for (
                                            var e = Array.prototype.slice.call(arguments, 1),
                                            i = r.slice(),
                                            r = i.length,
                                            n = 0;
                                            n < r;
                                            n++
                                        )
                                            i[n].apply(this, e)
                                    return !0
                                }),
                                (r.prototype.on = r.prototype.addListener = function (t, e) {
                                    if (!a(e)) throw TypeError('listener must be a function')
                                    return (
                                        this._events || (this._events = {}),
                                        this._events.newListener &&
                                        this.emit(
                                            'newListener',
                                            t,
                                            a(e.listener) ? e.listener : e,
                                        ),
                                        this._events[t]
                                            ? s(this._events[t])
                                                ? this._events[t].push(e)
                                                : (this._events[t] = [this._events[t], e])
                                            : (this._events[t] = e),
                                        s(this._events[t]) &&
                                        !this._events[t].warned &&
                                        (e =
                                            void 0 !== this._maxListeners
                                                ? this._maxListeners
                                                : r.defaultMaxListeners) &&
                                        0 < e &&
                                        this._events[t].length > e &&
                                        ((this._events[t].warned = !0), console.trace),
                                        this
                                    )
                                }),
                                (r.prototype.once = function (t, e) {
                                    function r() {
                                        this.removeListener(t, r),
                                            i || ((i = !0), e.apply(this, arguments))
                                    }
                                    if (!a(e)) throw TypeError('listener must be a function')
                                    var i = !1
                                    return (r.listener = e), this.on(t, r), this
                                }),
                                (r.prototype.removeListener = function (t, e) {
                                    if (!a(e)) throw TypeError('listener must be a function')
                                    if (!this._events || !this._events[t]) return this
                                    var r = this._events[t],
                                        i = r.length,
                                        n = -1
                                    if (r === e || (a(r.listener) && r.listener === e))
                                        delete this._events[t],
                                            this._events.removeListener &&
                                            this.emit('removeListener', t, e)
                                    else if (s(r)) {
                                        for (; 0 < i--;)
                                            if (
                                                r[i] === e ||
                                                (r[i].listener && r[i].listener === e)
                                            ) {
                                                n = i
                                                break
                                            }
                                        if (n < 0) return this
                                        1 === r.length
                                            ? ((r.length = 0), delete this._events[t])
                                            : r.splice(n, 1),
                                            this._events.removeListener &&
                                            this.emit('removeListener', t, e)
                                    }
                                    return this
                                }),
                                (r.prototype.removeAllListeners = function (t) {
                                    if (!this._events) return this
                                    if (!this._events.removeListener)
                                        return (
                                            0 === arguments.length
                                                ? (this._events = {})
                                                : this._events[t] && delete this._events[t],
                                            this
                                        )
                                    if (0 === arguments.length) {
                                        for (e in this._events)
                                            'removeListener' !== e && this.removeAllListeners(e)
                                        return (
                                            this.removeAllListeners('removeListener'),
                                            (this._events = {}),
                                            this
                                        )
                                    }
                                    var e = this._events[t]
                                    if (a(e)) this.removeListener(t, e)
                                    else if (e)
                                        for (; e.length;) this.removeListener(t, e[e.length - 1])
                                    return delete this._events[t], this
                                }),
                                (r.prototype.listeners = function (t) {
                                    return this._events && this._events[t]
                                        ? a(this._events[t])
                                            ? [this._events[t]]
                                            : this._events[t].slice()
                                        : []
                                }),
                                (r.prototype.listenerCount = function (t) {
                                    if (this._events) {
                                        if (a((t = this._events[t]))) return 1
                                        if (t) return t.length
                                    }
                                    return 0
                                }),
                                (r.listenerCount = function (t, e) {
                                    return t.listenerCount(e)
                                })
                        },
                        './node_modules/url-toolkit/src/url-toolkit.js': function (
                            t,
                            e,
                            r,
                        ) {
                            var i, n, a, s, o
                                ; (i = /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/\?#]*\/)*.*?)??(;.*?)?(\?.*?)?(#.*?)?$/),
                                    (n = /^([^\/?#]*)(.*)$/),
                                    (a = /(?:\/|^)\.(?=\/)/g),
                                    (s = /(?:\/|^)\.\.\/(?!\.\.\/).*?(?=\/)/g),
                                    (o = {
                                        buildAbsoluteURL: function (t, e, r) {
                                            if (((r = r || {}), (t = t.trim()), !(e = e.trim()))) {
                                                if (!r.alwaysNormalize) return t
                                                if (!(r = o.parseURL(t)))
                                                    throw Error('Error trying to parse base URL.')
                                                return (
                                                    (r.path = o.normalizePath(r.path)),
                                                    o.buildURLFromParts(r)
                                                )
                                            }
                                            var i = o.parseURL(e)
                                            if (!i) throw Error('Error trying to parse relative URL.')
                                            if (i.scheme)
                                                return r.alwaysNormalize
                                                    ? ((i.path = o.normalizePath(i.path)),
                                                        o.buildURLFromParts(i))
                                                    : e
                                            if (!(e = o.parseURL(t)))
                                                throw Error('Error trying to parse base URL.')
                                            return (
                                                !e.netLoc &&
                                                e.path &&
                                                '/' !== e.path[0] &&
                                                ((t = n.exec(e.path)),
                                                    (e.netLoc = t[1]),
                                                    (e.path = t[2])),
                                                e.netLoc && !e.path && (e.path = '/'),
                                                (t = {
                                                    scheme: e.scheme,
                                                    netLoc: i.netLoc,
                                                    path: null,
                                                    params: i.params,
                                                    query: i.query,
                                                    fragment: i.fragment,
                                                }),
                                                i.netLoc ||
                                                ((t.netLoc = e.netLoc),
                                                    '/' !== i.path[0] &&
                                                    (i.path
                                                        ? ((e =
                                                            (e = e.path).substring(
                                                                0,
                                                                e.lastIndexOf('/') + 1,
                                                            ) + i.path),
                                                            (t.path = o.normalizePath(e)))
                                                        : ((t.path = e.path),
                                                            i.params ||
                                                            ((t.params = e.params),
                                                                i.query || (t.query = e.query))))),
                                                null === t.path &&
                                                (t.path = r.alwaysNormalize
                                                    ? o.normalizePath(i.path)
                                                    : i.path),
                                                o.buildURLFromParts(t)
                                            )
                                        },
                                        parseURL: function (t) {
                                            return (t = i.exec(t))
                                                ? {
                                                    scheme: t[1] || '',
                                                    netLoc: t[2] || '',
                                                    path: t[3] || '',
                                                    params: t[4] || '',
                                                    query: t[5] || '',
                                                    fragment: t[6] || '',
                                                }
                                                : null
                                        },
                                        normalizePath: function (t) {
                                            for (
                                                t = t.split('').reverse().join('').replace(a, '');
                                                t.length !== (t = t.replace(s, '')).length;

                                            );
                                            return t.split('').reverse().join('')
                                        },
                                        buildURLFromParts: function (t) {
                                            return (
                                                t.scheme +
                                                t.netLoc +
                                                t.path +
                                                t.params +
                                                t.query +
                                                t.fragment
                                            )
                                        },
                                    }),
                                    (t.exports = o)
                        },
                        './node_modules/webworkify-webpack/index.js': function (t, e, h) {
                            function a(r) {
                                function i(t) {
                                    if (n[t]) return n[t].exports
                                    var e = (n[t] = { i: t, l: !1, exports: {} })
                                    return (
                                        r[t].call(e.exports, e, e.exports, i), (e.l = !0), e.exports
                                    )
                                }
                                var n = {}
                                    ; (i.m = r),
                                        (i.c = n),
                                        (i.i = function (t) {
                                            return t
                                        }),
                                        (i.d = function (t, e, r) {
                                            i.o(t, e) ||
                                                Object.defineProperty(t, e, {
                                                    configurable: !1,
                                                    enumerable: !0,
                                                    get: r,
                                                })
                                        }),
                                        (i.r = function (t) {
                                            Object.defineProperty(t, '__esModule', { value: !0 })
                                        }),
                                        (i.n = function (t) {
                                            var e =
                                                t && t.__esModule
                                                    ? function () {
                                                        return t.default
                                                    }
                                                    : function () {
                                                        return t
                                                    }
                                            return i.d(e, 'a', e), e
                                        }),
                                        (i.o = function (t, e) {
                                            return Object.prototype.hasOwnProperty.call(t, e)
                                        }),
                                        (i.p = '/'),
                                        (i.oe = function (t) {
                                            throw t
                                        })
                                var t = i((i.s = ENTRY_MODULE))
                                return t.default || t
                            }
                            function p(t) {
                                return (t + '').replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&')
                            }
                            function s(t, e) {
                                e = { main: [e] }
                                for (
                                    var r = { main: [] }, i = { main: {} };
                                    (function (r) {
                                        return Object.keys(r).reduce(function (t, e) {
                                            return t || 0 < r[e].length
                                        }, !1)
                                    })(e);

                                )
                                    for (var n = Object.keys(e), a = 0; a < n.length; a++) {
                                        var s = e[(l = n[a])].pop()
                                        if (((i[l] = i[l] || {}), !i[l][s] && t[l][s])) {
                                            ; (i[l][s] = !0), (r[l] = r[l] || []), r[l].push(s)
                                            var o,
                                                l,
                                                u = t,
                                                d = t[l][s],
                                                s = l
                                            if (
                                                (((l = {})[s] = []),
                                                    (o = (d = d.toString()).match(
                                                        /^function\s?\(\w+,\s*\w+,\s*(\w+)\)/,
                                                    )))
                                            ) {
                                                for (
                                                    var c = o[1],
                                                    f = new RegExp(
                                                        '(\\\\n|\\W)' +
                                                        p(c) +
                                                        '\\((/\\*.*?\\*/)?s?.*?([\\.|\\-|\\+|\\w|/|@]+).*?\\)',
                                                        'g',
                                                    );
                                                    (o = f.exec(d));

                                                )
                                                    'dll-reference' !== o[3] && l[s].push(o[3])
                                                for (
                                                    f = new RegExp(
                                                        '\\(' +
                                                        p(c) +
                                                        '\\("(dll-reference\\s([\\.|\\-|\\+|\\w|/|@]+))"\\)\\)\\((/\\*.*?\\*/)?s?.*?([\\.|\\-|\\+|\\w|/|@]+).*?\\)',
                                                        'g',
                                                    );
                                                    (o = f.exec(d));

                                                )
                                                    u[o[2]] || (l[s].push(o[1]), (u[o[2]] = h(o[1]).m)),
                                                        (l[o[2]] = l[o[2]] || []),
                                                        l[o[2]].push(o[4])
                                                for (u = Object.keys(l), s = 0; s < u.length; s++)
                                                    for (d = 0; d < l[u[s]].length; d++)
                                                        isNaN(+l[u[s]][d]) || (l[u[s]][d] *= 1)
                                            }
                                            for (u = Object.keys(l), s = 0; s < u.length; s++)
                                                (e[u[s]] = e[u[s]] || []),
                                                    (e[u[s]] = e[u[s]].concat(l[u[s]]))
                                        }
                                    }
                                return r
                            }
                            t.exports = function (t, e) {
                                e = e || {}
                                var r = { main: h.m },
                                    i = e.all ? { main: Object.keys(r.main) } : s(r, t),
                                    n = ''
                                return (
                                    Object.keys(i)
                                        .filter(function (t) {
                                            return 'main' !== t
                                        })
                                        .forEach(function (e) {
                                            for (var t = 0; i[e][t];) t++
                                            i[e].push(t),
                                                (r[e][t] =
                                                    '(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })'),
                                                (n =
                                                    n +
                                                    'var ' +
                                                    e +
                                                    ' = (' +
                                                    a
                                                        .toString()
                                                        .replace('ENTRY_MODULE', JSON.stringify(t)) +
                                                    ')({' +
                                                    i[e]
                                                        .map(function (t) {
                                                            return (
                                                                JSON.stringify(t) + ': ' + r[e][t].toString()
                                                            )
                                                        })
                                                        .join(',') +
                                                    '});\n')
                                        }),
                                    (n =
                                        n +
                                        'new ((' +
                                        a.toString().replace('ENTRY_MODULE', JSON.stringify(t)) +
                                        ')({' +
                                        i.main
                                            .map(function (t) {
                                                return JSON.stringify(t) + ': ' + r.main[t].toString()
                                            })
                                            .join(',') +
                                        '}))(self);'),
                                    (t = new window.Blob([n], { type: 'text/javascript' })),
                                    e.bare ||
                                    ((e = (
                                        window.URL ||
                                        window.webkitURL ||
                                        window.mozURL ||
                                        window.msURL
                                    ).createObjectURL(t)),
                                        ((t = new window.Worker(e)).objectURL = e)),
                                    t
                                )
                            }
                        },
                        './src/config.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (t = r('./src/controller/abr-controller.js'))
                            var i = r('./src/controller/buffer-controller.js'),
                                n = r('./src/controller/cap-level-controller.js'),
                                a = r('./src/controller/fps-controller.js'),
                                s = r('./src/utils/xhr-loader.js'),
                                o = r('./src/controller/audio-track-controller.js'),
                                l = r('./src/controller/audio-stream-controller.js'),
                                u = r('./src/utils/cues.js'),
                                d = r('./src/controller/timeline-controller.js'),
                                c = r('./src/controller/subtitle-track-controller.js'),
                                f = r('./src/controller/subtitle-stream-controller.js'),
                                h = r('./src/controller/eme-controller.js')
                                ; (r = r('./src/utils/mediakeys-helper.js')),
                                    (e.hlsDefaultConfig = {
                                        autoStartLoad: !0,
                                        startPosition: -1,
                                        defaultAudioCodec: void 0,
                                        debug: !1,
                                        capLevelOnFPSDrop: !1,
                                        capLevelToPlayerSize: !1,
                                        initialLiveManifestSize: 1,
                                        maxBufferLength: 30,
                                        maxBufferSize: 6e7,
                                        maxBufferHole: 0.5,
                                        lowBufferWatchdogPeriod: 0.5,
                                        highBufferWatchdogPeriod: 3,
                                        nudgeOffset: 0.1,
                                        nudgeMaxRetry: 3,
                                        maxFragLookUpTolerance: 0.25,
                                        liveSyncDurationCount: 3,
                                        liveMaxLatencyDurationCount: 1 / 0,
                                        liveSyncDuration: void 0,
                                        liveMaxLatencyDuration: void 0,
                                        liveDurationInfinity: !1,
                                        liveBackBufferLength: 1 / 0,
                                        maxMaxBufferLength: 30,
                                        enableWorker: !0,
                                        enableSoftwareAES: !0,
                                        manifestLoadingTimeOut: 1e4,
                                        manifestLoadingMaxRetry: 1,
                                        manifestLoadingRetryDelay: 1e3,
                                        manifestLoadingMaxRetryTimeout: 64e3,
                                        startLevel: void 0,
                                        levelLoadingTimeOut: 1e4,
                                        levelLoadingMaxRetry: 4,
                                        levelLoadingRetryDelay: 1e3,
                                        levelLoadingMaxRetryTimeout: 64e3,
                                        fragLoadingTimeOut: 2e4,
                                        fragLoadingMaxRetry: 6,
                                        fragLoadingRetryDelay: 1e3,
                                        fragLoadingMaxRetryTimeout: 64e3,
                                        startFragPrefetch: !1,
                                        fpsDroppedMonitoringPeriod: 5e3,
                                        fpsDroppedMonitoringThreshold: 0.2,
                                        appendErrorMaxRetry: 3,
                                        loader: s.default,
                                        fLoader: void 0,
                                        pLoader: void 0,
                                        xhrSetup: void 0,
                                        licenseXhrSetup: void 0,
                                        abrController: t.default,
                                        bufferController: i.default,
                                        capLevelController: n.default,
                                        fpsController: a.default,
                                        stretchShortVideoTrack: !1,
                                        maxAudioFramesDrift: 1,
                                        forceKeyFrameOnDiscontinuity: !0,
                                        abrEwmaFastLive: 3,
                                        abrEwmaSlowLive: 9,
                                        abrEwmaFastVoD: 3,
                                        abrEwmaSlowVoD: 9,
                                        abrEwmaDefaultEstimate: 5e5,
                                        abrBandWidthFactor: 0.95,
                                        abrBandWidthUpFactor: 0.7,
                                        abrMaxWithRealBitrate: !1,
                                        maxStarvationDelay: 4,
                                        maxLoadingDelay: 4,
                                        minAutoBitrate: 0,
                                        emeEnabled: !1,
                                        widevineLicenseUrl: void 0,
                                        requestMediaKeySystemAccessFunc:
                                            r.requestMediaKeySystemAccess,
                                    }),
                                    (e.hlsDefaultConfig.subtitleStreamController =
                                        f.SubtitleStreamController),
                                    (e.hlsDefaultConfig.subtitleTrackController = c.default),
                                    (e.hlsDefaultConfig.timelineController = d.default),
                                    (e.hlsDefaultConfig.cueHandler = u),
                                    (e.hlsDefaultConfig.enableCEA708Captions = !0),
                                    (e.hlsDefaultConfig.enableWebVTT = !0),
                                    (e.hlsDefaultConfig.captionsTextTrack1Label = 'English'),
                                    (e.hlsDefaultConfig.captionsTextTrack1LanguageCode = 'en'),
                                    (e.hlsDefaultConfig.captionsTextTrack2Label = 'Spanish'),
                                    (e.hlsDefaultConfig.captionsTextTrack2LanguageCode = 'es'),
                                    (e.hlsDefaultConfig.audioStreamController = l.default),
                                    (e.hlsDefaultConfig.audioTrackController = o.default),
                                    (e.hlsDefaultConfig.emeController = h.default)
                        },
                        './src/controller/abr-controller.js': function (t, l, u) {
                            !function (n) {
                                var i,
                                    t =
                                        (this && this.__extends) ||
                                        ((i =
                                            Object.setPrototypeOf ||
                                            ({ __proto__: [] } instanceof Array &&
                                                function (t, e) {
                                                    t.__proto__ = e
                                                }) ||
                                            function (t, e) {
                                                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                            }),
                                            function (t, e) {
                                                function r() {
                                                    this.constructor = t
                                                }
                                                i(t, e),
                                                    (t.prototype =
                                                        null === e
                                                            ? Object.create(e)
                                                            : ((r.prototype = e.prototype), new r()))
                                            })
                                Object.defineProperty(l, '__esModule', { value: !0 })
                                var f = u('./src/events.js'),
                                    e = u('./src/event-handler.js'),
                                    h = u('./src/utils/buffer-helper.js'),
                                    r = u('./src/errors.js')
                                u('./src/utils/logger.js')
                                var a,
                                    s = u('./src/utils/ewma-bandwidth-estimator.js'),
                                    p = window.performance,
                                    t =
                                        ((a = e.default),
                                            t(o, a),
                                            (o.prototype.destroy = function () {
                                                this.clearTimer(), e.default.prototype.destroy.call(this)
                                            }),
                                            (o.prototype.onFragLoading = function (t) {
                                                var e,
                                                    r,
                                                    i = t.frag
                                                'main' !== i.type ||
                                                    (this.timer ||
                                                        ((this.fragCurrent = i),
                                                            (this.timer = setInterval(this.onCheck, 100))),
                                                        this._bwEstimator) ||
                                                    ((e = (t = this.hls).config),
                                                        (r = t.levels[i.level].details.live
                                                            ? ((i = e.abrEwmaFastLive), e.abrEwmaSlowLive)
                                                            : ((i = e.abrEwmaFastVoD), e.abrEwmaSlowVoD)),
                                                        (this._bwEstimator = new s.default(
                                                            t,
                                                            r,
                                                            i,
                                                            e.abrEwmaDefaultEstimate,
                                                        )))
                                            }),
                                            (o.prototype._abandonRulesCheck = function () {
                                                var t = this.hls,
                                                    e = t.media,
                                                    r = this.fragCurrent
                                                if (r) {
                                                    var i = r.loader,
                                                        n = t.minAutoLevel
                                                    if (!i || (i.stats && i.stats.aborted))
                                                        this.clearTimer(), (this._nextAutoLevel = -1)
                                                    else {
                                                        var a = i.stats
                                                        if (
                                                            e &&
                                                            a &&
                                                            ((!e.paused && 0 !== e.playbackRate) ||
                                                                !e.readyState) &&
                                                            r.autoLevel &&
                                                            r.level
                                                        ) {
                                                            var s = p.now() - a.trequest,
                                                                o = Math.abs(e.playbackRate)
                                                            if (s > (500 * r.duration) / o) {
                                                                var l = t.levels,
                                                                    u = Math.max(
                                                                        1,
                                                                        a.bw ? a.bw / 8 : (1e3 * a.loaded) / s,
                                                                    ),
                                                                    d = (d = l[r.level]).realBitrate
                                                                        ? Math.max(d.realBitrate, d.bitrate)
                                                                        : d.bitrate,
                                                                    c = e.currentTime
                                                                if (
                                                                    ((d =
                                                                        ((a.total ||
                                                                            Math.max(
                                                                                a.loaded,
                                                                                Math.round((r.duration * d) / 8),
                                                                            )) -
                                                                            a.loaded) /
                                                                        u),
                                                                        (e =
                                                                            (h.BufferHelper.bufferInfo(
                                                                                e,
                                                                                c,
                                                                                t.config.maxBufferHole,
                                                                            ).end -
                                                                                c) /
                                                                            o) <
                                                                        (2 * r.duration) / o && e < d)
                                                                ) {
                                                                    for (
                                                                        o = void 0, c = r.level - 1;
                                                                        n < c &&
                                                                        !(
                                                                            (o =
                                                                                (r.duration *
                                                                                    (l[c].realBitrate
                                                                                        ? Math.max(
                                                                                            l[c].realBitrate,
                                                                                            l[c].bitrate,
                                                                                        )
                                                                                        : l[c].bitrate)) /
                                                                                (6.4 * u)) < e
                                                                        );
                                                                        c--
                                                                    );
                                                                    o < d &&
                                                                        ((t.nextLoadLevel = c),
                                                                            this._bwEstimator.sample(s, a.loaded),
                                                                            i.abort(),
                                                                            this.clearTimer(),
                                                                            t.trigger(
                                                                                f.default.FRAG_LOAD_EMERGENCY_ABORTED,
                                                                                { frag: r, stats: a },
                                                                            ))
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }),
                                            (o.prototype.onFragLoaded = function (t) {
                                                var e,
                                                    r,
                                                    i = t.frag
                                                'main' === i.type &&
                                                    n.isFinite(i.sn) &&
                                                    (this.clearTimer(),
                                                        (this.lastLoadedFragLevel = i.level),
                                                        (this._nextAutoLevel = -1),
                                                        this.hls.config.abrMaxWithRealBitrate &&
                                                        ((e =
                                                            ((i = this.hls.levels[i.level]).loaded
                                                                ? i.loaded.bytes
                                                                : 0) + t.stats.loaded),
                                                            (r =
                                                                (i.loaded ? i.loaded.duration : 0) +
                                                                t.frag.duration),
                                                            (i.loaded = { bytes: e, duration: r }),
                                                            (i.realBitrate = Math.round((8 * e) / r))),
                                                        t.frag.bitrateTest &&
                                                        (((i = t.stats).tparsed = i.tbuffered = i.tload),
                                                            this.onFragBuffered(t)))
                                            }),
                                            (o.prototype.onFragBuffered = function (t) {
                                                var e,
                                                    r = t.stats
                                                    ; (t = t.frag),
                                                        !0 === r.aborted ||
                                                        'main' !== t.type ||
                                                        !n.isFinite(t.sn) ||
                                                        (t.bitrateTest && r.tload !== r.tbuffered) ||
                                                        ((e = r.tparsed - r.trequest),
                                                            this._bwEstimator.sample(e, r.loaded),
                                                            (r.bwEstimate = this._bwEstimator.getEstimate()),
                                                            (this.bitrateTestDelay = t.bitrateTest ? e / 1e3 : 0))
                                            }),
                                            (o.prototype.onError = function (t) {
                                                switch (t.details) {
                                                    case r.ErrorDetails.FRAG_LOAD_ERROR:
                                                    case r.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                                        this.clearTimer()
                                                }
                                            }),
                                            (o.prototype.clearTimer = function () {
                                                clearInterval(this.timer), (this.timer = null)
                                            }),
                                            Object.defineProperty(o.prototype, 'nextAutoLevel', {
                                                get: function () {
                                                    var t = this._nextAutoLevel,
                                                        e = this._bwEstimator
                                                    return -1 === t || (e && e.canEstimate())
                                                        ? ((e = this._nextABRAutoLevel),
                                                            (e = -1 !== t ? Math.min(t, e) : e))
                                                        : t
                                                },
                                                set: function (t) {
                                                    this._nextAutoLevel = t
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            Object.defineProperty(o.prototype, '_nextABRAutoLevel', {
                                                get: function () {
                                                    var t = (a = this.hls).maxAutoLevel,
                                                        e = a.levels,
                                                        r = a.config,
                                                        i = a.minAutoLevel,
                                                        n = a.media,
                                                        a = this.lastLoadedFragLevel,
                                                        s = this.fragCurrent ? this.fragCurrent.duration : 0,
                                                        o = n ? n.currentTime : 0,
                                                        l =
                                                            n && 0 !== n.playbackRate
                                                                ? Math.abs(n.playbackRate)
                                                                : 1,
                                                        u = this._bwEstimator
                                                            ? this._bwEstimator.getEstimate()
                                                            : r.abrEwmaDefaultEstimate,
                                                        n =
                                                            (h.BufferHelper.bufferInfo(n, o, r.maxBufferHole)
                                                                .end -
                                                                o) /
                                                            l
                                                    if (
                                                        0 <=
                                                        (o = this._findBestLevel(
                                                            a,
                                                            s,
                                                            u,
                                                            i,
                                                            t,
                                                            n,
                                                            r.abrBandWidthFactor,
                                                            r.abrBandWidthUpFactor,
                                                            e,
                                                        ))
                                                    )
                                                        return o
                                                    o = s
                                                        ? Math.min(s, r.maxStarvationDelay)
                                                        : r.maxStarvationDelay
                                                    var d,
                                                        l = r.abrBandWidthFactor,
                                                        c = r.abrBandWidthUpFactor
                                                    return (
                                                        0 !== n ||
                                                        ((d = this.bitrateTestDelay) &&
                                                            ((o =
                                                                (s
                                                                    ? Math.min(s, r.maxLoadingDelay)
                                                                    : r.maxLoadingDelay) - d),
                                                                (l = c = 1))),
                                                        (o = this._findBestLevel(
                                                            a,
                                                            s,
                                                            u,
                                                            i,
                                                            t,
                                                            n + o,
                                                            l,
                                                            c,
                                                            e,
                                                        )),
                                                        Math.max(o, 0)
                                                    )
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            (o.prototype._findBestLevel = function (
                                                t,
                                                e,
                                                r,
                                                i,
                                                n,
                                                a,
                                                s,
                                                o,
                                                l,
                                            ) {
                                                for (; i <= n; n--)
                                                    if ((u = l[n])) {
                                                        var u = (d = u.details)
                                                            ? d.totalduration / d.fragments.length
                                                            : e,
                                                            d = !!d && d.live,
                                                            c = n <= t ? s * r : o * r,
                                                            f = l[n].realBitrate
                                                                ? Math.max(l[n].realBitrate, l[n].bitrate)
                                                                : l[n].bitrate
                                                        if (
                                                            ((u = (f * u) / c),
                                                                f < c &&
                                                                (!u || (d && !this.bitrateTestDelay) || u < a))
                                                        )
                                                            return n
                                                    }
                                                return -1
                                            }),
                                            o)
                                function o(t) {
                                    var e =
                                        a.call(
                                            this,
                                            t,
                                            f.default.FRAG_LOADING,
                                            f.default.FRAG_LOADED,
                                            f.default.FRAG_BUFFERED,
                                            f.default.ERROR,
                                        ) || this
                                    return (
                                        (e.lastLoadedFragLevel = 0),
                                        (e._nextAutoLevel = -1),
                                        (e.hls = t),
                                        (e.timer = null),
                                        (e._bwEstimator = null),
                                        (e.onCheck = e._abandonRulesCheck.bind(e)),
                                        e
                                    )
                                }
                                l.default = t
                            }.call(this, u('./src/polyfills/number.js').Number)
                        },
                        './src/controller/audio-stream-controller.js': function (t, r, a) {
                            !function (p) {
                                var i,
                                    t =
                                        (this && this.__extends) ||
                                        ((i =
                                            Object.setPrototypeOf ||
                                            ({ __proto__: [] } instanceof Array &&
                                                function (t, e) {
                                                    t.__proto__ = e
                                                }) ||
                                            function (t, e) {
                                                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                            }),
                                            function (t, e) {
                                                function r() {
                                                    this.constructor = t
                                                }
                                                i(t, e),
                                                    (t.prototype =
                                                        null === e
                                                            ? Object.create(e)
                                                            : ((r.prototype = e.prototype), new r()))
                                            })
                                Object.defineProperty(r, '__esModule', { value: !0 })
                                var g = a('./src/utils/binary-search.js'),
                                    y = a('./src/utils/buffer-helper.js'),
                                    l = a('./src/demux/demuxer.js'),
                                    m = a('./src/events.js'),
                                    o = a('./src/controller/level-helper.js')
                                a('./src/utils/time-ranges.js')
                                var u = a('./src/errors.js')
                                a('./src/utils/logger.js')
                                var n,
                                    v = a('./src/utils/discontinuities.js'),
                                    _ = a('./src/controller/fragment-tracker.js'),
                                    d = a('./src/loader/fragment.js'),
                                    E = a('./src/controller/base-stream-controller.js'),
                                    T = window.performance,
                                    t =
                                        ((n = E.default),
                                            t(e, n),
                                            (e.prototype.onInitPtsFound = function (t) {
                                                var e = t.frag.cc,
                                                    r = t.initPTS
                                                'main' === t.id &&
                                                    ((this.initPTS[e] = r),
                                                        (this.videoTrackCC = e),
                                                        this.state === E.State.WAITING_INIT_PTS && this.tick())
                                            }),
                                            (e.prototype.startLoad = function (t) {
                                                var e
                                                this.tracks
                                                    ? ((e = this.lastCurrentTime),
                                                        this.stopLoad(),
                                                        this.setInterval(100),
                                                        (this.fragLoadError = 0) < e && -1 === t
                                                            ? (this.state = E.State.IDLE)
                                                            : ((this.lastCurrentTime = this.startPosition || t),
                                                                (this.state = E.State.STARTING)),
                                                        (this.nextLoadPosition = this.startPosition = this.lastCurrentTime),
                                                        this.tick())
                                                    : ((this.startPosition = t),
                                                        (this.state = E.State.STOPPED))
                                            }),
                                            Object.defineProperty(e.prototype, 'state', {
                                                get: function () {
                                                    return this._state
                                                },
                                                set: function (t) {
                                                    this.state !== t && (this._state = t)
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            (e.prototype.doTick = function () {
                                                var t = this.hls,
                                                    e = t.config
                                                switch (this.state) {
                                                    case E.State.STARTING:
                                                        ; (this.state = E.State.WAITING_TRACK),
                                                            (this.loadedmetadata = !1)
                                                        break
                                                    case E.State.IDLE:
                                                        var r = this.tracks
                                                        if (!r) break
                                                        if (
                                                            !this.media &&
                                                            (this.startFragRequested || !e.startFragPrefetch)
                                                        )
                                                            break
                                                        if (this.loadedmetadata)
                                                            var i = this.media.currentTime
                                                        else if (void 0 === (i = this.nextLoadPosition)) break
                                                        var n = this.mediaBuffer || this.media,
                                                            a = this.videoBuffer || this.media,
                                                            s = y.BufferHelper.bufferInfo(
                                                                n,
                                                                i,
                                                                e.maxBufferHole,
                                                            ),
                                                            o = y.BufferHelper.bufferInfo(
                                                                a,
                                                                i,
                                                                e.maxBufferHole,
                                                            ),
                                                            l = s.end,
                                                            n = this.fragPrevious,
                                                            a = this.audioSwitch,
                                                            u = this.trackId
                                                        if (
                                                            (s.len <
                                                                Math.max(
                                                                    Math.min(
                                                                        e.maxBufferLength,
                                                                        e.maxMaxBufferLength,
                                                                    ),
                                                                    o.len,
                                                                ) ||
                                                                a) &&
                                                            u < r.length
                                                        )
                                                            if (void 0 === (r = r[u].details))
                                                                this.state = E.State.WAITING_TRACK
                                                            else if (!a && this._streamEnded(s, r))
                                                                this.hls.trigger(m.default.BUFFER_EOS, {
                                                                    type: 'audio',
                                                                }),
                                                                    (this.state = E.State.ENDED)
                                                            else {
                                                                var u = (o = r.fragments).length,
                                                                    d = o[0].start,
                                                                    c = o[u - 1].start + o[u - 1].duration,
                                                                    f = void 0
                                                                if (a)
                                                                    if (r.live && !r.PTSKnown) l = 0
                                                                    else if (((l = i), r.PTSKnown && i < d)) {
                                                                        if (!(s.end > d || s.nextStart)) break
                                                                        this.media.currentTime = d + 0.05
                                                                    }
                                                                if (r.initSegment && !r.initSegment.data)
                                                                    f = r.initSegment
                                                                else if (l <= d) {
                                                                    if (
                                                                        ((f = o[0]),
                                                                            null !== this.videoTrackCC &&
                                                                            f.cc !== this.videoTrackCC &&
                                                                            (f = v.findFragWithCC(
                                                                                o,
                                                                                this.videoTrackCC,
                                                                            )),
                                                                            r.live &&
                                                                            f.loadIdx &&
                                                                            f.loadIdx === this.fragLoadIdx)
                                                                    ) {
                                                                        this.media.currentTime =
                                                                            (s.nextStart || d) + 0.05
                                                                        break
                                                                    }
                                                                } else {
                                                                    var i = void 0,
                                                                        h = e.maxFragLookUpTolerance,
                                                                        e = n ? o[n.sn - o[0].sn + 1] : void 0
                                                                        ; (i = function (t) {
                                                                            var e = Math.min(h, t.duration)
                                                                            return t.start + t.duration - e <= l
                                                                                ? 1
                                                                                : t.start - e > l && t.start
                                                                                    ? -1
                                                                                    : 0
                                                                        }),
                                                                            (i =
                                                                                l < c
                                                                                    ? (c - h < l && (h = 0),
                                                                                        e && !i(e) ? e : g.default.search(o, i))
                                                                                    : o[u - 1]) &&
                                                                            ((d = (f = i).start),
                                                                                n &&
                                                                                f.level === n.level &&
                                                                                f.sn === n.sn &&
                                                                                (f =
                                                                                    f.sn < r.endSN
                                                                                        ? o[f.sn + 1 - r.startSN]
                                                                                        : null))
                                                                }
                                                                f &&
                                                                    (f.encrypted
                                                                        ? ((this.state = E.State.KEY_LOADING),
                                                                            t.trigger(m.default.KEY_LOADING, {
                                                                                frag: f,
                                                                            }))
                                                                        : ((this.fragCurrent = f),
                                                                            (!a &&
                                                                                this.fragmentTracker.getState(f) !==
                                                                                _.FragmentState.NOT_LOADED) ||
                                                                            ((this.startFragRequested = !0),
                                                                                p.isFinite(f.sn) &&
                                                                                (this.nextLoadPosition =
                                                                                    f.start + f.duration),
                                                                                t.trigger(m.default.FRAG_LOADING, {
                                                                                    frag: f,
                                                                                }),
                                                                                (this.state = E.State.FRAG_LOADING))))
                                                            }
                                                        break
                                                    case E.State.WAITING_TRACK:
                                                        ; (t = this.tracks[this.trackId]) &&
                                                            t.details &&
                                                            (this.state = E.State.IDLE)
                                                        break
                                                    case E.State.FRAG_LOADING_WAITING_RETRY:
                                                        ; (t = T.now()),
                                                            (e = this.retryDate),
                                                            (n = (n = this.media) && n.seeking),
                                                            (!e || e <= t || n) && (this.state = E.State.IDLE)
                                                        break
                                                    case E.State.WAITING_INIT_PTS:
                                                        ; (t = this.videoTrackCC),
                                                            void 0 !== this.initPTS[t] &&
                                                            ((e = this.waitingFragment)
                                                                ? t !== e.frag.cc
                                                                    ? (t = this.tracks[this.trackId]).details &&
                                                                    t.details.live &&
                                                                    ((this.waitingFragment = null),
                                                                        (this.state = E.State.IDLE))
                                                                    : ((this.state = E.State.FRAG_LOADING),
                                                                        this.onFragLoaded(this.waitingFragment),
                                                                        (this.waitingFragment = null))
                                                                : (this.state = E.State.IDLE))
                                                }
                                            }),
                                            (e.prototype.onMediaAttached = function (t) {
                                                ; (t = this.media = this.mediaBuffer = t.media),
                                                    (this.onvseeking = this.onMediaSeeking.bind(this)),
                                                    (this.onvended = this.onMediaEnded.bind(this)),
                                                    t.addEventListener('seeking', this.onvseeking),
                                                    t.addEventListener('ended', this.onvended),
                                                    (t = this.config),
                                                    this.tracks &&
                                                    t.autoStartLoad &&
                                                    this.startLoad(t.startPosition)
                                            }),
                                            (e.prototype.onMediaDetaching = function () {
                                                var t = this.media
                                                t &&
                                                    t.ended &&
                                                    (this.startPosition = this.lastCurrentTime = 0),
                                                    t &&
                                                    (t.removeEventListener('seeking', this.onvseeking),
                                                        t.removeEventListener('ended', this.onvended),
                                                        (this.onvseeking = this.onvseeked = this.onvended = null)),
                                                    (this.media = this.mediaBuffer = this.videoBuffer = null),
                                                    (this.loadedmetadata = !1),
                                                    this.stopLoad()
                                            }),
                                            (e.prototype.onAudioTracksUpdated = function (t) {
                                                this.tracks = t.audioTracks
                                            }),
                                            (e.prototype.onAudioTrackSwitching = function (t) {
                                                var e = !!t.url
                                                    ; (this.trackId = t.id),
                                                        (this.fragCurrent = null),
                                                        (this.state = E.State.PAUSED),
                                                        (this.waitingFragment = null),
                                                        e
                                                            ? this.setInterval(100)
                                                            : this.demuxer &&
                                                            (this.demuxer.destroy(), (this.demuxer = null)),
                                                        e &&
                                                        ((this.audioSwitch = !0),
                                                            (this.state = E.State.IDLE)),
                                                        this.tick()
                                            }),
                                            (e.prototype.onAudioTrackLoaded = function (t) {
                                                var e,
                                                    r = t.details
                                                    ; (t = this.tracks[t.id]),
                                                        r.live && (e = t.details) && 0 < r.fragments.length
                                                            ? o.mergeDetails(e, r)
                                                            : (r.PTSKnown = !1),
                                                        (t.details = r),
                                                        this.startFragRequested ||
                                                        (-1 === this.startPosition &&
                                                            ((r = r.startTimeOffset),
                                                                p.isFinite(r)
                                                                    ? (this.startPosition = r)
                                                                    : (this.startPosition = 0)),
                                                            (this.nextLoadPosition = this.startPosition)),
                                                        this.state === E.State.WAITING_TRACK &&
                                                        (this.state = E.State.IDLE),
                                                        this.tick()
                                            }),
                                            (e.prototype.onKeyLoaded = function () {
                                                this.state === E.State.KEY_LOADING &&
                                                    ((this.state = E.State.IDLE), this.tick())
                                            }),
                                            (e.prototype.onFragLoaded = function (t) {
                                                var e,
                                                    r,
                                                    i,
                                                    n,
                                                    a,
                                                    s = this.fragCurrent,
                                                    o = t.frag
                                                this.state === E.State.FRAG_LOADING &&
                                                    s &&
                                                    'audio' === o.type &&
                                                    o.level === s.level &&
                                                    o.sn === s.sn &&
                                                    ((e = (o = (n = this.tracks[this.trackId]).details)
                                                        .totalduration),
                                                        (r = s.sn),
                                                        (i = s.cc),
                                                        (n =
                                                            this.config.defaultAudioCodec ||
                                                            n.audioCodec ||
                                                            'mp4a.40.2'),
                                                        (a = this.stats = t.stats),
                                                        'initSegment' === r
                                                            ? ((this.state = E.State.IDLE),
                                                                (a.tparsed = a.tbuffered = T.now()),
                                                                (o.initSegment.data = t.payload),
                                                                this.hls.trigger(m.default.FRAG_BUFFERED, {
                                                                    stats: a,
                                                                    frag: s,
                                                                    id: 'audio',
                                                                }),
                                                                this.tick())
                                                            : ((this.state = E.State.PARSING),
                                                                (this.appended = !1),
                                                                this.demuxer ||
                                                                (this.demuxer = new l.default(this.hls, 'audio')),
                                                                (r = this.initPTS[i]),
                                                                (i = o.initSegment ? o.initSegment.data : []),
                                                                o.initSegment || void 0 !== r
                                                                    ? ((this.pendingBuffering = !0),
                                                                        this.demuxer.push(
                                                                            t.payload,
                                                                            i,
                                                                            n,
                                                                            null,
                                                                            s,
                                                                            e,
                                                                            !1,
                                                                            r,
                                                                        ))
                                                                    : ((this.waitingFragment = t),
                                                                        (this.state = E.State.WAITING_INIT_PTS)))),
                                                    (this.fragLoadError = 0)
                                            }),
                                            (e.prototype.onFragParsingInitSegment = function (t) {
                                                var e = this.fragCurrent,
                                                    r = t.frag
                                                e &&
                                                    'audio' === t.id &&
                                                    r.sn === e.sn &&
                                                    r.level === e.level &&
                                                    this.state === E.State.PARSING &&
                                                    ((e = t.tracks).video && delete e.video,
                                                        (r = e.audio)) &&
                                                    ((r.levelCodec = r.codec),
                                                        (r.id = t.id),
                                                        this.hls.trigger(m.default.BUFFER_CODECS, e),
                                                        (t = r.initSegment) &&
                                                        ((t = {
                                                            type: 'audio',
                                                            data: t,
                                                            parent: 'audio',
                                                            content: 'initSegment',
                                                        }),
                                                            this.audioSwitch
                                                                ? (this.pendingData = [t])
                                                                : ((this.pendingBuffering = this.appended = !0),
                                                                    this.hls.trigger(m.default.BUFFER_APPENDING, t))),
                                                        this.tick())
                                            }),
                                            (e.prototype.onFragParsingData = function (e) {
                                                var t,
                                                    r,
                                                    i,
                                                    n = this,
                                                    a = this.fragCurrent,
                                                    s = e.frag
                                                a &&
                                                    'audio' === e.id &&
                                                    'audio' === e.type &&
                                                    s.sn === a.sn &&
                                                    s.level === a.level &&
                                                    this.state === E.State.PARSING &&
                                                    ((s = this.trackId),
                                                        (t = this.tracks[s]),
                                                        (r = this.hls),
                                                        p.isFinite(e.endPTS) ||
                                                        ((e.endPTS = e.startPTS + a.duration),
                                                            (e.endDTS = e.startDTS + a.duration)),
                                                        a.addElementaryStream(
                                                            d.default.ElementaryStreamTypes.AUDIO,
                                                        ),
                                                        o.updateFragPTSDTS(t.details, a, e.startPTS, e.endPTS),
                                                        (a = this.media),
                                                        (t = !1),
                                                        this.audioSwitch &&
                                                        a &&
                                                        (a.readyState
                                                            ? a.currentTime >= e.startPTS &&
                                                            ((this.state = E.State.BUFFER_FLUSHING),
                                                                r.trigger(m.default.BUFFER_FLUSHING, {
                                                                    startOffset: 0,
                                                                    endOffset: p.POSITIVE_INFINITY,
                                                                    type: 'audio',
                                                                }),
                                                                (t = !0),
                                                                (this.audioSwitch = !1),
                                                                r.trigger(m.default.AUDIO_TRACK_SWITCHED, {
                                                                    id: s,
                                                                }))
                                                            : ((this.audioSwitch = !1),
                                                                r.trigger(m.default.AUDIO_TRACK_SWITCHED, {
                                                                    id: s,
                                                                }))),
                                                        (i = this.pendingData)
                                                            ? (this.audioSwitch ||
                                                                ([e.data1, e.data2].forEach(function (t) {
                                                                    t &&
                                                                        t.length &&
                                                                        i.push({
                                                                            type: e.type,
                                                                            data: t,
                                                                            parent: 'audio',
                                                                            content: 'data',
                                                                        })
                                                                }),
                                                                    !t &&
                                                                    i.length &&
                                                                    (i.forEach(function (t) {
                                                                        n.state === E.State.PARSING &&
                                                                            ((n.pendingBuffering = !0),
                                                                                n.hls.trigger(
                                                                                    m.default.BUFFER_APPENDING,
                                                                                    t,
                                                                                ))
                                                                    }),
                                                                        (this.pendingData = []),
                                                                        (this.appended = !0))),
                                                                this.tick())
                                                            : r.trigger(m.default.ERROR, {
                                                                type: u.ErrorTypes.MEDIA_ERROR,
                                                                details: null,
                                                                fatal: !0,
                                                            }))
                                            }),
                                            (e.prototype.onFragParsed = function (t) {
                                                var e = this.fragCurrent,
                                                    r = t.frag
                                                e &&
                                                    'audio' === t.id &&
                                                    r.sn === e.sn &&
                                                    r.level === e.level &&
                                                    this.state === E.State.PARSING &&
                                                    ((this.stats.tparsed = T.now()),
                                                        (this.state = E.State.PARSED),
                                                        this._checkAppendedParsed())
                                            }),
                                            (e.prototype.onBufferReset = function () {
                                                ; (this.mediaBuffer = this.videoBuffer = null),
                                                    (this.loadedmetadata = !1)
                                            }),
                                            (e.prototype.onBufferCreated = function (t) {
                                                var e = t.tracks.audio
                                                e &&
                                                    ((this.mediaBuffer = e.buffer),
                                                        (this.loadedmetadata = !0)),
                                                    t.tracks.video &&
                                                    (this.videoBuffer = t.tracks.video.buffer)
                                            }),
                                            (e.prototype.onBufferAppended = function (t) {
                                                var e
                                                'audio' === t.parent &&
                                                    (((e = this.state) !== E.State.PARSING &&
                                                        e !== E.State.PARSED) ||
                                                        ((this.pendingBuffering = 0 < t.pending),
                                                            this._checkAppendedParsed()))
                                            }),
                                            (e.prototype._checkAppendedParsed = function () {
                                                var t, e, r
                                                this.state !== E.State.PARSED ||
                                                    (this.appended && this.pendingBuffering) ||
                                                    ((t = this.fragCurrent),
                                                        (e = this.stats),
                                                        (r = this.hls),
                                                        t &&
                                                        ((this.fragPrevious = t),
                                                            (e.tbuffered = T.now()),
                                                            r.trigger(m.default.FRAG_BUFFERED, {
                                                                stats: e,
                                                                frag: t,
                                                                id: 'audio',
                                                            }),
                                                            this.audioSwitch &&
                                                            this.appended &&
                                                            ((this.audioSwitch = !1),
                                                                r.trigger(m.default.AUDIO_TRACK_SWITCHED, {
                                                                    id: this.trackId,
                                                                })),
                                                            (this.state = E.State.IDLE)),
                                                        this.tick())
                                            }),
                                            (e.prototype.onError = function (t) {
                                                var e,
                                                    r = t.frag
                                                if (!r || 'audio' === r.type)
                                                    switch (t.details) {
                                                        case u.ErrorDetails.FRAG_LOAD_ERROR:
                                                        case u.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                                            if ((r = t.frag) && 'audio' !== r.type) break
                                                            t.fatal ||
                                                                ((r = this.fragLoadError) ? r++ : (r = 1),
                                                                    r <= (e = this.config).fragLoadingMaxRetry
                                                                        ? ((this.fragLoadError = r),
                                                                            (t = Math.min(
                                                                                Math.pow(2, r - 1) *
                                                                                e.fragLoadingRetryDelay,
                                                                                e.fragLoadingMaxRetryTimeout,
                                                                            )),
                                                                            (this.retryDate = T.now() + t),
                                                                            (this.state =
                                                                                E.State.FRAG_LOADING_WAITING_RETRY))
                                                                        : ((t.fatal = !0),
                                                                            (this.state = E.State.ERROR)))
                                                            break
                                                        case u.ErrorDetails.AUDIO_TRACK_LOAD_ERROR:
                                                        case u.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT:
                                                        case u.ErrorDetails.KEY_LOAD_ERROR:
                                                        case u.ErrorDetails.KEY_LOAD_TIMEOUT:
                                                            this.state !== E.State.ERROR &&
                                                                (this.state = t.fatal
                                                                    ? E.State.ERROR
                                                                    : E.State.IDLE)
                                                            break
                                                        case u.ErrorDetails.BUFFER_FULL_ERROR:
                                                            'audio' !== t.parent ||
                                                                (this.state !== E.State.PARSING &&
                                                                    this.state !== E.State.PARSED) ||
                                                                ((t = this.mediaBuffer),
                                                                    (r = this.media.currentTime),
                                                                    t &&
                                                                        y.BufferHelper.isBuffered(t, r) &&
                                                                        y.BufferHelper.isBuffered(t, r + 0.5)
                                                                        ? ((e = this.config).maxMaxBufferLength >=
                                                                            e.maxBufferLength &&
                                                                            (e.maxMaxBufferLength /= 2),
                                                                            (this.state = E.State.IDLE))
                                                                        : ((this.fragCurrent = null),
                                                                            (this.state = E.State.BUFFER_FLUSHING),
                                                                            this.hls.trigger(m.default.BUFFER_FLUSHING, {
                                                                                startOffset: 0,
                                                                                endOffset: p.POSITIVE_INFINITY,
                                                                                type: 'audio',
                                                                            })))
                                                    }
                                            }),
                                            (e.prototype.onBufferFlushed = function () {
                                                var e = this,
                                                    t = this.pendingData
                                                t && t.length
                                                    ? (t.forEach(function (t) {
                                                        e.hls.trigger(m.default.BUFFER_APPENDING, t)
                                                    }),
                                                        (this.appended = !0),
                                                        (this.pendingData = []),
                                                        (this.state = E.State.PARSED))
                                                    : ((this.state = E.State.IDLE),
                                                        (this.fragPrevious = null),
                                                        this.tick())
                                            }),
                                            e)
                                function e(t, e) {
                                    var r =
                                        n.call(
                                            this,
                                            t,
                                            m.default.MEDIA_ATTACHED,
                                            m.default.MEDIA_DETACHING,
                                            m.default.AUDIO_TRACKS_UPDATED,
                                            m.default.AUDIO_TRACK_SWITCHING,
                                            m.default.AUDIO_TRACK_LOADED,
                                            m.default.KEY_LOADED,
                                            m.default.FRAG_LOADED,
                                            m.default.FRAG_PARSING_INIT_SEGMENT,
                                            m.default.FRAG_PARSING_DATA,
                                            m.default.FRAG_PARSED,
                                            m.default.ERROR,
                                            m.default.BUFFER_RESET,
                                            m.default.BUFFER_CREATED,
                                            m.default.BUFFER_APPENDED,
                                            m.default.BUFFER_FLUSHED,
                                            m.default.INIT_PTS_FOUND,
                                        ) || this
                                    return (
                                        (r.fragmentTracker = e),
                                        (r.config = t.config),
                                        (r.audioCodecSwap = !1),
                                        (r._state = E.State.STOPPED),
                                        (r.initPTS = []),
                                        (r.waitingFragment = null),
                                        (r.videoTrackCC = null),
                                        r
                                    )
                                }
                                r.default = t
                            }.call(this, a('./src/polyfills/number.js').Number)
                        },
                        './src/controller/audio-track-controller.js': function (t, e, r) {
                            var i,
                                n =
                                    (this && this.__extends) ||
                                    ((i =
                                        Object.setPrototypeOf ||
                                        ({ __proto__: [] } instanceof Array &&
                                            function (t, e) {
                                                t.__proto__ = e
                                            }) ||
                                        function (t, e) {
                                            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                        }),
                                        function (t, e) {
                                            function r() {
                                                this.constructor = t
                                            }
                                            i(t, e),
                                                (t.prototype =
                                                    null === e
                                                        ? Object.create(e)
                                                        : ((r.prototype = e.prototype), new r()))
                                        })
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var a = r('./src/events.js')
                                ; (t = r('./src/task-loop.js')), r('./src/utils/logger.js')
                            var s,
                                o = r('./src/errors.js')
                            function l(t) {
                                return (
                                    ((t =
                                        s.call(
                                            this,
                                            t,
                                            a.default.MANIFEST_LOADING,
                                            a.default.MANIFEST_PARSED,
                                            a.default.AUDIO_TRACK_LOADED,
                                            a.default.AUDIO_TRACK_SWITCHED,
                                            a.default.LEVEL_LOADED,
                                            a.default.ERROR,
                                        ) || this)._trackId = -1),
                                    (t._selectDefaultTrack = !0),
                                    (t.tracks = []),
                                    (t.trackIdBlacklist = Object.create(null)),
                                    (t.audioGroupId = null),
                                    t
                                )
                            }
                            ; (s = t.default),
                                n(l, s),
                                (l.prototype.onManifestLoading = function () {
                                    ; (this.tracks = []),
                                        (this._trackId = -1),
                                        (this._selectDefaultTrack = !0)
                                }),
                                (l.prototype.onManifestParsed = function (t) {
                                    ; (t = this.tracks = t.audioTracks || []),
                                        this.hls.trigger(a.default.AUDIO_TRACKS_UPDATED, {
                                            audioTracks: t,
                                        })
                                }),
                                (l.prototype.onAudioTrackLoaded = function (t) {
                                    t.id >= this.tracks.length ||
                                        ((this.tracks[t.id].details = t.details),
                                            t.details.live &&
                                            !this.hasInterval() &&
                                            this.setInterval(1e3 * t.details.targetduration),
                                            !t.details.live &&
                                            this.hasInterval() &&
                                            this.clearInterval())
                                }),
                                (l.prototype.onAudioTrackSwitched = function (t) {
                                    ; (t = this.tracks[t.id].groupId) &&
                                        this.audioGroupId !== t &&
                                        (this.audioGroupId = t)
                                }),
                                (l.prototype.onLevelLoaded = function (t) {
                                    ; (t = this.hls.levels[t.level]).audioGroupIds &&
                                        ((t = t.audioGroupIds[t.urlId]),
                                            this.audioGroupId !== t &&
                                            ((this.audioGroupId = t),
                                                this._selectInitialAudioTrack()))
                                }),
                                (l.prototype.onError = function (t) {
                                    t.type === o.ErrorTypes.NETWORK_ERROR &&
                                        (t.fatal && this.clearInterval(),
                                            t.details === o.ErrorDetails.AUDIO_TRACK_LOAD_ERROR &&
                                            this._handleLoadError())
                                }),
                                Object.defineProperty(l.prototype, 'audioTracks', {
                                    get: function () {
                                        return this.tracks
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(l.prototype, 'audioTrack', {
                                    get: function () {
                                        return this._trackId
                                    },
                                    set: function (t) {
                                        this._setAudioTrack(t), (this._selectDefaultTrack = !1)
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                (l.prototype._setAudioTrack = function (t) {
                                    var e
                                        ; (this._trackId === t &&
                                            this.tracks[this._trackId].details) ||
                                            t < 0 ||
                                            t >= this.tracks.length ||
                                            ((e = this.tracks[t]),
                                                this.clearInterval(),
                                                (this._trackId = t),
                                                this.hls.trigger(a.default.AUDIO_TRACK_SWITCHING, {
                                                    id: e.id,
                                                    type: e.type,
                                                    url: e.url,
                                                }),
                                                this._loadTrackDetailsIfNeeded(e))
                                }),
                                (l.prototype.doTick = function () {
                                    this._updateTrack(this._trackId)
                                }),
                                (l.prototype._selectInitialAudioTrack = function () {
                                    var e,
                                        r,
                                        t,
                                        i = this,
                                        n = this.tracks
                                    n.length &&
                                        ((t = this.tracks[this._trackId]),
                                            (e = null),
                                            t && (e = t.name),
                                            !this._selectDefaultTrack ||
                                            ((t = n.filter(function (t) {
                                                return t.default
                                            })).length &&
                                                (n = t)),
                                            (r = !1),
                                            (t = function () {
                                                n.forEach(function (t) {
                                                    r ||
                                                        (i.audioGroupId && t.groupId !== i.audioGroupId) ||
                                                        (e && e !== t.name) ||
                                                        (i._setAudioTrack(t.id), (r = !0))
                                                })
                                            })(),
                                            r || ((e = null), t()),
                                            r ||
                                            this.hls.trigger(a.default.ERROR, {
                                                type: o.ErrorTypes.MEDIA_ERROR,
                                                details: o.ErrorDetails.AUDIO_TRACK_LOAD_ERROR,
                                                fatal: !0,
                                            }))
                                }),
                                (l.prototype._needsTrackLoading = function (t) {
                                    var e = t.details
                                    return (t = t.url), !(e && !e.live) && !!t
                                }),
                                (l.prototype._loadTrackDetailsIfNeeded = function (t) {
                                    this._needsTrackLoading(t) &&
                                        this.hls.trigger(a.default.AUDIO_TRACK_LOADING, {
                                            url: t.url,
                                            id: t.id,
                                        })
                                }),
                                (l.prototype._updateTrack = function (t) {
                                    t < 0 ||
                                        t >= this.tracks.length ||
                                        (this.clearInterval(),
                                            (this._trackId = t),
                                            this._loadTrackDetailsIfNeeded(this.tracks[t]))
                                }),
                                (l.prototype._handleLoadError = function () {
                                    this.trackIdBlacklist[this._trackId] = !0
                                    for (
                                        var t = this._trackId,
                                        e = this.tracks[t].name,
                                        r = t,
                                        i = 0;
                                        i < this.tracks.length;
                                        i++
                                    )
                                        if (
                                            !this.trackIdBlacklist[i] &&
                                            this.tracks[i].name === e
                                        ) {
                                            r = i
                                            break
                                        }
                                    r !== t && this._setAudioTrack(r)
                                }),
                                (r = l),
                                (e.default = r)
                        },
                        './src/controller/base-stream-controller.js': function (t, l, u) {
                            !function (a) {
                                var i,
                                    t =
                                        (this && this.__extends) ||
                                        ((i =
                                            Object.setPrototypeOf ||
                                            ({ __proto__: [] } instanceof Array &&
                                                function (t, e) {
                                                    t.__proto__ = e
                                                }) ||
                                            function (t, e) {
                                                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                            }),
                                            function (t, e) {
                                                function r() {
                                                    this.constructor = t
                                                }
                                                i(t, e),
                                                    (t.prototype =
                                                        null === e
                                                            ? Object.create(e)
                                                            : ((r.prototype = e.prototype), new r()))
                                            })
                                Object.defineProperty(l, '__esModule', { value: !0 })
                                var e,
                                    r = u('./src/task-loop.js'),
                                    n = u('./src/controller/fragment-tracker.js'),
                                    s = u('./src/utils/buffer-helper.js')
                                function o() {
                                    return (null !== e && e.apply(this, arguments)) || this
                                }
                                u('./src/utils/logger.js'),
                                    (l.State = {
                                        STOPPED: 'STOPPED',
                                        STARTING: 'STARTING',
                                        IDLE: 'IDLE',
                                        PAUSED: 'PAUSED',
                                        KEY_LOADING: 'KEY_LOADING',
                                        FRAG_LOADING: 'FRAG_LOADING',
                                        FRAG_LOADING_WAITING_RETRY: 'FRAG_LOADING_WAITING_RETRY',
                                        WAITING_TRACK: 'WAITING_TRACK',
                                        PARSING: 'PARSING',
                                        PARSED: 'PARSED',
                                        BUFFER_FLUSHING: 'BUFFER_FLUSHING',
                                        ENDED: 'ENDED',
                                        ERROR: 'ERROR',
                                        WAITING_INIT_PTS: 'WAITING_INIT_PTS',
                                        WAITING_LEVEL: 'WAITING_LEVEL',
                                    }),
                                    (e = r.default),
                                    t(o, e),
                                    (o.prototype.doTick = function () { }),
                                    (o.prototype.startLoad = function () { }),
                                    (o.prototype.stopLoad = function () {
                                        var t = this.fragCurrent
                                        t &&
                                            (t.loader && t.loader.abort(),
                                                this.fragmentTracker.removeFragment(t)),
                                            this.demuxer &&
                                            (this.demuxer.destroy(), (this.demuxer = null)),
                                            (this.fragPrevious = this.fragCurrent = null),
                                            this.clearInterval(),
                                            this.clearNextTick(),
                                            (this.state = l.State.STOPPED)
                                    }),
                                    (o.prototype._streamEnded = function (t, e) {
                                        var r = this.fragCurrent,
                                            i = this.fragmentTracker
                                        return (
                                            !(
                                                e.live ||
                                                !r ||
                                                r.backtracked ||
                                                r.sn !== e.endSN ||
                                                t.nextStart
                                            ) &&
                                            ((t = i.getState(r)) === n.FragmentState.PARTIAL ||
                                                t === n.FragmentState.OK)
                                        )
                                    }),
                                    (o.prototype.onMediaSeeking = function () {
                                        var t = this.config,
                                            e = this.media,
                                            r = this.state,
                                            i = e ? e.currentTime : null,
                                            n = s.BufferHelper.bufferInfo(
                                                this.mediaBuffer || e,
                                                i,
                                                this.config.maxBufferHole,
                                            )
                                        a.isFinite(i),
                                            r === l.State.FRAG_LOADING
                                                ? ((r = this.fragCurrent),
                                                    0 === n.len &&
                                                    r &&
                                                    ((t = t.maxFragLookUpTolerance),
                                                        (n = r.start + r.duration + t),
                                                        i < r.start - t || n < i) &&
                                                    (r.loader && r.loader.abort(),
                                                        (this.fragPrevious = this.fragCurrent = null),
                                                        (this.state = l.State.IDLE)))
                                                : r === l.State.ENDED &&
                                                (0 === n.len &&
                                                    (this.fragCurrent = this.fragPrevious = null),
                                                    (this.state = l.State.IDLE)),
                                            e && (this.lastCurrentTime = i),
                                            this.loadedmetadata ||
                                            (this.nextLoadPosition = this.startPosition = i),
                                            this.tick()
                                    }),
                                    (o.prototype.onMediaEnded = function () {
                                        this.startPosition = this.lastCurrentTime = 0
                                    }),
                                    (o.prototype.onHandlerDestroying = function () {
                                        this.stopLoad(), e.prototype.onHandlerDestroying.call(this)
                                    }),
                                    (o.prototype.onHandlerDestroyed = function () {
                                        ; (this.state = l.State.STOPPED),
                                            (this.fragmentTracker = null)
                                    }),
                                    (r = o),
                                    (l.default = r)
                            }.call(this, u('./src/polyfills/number.js').Number)
                        },
                        './src/controller/buffer-controller.js': function (t, o, d) {
                            !function (r) {
                                var i,
                                    t =
                                        (this && this.__extends) ||
                                        ((i =
                                            Object.setPrototypeOf ||
                                            ({ __proto__: [] } instanceof Array &&
                                                function (t, e) {
                                                    t.__proto__ = e
                                                }) ||
                                            function (t, e) {
                                                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                            }),
                                            function (t, e) {
                                                function r() {
                                                    this.constructor = t
                                                }
                                                i(t, e),
                                                    (t.prototype =
                                                        null === e
                                                            ? Object.create(e)
                                                            : ((r.prototype = e.prototype), new r()))
                                            })
                                Object.defineProperty(o, '__esModule', { value: !0 })
                                var l = d('./src/events.js'),
                                    e = d('./src/event-handler.js')
                                d('./src/utils/logger.js')
                                var n,
                                    u = d('./src/errors.js'),
                                    a = d('./src/utils/mediasource-helper.js').getMediaSource(),
                                    t =
                                        ((n = e.default),
                                            t(s, n),
                                            (s.prototype.destroy = function () {
                                                e.default.prototype.destroy.call(this)
                                            }),
                                            (s.prototype.onLevelPtsUpdated = function (t) {
                                                var e = this.tracks.audio
                                                if (
                                                    'audio' === t.type &&
                                                    e &&
                                                    'audio/mpeg' === e.container &&
                                                    ((e = this.sourceBuffer.audio),
                                                        0.1 < Math.abs(e.timestampOffset - t.start))
                                                ) {
                                                    var r = e.updating
                                                    try {
                                                        e.abort()
                                                    } catch (t) { }
                                                    r
                                                        ? (this.audioTimestampOffset = t.start)
                                                        : (e.timestampOffset = t.start)
                                                }
                                            }),
                                            (s.prototype.onManifestParsed = function (t) {
                                                this.bufferCodecEventsExpected = t.altAudio ? 2 : 1
                                            }),
                                            (s.prototype.onMediaAttaching = function (t) {
                                                var e
                                                    ; (t = this.media = t.media) &&
                                                        ((e = this.mediaSource = new a()),
                                                            (this.onmso = this.onMediaSourceOpen.bind(this)),
                                                            (this.onmse = this.onMediaSourceEnded.bind(this)),
                                                            (this.onmsc = this.onMediaSourceClose.bind(this)),
                                                            e.addEventListener('sourceopen', this.onmso),
                                                            e.addEventListener('sourceended', this.onmse),
                                                            e.addEventListener('sourceclose', this.onmsc),
                                                            (t.src = window.URL.createObjectURL(e)),
                                                            (this._objectUrl = t.src))
                                            }),
                                            (s.prototype.onMediaDetaching = function () {
                                                var t = this.mediaSource
                                                if (t) {
                                                    if ('open' === t.readyState)
                                                        try {
                                                            t.endOfStream()
                                                        } catch (t) { }
                                                    t.removeEventListener('sourceopen', this.onmso),
                                                        t.removeEventListener('sourceended', this.onmse),
                                                        t.removeEventListener('sourceclose', this.onmsc),
                                                        this.media &&
                                                        (window.URL.revokeObjectURL(this._objectUrl),
                                                            this.media.src === this._objectUrl &&
                                                            (this.media.removeAttribute('src'),
                                                                this.media.load())),
                                                        (this._objectUrl = this.media = this.mediaSource = null),
                                                        (this.pendingTracks = {}),
                                                        (this.tracks = {}),
                                                        (this.sourceBuffer = {}),
                                                        (this.flushRange = []),
                                                        (this.segments = []),
                                                        (this.appended = 0)
                                                }
                                                ; (this.onmso = this.onmse = this.onmsc = null),
                                                    this.hls.trigger(l.default.MEDIA_DETACHED)
                                            }),
                                            (s.prototype.onMediaSourceOpen = function () {
                                                this.hls.trigger(l.default.MEDIA_ATTACHED, {
                                                    media: this.media,
                                                })
                                                var t = this.mediaSource
                                                t && t.removeEventListener('sourceopen', this.onmso),
                                                    this.checkPendingTracks()
                                            }),
                                            (s.prototype.checkPendingTracks = function () {
                                                var t = this.bufferCodecEventsExpected,
                                                    e = this.pendingTracks,
                                                    r = Object.keys(e).length
                                                    ; ((r && !t) || 2 === r) &&
                                                        (this.createSourceBuffers(e),
                                                            (this.pendingTracks = {}),
                                                            this.doAppending())
                                            }),
                                            (s.prototype.onMediaSourceClose = function () { }),
                                            (s.prototype.onMediaSourceEnded = function () { }),
                                            (s.prototype.onSBUpdateEnd = function () {
                                                this.audioTimestampOffset &&
                                                    ((this.sourceBuffer.audio.timestampOffset = this.audioTimestampOffset),
                                                        delete this.audioTimestampOffset),
                                                    this._needsFlush && this.doFlush(),
                                                    this._needsEos && this.checkEos(),
                                                    (this.appending = !1)
                                                var t,
                                                    r = this.parent,
                                                    e = this.segments.reduce(function (t, e) {
                                                        return e.parent === r ? t + 1 : t
                                                    }, 0),
                                                    i = {},
                                                    n = this.sourceBuffer
                                                for (t in n) i[t] = n[t].buffered
                                                this.hls.trigger(l.default.BUFFER_APPENDED, {
                                                    parent: r,
                                                    pending: e,
                                                    timeRanges: i,
                                                }),
                                                    this._needsFlush || this.doAppending(),
                                                    this.updateMediaElementDuration(),
                                                    0 === e && this.flushLiveBackBuffer()
                                            }),
                                            (s.prototype.onSBUpdateError = function (t) {
                                                this.hls.trigger(l.default.ERROR, {
                                                    type: u.ErrorTypes.MEDIA_ERROR,
                                                    details: u.ErrorDetails.BUFFER_APPENDING_ERROR,
                                                    fatal: !1,
                                                })
                                            }),
                                            (s.prototype.onBufferReset = function () {
                                                var t,
                                                    e = this.sourceBuffer
                                                for (t in e) {
                                                    var r = e[t]
                                                    try {
                                                        this.mediaSource.removeSourceBuffer(r),
                                                            r.removeEventListener('updateend', this.onsbue),
                                                            r.removeEventListener('error', this.onsbe)
                                                    } catch (t) { }
                                                }
                                                ; (this.sourceBuffer = {}),
                                                    (this.flushRange = []),
                                                    (this.segments = []),
                                                    (this.appended = 0)
                                            }),
                                            (s.prototype.onBufferCodecs = function (e) {
                                                var t,
                                                    r = this
                                                Object.keys(this.sourceBuffer).length ||
                                                    (Object.keys(e).forEach(function (t) {
                                                        r.pendingTracks[t] = e[t]
                                                    }),
                                                        (t = this.mediaSource),
                                                        (this.bufferCodecEventsExpected = Math.max(
                                                            this.bufferCodecEventsExpected - 1,
                                                            0,
                                                        )),
                                                        t &&
                                                        'open' === t.readyState &&
                                                        this.checkPendingTracks())
                                            }),
                                            (s.prototype.createSourceBuffers = function (t) {
                                                var e,
                                                    r = this.sourceBuffer,
                                                    i = this.mediaSource
                                                for (e in t)
                                                    if (!r[e]) {
                                                        var n = t[e],
                                                            a = n.levelCodec || n.codec,
                                                            s = n.container + ';codecs=' + a
                                                        try {
                                                            var o = (r[e] = i.addSourceBuffer(s))
                                                            o.addEventListener('updateend', this.onsbue),
                                                                o.addEventListener('error', this.onsbe),
                                                                (this.tracks[e] = {
                                                                    codec: a,
                                                                    container: n.container,
                                                                }),
                                                                (n.buffer = o)
                                                        } catch (t) {
                                                            this.hls.trigger(l.default.ERROR, {
                                                                type: u.ErrorTypes.MEDIA_ERROR,
                                                                details: u.ErrorDetails.BUFFER_ADD_CODEC_ERROR,
                                                                fatal: !1,
                                                                err: t,
                                                                mimeType: s,
                                                            })
                                                        }
                                                    }
                                                this.hls.trigger(l.default.BUFFER_CREATED, { tracks: t })
                                            }),
                                            (s.prototype.onBufferAppending = function (t) {
                                                this._needsFlush ||
                                                    (this.segments
                                                        ? this.segments.push(t)
                                                        : (this.segments = [t]),
                                                        this.doAppending())
                                            }),
                                            (s.prototype.onBufferAppendFail = function (t) {
                                                this.hls.trigger(l.default.ERROR, {
                                                    type: u.ErrorTypes.MEDIA_ERROR,
                                                    details: u.ErrorDetails.BUFFER_APPENDING_ERROR,
                                                    fatal: !1,
                                                })
                                            }),
                                            (s.prototype.onBufferEos = function (t) {
                                                var e,
                                                    r = this.sourceBuffer
                                                for (e in ((t = t.type), r))
                                                    (t && e !== t) || r[e].ended || (r[e].ended = !0)
                                                this.checkEos()
                                            }),
                                            (s.prototype.checkEos = function () {
                                                var t = this.sourceBuffer,
                                                    e = this.mediaSource
                                                if (e && 'open' === e.readyState) {
                                                    for (var r in t) {
                                                        r = t[r]
                                                        if (!r.ended) return
                                                        if (r.updating) return void (this._needsEos = !0)
                                                    }
                                                    try {
                                                        e.endOfStream()
                                                    } catch (t) { }
                                                }
                                                this._needsEos = !1
                                            }),
                                            (s.prototype.onBufferFlushing = function (t) {
                                                this.flushRange.push({
                                                    start: t.startOffset,
                                                    end: t.endOffset,
                                                    type: t.type,
                                                }),
                                                    (this.flushBufferCounter = 0),
                                                    this.doFlush()
                                            }),
                                            (s.prototype.flushLiveBackBuffer = function () {
                                                if (this._live) {
                                                    var t = this.hls.config.liveBackBufferLength
                                                    if (isFinite(t) && !(t < 0))
                                                        for (
                                                            var e = this.media.currentTime,
                                                            r = this.sourceBuffer,
                                                            i = Object.keys(r),
                                                            t = e - Math.max(t, this._levelTargetDuration),
                                                            e = i.length - 1;
                                                            0 <= e;
                                                            e--
                                                        ) {
                                                            var n = i[e],
                                                                a = r[n].buffered
                                                            0 < a.length &&
                                                                t > a.start(0) &&
                                                                this.removeBufferRange(n, r[n], 0, t)
                                                        }
                                                }
                                            }),
                                            (s.prototype.onLevelUpdated = function (t) {
                                                0 < (t = t.details).fragments.length &&
                                                    ((this._levelDuration =
                                                        t.totalduration + t.fragments[0].start),
                                                        (this._levelTargetDuration =
                                                            t.averagetargetduration || t.targetduration || 10),
                                                        (this._live = t.live),
                                                        this.updateMediaElementDuration())
                                            }),
                                            (s.prototype.updateMediaElementDuration = function () {
                                                var t = this.hls.config
                                                if (
                                                    null !== this._levelDuration &&
                                                    this.media &&
                                                    this.mediaSource &&
                                                    this.sourceBuffer &&
                                                    0 !== this.media.readyState &&
                                                    'open' === this.mediaSource.readyState
                                                ) {
                                                    for (e in this.sourceBuffer)
                                                        if (!0 === this.sourceBuffer[e].updating) return
                                                    var e = this.media.duration
                                                    null === this._msDuration &&
                                                        (this._msDuration = this.mediaSource.duration),
                                                        !0 === this._live && !0 === t.liveDurationInfinity
                                                            ? (this._msDuration = this.mediaSource.duration =
                                                                1 / 0)
                                                            : ((this._levelDuration > this._msDuration &&
                                                                this._levelDuration > e) ||
                                                                !r.isFinite(e)) &&
                                                            (this._msDuration = this.mediaSource.duration = this._levelDuration)
                                                }
                                            }),
                                            (s.prototype.doFlush = function () {
                                                for (; this.flushRange.length;) {
                                                    var t = this.flushRange[0]
                                                    if (!this.flushBuffer(t.start, t.end, t.type))
                                                        return void (this._needsFlush = !0)
                                                    this.flushRange.shift(), (this.flushBufferCounter = 0)
                                                }
                                                if (0 === this.flushRange.length) {
                                                    this._needsFlush = !1
                                                    var t = 0,
                                                        e = this.sourceBuffer
                                                    try {
                                                        for (var r in e) t += e[r].buffered.length
                                                    } catch (t) { }
                                                    ; (this.appended = t),
                                                        this.hls.trigger(l.default.BUFFER_FLUSHED)
                                                }
                                            }),
                                            (s.prototype.doAppending = function () {
                                                var e = this.hls,
                                                    r = this.segments,
                                                    t = this.sourceBuffer
                                                if (Object.keys(t).length)
                                                    if (this.media.error) this.segments = []
                                                    else if (!this.appending && r && r.length) {
                                                        var i = r.shift()
                                                        try {
                                                            var n = t[i.type]
                                                            n
                                                                ? n.updating
                                                                    ? r.unshift(i)
                                                                    : ((n.ended = !1),
                                                                        (this.parent = i.parent),
                                                                        n.appendBuffer(i.data),
                                                                        (this.appendError = 0),
                                                                        this.appended++,
                                                                        (this.appending = !0))
                                                                : this.onSBUpdateEnd()
                                                        } catch (t) {
                                                            r.unshift(i),
                                                                (r = {
                                                                    type: u.ErrorTypes.MEDIA_ERROR,
                                                                    parent: i.parent,
                                                                }),
                                                                22 !== t.code
                                                                    ? (this.appendError
                                                                        ? this.appendError++
                                                                        : (this.appendError = 1),
                                                                        (r.details =
                                                                            u.ErrorDetails.BUFFER_APPEND_ERROR),
                                                                        this.appendError >
                                                                            e.config.appendErrorMaxRetry
                                                                            ? ((this.segments = []), (r.fatal = !0))
                                                                            : (r.fatal = !1))
                                                                    : ((this.segments = []),
                                                                        (r.details =
                                                                            u.ErrorDetails.BUFFER_FULL_ERROR),
                                                                        (r.fatal = !1)),
                                                                e.trigger(l.default.ERROR, r)
                                                        }
                                                    }
                                            }),
                                            (s.prototype.flushBuffer = function (t, e, r) {
                                                var i = this.sourceBuffer
                                                if (
                                                    Object.keys(i).length &&
                                                    this.flushBufferCounter < this.appended
                                                )
                                                    for (var n in i)
                                                        if (!r || n === r) {
                                                            var a = i[n]
                                                            if (((a.ended = !1), a.updating)) return !1
                                                            if (this.removeBufferRange(n, a, t, e))
                                                                return this.flushBufferCounter++, !1
                                                        }
                                                return !0
                                            }),
                                            (s.prototype.removeBufferRange = function (t, e, r, i) {
                                                try {
                                                    for (t = 0; t < e.buffered.length; t++) {
                                                        var n = e.buffered.start(t),
                                                            a = e.buffered.end(t),
                                                            s = Math.max(n, r),
                                                            n = Math.min(a, i)
                                                        if (0.5 < Math.min(n, a) - s)
                                                            return e.remove(s, n), !0
                                                    }
                                                } catch (t) { }
                                                return !1
                                            }),
                                            s)
                                function s(t) {
                                    return (
                                        ((t =
                                            n.call(
                                                this,
                                                t,
                                                l.default.MEDIA_ATTACHING,
                                                l.default.MEDIA_DETACHING,
                                                l.default.MANIFEST_PARSED,
                                                l.default.BUFFER_RESET,
                                                l.default.BUFFER_APPENDING,
                                                l.default.BUFFER_CODECS,
                                                l.default.BUFFER_EOS,
                                                l.default.BUFFER_FLUSHING,
                                                l.default.LEVEL_PTS_UPDATED,
                                                l.default.LEVEL_UPDATED,
                                            ) || this)._msDuration = null),
                                        (t._levelDuration = null),
                                        (t._levelTargetDuration = 10),
                                        (t._live = null),
                                        (t._objectUrl = null),
                                        (t.bufferCodecEventsExpected = 0),
                                        (t.onsbue = t.onSBUpdateEnd.bind(t)),
                                        (t.onsbe = t.onSBUpdateError.bind(t)),
                                        (t.pendingTracks = {}),
                                        (t.tracks = {}),
                                        t
                                    )
                                }
                                o.default = t
                            }.call(this, d('./src/polyfills/number.js').Number)
                        },
                        './src/controller/cap-level-controller.js': function (t, s, o) {
                            !function (e) {
                                var i,
                                    t =
                                        (this && this.__extends) ||
                                        ((i =
                                            Object.setPrototypeOf ||
                                            ({ __proto__: [] } instanceof Array &&
                                                function (t, e) {
                                                    t.__proto__ = e
                                                }) ||
                                            function (t, e) {
                                                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                            }),
                                            function (t, e) {
                                                function r() {
                                                    this.constructor = t
                                                }
                                                i(t, e),
                                                    (t.prototype =
                                                        null === e
                                                            ? Object.create(e)
                                                            : ((r.prototype = e.prototype), new r()))
                                            })
                                Object.defineProperty(s, '__esModule', { value: !0 })
                                var r,
                                    n = o('./src/events.js'),
                                    t =
                                        ((r = o('./src/event-handler.js').default),
                                            t(a, r),
                                            (a.prototype.destroy = function () {
                                                this.hls.config.capLevelToPlayerSize &&
                                                    ((this.media = null), this._stopCapping())
                                            }),
                                            (a.prototype.onFpsDropLevelCapping = function (t) {
                                                a.isLevelAllowed(t.droppedLevel, this.restrictedLevels) &&
                                                    this.restrictedLevels.push(t.droppedLevel)
                                            }),
                                            (a.prototype.onMediaAttaching = function (t) {
                                                this.media =
                                                    t.media instanceof window.HTMLVideoElement
                                                        ? t.media
                                                        : null
                                            }),
                                            (a.prototype.onManifestParsed = function (t) {
                                                var e = this.hls
                                                    ; (this.restrictedLevels = []),
                                                        (this.levels = t.levels),
                                                        (this.firstLevel = t.firstLevel),
                                                        e.config.capLevelToPlayerSize &&
                                                        t.video &&
                                                        this._startCapping()
                                            }),
                                            (a.prototype.onBufferCodecs = function (t) {
                                                this.hls.config.capLevelToPlayerSize &&
                                                    t.video &&
                                                    this._startCapping()
                                            }),
                                            (a.prototype.onLevelsUpdated = function (t) {
                                                this.levels = t.levels
                                            }),
                                            (a.prototype.onMediaDetaching = function () {
                                                this._stopCapping()
                                            }),
                                            (a.prototype.detectPlayerSize = function () {
                                                var t, e
                                                !this.media ||
                                                    ((t = this.levels ? this.levels.length : 0) &&
                                                        (((e = this.hls).autoLevelCapping = this.getMaxLevel(
                                                            t - 1,
                                                        )),
                                                            e.autoLevelCapping > this.autoLevelCapping &&
                                                            e.streamController.nextLevelSwitch(),
                                                            (this.autoLevelCapping = e.autoLevelCapping)))
                                            }),
                                            (a.prototype.getMaxLevel = function (r) {
                                                var i = this
                                                if (!this.levels) return -1
                                                var t = this.levels.filter(function (t, e) {
                                                    return a.isLevelAllowed(e, i.restrictedLevels) && e <= r
                                                })
                                                return a.getMaxLevelByMediaSize(
                                                    t,
                                                    this.mediaWidth,
                                                    this.mediaHeight,
                                                )
                                            }),
                                            (a.prototype._startCapping = function () {
                                                this.timer ||
                                                    ((this.autoLevelCapping = e.POSITIVE_INFINITY),
                                                        (this.hls.firstLevel = this.getMaxLevel(
                                                            this.firstLevel,
                                                        )),
                                                        clearInterval(this.timer),
                                                        (this.timer = setInterval(
                                                            this.detectPlayerSize.bind(this),
                                                            1e3,
                                                        )),
                                                        this.detectPlayerSize())
                                            }),
                                            (a.prototype._stopCapping = function () {
                                                ; (this.restrictedLevels = []),
                                                    (this.firstLevel = null),
                                                    (this.autoLevelCapping = e.POSITIVE_INFINITY),
                                                    this.timer &&
                                                    (clearInterval(this.timer), (this.timer = null))
                                            }),
                                            Object.defineProperty(a.prototype, 'mediaWidth', {
                                                get: function () {
                                                    var t,
                                                        e = this.media
                                                    return (
                                                        e &&
                                                        ((t = e.width || e.clientWidth || e.offsetWidth),
                                                            (t *= a.contentScaleFactor)),
                                                        t
                                                    )
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            Object.defineProperty(a.prototype, 'mediaHeight', {
                                                get: function () {
                                                    var t,
                                                        e = this.media
                                                    return (
                                                        e &&
                                                        ((t = e.height || e.clientHeight || e.offsetHeight),
                                                            (t *= a.contentScaleFactor)),
                                                        t
                                                    )
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            Object.defineProperty(a, 'contentScaleFactor', {
                                                get: function () {
                                                    var t = 1
                                                    try {
                                                        t = window.devicePixelRatio
                                                    } catch (t) { }
                                                    return t
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            (a.isLevelAllowed = function (t, e) {
                                                return -1 === (e = void 0 === e ? [] : e).indexOf(t)
                                            }),
                                            (a.getMaxLevelByMediaSize = function (t, e, r) {
                                                if (!t || (t && !t.length)) return -1
                                                for (var i = t.length - 1, n = 0; n < t.length; n += 1) {
                                                    var a,
                                                        s = t[n]
                                                    if (
                                                        (a = (a = s.width >= e || s.height >= r)
                                                            ? !(a = t[n + 1]) ||
                                                            s.width !== a.width ||
                                                            s.height !== a.height
                                                            : a)
                                                    ) {
                                                        i = n
                                                        break
                                                    }
                                                }
                                                return i
                                            }),
                                            a)
                                function a(t) {
                                    return (
                                        ((t =
                                            r.call(
                                                this,
                                                t,
                                                n.default.FPS_DROP_LEVEL_CAPPING,
                                                n.default.MEDIA_ATTACHING,
                                                n.default.MANIFEST_PARSED,
                                                n.default.BUFFER_CODECS,
                                                n.default.MEDIA_DETACHING,
                                            ) || this).autoLevelCapping = e.POSITIVE_INFINITY),
                                        (t.firstLevel = null),
                                        (t.levels = []),
                                        (t.media = null),
                                        (t.restrictedLevels = []),
                                        (t.timer = null),
                                        t
                                    )
                                }
                                s.default = t
                            }.call(this, o('./src/polyfills/number.js').Number)
                        },
                        './src/controller/eme-controller.js': function (t, e, r) {
                            var i,
                                n =
                                    (this && this.__extends) ||
                                    ((i =
                                        Object.setPrototypeOf ||
                                        ({ __proto__: [] } instanceof Array &&
                                            function (t, e) {
                                                t.__proto__ = e
                                            }) ||
                                        function (t, e) {
                                            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                        }),
                                        function (t, e) {
                                            function r() {
                                                this.constructor = t
                                            }
                                            i(t, e),
                                                (t.prototype =
                                                    null === e
                                                        ? Object.create(e)
                                                        : ((r.prototype = e.prototype), new r()))
                                        })
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (t = r('./src/event-handler.js'))
                            var a = r('./src/events.js'),
                                s = r('./src/errors.js')
                            r('./src/utils/logger.js')
                            var o,
                                l = window.XMLHttpRequest
                            function u(t) {
                                var e =
                                    o.call(
                                        this,
                                        t,
                                        a.default.MEDIA_ATTACHED,
                                        a.default.MANIFEST_PARSED,
                                    ) || this
                                return (
                                    (e._widevineLicenseUrl = t.config.widevineLicenseUrl),
                                    (e._licenseXhrSetup = t.config.licenseXhrSetup),
                                    (e._emeEnabled = t.config.emeEnabled),
                                    (e._requestMediaKeySystemAccess =
                                        t.config.requestMediaKeySystemAccessFunc),
                                    (e._mediaKeysList = []),
                                    (e._media = null),
                                    (e._hasSetMediaKeys = !1),
                                    (e._isMediaEncrypted = !1),
                                    (e._requestLicenseFailureCount = 0),
                                    e
                                )
                            }
                            ; (o = t.default),
                                n(u, o),
                                (u.prototype.getLicenseServerUrl = function (t) {
                                    return (
                                        (t =
                                            'com.widevine.alpha' === t
                                                ? this._widevineLicenseUrl
                                                : null) ||
                                        this.hls.trigger(a.default.ERROR, {
                                            type: s.ErrorTypes.KEY_SYSTEM_ERROR,
                                            details:
                                                s.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                                            fatal: !0,
                                        }),
                                        t
                                    )
                                }),
                                (u.prototype._attemptKeySystemAccess = function (e, t, r) {
                                    var i = this
                                        ; (t = (function (t, e) {
                                            if ('com.widevine.alpha' !== t)
                                                throw Error('Unknown key-system: ' + t)
                                            return (
                                                (r = { videoCapabilities: [] }),
                                                e.forEach(function (t) {
                                                    r.videoCapabilities.push({
                                                        contentType: 'video/mp4; codecs="' + t + '"',
                                                    })
                                                }),
                                                [r]
                                            )
                                            var r
                                        })(e, r)) &&
                                            this.requestMediaKeySystemAccess(e, t)
                                                .then(function (t) {
                                                    i._onMediaKeySystemAccessObtained(e, t)
                                                })
                                                .catch(function (t) { })
                                }),
                                Object.defineProperty(
                                    u.prototype,
                                    'requestMediaKeySystemAccess',
                                    {
                                        get: function () {
                                            if (!this._requestMediaKeySystemAccess)
                                                throw Error(
                                                    'No requestMediaKeySystemAccess function configured',
                                                )
                                            return this._requestMediaKeySystemAccess
                                        },
                                        enumerable: !0,
                                        configurable: !0,
                                    },
                                ),
                                (u.prototype._onMediaKeySystemAccessObtained = function (t, e) {
                                    var r = this,
                                        i = {
                                            mediaKeys: null,
                                            mediaKeysSession: null,
                                            mediaKeysSessionInitialized: !1,
                                            mediaKeySystemAccess: e,
                                            mediaKeySystemDomain: t,
                                        }
                                    this._mediaKeysList.push(i),
                                        e
                                            .createMediaKeys()
                                            .then(function (t) {
                                                ; (i.mediaKeys = t), r._onMediaKeysCreated()
                                            })
                                            .catch(function (t) { })
                                }),
                                (u.prototype._onMediaKeysCreated = function () {
                                    var e = this
                                    this._mediaKeysList.forEach(function (t) {
                                        t.mediaKeysSession ||
                                            ((t.mediaKeysSession = t.mediaKeys.createSession()),
                                                e._onNewMediaKeySession(t.mediaKeysSession))
                                    })
                                }),
                                (u.prototype._onNewMediaKeySession = function (e) {
                                    var r = this
                                    e.addEventListener(
                                        'message',
                                        function (t) {
                                            r._onKeySessionMessage(e, t.message)
                                        },
                                        !1,
                                    )
                                }),
                                (u.prototype._onKeySessionMessage = function (e, t) {
                                    this._requestLicense(t, function (t) {
                                        e.update(t)
                                    })
                                }),
                                (u.prototype._onMediaEncrypted = function (t, e) {
                                    ; (this._isMediaEncrypted = !0),
                                        (this._mediaEncryptionInitDataType = t),
                                        (this._mediaEncryptionInitData = e),
                                        this._attemptSetMediaKeys(),
                                        this._generateRequestWithPreferredKeySession()
                                }),
                                (u.prototype._attemptSetMediaKeys = function () {
                                    var t
                                    this._hasSetMediaKeys ||
                                        ((t = this._mediaKeysList[0]) && t.mediaKeys
                                            ? (this._media.setMediaKeys(t.mediaKeys),
                                                (this._hasSetMediaKeys = !0))
                                            : this.hls.trigger(a.default.ERROR, {
                                                type: s.ErrorTypes.KEY_SYSTEM_ERROR,
                                                details: s.ErrorDetails.KEY_SYSTEM_NO_KEYS,
                                                fatal: !0,
                                            }))
                                }),
                                (u.prototype._generateRequestWithPreferredKeySession = function () {
                                    var t,
                                        e,
                                        r,
                                        i = this,
                                        n = this._mediaKeysList[0]
                                    n
                                        ? n.mediaKeysSessionInitialized ||
                                        ((t = n.mediaKeysSession) ||
                                            this.hls.trigger(a.default.ERROR, {
                                                type: s.ErrorTypes.KEY_SYSTEM_ERROR,
                                                details: s.ErrorDetails.KEY_SYSTEM_NO_SESSION,
                                                fatal: !0,
                                            }),
                                            (e = this._mediaEncryptionInitDataType),
                                            (r = this._mediaEncryptionInitData),
                                            (n.mediaKeysSessionInitialized = !0),
                                            t
                                                .generateRequest(e, r)
                                                .then(function () { })
                                                .catch(function (t) {
                                                    i.hls.trigger(a.default.ERROR, {
                                                        type: s.ErrorTypes.KEY_SYSTEM_ERROR,
                                                        details: s.ErrorDetails.KEY_SYSTEM_NO_SESSION,
                                                        fatal: !1,
                                                    })
                                                }))
                                        : this.hls.trigger(a.default.ERROR, {
                                            type: s.ErrorTypes.KEY_SYSTEM_ERROR,
                                            details: s.ErrorDetails.KEY_SYSTEM_NO_ACCESS,
                                            fatal: !0,
                                        })
                                }),
                                (u.prototype._createLicenseXhr = function (e, t, r) {
                                    var i = new l(),
                                        n = this._licenseXhrSetup
                                    try {
                                        if (n)
                                            try {
                                                n(i, e)
                                            } catch (t) {
                                                i.open('POST', e, !0), n(i, e)
                                            }
                                        i.readyState || i.open('POST', e, !0)
                                    } catch (t) {
                                        return void this.hls.trigger(a.default.ERROR, {
                                            type: s.ErrorTypes.KEY_SYSTEM_ERROR,
                                            details: s.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                                            fatal: !0,
                                        })
                                    }
                                    return (
                                        (i.responseType = 'arraybuffer'),
                                        (i.onreadystatechange = this._onLicenseRequestReadyStageChange.bind(
                                            this,
                                            i,
                                            e,
                                            t,
                                            r,
                                        )),
                                        i
                                    )
                                }),
                                (u.prototype._onLicenseRequestReadyStageChange = function (
                                    t,
                                    e,
                                    r,
                                    i,
                                ) {
                                    4 === t.readyState &&
                                        (200 === t.status
                                            ? ((this._requestLicenseFailureCount = 0), i(t.response))
                                            : (this._requestLicenseFailureCount++,
                                                this._requestLicenseFailureCount <= 3
                                                    ? this._requestLicense(r, i)
                                                    : this.hls.trigger(a.default.ERROR, {
                                                        type: s.ErrorTypes.KEY_SYSTEM_ERROR,
                                                        details:
                                                            s.ErrorDetails
                                                                .KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                                                        fatal: !0,
                                                    })))
                                }),
                                (u.prototype._generateLicenseRequestChallenge = function (
                                    t,
                                    e,
                                ) {
                                    var r
                                    return (r =
                                        'com.microsoft.playready' !== t.mediaKeySystemDomain &&
                                            'com.widevine.alpha' === t.mediaKeySystemDomain
                                            ? e
                                            : r)
                                }),
                                (u.prototype._requestLicense = function (t, e) {
                                    var r,
                                        i = this._mediaKeysList[0]
                                    i
                                        ? ((r = this.getLicenseServerUrl(i.mediaKeySystemDomain)),
                                            this._createLicenseXhr(r, t, e).send(
                                                this._generateLicenseRequestChallenge(i, t),
                                            ))
                                        : this.hls.trigger(a.default.ERROR, {
                                            type: s.ErrorTypes.KEY_SYSTEM_ERROR,
                                            details: s.ErrorDetails.KEY_SYSTEM_NO_ACCESS,
                                            fatal: !0,
                                        })
                                }),
                                (u.prototype.onMediaAttached = function (t) {
                                    var e = this
                                    this._emeEnabled &&
                                        ((this._media = t = t.media),
                                            t.addEventListener('encrypted', function (t) {
                                                e._onMediaEncrypted(t.initDataType, t.initData)
                                            }))
                                }),
                                (u.prototype.onManifestParsed = function (t) {
                                    var e
                                    this._emeEnabled &&
                                        ((e = t.levels.map(function (t) {
                                            return t.audioCodec
                                        })),
                                            (t = t.levels.map(function (t) {
                                                return t.videoCodec
                                            })),
                                            this._attemptKeySystemAccess('com.widevine.alpha', e, t))
                                }),
                                (r = u),
                                (e.default = r)
                        },
                        './src/controller/fps-controller.js': function (t, e, r) {
                            var i,
                                n =
                                    (this && this.__extends) ||
                                    ((i =
                                        Object.setPrototypeOf ||
                                        ({ __proto__: [] } instanceof Array &&
                                            function (t, e) {
                                                t.__proto__ = e
                                            }) ||
                                        function (t, e) {
                                            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                        }),
                                        function (t, e) {
                                            function r() {
                                                this.constructor = t
                                            }
                                            i(t, e),
                                                (t.prototype =
                                                    null === e
                                                        ? Object.create(e)
                                                        : ((r.prototype = e.prototype), new r()))
                                        })
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var o = r('./src/events.js')
                                ; (t = r('./src/event-handler.js')), r('./src/utils/logger.js')
                            var a,
                                l = window.performance
                            function s(t) {
                                return a.call(this, t, o.default.MEDIA_ATTACHING) || this
                            }
                            ; (a = t.default),
                                n(s, a),
                                (s.prototype.destroy = function () {
                                    this.timer && clearInterval(this.timer),
                                        (this.isVideoPlaybackQualityAvailable = !1)
                                }),
                                (s.prototype.onMediaAttaching = function (t) {
                                    var e = this.hls.config
                                    e.capLevelOnFPSDrop &&
                                        ('function' ==
                                            typeof (this.video =
                                                t.media instanceof window.HTMLVideoElement
                                                    ? t.media
                                                    : null).getVideoPlaybackQuality &&
                                            (this.isVideoPlaybackQualityAvailable = !0),
                                            clearInterval(this.timer),
                                            (this.timer = setInterval(
                                                this.checkFPSInterval.bind(this),
                                                e.fpsDroppedMonitoringPeriod,
                                            )))
                                }),
                                (s.prototype.checkFPS = function (t, e, r) {
                                    var i, n, a, s
                                        ; (t = l.now()),
                                            e &&
                                            (this.lastTime &&
                                                ((i = r - this.lastDroppedFrames),
                                                    (n = e - this.lastDecodedFrames),
                                                    (a = (1e3 * i) / (t - this.lastTime)),
                                                    (s = this.hls).trigger(o.default.FPS_DROP, {
                                                        currentDropped: i,
                                                        currentDecoded: n,
                                                        totalDroppedFrames: r,
                                                    }),
                                                    0 < a &&
                                                    i > s.config.fpsDroppedMonitoringThreshold * n &&
                                                    0 < (i = s.currentLevel) &&
                                                    (-1 === s.autoLevelCapping ||
                                                        s.autoLevelCapping >= i) &&
                                                    (--i,
                                                        s.trigger(o.default.FPS_DROP_LEVEL_CAPPING, {
                                                            level: i,
                                                            droppedLevel: s.currentLevel,
                                                        }),
                                                        (s.autoLevelCapping = i),
                                                        s.streamController.nextLevelSwitch())),
                                                (this.lastTime = t),
                                                (this.lastDroppedFrames = r),
                                                (this.lastDecodedFrames = e))
                                }),
                                (s.prototype.checkFPSInterval = function () {
                                    var t,
                                        e = this.video
                                    e &&
                                        (this.isVideoPlaybackQualityAvailable
                                            ? ((t = e.getVideoPlaybackQuality()),
                                                this.checkFPS(
                                                    e,
                                                    t.totalVideoFrames,
                                                    t.droppedVideoFrames,
                                                ))
                                            : this.checkFPS(
                                                e,
                                                e.webkitDecodedFrameCount,
                                                e.webkitDroppedFrameCount,
                                            ))
                                }),
                                (r = s),
                                (e.default = r)
                        },
                        './src/controller/fragment-finders.js': function (t, e, r) {
                            !function (a) {
                                function n(t, e, r) {
                                    return (
                                        void 0 === t && (t = 0),
                                        void 0 === e && (e = 0),
                                        (e = Math.min(e, r.duration + (r.deltaPTS || 0))),
                                        r.start + r.duration - e <= t
                                            ? 1
                                            : r.start - e > t && r.start
                                                ? -1
                                                : 0
                                    )
                                }
                                function s(t, e, r) {
                                    return (
                                        r.endProgramDateTime -
                                        1e3 * Math.min(e, r.duration + (r.deltaPTS || 0)) >
                                        t
                                    )
                                }
                                Object.defineProperty(e, '__esModule', { value: !0 })
                                var o = r('./src/utils/binary-search.js')
                                    ; (e.findFragmentByPDT = function (t, e, r) {
                                        if (
                                            !Array.isArray(t) ||
                                            !t.length ||
                                            !a.isFinite(e) ||
                                            e < t[0].programDateTime ||
                                            e >= t[t.length - 1].endProgramDateTime
                                        )
                                            return null
                                        r = r || 0
                                        for (var i = 0; i < t.length; ++i) {
                                            var n = t[i]
                                            if (s(e, r, n)) return n
                                        }
                                        return null
                                    }),
                                        (e.findFragmentByPTS = function (t, e, r, i) {
                                            return (
                                                void 0 === r && (r = 0),
                                                void 0 === i && (i = 0),
                                                (t = t ? e[t.sn - e[0].sn + 1] : null) && !n(r, i, t)
                                                    ? t
                                                    : o.default.search(e, n.bind(null, r, i))
                                            )
                                        }),
                                        (e.fragmentWithinToleranceTest = n),
                                        (e.pdtWithinToleranceTest = s)
                            }.call(this, r('./src/polyfills/number.js').Number)
                        },
                        './src/controller/fragment-tracker.js': function (t, o, l) {
                            !function (e) {
                                var i,
                                    t =
                                        (this && this.__extends) ||
                                        ((i =
                                            Object.setPrototypeOf ||
                                            ({ __proto__: [] } instanceof Array &&
                                                function (t, e) {
                                                    t.__proto__ = e
                                                }) ||
                                            function (t, e) {
                                                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                            }),
                                            function (t, e) {
                                                function r() {
                                                    this.constructor = t
                                                }
                                                i(t, e),
                                                    (t.prototype =
                                                        null === e
                                                            ? Object.create(e)
                                                            : ((r.prototype = e.prototype), new r()))
                                            })
                                Object.defineProperty(o, '__esModule', { value: !0 })
                                var r = l('./src/event-handler.js'),
                                    n = l('./src/events.js')
                                o.FragmentState = {
                                    NOT_LOADED: 'NOT_LOADED',
                                    APPENDING: 'APPENDING',
                                    PARTIAL: 'PARTIAL',
                                    OK: 'OK',
                                }
                                var a,
                                    t =
                                        ((a = r.default),
                                            t(s, a),
                                            (s.prototype.destroy = function () {
                                                ; (this.fragments = Object.create(null)),
                                                    (this.timeRanges = Object.create(null)),
                                                    (this.config = null),
                                                    r.default.prototype.destroy.call(this),
                                                    a.prototype.destroy.call(this)
                                            }),
                                            (s.prototype.getBufferedFrag = function (e, r) {
                                                var i = this.fragments,
                                                    t = Object.keys(i).filter(function (t) {
                                                        return (
                                                            !((t = i[t]).body.type !== r || !t.buffered) &&
                                                            (t = t.body).startPTS <= e &&
                                                            e <= t.endPTS
                                                        )
                                                    })
                                                return 0 === t.length ? null : ((t = t.pop()), i[t].body)
                                            }),
                                            (s.prototype.detectEvictedFragments = function (r, i) {
                                                var n,
                                                    a,
                                                    s = this
                                                Object.keys(this.fragments).forEach(function (t) {
                                                    if (!0 === (t = s.fragments[t]).buffered) {
                                                        var e = t.range[r]
                                                        if (e)
                                                            for (n = e.time, e = 0; e < n.length; e++)
                                                                if (
                                                                    ((a = n[e]),
                                                                        !1 ===
                                                                        s.isTimeBuffered(a.startPTS, a.endPTS, i))
                                                                ) {
                                                                    s.removeFragment(t.body)
                                                                    break
                                                                }
                                                    }
                                                })
                                            }),
                                            (s.prototype.detectPartialFragments = function (e) {
                                                var r = this,
                                                    t = this.getFragmentKey(e),
                                                    i = this.fragments[t]
                                                i &&
                                                    ((i.buffered = !0),
                                                        Object.keys(this.timeRanges).forEach(function (t) {
                                                            e.hasElementaryStream(t) &&
                                                                (i.range[t] = r.getBufferedTimes(
                                                                    e.startPTS,
                                                                    e.endPTS,
                                                                    r.timeRanges[t],
                                                                ))
                                                        }))
                                            }),
                                            (s.prototype.getBufferedTimes = function (t, e, r) {
                                                for (var i, n, a = [], s = !1, o = 0; o < r.length; o++) {
                                                    if (
                                                        ((i = r.start(o) - this.bufferPadding),
                                                            (n = r.end(o) + this.bufferPadding),
                                                            i <= t && e <= n)
                                                    ) {
                                                        a.push({
                                                            startPTS: Math.max(t, r.start(o)),
                                                            endPTS: Math.min(e, r.end(o)),
                                                        })
                                                        break
                                                    }
                                                    if (t < n && i < e)
                                                        a.push({
                                                            startPTS: Math.max(t, r.start(o)),
                                                            endPTS: Math.min(e, r.end(o)),
                                                        }),
                                                            (s = !0)
                                                    else if (e <= i) break
                                                }
                                                return { time: a, partial: s }
                                            }),
                                            (s.prototype.getFragmentKey = function (t) {
                                                return t.type + '_' + t.level + '_' + t.urlId + '_' + t.sn
                                            }),
                                            (s.prototype.getPartialFragment = function (e) {
                                                var r,
                                                    i,
                                                    n = this,
                                                    a = null,
                                                    s = 0
                                                return (
                                                    Object.keys(this.fragments).forEach(function (t) {
                                                        ; (t = n.fragments[t]),
                                                            n.isPartial(t) &&
                                                            ((r = t.body.startPTS - n.bufferPadding),
                                                                (i = t.body.endPTS + n.bufferPadding),
                                                                r <= e &&
                                                                e <= i &&
                                                                ((i = Math.min(e - r, i - e)),
                                                                    s <= i && ((a = t.body), (s = i))))
                                                    }),
                                                    a
                                                )
                                            }),
                                            (s.prototype.getState = function (t) {
                                                ; (t = this.getFragmentKey(t)), (t = this.fragments[t])
                                                var e = o.FragmentState.NOT_LOADED
                                                return (e =
                                                    void 0 !== t
                                                        ? t.buffered
                                                            ? !0 === this.isPartial(t)
                                                                ? o.FragmentState.PARTIAL
                                                                : o.FragmentState.OK
                                                            : o.FragmentState.APPENDING
                                                        : e)
                                            }),
                                            (s.prototype.isPartial = function (t) {
                                                return (
                                                    !0 === t.buffered &&
                                                    ((void 0 !== t.range.video &&
                                                        !0 === t.range.video.partial) ||
                                                        (void 0 !== t.range.audio &&
                                                            !0 === t.range.audio.partial))
                                                )
                                            }),
                                            (s.prototype.isTimeBuffered = function (t, e, r) {
                                                for (var i, n, a = 0; a < r.length; a++) {
                                                    if (
                                                        ((i = r.start(a) - this.bufferPadding),
                                                            (n = r.end(a) + this.bufferPadding),
                                                            i <= t && e <= n)
                                                    )
                                                        return !0
                                                    if (e <= i) break
                                                }
                                                return !1
                                            }),
                                            (s.prototype.onFragLoaded = function (t) {
                                                ; (t = t.frag),
                                                    e.isFinite(t.sn) &&
                                                    !t.bitrateTest &&
                                                    (this.fragments[this.getFragmentKey(t)] = {
                                                        body: t,
                                                        range: Object.create(null),
                                                        buffered: !1,
                                                    })
                                            }),
                                            (s.prototype.onBufferAppended = function (t) {
                                                var e = this
                                                    ; (this.timeRanges = t.timeRanges),
                                                        Object.keys(this.timeRanges).forEach(function (t) {
                                                            e.detectEvictedFragments(t, e.timeRanges[t])
                                                        })
                                            }),
                                            (s.prototype.onFragBuffered = function (t) {
                                                this.detectPartialFragments(t.frag)
                                            }),
                                            (s.prototype.hasFragment = function (t) {
                                                return (
                                                    (t = this.getFragmentKey(t)),
                                                    void 0 !== this.fragments[t]
                                                )
                                            }),
                                            (s.prototype.removeFragment = function (t) {
                                                ; (t = this.getFragmentKey(t)), delete this.fragments[t]
                                            }),
                                            (s.prototype.removeAllFragments = function () {
                                                this.fragments = Object.create(null)
                                            }),
                                            s)
                                function s(t) {
                                    var e =
                                        a.call(
                                            this,
                                            t,
                                            n.default.BUFFER_APPENDED,
                                            n.default.FRAG_BUFFERED,
                                            n.default.FRAG_LOADED,
                                        ) || this
                                    return (
                                        (e.bufferPadding = 0.2),
                                        (e.fragments = Object.create(null)),
                                        (e.timeRanges = Object.create(null)),
                                        (e.config = t.config),
                                        e
                                    )
                                }
                                o.FragmentTracker = t
                            }.call(this, l('./src/polyfills/number.js').Number)
                        },
                        './src/controller/gap-controller.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var a = r('./src/utils/buffer-helper.js'),
                                o = r('./src/errors.js'),
                                l = r('./src/events.js')
                            function i(t, e, r, i) {
                                ; (this.config = t),
                                    (this.media = e),
                                    (this.fragmentTracker = r),
                                    (this.hls = i),
                                    (this.stallReported = !1)
                            }
                            r('./src/utils/logger.js'),
                                (i.prototype.poll = function (t, e) {
                                    var r = this.config,
                                        i = this.media,
                                        n = i.currentTime
                                        ; (e = window.performance.now()),
                                            n !== t
                                                ? (this.stallReported && (this.stallReported = !1),
                                                    (this.stalled = null),
                                                    (this.nudgeRetry = 0))
                                                : i.ended ||
                                                !i.buffered.length ||
                                                2 < i.readyState ||
                                                (i.seeking && a.BufferHelper.isBuffered(i, n)) ||
                                                ((t = e - this.stalled),
                                                    (r = a.BufferHelper.bufferInfo(i, n, r.maxBufferHole)),
                                                    this.stalled
                                                        ? (1e3 <= t && this._reportStall(r.len),
                                                            this._tryFixBufferStall(r, t))
                                                        : (this.stalled = e))
                                }),
                                (i.prototype._tryFixBufferStall = function (t, e) {
                                    var r = this.config,
                                        i = this.fragmentTracker.getPartialFragment(
                                            this.media.currentTime,
                                        )
                                    i && this._trySkipBufferHole(i),
                                        0.5 < t.len &&
                                        e > 1e3 * r.highBufferWatchdogPeriod &&
                                        ((this.stalled = null), this._tryNudgeBuffer())
                                }),
                                (i.prototype._reportStall = function (t) {
                                    var e = this.hls
                                    this.stallReported ||
                                        ((this.stallReported = !0),
                                            e.trigger(l.default.ERROR, {
                                                type: o.ErrorTypes.MEDIA_ERROR,
                                                details: o.ErrorDetails.BUFFER_STALLED_ERROR,
                                                fatal: !1,
                                                buffer: t,
                                            }))
                                }),
                                (i.prototype._trySkipBufferHole = function (t) {
                                    for (
                                        var e = this.hls,
                                        r = this.media,
                                        i = r.currentTime,
                                        n = 0,
                                        a = 0;
                                        a < r.buffered.length;
                                        a++
                                    ) {
                                        var s = r.buffered.start(a)
                                        if (n <= i && i < s) {
                                            ; (r.currentTime = Math.max(s, r.currentTime + 0.1)),
                                                (this.stalled = null),
                                                e.trigger(l.default.ERROR, {
                                                    type: o.ErrorTypes.MEDIA_ERROR,
                                                    details: o.ErrorDetails.BUFFER_SEEK_OVER_HOLE,
                                                    fatal: !1,
                                                    reason:
                                                        'fragment loaded with buffer holes, seeking from ' +
                                                        i +
                                                        ' to ' +
                                                        r.currentTime,
                                                    frag: t,
                                                })
                                            break
                                        }
                                        n = r.buffered.end(a)
                                    }
                                }),
                                (i.prototype._tryNudgeBuffer = function () {
                                    var t = this.config,
                                        e = this.hls,
                                        r = this.media,
                                        i = r.currentTime,
                                        n = (this.nudgeRetry || 0) + 1
                                        ; (this.nudgeRetry = n) < t.nudgeMaxRetry
                                            ? ((r.currentTime = i + n * t.nudgeOffset),
                                                e.trigger(l.default.ERROR, {
                                                    type: o.ErrorTypes.MEDIA_ERROR,
                                                    details: o.ErrorDetails.BUFFER_NUDGE_ON_STALL,
                                                    fatal: !1,
                                                }))
                                            : e.trigger(l.default.ERROR, {
                                                type: o.ErrorTypes.MEDIA_ERROR,
                                                details: o.ErrorDetails.BUFFER_STALLED_ERROR,
                                                fatal: !0,
                                            })
                                }),
                                (e.default = i)
                        },
                        './src/controller/id3-track-controller.js': function (t, e, r) {
                            var i,
                                n =
                                    (this && this.__extends) ||
                                    ((i =
                                        Object.setPrototypeOf ||
                                        ({ __proto__: [] } instanceof Array &&
                                            function (t, e) {
                                                t.__proto__ = e
                                            }) ||
                                        function (t, e) {
                                            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                        }),
                                        function (t, e) {
                                            function r() {
                                                this.constructor = t
                                            }
                                            i(t, e),
                                                (t.prototype =
                                                    null === e
                                                        ? Object.create(e)
                                                        : ((r.prototype = e.prototype), new r()))
                                        })
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var a,
                                s = r('./src/events.js'),
                                o = r('./src/event-handler.js'),
                                d = r('./src/demux/id3.js'),
                                l = r('./src/utils/texttrack-utils.js')
                            function u(t) {
                                return (
                                    ((t =
                                        a.call(
                                            this,
                                            t,
                                            s.default.MEDIA_ATTACHED,
                                            s.default.MEDIA_DETACHING,
                                            s.default.FRAG_PARSING_METADATA,
                                        ) || this).id3Track = void 0),
                                    (t.media = void 0),
                                    t
                                )
                            }
                            ; (a = o.default),
                                n(u, a),
                                (u.prototype.destroy = function () {
                                    o.default.prototype.destroy.call(this)
                                }),
                                (u.prototype.onMediaAttached = function (t) {
                                    this.media = t.media
                                }),
                                (u.prototype.onMediaDetaching = function () {
                                    l.clearCurrentCues(this.id3Track),
                                        (this.media = this.id3Track = void 0)
                                }),
                                (u.prototype.getID3Track = function (t) {
                                    for (var e = 0; e < t.length; e++) {
                                        var r = t[e]
                                        if ('metadata' === r.kind && 'id3' === r.label)
                                            return l.sendAddTrackEvent(r, this.media), r
                                    }
                                    return this.media.addTextTrack('metadata', 'id3')
                                }),
                                (u.prototype.onFragParsingMetadata = function (t) {
                                    var e = t.frag
                                        ; (t = t.samples),
                                            this.id3Track ||
                                            ((this.id3Track = this.getID3Track(
                                                this.media.textTracks,
                                            )),
                                                (this.id3Track.mode = 'hidden'))
                                    for (
                                        var r =
                                            window.WebKitDataCue ||
                                            window.VTTCue ||
                                            window.TextTrackCue,
                                        i = 0;
                                        i < t.length;
                                        i++
                                    ) {
                                        var n = d.default.getID3Frames(t[i].data)
                                        if (n) {
                                            var a = t[i].pts,
                                                s = i < t.length - 1 ? t[i + 1].pts : e.endPTS
                                            a === s && (s += 1e-4)
                                            for (var o = 0; o < n.length; o++) {
                                                var l,
                                                    u = n[o]
                                                d.default.isTimeStampFrame(u) ||
                                                    (((l = new r(a, s, '')).value = u),
                                                        this.id3Track.addCue(l))
                                            }
                                        }
                                    }
                                }),
                                (e.default = u)
                        },
                        './src/controller/level-controller.js': function (t, e, r) {
                            var i,
                                n =
                                    (this && this.__extends) ||
                                    ((i =
                                        Object.setPrototypeOf ||
                                        ({ __proto__: [] } instanceof Array &&
                                            function (t, e) {
                                                t.__proto__ = e
                                            }) ||
                                        function (t, e) {
                                            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                        }),
                                        function (t, e) {
                                            function r() {
                                                this.constructor = t
                                            }
                                            i(t, e),
                                                (t.prototype =
                                                    null === e
                                                        ? Object.create(e)
                                                        : ((r.prototype = e.prototype), new r()))
                                        })
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var u = r('./src/events.js')
                                ; (t = r('./src/event-handler.js')), r('./src/utils/logger.js')
                            var d,
                                a,
                                c = r('./src/errors.js'),
                                f = r('./src/utils/codecs.js'),
                                h = r('./src/controller/level-helper.js')
                            function s(t) {
                                return (
                                    ((t =
                                        a.call(
                                            this,
                                            t,
                                            u.default.MANIFEST_LOADED,
                                            u.default.LEVEL_LOADED,
                                            u.default.AUDIO_TRACK_SWITCHED,
                                            u.default.FRAG_LOADED,
                                            u.default.ERROR,
                                        ) || this).canload = !1),
                                    (t.currentLevelIndex = null),
                                    (t.manualLevelIndex = -1),
                                    (t.timer = null),
                                    (d = /chrome|firefox/.test(
                                        navigator.userAgent.toLowerCase(),
                                    )),
                                    t
                                )
                            }
                            ; (a = t.default),
                                n(s, a),
                                (s.prototype.onHandlerDestroying = function () {
                                    this.clearTimer(), (this.manualLevelIndex = -1)
                                }),
                                (s.prototype.clearTimer = function () {
                                    null !== this.timer &&
                                        (clearTimeout(this.timer), (this.timer = null))
                                }),
                                (s.prototype.startLoad = function () {
                                    var t = this._levels
                                        ; (this.canload = !0),
                                            (this.levelRetryCount = 0),
                                            t &&
                                            t.forEach(function (t) {
                                                t.loadError = 0
                                                var e = t.details
                                                e && e.live && (t.details = void 0)
                                            }),
                                            null !== this.timer && this.loadLevel()
                                }),
                                (s.prototype.stopLoad = function () {
                                    this.canload = !1
                                }),
                                (s.prototype.onManifestLoaded = function (t) {
                                    var r = [],
                                        e = [],
                                        i = {},
                                        n = null,
                                        a = !1,
                                        s = !1
                                    if (
                                        (t.levels.forEach(function (t) {
                                            var e = t.attrs
                                                ; (t.loadError = 0),
                                                    (t.fragmentError = !1),
                                                    (a = a || !!t.videoCodec),
                                                    (s = s || !!t.audioCodec),
                                                    d &&
                                                    t.audioCodec &&
                                                    -1 !== t.audioCodec.indexOf('mp4a.40.34') &&
                                                    (t.audioCodec = void 0),
                                                    (n = i[t.bitrate])
                                                        ? n.url.push(t.url)
                                                        : ((t.url = [t.url]),
                                                            (t.urlId = 0),
                                                            (i[t.bitrate] = t),
                                                            r.push(t)),
                                                    e &&
                                                    (e.AUDIO &&
                                                        ((s = !0), h.addGroupId(n || t, 'audio', e.AUDIO)),
                                                        e.SUBTITLES &&
                                                        h.addGroupId(n || t, 'text', e.SUBTITLES))
                                        }),
                                            (r = (r =
                                                a && s
                                                    ? r.filter(function (t) {
                                                        return !!t.videoCodec
                                                    })
                                                    : r).filter(function (t) {
                                                        var e = t.audioCodec
                                                        return (
                                                            (t = t.videoCodec),
                                                            (!e || f.isCodecSupportedInMp4(e, 'audio')) &&
                                                            (!t || f.isCodecSupportedInMp4(t, 'video'))
                                                        )
                                                    })),
                                            t.audioTracks &&
                                            (e = t.audioTracks.filter(function (t) {
                                                return (
                                                    !t.audioCodec ||
                                                    f.isCodecSupportedInMp4(t.audioCodec, 'audio')
                                                )
                                            })).forEach(function (t, e) {
                                                t.id = e
                                            }),
                                            0 < r.length)
                                    ) {
                                        var o = r[0].bitrate
                                        r.sort(function (t, e) {
                                            return t.bitrate - e.bitrate
                                        }),
                                            (this._levels = r)
                                        for (var l = 0; l < r.length; l++)
                                            if (r[l].bitrate === o) {
                                                this._firstLevel = l
                                                break
                                            }
                                        this.hls.trigger(u.default.MANIFEST_PARSED, {
                                            levels: r,
                                            audioTracks: e,
                                            firstLevel: this._firstLevel,
                                            stats: t.stats,
                                            audio: s,
                                            video: a,
                                            altAudio: e.some(function (t) {
                                                return !!t.url
                                            }),
                                        })
                                    } else
                                        this.hls.trigger(u.default.ERROR, {
                                            type: c.ErrorTypes.MEDIA_ERROR,
                                            details:
                                                c.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
                                            fatal: !0,
                                            url: this.hls.url,
                                            reason:
                                                'no level with compatible codecs found in manifest',
                                        })
                                }),
                                Object.defineProperty(s.prototype, 'levels', {
                                    get: function () {
                                        return this._levels
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(s.prototype, 'level', {
                                    get: function () {
                                        return this.currentLevelIndex
                                    },
                                    set: function (t) {
                                        var e = this._levels
                                        e &&
                                            ((t = Math.min(t, e.length - 1)),
                                                (this.currentLevelIndex === t && e[t].details) ||
                                                this.setLevelInternal(t))
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                (s.prototype.setLevelInternal = function (t) {
                                    var e,
                                        r = this._levels,
                                        i = this.hls
                                    0 <= t && t < r.length
                                        ? (this.clearTimer(),
                                            this.currentLevelIndex !== t &&
                                            (((e = r[(this.currentLevelIndex = t)]).level = t),
                                                i.trigger(u.default.LEVEL_SWITCHING, e)),
                                            ((e = (r = r[t]).details) && !e.live) ||
                                            ((e = r.urlId),
                                                i.trigger(u.default.LEVEL_LOADING, {
                                                    url: r.url[e],
                                                    level: t,
                                                    id: e,
                                                })))
                                        : i.trigger(u.default.ERROR, {
                                            type: c.ErrorTypes.OTHER_ERROR,
                                            details: c.ErrorDetails.LEVEL_SWITCH_ERROR,
                                            level: t,
                                            fatal: !1,
                                            reason: 'invalid level idx',
                                        })
                                }),
                                Object.defineProperty(s.prototype, 'manualLevel', {
                                    get: function () {
                                        return this.manualLevelIndex
                                    },
                                    set: function (t) {
                                        ; (this.manualLevelIndex = t),
                                            void 0 === this._startLevel && (this._startLevel = t),
                                            -1 !== t && (this.level = t)
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(s.prototype, 'firstLevel', {
                                    get: function () {
                                        return this._firstLevel
                                    },
                                    set: function (t) {
                                        this._firstLevel = t
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(s.prototype, 'startLevel', {
                                    get: function () {
                                        if (void 0 !== this._startLevel) return this._startLevel
                                        var t = this.hls.config.startLevel
                                        return void 0 !== t ? t : this._firstLevel
                                    },
                                    set: function (t) {
                                        this._startLevel = t
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                (s.prototype.onError = function (t) {
                                    if (t.fatal)
                                        t.type === c.ErrorTypes.NETWORK_ERROR && this.clearTimer()
                                    else {
                                        var e = !1,
                                            r = !1
                                        switch (t.details) {
                                            case c.ErrorDetails.FRAG_LOAD_ERROR:
                                            case c.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                            case c.ErrorDetails.KEY_LOAD_ERROR:
                                            case c.ErrorDetails.KEY_LOAD_TIMEOUT:
                                                var i = t.frag.level,
                                                    r = !0
                                                break
                                            case c.ErrorDetails.LEVEL_LOAD_ERROR:
                                            case c.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                                                ; (i = t.context.level), (e = !0)
                                                break
                                            case c.ErrorDetails.REMUX_ALLOC_ERROR:
                                                ; (i = t.level), (e = !0)
                                        }
                                        void 0 !== i && this.recoverLevel(t, i, e, r)
                                    }
                                }),
                                (s.prototype.recoverLevel = function (t, e, r, i) {
                                    var n = this,
                                        a = this.hls.config,
                                        s = this._levels[e]
                                    if ((s.loadError++, (s.fragmentError = i), r)) {
                                        if (!(this.levelRetryCount + 1 <= a.levelLoadingMaxRetry))
                                            return (
                                                (this.currentLevelIndex = null),
                                                this.clearTimer(),
                                                void (t.fatal = !0)
                                            )
                                                ; (a = Math.min(
                                                    Math.pow(2, this.levelRetryCount) *
                                                    a.levelLoadingRetryDelay,
                                                    a.levelLoadingMaxRetryTimeout,
                                                )),
                                                    (this.timer = setTimeout(function () {
                                                        return n.loadLevel()
                                                    }, a)),
                                                    (t.levelRetry = !0),
                                                    this.levelRetryCount++
                                    }
                                    ; (r || i) &&
                                        (1 < (t = s.url.length) && s.loadError < t
                                            ? ((s.urlId = (s.urlId + 1) % t), (s.details = void 0))
                                            : -1 === this.manualLevelIndex
                                                ? ((e = 0 === e ? this._levels.length - 1 : e - 1),
                                                    (this.hls.nextAutoLevel = this.currentLevelIndex = e))
                                                : i && (this.currentLevelIndex = null))
                                }),
                                (s.prototype.onFragLoaded = function (t) {
                                    void 0 === (t = t.frag) ||
                                        'main' !== t.type ||
                                        (void 0 !== (t = this._levels[t.level]) &&
                                            ((t.fragmentError = !1),
                                                (this.levelRetryCount = t.loadError = 0)))
                                }),
                                (s.prototype.onLevelLoaded = function (t) {
                                    var e = this,
                                        r = t.level,
                                        i = t.details
                                    r === this.currentLevelIndex &&
                                        ((r = this._levels[r]).fragmentError ||
                                            (this.levelRetryCount = r.loadError = 0),
                                            i.live
                                                ? ((t = h.computeReloadInterval(
                                                    r.details,
                                                    i,
                                                    t.stats.trequest,
                                                )),
                                                    (this.timer = setTimeout(function () {
                                                        return e.loadLevel()
                                                    }, t)))
                                                : this.clearTimer())
                                }),
                                (s.prototype.onAudioTrackSwitched = function (t) {
                                    t = this.hls.audioTracks[t.id].groupId
                                    var e = this.hls.levels[this.currentLevelIndex]
                                    if (e && e.audioGroupIds) {
                                        for (var r = -1, i = 0; i < e.audioGroupIds.length; i++)
                                            if (e.audioGroupIds[i] === t) {
                                                r = i
                                                break
                                            }
                                        r !== e.urlId && ((e.urlId = r), this.startLoad())
                                    }
                                }),
                                (s.prototype.loadLevel = function () {
                                    var t, e
                                    null === this.currentLevelIndex ||
                                        !this.canload ||
                                        ('object' ==
                                            typeof (t = this._levels[this.currentLevelIndex]) &&
                                            0 < t.url.length &&
                                            ((e = t.urlId),
                                                this.hls.trigger(u.default.LEVEL_LOADING, {
                                                    url: t.url[e],
                                                    level: this.currentLevelIndex,
                                                    id: e,
                                                })))
                                }),
                                Object.defineProperty(s.prototype, 'nextLoadLevel', {
                                    get: function () {
                                        return -1 !== this.manualLevelIndex
                                            ? this.manualLevelIndex
                                            : this.hls.nextAutoLevel
                                    },
                                    set: function (t) {
                                        ; (this.level = t),
                                            -1 === this.manualLevelIndex &&
                                            (this.hls.nextAutoLevel = t)
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                (r = s),
                                (e.default = r)
                        },
                        './src/controller/level-helper.js': function (t, e, r) {
                            !function (l) {
                                function u(t, e, r) {
                                    var i = t[e],
                                        n = (t = t[r]).startPTS
                                    l.isFinite(n)
                                        ? e < r
                                            ? (i.duration = n - i.start)
                                            : (t.duration = i.start - n)
                                        : (t.start =
                                            e < r
                                                ? i.start + i.duration
                                                : Math.max(i.start - t.duration, 0))
                                }
                                function s(t, e, r, i, n, a) {
                                    var s,
                                        o = r
                                    if (
                                        (l.isFinite(e.startPTS) &&
                                            ((s = Math.abs(e.startPTS - r)),
                                                l.isFinite(e.deltaPTS)
                                                    ? (e.deltaPTS = Math.max(s, e.deltaPTS))
                                                    : (e.deltaPTS = s),
                                                (o = Math.max(r, e.startPTS)),
                                                (r = Math.min(r, e.startPTS)),
                                                (i = Math.max(i, e.endPTS)),
                                                (n = Math.min(n, e.startDTS)),
                                                (a = Math.max(a, e.endDTS))),
                                            (s = r - e.start),
                                            (e.start = e.startPTS = r),
                                            (e.maxStartPTS = o),
                                            (e.endPTS = i),
                                            (e.startDTS = n),
                                            (e.endDTS = a),
                                            (e.duration = i - r),
                                            (r = e.sn),
                                            !t || r < t.startSN || r > t.endSN)
                                    )
                                        return 0
                                    for (
                                        r -= t.startSN, (i = t.fragments)[r] = e, e = r;
                                        0 < e;
                                        e--
                                    )
                                        u(i, e, e - 1)
                                    for (e = r; e < i.length - 1; e++) u(i, e, e + 1)
                                    return (t.PTSKnown = !0), s
                                }
                                function o(t, e, r) {
                                    if (t && e)
                                        for (
                                            var i = Math.min(t.endSN, e.endSN) - e.startSN,
                                            n = e.startSN - t.startSN,
                                            a = Math.max(t.startSN, e.startSN) - e.startSN;
                                            a <= i;
                                            a++
                                        ) {
                                            var s = t.fragments[n + a],
                                                o = e.fragments[a]
                                            if (!s || !o) break
                                            r(s, o, a)
                                        }
                                }
                                function d(t, e) {
                                    var r = e.startSN - t.startSN
                                    if (
                                        ((t = t.fragments),
                                            (e = e.fragments),
                                            !(r < 0 || r > t.length))
                                    )
                                        for (var i = 0; i < e.length; i++) e[i].start += t[r].start
                                }
                                Object.defineProperty(e, '__esModule', { value: !0 }),
                                    r('./src/utils/logger.js'),
                                    (e.addGroupId = function (t, e, r) {
                                        switch (e) {
                                            case 'audio':
                                                t.audioGroupIds || (t.audioGroupIds = []),
                                                    t.audioGroupIds.push(r)
                                                break
                                            case 'text':
                                                t.textGroupIds || (t.textGroupIds = []),
                                                    t.textGroupIds.push(r)
                                        }
                                    }),
                                    (e.updatePTS = u),
                                    (e.updateFragPTSDTS = s),
                                    (e.mergeDetails = function (t, r) {
                                        r.initSegment &&
                                            t.initSegment &&
                                            (r.initSegment = t.initSegment)
                                        var i,
                                            n = 0
                                        if (
                                            (o(t, r, function (t, e) {
                                                ; (n = t.cc - e.cc),
                                                    l.isFinite(t.startPTS) &&
                                                    ((e.start = e.startPTS = t.startPTS),
                                                        (e.endPTS = t.endPTS),
                                                        (e.duration = t.duration),
                                                        (e.backtracked = t.backtracked),
                                                        (e.dropped = t.dropped),
                                                        (i = e)),
                                                    (r.PTSKnown = !0)
                                            }),
                                                r.PTSKnown)
                                        ) {
                                            if (n)
                                                for (var e = r.fragments, a = 0; a < e.length; a++)
                                                    e[a].cc += n
                                            i
                                                ? s(r, i, i.startPTS, i.endPTS, i.startDTS, i.endDTS)
                                                : d(t, r),
                                                (r.PTSKnown = t.PTSKnown)
                                        }
                                    }),
                                    (e.mergeSubtitlePlaylists = function (t, e, r) {
                                        void 0 === r && (r = 0)
                                        var i = -1
                                        if (
                                            (o(t, e, function (t, e, r) {
                                                ; (e.start = t.start), (i = r)
                                            }),
                                                (t = e.fragments),
                                                i < 0)
                                        )
                                            t.forEach(function (t) {
                                                t.start += r
                                            })
                                        else
                                            for (e = i + 1; e < t.length; e++)
                                                t[e].start = t[e - 1].start + t[e - 1].duration
                                    }),
                                    (e.mapFragmentIntersection = o),
                                    (e.adjustSliding = d),
                                    (e.computeReloadInterval = function (t, e, r) {
                                        var i = 1e3 * (e.averagetargetduration || e.targetduration),
                                            n = i / 2
                                        return (
                                            t && e.endSN === t.endSN && (i = n),
                                            r &&
                                            (i = Math.max(n, i - (window.performance.now() - r))),
                                            Math.round(i)
                                        )
                                    })
                            }.call(this, r('./src/polyfills/number.js').Number)
                        },
                        './src/controller/stream-controller.js': function (t, v, _) {
                            !function (o) {
                                var i,
                                    t =
                                        (this && this.__extends) ||
                                        ((i =
                                            Object.setPrototypeOf ||
                                            ({ __proto__: [] } instanceof Array &&
                                                function (t, e) {
                                                    t.__proto__ = e
                                                }) ||
                                            function (t, e) {
                                                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                            }),
                                            function (t, e) {
                                                function r() {
                                                    this.constructor = t
                                                }
                                                i(t, e),
                                                    (t.prototype =
                                                        null === e
                                                            ? Object.create(e)
                                                            : ((r.prototype = e.prototype), new r()))
                                            })
                                Object.defineProperty(v, '__esModule', { value: !0 })
                                var d = _('./src/utils/binary-search.js'),
                                    l = _('./src/utils/buffer-helper.js'),
                                    u = _('./src/demux/demuxer.js'),
                                    c = _('./src/events.js'),
                                    r = _('./src/controller/fragment-tracker.js'),
                                    s = _('./src/loader/fragment.js'),
                                    e = _('./src/loader/playlist-loader.js'),
                                    f = _('./src/controller/level-helper.js')
                                _('./src/utils/time-ranges.js')
                                var n = _('./src/errors.js')
                                _('./src/utils/logger.js')
                                var a,
                                    h = _('./src/utils/discontinuities.js'),
                                    p = _('./src/controller/fragment-finders.js'),
                                    g = _('./src/controller/gap-controller.js'),
                                    y = _('./src/controller/base-stream-controller.js'),
                                    t =
                                        ((a = y.default),
                                            t(m, a),
                                            (m.prototype.startLoad = function (t) {
                                                var e, r, i
                                                this.levels
                                                    ? ((e = this.lastCurrentTime),
                                                        (r = this.hls),
                                                        this.stopLoad(),
                                                        this.setInterval(100),
                                                        (this.level = -1),
                                                        (this.fragLoadError = 0),
                                                        this.startFragRequested ||
                                                        (-1 === (i = r.startLevel) &&
                                                            ((i = 0), (this.bitrateTest = !0)),
                                                            (this.level = r.nextLoadLevel = i),
                                                            (this.loadedmetadata = !1)),
                                                        0 < e && -1 === t && (t = e),
                                                        (this.state = y.State.IDLE),
                                                        (this.nextLoadPosition = this.startPosition = this.lastCurrentTime = t),
                                                        this.tick())
                                                    : ((this.forceStartLoad = !0),
                                                        (this.state = y.State.STOPPED))
                                            }),
                                            (m.prototype.stopLoad = function () {
                                                ; (this.forceStartLoad = !1),
                                                    a.prototype.stopLoad.call(this)
                                            }),
                                            (m.prototype.doTick = function () {
                                                switch (this.state) {
                                                    case y.State.BUFFER_FLUSHING:
                                                        this.fragLoadError = 0
                                                        break
                                                    case y.State.IDLE:
                                                        this._doTickIdle()
                                                        break
                                                    case y.State.WAITING_LEVEL:
                                                        var t = this.levels[this.level]
                                                        t && t.details && (this.state = y.State.IDLE)
                                                        break
                                                    case y.State.FRAG_LOADING_WAITING_RETRY:
                                                        var t = window.performance.now(),
                                                            e = this.retryDate
                                                            ; (!e ||
                                                                e <= t ||
                                                                (this.media && this.media.seeking)) &&
                                                                (this.state = y.State.IDLE)
                                                }
                                                this._checkBuffer(), this._checkFragmentChanged()
                                            }),
                                            (m.prototype._doTickIdle = function () {
                                                var t,
                                                    e,
                                                    r,
                                                    i,
                                                    n = this.hls,
                                                    a = n.config,
                                                    s = this.media
                                                void 0 !== this.levelLastLoaded &&
                                                    (s ||
                                                        (!this.startFragRequested && a.startFragPrefetch)) &&
                                                    ((t = this.loadedmetadata
                                                        ? s.currentTime
                                                        : this.nextLoadPosition),
                                                        (e = n.nextLoadLevel),
                                                        (r = this.levels[e]) &&
                                                        ((i = (i = r.bitrate)
                                                            ? Math.max(
                                                                (8 * a.maxBufferSize) / i,
                                                                a.maxBufferLength,
                                                            )
                                                            : a.maxBufferLength),
                                                            (i = Math.min(i, a.maxMaxBufferLength)),
                                                            (a = l.BufferHelper.bufferInfo(
                                                                this.mediaBuffer || s,
                                                                t,
                                                                a.maxBufferHole,
                                                            )).len >= i ||
                                                            ((this.level = n.nextLoadLevel = e),
                                                                !(n = r.details) ||
                                                                    (n.live && this.levelLastLoaded !== e)
                                                                    ? (this.state = y.State.WAITING_LEVEL)
                                                                    : this._streamEnded(a, n)
                                                                        ? ((t = {}),
                                                                            this.altAudio && (t.type = 'video'),
                                                                            this.hls.trigger(c.default.BUFFER_EOS, t),
                                                                            (this.state = y.State.ENDED))
                                                                        : this._fetchPayloadOrEos(t, a, n))))
                                            }),
                                            (m.prototype._fetchPayloadOrEos = function (t, e, r) {
                                                t = this.fragPrevious
                                                var i = r.fragments,
                                                    n = i.length
                                                if (0 !== n) {
                                                    var a = i[0].start,
                                                        s = i[n - 1].start + i[n - 1].duration
                                                    if (((e = e.end), r.initSegment && !r.initSegment.data))
                                                        var o = r.initSegment
                                                    else if (r.live) {
                                                        if (n < this.config.initialLiveManifestSize) return
                                                        if (
                                                            null ===
                                                            (o = this._ensureFragmentAtLivePoint(
                                                                r,
                                                                e,
                                                                a,
                                                                s,
                                                                t,
                                                                i,
                                                                n,
                                                            ))
                                                        )
                                                            return
                                                    } else e < a && (o = i[0])
                                                        ; (o = o || this._findFragment(a, t, n, i, e, s, r)) &&
                                                            (o.encrypted
                                                                ? this._loadKey(o)
                                                                : this._loadFragment(o))
                                                }
                                            }),
                                            (m.prototype._ensureFragmentAtLivePoint = function (
                                                t,
                                                e,
                                                r,
                                                i,
                                                n,
                                                a,
                                                s,
                                            ) {
                                                var o,
                                                    l = this.hls.config,
                                                    u = this.media
                                                return (
                                                    e <
                                                    Math.max(
                                                        r - l.maxFragLookUpTolerance,
                                                        i -
                                                        (void 0 !== l.liveMaxLatencyDuration
                                                            ? l.liveMaxLatencyDuration
                                                            : l.liveMaxLatencyDurationCount *
                                                            t.targetduration),
                                                    ) &&
                                                    ((e = r = this.liveSyncPosition = this.computeLivePosition(
                                                        r,
                                                        t,
                                                    )),
                                                        u &&
                                                        u.readyState &&
                                                        u.duration > r &&
                                                        (u.currentTime = r),
                                                        (this.nextLoadPosition = r)),
                                                    t.PTSKnown && i < e && u && u.readyState
                                                        ? null
                                                        : this.startFragRequested && !t.PTSKnown
                                                            ? (o = n
                                                                ? t.hasProgramDateTime
                                                                    ? p.findFragmentByPDT(
                                                                        a,
                                                                        n.endProgramDateTime,
                                                                        l.maxFragLookUpTolerance,
                                                                    )
                                                                    : ((e = n.sn + 1) >= t.startSN &&
                                                                        e <= t.endSN &&
                                                                        ((t = a[e - t.startSN]),
                                                                            n.cc === t.cc && (o = t)),
                                                                        o ||
                                                                        d.default.search(a, function (t) {
                                                                            return n.cc - t.cc
                                                                        }))
                                                                : o) || a[Math.min(s - 1, Math.round(s / 2))]
                                                            : o
                                                )
                                            }),
                                            (m.prototype._findFragment = function (
                                                t,
                                                e,
                                                r,
                                                i,
                                                n,
                                                a,
                                                s,
                                            ) {
                                                var o
                                                return (
                                                    (t = this.hls.config),
                                                    (a =
                                                        n < a
                                                            ? p.findFragmentByPTS(
                                                                e,
                                                                i,
                                                                n,
                                                                n > a - t.maxFragLookUpTolerance
                                                                    ? 0
                                                                    : t.maxFragLookUpTolerance,
                                                            )
                                                            : i[r - 1]) &&
                                                    ((r = a.sn - s.startSN),
                                                        (o = e && a.level === e.level),
                                                        (n = i[r - 1]),
                                                        (i = i[r + 1]),
                                                        e &&
                                                        a.sn === e.sn &&
                                                        (o && !a.backtracked
                                                            ? (a =
                                                                a.sn < s.endSN
                                                                    ? (s = e.deltaPTS) &&
                                                                        s > t.maxBufferHole &&
                                                                        e.dropped &&
                                                                        r
                                                                        ? n
                                                                        : i
                                                                    : null)
                                                            : a.backtracked &&
                                                            (i && i.backtracked
                                                                ? (a = i)
                                                                : ((a.dropped = 0),
                                                                    n
                                                                        ? ((a = n).backtracked = !0)
                                                                        : r && (a = null))))),
                                                    a
                                                )
                                            }),
                                            (m.prototype._loadKey = function (t) {
                                                ; (this.state = y.State.KEY_LOADING),
                                                    this.hls.trigger(c.default.KEY_LOADING, { frag: t })
                                            }),
                                            (m.prototype._loadFragment = function (t) {
                                                var e = this.fragmentTracker.getState(t)
                                                    ; (this.fragCurrent = t),
                                                        (this.startFragRequested = !0),
                                                        o.isFinite(t.sn) &&
                                                        !t.bitrateTest &&
                                                        (this.nextLoadPosition = t.start + t.duration),
                                                        t.backtracked ||
                                                            e === r.FragmentState.NOT_LOADED ||
                                                            e === r.FragmentState.PARTIAL
                                                            ? ((t.autoLevel = this.hls.autoLevelEnabled),
                                                                (t.bitrateTest = this.bitrateTest),
                                                                (t.relurl = t.relurl.replace('http://', 'http://')),
                                                                this.hls.trigger(c.default.FRAG_LOADING, {
                                                                    frag: t,
                                                                }),
                                                                this.demuxer ||
                                                                (this.demuxer = new u.default(this.hls, 'main')),
                                                                (this.state = y.State.FRAG_LOADING))
                                                            : e === r.FragmentState.APPENDING &&
                                                            this._reduceMaxBufferLength(t.duration) &&
                                                            this.fragmentTracker.removeFragment(t)
                                            }),
                                            Object.defineProperty(m.prototype, 'state', {
                                                get: function () {
                                                    return this._state
                                                },
                                                set: function (t) {
                                                    var e
                                                    this.state !== t &&
                                                        ((e = this.state),
                                                            (this._state = t),
                                                            this.hls.trigger(c.default.STREAM_STATE_TRANSITION, {
                                                                previousState: e,
                                                                nextState: t,
                                                            }))
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            (m.prototype.getBufferedFrag = function (t) {
                                                return this.fragmentTracker.getBufferedFrag(
                                                    t,
                                                    e.default.LevelType.MAIN,
                                                )
                                            }),
                                            Object.defineProperty(m.prototype, 'currentLevel', {
                                                get: function () {
                                                    var t = this.media
                                                    return (t = t && this.getBufferedFrag(t.currentTime))
                                                        ? t.level
                                                        : -1
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            Object.defineProperty(m.prototype, 'nextBufferedFrag', {
                                                get: function () {
                                                    var t = this.media
                                                    return t
                                                        ? this.followingBufferedFrag(
                                                            this.getBufferedFrag(t.currentTime),
                                                        )
                                                        : null
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            (m.prototype.followingBufferedFrag = function (t) {
                                                return t ? this.getBufferedFrag(t.endPTS + 0.5) : null
                                            }),
                                            Object.defineProperty(m.prototype, 'nextLevel', {
                                                get: function () {
                                                    var t = this.nextBufferedFrag
                                                    return t ? t.level : -1
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            (m.prototype._checkFragmentChanged = function () {
                                                var t,
                                                    e,
                                                    r = this.media
                                                r &&
                                                    r.readyState &&
                                                    !1 === r.seeking &&
                                                    ((e = r.currentTime) > this.lastCurrentTime &&
                                                        (this.lastCurrentTime = e),
                                                        l.BufferHelper.isBuffered(r, e)
                                                            ? (t = this.getBufferedFrag(e))
                                                            : l.BufferHelper.isBuffered(r, e + 0.1) &&
                                                            (t = this.getBufferedFrag(e + 0.1)),
                                                        t &&
                                                        t !== this.fragPlaying &&
                                                        (this.hls.trigger(c.default.FRAG_CHANGED, {
                                                            frag: t,
                                                        }),
                                                            (e = t.level),
                                                            (this.fragPlaying && this.fragPlaying.level === e) ||
                                                            this.hls.trigger(c.default.LEVEL_SWITCHED, {
                                                                level: e,
                                                            }),
                                                            (this.fragPlaying = t)))
                                            }),
                                            (m.prototype.immediateLevelSwitch = function () {
                                                var t, e
                                                this.immediateSwitch ||
                                                    ((this.immediateSwitch = !0),
                                                        (t = this.media)
                                                            ? ((e = t.paused), t.pause())
                                                            : (e = !0),
                                                        (this.previouslyPaused = e)),
                                                    (t = this.fragCurrent) && t.loader && t.loader.abort(),
                                                    (this.fragCurrent = null),
                                                    this.flushMainBuffer(0, o.POSITIVE_INFINITY)
                                            }),
                                            (m.prototype.immediateLevelSwitchEnd = function () {
                                                var t = this.media
                                                t &&
                                                    t.buffered.length &&
                                                    ((this.immediateSwitch = !1),
                                                        l.BufferHelper.isBuffered(t, t.currentTime) &&
                                                        (t.currentTime -= 1e-4),
                                                        this.previouslyPaused || t.play())
                                            }),
                                            (m.prototype.nextLevelSwitch = function () {
                                                var t,
                                                    e,
                                                    r = this.media
                                                r &&
                                                    r.readyState &&
                                                    ((t = this.getBufferedFrag(r.currentTime)) &&
                                                        1 < t.startPTS &&
                                                        this.flushMainBuffer(0, t.startPTS - 1),
                                                        (t = r.paused
                                                            ? 0
                                                            : ((t = this.levels[this.hls.nextLoadLevel]),
                                                                (e = this.fragLastKbps) && this.fragCurrent
                                                                    ? (this.fragCurrent.duration * t.bitrate) /
                                                                    (1e3 * e) +
                                                                    1
                                                                    : 0)),
                                                        (r = this.getBufferedFrag(r.currentTime + t)) &&
                                                        (r = this.followingBufferedFrag(r)) &&
                                                        ((t = this.fragCurrent) &&
                                                            t.loader &&
                                                            t.loader.abort(),
                                                            (this.fragCurrent = null),
                                                            this.flushMainBuffer(
                                                                r.maxStartPTS,
                                                                o.POSITIVE_INFINITY,
                                                            )))
                                            }),
                                            (m.prototype.flushMainBuffer = function (t, e) {
                                                ; (this.state = y.State.BUFFER_FLUSHING),
                                                    (t = { startOffset: t, endOffset: e }),
                                                    this.altAudio && (t.type = 'video'),
                                                    this.hls.trigger(c.default.BUFFER_FLUSHING, t)
                                            }),
                                            (m.prototype.onMediaAttached = function (t) {
                                                ; (t = this.media = this.mediaBuffer = t.media),
                                                    (this.onvseeking = this.onMediaSeeking.bind(this)),
                                                    (this.onvseeked = this.onMediaSeeked.bind(this)),
                                                    (this.onvended = this.onMediaEnded.bind(this)),
                                                    t.addEventListener('seeking', this.onvseeking),
                                                    t.addEventListener('seeked', this.onvseeked),
                                                    t.addEventListener('ended', this.onvended)
                                                var e = this.config
                                                this.levels &&
                                                    e.autoStartLoad &&
                                                    this.hls.startLoad(e.startPosition),
                                                    (this.gapController = new g.default(
                                                        e,
                                                        t,
                                                        this.fragmentTracker,
                                                        this.hls,
                                                    ))
                                            }),
                                            (m.prototype.onMediaDetaching = function () {
                                                var t = this.media
                                                t &&
                                                    t.ended &&
                                                    (this.startPosition = this.lastCurrentTime = 0)
                                                var e = this.levels
                                                e &&
                                                    e.forEach(function (t) {
                                                        t.details &&
                                                            t.details.fragments.forEach(function (t) {
                                                                t.backtracked = void 0
                                                            })
                                                    }),
                                                    t &&
                                                    (t.removeEventListener('seeking', this.onvseeking),
                                                        t.removeEventListener('seeked', this.onvseeked),
                                                        t.removeEventListener('ended', this.onvended),
                                                        (this.onvseeking = this.onvseeked = this.onvended = null)),
                                                    (this.media = this.mediaBuffer = null),
                                                    (this.loadedmetadata = !1),
                                                    this.stopLoad()
                                            }),
                                            (m.prototype.onMediaSeeked = function () {
                                                var t = this.media
                                                o.isFinite(t ? t.currentTime : void 0), this.tick()
                                            }),
                                            (m.prototype.onManifestLoading = function () {
                                                this.hls.trigger(c.default.BUFFER_RESET),
                                                    this.fragmentTracker.removeAllFragments(),
                                                    (this.stalled = !1),
                                                    (this.startPosition = this.lastCurrentTime = 0)
                                            }),
                                            (m.prototype.onManifestParsed = function (t) {
                                                var e,
                                                    r = !1,
                                                    i = !1
                                                t.levels.forEach(function (t) {
                                                    ; (e = t.audioCodec) &&
                                                        (-1 !== e.indexOf('mp4a.40.2') && (r = !0),
                                                            -1 !== e.indexOf('mp4a.40.5') && (i = !0))
                                                }),
                                                    (this.audioCodecSwitch = r && i),
                                                    (this.levels = t.levels),
                                                    (this.startFragRequested = !1),
                                                    ((t = this.config).autoStartLoad ||
                                                        this.forceStartLoad) &&
                                                    this.hls.startLoad(t.startPosition)
                                            }),
                                            (m.prototype.onLevelLoaded = function (t) {
                                                var e = t.details,
                                                    r = t.level,
                                                    i = this.levels[this.levelLastLoaded],
                                                    n = this.levels[r]
                                                t = e.totalduration
                                                var a,
                                                    s = 0
                                                e.live
                                                    ? (a = n.details) && 0 < e.fragments.length
                                                        ? (f.mergeDetails(a, e),
                                                            (s = e.fragments[0].start),
                                                            (this.liveSyncPosition = this.computeLivePosition(
                                                                s,
                                                                a,
                                                            )),
                                                            (e.PTSKnown && o.isFinite(s)) ||
                                                            h.alignStream(this.fragPrevious, i, e))
                                                        : ((e.PTSKnown = !1),
                                                            h.alignStream(this.fragPrevious, i, e))
                                                    : (e.PTSKnown = !1),
                                                    (n.details = e),
                                                    (this.levelLastLoaded = r),
                                                    this.hls.trigger(c.default.LEVEL_UPDATED, {
                                                        details: e,
                                                        level: r,
                                                    }),
                                                    !1 === this.startFragRequested &&
                                                    ((-1 !== this.startPosition &&
                                                        -1 !== this.lastCurrentTime) ||
                                                        ((r = e.startTimeOffset),
                                                            o.isFinite(r)
                                                                ? (r < 0 && (r = s + t + r),
                                                                    (this.startPosition = r))
                                                                : (this.startPosition = e.live
                                                                    ? this.computeLivePosition(s, e)
                                                                    : 0),
                                                            (this.lastCurrentTime = this.startPosition)),
                                                        (this.nextLoadPosition = this.startPosition)),
                                                    this.state === y.State.WAITING_LEVEL &&
                                                    (this.state = y.State.IDLE),
                                                    this.tick()
                                            }),
                                            (m.prototype.onKeyLoaded = function () {
                                                this.state === y.State.KEY_LOADING &&
                                                    ((this.state = y.State.IDLE), this.tick())
                                            }),
                                            (m.prototype.onFragLoaded = function (t) {
                                                var e,
                                                    r,
                                                    i = this.fragCurrent,
                                                    n = this.hls,
                                                    a = this.levels,
                                                    s = this.media,
                                                    o = t.frag
                                                this.state === y.State.FRAG_LOADING &&
                                                    i &&
                                                    'main' === o.type &&
                                                    o.level === i.level &&
                                                    o.sn === i.sn &&
                                                    ((e = t.stats),
                                                        (r = (a = a[i.level]).details),
                                                        (this.bitrateTest = !1),
                                                        (this.stats = e),
                                                        o.bitrateTest && n.nextLoadLevel
                                                            ? ((this.state = y.State.IDLE),
                                                                (this.startFragRequested = !1),
                                                                (e.tparsed = e.tbuffered = window.performance.now()),
                                                                n.trigger(c.default.FRAG_BUFFERED, {
                                                                    stats: e,
                                                                    frag: i,
                                                                    id: 'main',
                                                                }),
                                                                this.tick())
                                                            : 'initSegment' === o.sn
                                                                ? ((this.state = y.State.IDLE),
                                                                    (e.tparsed = e.tbuffered = window.performance.now()),
                                                                    (r.initSegment.data = t.payload),
                                                                    n.trigger(c.default.FRAG_BUFFERED, {
                                                                        stats: e,
                                                                        frag: i,
                                                                        id: 'main',
                                                                    }),
                                                                    this.tick())
                                                                : ((this.state = y.State.PARSING),
                                                                    (this.pendingBuffering = !0),
                                                                    (this.appended = !1),
                                                                    o.bitrateTest &&
                                                                    ((o.bitrateTest = !1),
                                                                        this.fragmentTracker.onFragLoaded({ frag: o })),
                                                                    (n = !(s && s.seeking) && (r.PTSKnown || !r.live)),
                                                                    (s = r.initSegment ? r.initSegment.data : []),
                                                                    (o = this._getAudioCodec(a)),
                                                                    (this.demuxer =
                                                                        this.demuxer ||
                                                                        new u.default(this.hls, 'main')).push(
                                                                            t.payload,
                                                                            s,
                                                                            o,
                                                                            a.videoCodec,
                                                                            i,
                                                                            r.totalduration,
                                                                            n,
                                                                        ))),
                                                    (this.fragLoadError = 0)
                                            }),
                                            (m.prototype.onFragParsingInitSegment = function (t) {
                                                var e = this.fragCurrent,
                                                    r = t.frag
                                                if (
                                                    e &&
                                                    'main' === t.id &&
                                                    r.sn === e.sn &&
                                                    r.level === e.level &&
                                                    this.state === y.State.PARSING
                                                ) {
                                                    var i,
                                                        n,
                                                        a,
                                                        r = void 0
                                                    for (r in ((e = t.tracks).audio &&
                                                        this.altAudio &&
                                                        delete e.audio,
                                                        (i = e.audio) &&
                                                        ((n = this.levels[this.level].audioCodec),
                                                            (a = navigator.userAgent.toLowerCase()),
                                                            n &&
                                                            this.audioCodecSwap &&
                                                            (n =
                                                                -1 !== n.indexOf('mp4a.40.5')
                                                                    ? 'mp4a.40.2'
                                                                    : 'mp4a.40.5'),
                                                            this.audioCodecSwitch &&
                                                            1 !== i.metadata.channelCount &&
                                                            -1 === a.indexOf('firefox') &&
                                                            (n = 'mp4a.40.5'),
                                                            -1 !== a.indexOf('android') &&
                                                            'audio/mpeg' !== i.container &&
                                                            (n = 'mp4a.40.2'),
                                                            (i.levelCodec = n),
                                                            (i.id = t.id)),
                                                        (i = e.video) &&
                                                        ((i.levelCodec = this.levels[this.level].videoCodec),
                                                            (i.id = t.id)),
                                                        this.hls.trigger(c.default.BUFFER_CODECS, e),
                                                        e))
                                                        (t = (i = e[r]).initSegment) &&
                                                            ((this.pendingBuffering = this.appended = !0),
                                                                this.hls.trigger(c.default.BUFFER_APPENDING, {
                                                                    type: r,
                                                                    data: t,
                                                                    parent: 'main',
                                                                    content: 'initSegment',
                                                                }))
                                                    this.tick()
                                                }
                                            }),
                                            (m.prototype.onFragParsingData = function (e) {
                                                var r = this,
                                                    t = this.fragCurrent,
                                                    i = e.frag
                                                if (
                                                    t &&
                                                    'main' === e.id &&
                                                    i.sn === t.sn &&
                                                    i.level === t.level &&
                                                    ('audio' !== e.type || !this.altAudio) &&
                                                    this.state === y.State.PARSING
                                                ) {
                                                    if (
                                                        ((i = this.levels[this.level]),
                                                            o.isFinite(e.endPTS) ||
                                                            ((e.endPTS = e.startPTS + t.duration),
                                                                (e.endDTS = e.startDTS + t.duration)),
                                                            !0 === e.hasAudio &&
                                                            t.addElementaryStream(
                                                                s.default.ElementaryStreamTypes.AUDIO,
                                                            ),
                                                            !0 === e.hasVideo &&
                                                            t.addElementaryStream(
                                                                s.default.ElementaryStreamTypes.VIDEO,
                                                            ),
                                                            'video' === e.type)
                                                    )
                                                        if (((t.dropped = e.dropped), t.dropped)) {
                                                            if (!t.backtracked) {
                                                                var n = i.details
                                                                if (!n || t.sn !== n.startSN)
                                                                    return (
                                                                        this.fragmentTracker.removeFragment(t),
                                                                        (t.backtracked = !0),
                                                                        (this.nextLoadPosition = e.startPTS),
                                                                        (this.state = y.State.IDLE),
                                                                        (this.fragPrevious = t),
                                                                        void this.tick()
                                                                    )
                                                            }
                                                        } else t.backtracked = !1
                                                    var t = f.updateFragPTSDTS(
                                                        i.details,
                                                        t,
                                                        e.startPTS,
                                                        e.endPTS,
                                                        e.startDTS,
                                                        e.endDTS,
                                                    ),
                                                        a = this.hls
                                                    a.trigger(c.default.LEVEL_PTS_UPDATED, {
                                                        details: i.details,
                                                        level: this.level,
                                                        drift: t,
                                                        type: e.type,
                                                        start: e.startPTS,
                                                        end: e.endPTS,
                                                    }),
                                                        [e.data1, e.data2].forEach(function (t) {
                                                            t &&
                                                                t.length &&
                                                                r.state === y.State.PARSING &&
                                                                ((r.appended = !0),
                                                                    (r.pendingBuffering = !0),
                                                                    a.trigger(c.default.BUFFER_APPENDING, {
                                                                        type: e.type,
                                                                        data: t,
                                                                        parent: 'main',
                                                                        content: 'data',
                                                                    }))
                                                        }),
                                                        this.tick()
                                                }
                                            }),
                                            (m.prototype.onFragParsed = function (t) {
                                                var e = this.fragCurrent,
                                                    r = t.frag
                                                e &&
                                                    'main' === t.id &&
                                                    r.sn === e.sn &&
                                                    r.level === e.level &&
                                                    this.state === y.State.PARSING &&
                                                    ((this.stats.tparsed = window.performance.now()),
                                                        (this.state = y.State.PARSED),
                                                        this._checkAppendedParsed())
                                            }),
                                            (m.prototype.onAudioTrackSwitching = function (t) {
                                                var e = t.id
                                                t.url ||
                                                    (this.mediaBuffer !== this.media &&
                                                        ((this.mediaBuffer = this.media),
                                                            (t = this.fragCurrent).loader && t.loader.abort(),
                                                            (this.fragPrevious = this.fragCurrent = null),
                                                            this.demuxer &&
                                                            (this.demuxer.destroy(), (this.demuxer = null)),
                                                            (this.state = y.State.IDLE)),
                                                        (t = this.hls).trigger(c.default.BUFFER_FLUSHING, {
                                                            startOffset: 0,
                                                            endOffset: o.POSITIVE_INFINITY,
                                                            type: 'audio',
                                                        }),
                                                        t.trigger(c.default.AUDIO_TRACK_SWITCHED, { id: e }),
                                                        (this.altAudio = !1))
                                            }),
                                            (m.prototype.onAudioTrackSwitched = function (t) {
                                                var e
                                                !(t = !!this.hls.audioTracks[t.id].url) ||
                                                    ((e = this.videoBuffer) &&
                                                        this.mediaBuffer !== e &&
                                                        (this.mediaBuffer = e)),
                                                    (this.altAudio = t),
                                                    this.tick()
                                            }),
                                            (m.prototype.onBufferCreated = function (t) {
                                                var e,
                                                    r = !1
                                                for (e in (t = t.tracks)) {
                                                    var i,
                                                        n = t[e]
                                                    'main' === n.id
                                                        ? ((i = n),
                                                            'video' === e && (this.videoBuffer = t[e].buffer))
                                                        : (r = !0)
                                                }
                                                this.mediaBuffer = r && i ? i.buffer : this.media
                                            }),
                                            (m.prototype.onBufferAppended = function (t) {
                                                var e
                                                'main' === t.parent &&
                                                    (((e = this.state) !== y.State.PARSING &&
                                                        e !== y.State.PARSED) ||
                                                        ((this.pendingBuffering = 0 < t.pending),
                                                            this._checkAppendedParsed()))
                                            }),
                                            (m.prototype._checkAppendedParsed = function () {
                                                var t, e
                                                this.state !== y.State.PARSED ||
                                                    (this.appended && this.pendingBuffering) ||
                                                    ((t = this.fragCurrent) &&
                                                        ((this.fragPrevious = t),
                                                            ((e = this
                                                                .stats).tbuffered = window.performance.now()),
                                                            (this.fragLastKbps = Math.round(
                                                                (8 * e.total) / (e.tbuffered - e.tfirst),
                                                            )),
                                                            this.hls.trigger(c.default.FRAG_BUFFERED, {
                                                                stats: e,
                                                                frag: t,
                                                                id: 'main',
                                                            }),
                                                            (this.state = y.State.IDLE)),
                                                        this.tick())
                                            }),
                                            (m.prototype.onError = function (t) {
                                                var e = t.frag || this.fragCurrent
                                                if (!e || 'main' === e.type)
                                                    switch (
                                                    ((e =
                                                        !!this.media &&
                                                        l.BufferHelper.isBuffered(
                                                            this.media,
                                                            this.media.currentTime,
                                                        ) &&
                                                        l.BufferHelper.isBuffered(
                                                            this.media,
                                                            this.media.currentTime + 0.5,
                                                        )),
                                                        t.details)
                                                    ) {
                                                        case n.ErrorDetails.FRAG_LOAD_ERROR:
                                                        case n.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                                        case n.ErrorDetails.KEY_LOAD_ERROR:
                                                        case n.ErrorDetails.KEY_LOAD_TIMEOUT:
                                                            t.fatal ||
                                                                (this.fragLoadError + 1 <=
                                                                    this.config.fragLoadingMaxRetry
                                                                    ? ((t = Math.min(
                                                                        Math.pow(2, this.fragLoadError) *
                                                                        this.config.fragLoadingRetryDelay,
                                                                        this.config.fragLoadingMaxRetryTimeout,
                                                                    )),
                                                                        (this.retryDate =
                                                                            window.performance.now() + t),
                                                                        this.loadedmetadata ||
                                                                        ((this.startFragRequested = !1),
                                                                            (this.nextLoadPosition = this.startPosition)),
                                                                        this.fragLoadError++,
                                                                        (this.state =
                                                                            y.State.FRAG_LOADING_WAITING_RETRY))
                                                                    : ((t.fatal = !0),
                                                                        (this.state = y.State.ERROR)))
                                                            break
                                                        case n.ErrorDetails.LEVEL_LOAD_ERROR:
                                                        case n.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                                                            this.state !== y.State.ERROR &&
                                                                (t.fatal
                                                                    ? (this.state = y.State.ERROR)
                                                                    : t.levelRetry ||
                                                                    this.state !== y.State.WAITING_LEVEL ||
                                                                    (this.state = y.State.IDLE))
                                                            break
                                                        case n.ErrorDetails.BUFFER_FULL_ERROR:
                                                            'main' !== t.parent ||
                                                                (this.state !== y.State.PARSING &&
                                                                    this.state !== y.State.PARSED) ||
                                                                (e
                                                                    ? (this._reduceMaxBufferLength(
                                                                        this.config.maxBufferLength,
                                                                    ),
                                                                        (this.state = y.State.IDLE))
                                                                    : ((this.fragCurrent = null),
                                                                        this.flushMainBuffer(0, o.POSITIVE_INFINITY)))
                                                    }
                                            }),
                                            (m.prototype._reduceMaxBufferLength = function (t) {
                                                var e = this.config
                                                return (
                                                    e.maxMaxBufferLength >= t &&
                                                    ((e.maxMaxBufferLength /= 2), !0)
                                                )
                                            }),
                                            (m.prototype._checkBuffer = function () {
                                                var t = this.media
                                                t &&
                                                    0 !== t.readyState &&
                                                    ((t = (this.mediaBuffer || t).buffered),
                                                        !this.loadedmetadata && t.length
                                                            ? ((this.loadedmetadata = !0), this._seekToStartPos())
                                                            : this.immediateSwitch
                                                                ? this.immediateLevelSwitchEnd()
                                                                : this.gapController.poll(this.lastCurrentTime, t))
                                            }),
                                            (m.prototype.onFragLoadEmergencyAborted = function () {
                                                ; (this.state = y.State.IDLE),
                                                    this.loadedmetadata ||
                                                    ((this.startFragRequested = !1),
                                                        (this.nextLoadPosition = this.startPosition)),
                                                    this.tick()
                                            }),
                                            (m.prototype.onBufferFlushed = function () {
                                                var t = this.mediaBuffer || this.media
                                                t &&
                                                    this.fragmentTracker.detectEvictedFragments(
                                                        s.default.ElementaryStreamTypes.VIDEO,
                                                        t.buffered,
                                                    ),
                                                    (this.state = y.State.IDLE),
                                                    (this.fragPrevious = null)
                                            }),
                                            (m.prototype.swapAudioCodec = function () {
                                                this.audioCodecSwap = !this.audioCodecSwap
                                            }),
                                            (m.prototype.computeLivePosition = function (t, e) {
                                                return (
                                                    t +
                                                    Math.max(
                                                        0,
                                                        e.totalduration -
                                                        (void 0 !== this.config.liveSyncDuration
                                                            ? this.config.liveSyncDuration
                                                            : this.config.liveSyncDurationCount *
                                                            e.targetduration),
                                                    )
                                                )
                                            }),
                                            (m.prototype._seekToStartPos = function () {
                                                var t = this.media,
                                                    e = t.currentTime,
                                                    r = t.seeking ? e : this.startPosition
                                                e !== r && (t.currentTime = r)
                                            }),
                                            (m.prototype._getAudioCodec = function (t) {
                                                return (
                                                    (t = this.config.defaultAudioCodec || t.audioCodec),
                                                    (t =
                                                        this.audioCodecSwap && t
                                                            ? -1 !== t.indexOf('mp4a.40.5')
                                                                ? 'mp4a.40.2'
                                                                : 'mp4a.40.5'
                                                            : t)
                                                )
                                            }),
                                            Object.defineProperty(m.prototype, 'liveSyncPosition', {
                                                get: function () {
                                                    return this._liveSyncPosition
                                                },
                                                set: function (t) {
                                                    this._liveSyncPosition = t
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            m)
                                function m(t, e) {
                                    var r =
                                        a.call(
                                            this,
                                            t,
                                            c.default.MEDIA_ATTACHED,
                                            c.default.MEDIA_DETACHING,
                                            c.default.MANIFEST_LOADING,
                                            c.default.MANIFEST_PARSED,
                                            c.default.LEVEL_LOADED,
                                            c.default.KEY_LOADED,
                                            c.default.FRAG_LOADED,
                                            c.default.FRAG_LOAD_EMERGENCY_ABORTED,
                                            c.default.FRAG_PARSING_INIT_SEGMENT,
                                            c.default.FRAG_PARSING_DATA,
                                            c.default.FRAG_PARSED,
                                            c.default.ERROR,
                                            c.default.AUDIO_TRACK_SWITCHING,
                                            c.default.AUDIO_TRACK_SWITCHED,
                                            c.default.BUFFER_CREATED,
                                            c.default.BUFFER_APPENDED,
                                            c.default.BUFFER_FLUSHED,
                                        ) || this
                                    return (
                                        (r.fragmentTracker = e),
                                        (r.config = t.config),
                                        (r.audioCodecSwap = !1),
                                        (r._state = y.State.STOPPED),
                                        (r.stallReported = !1),
                                        (r.gapController = null),
                                        r
                                    )
                                }
                                v.default = t
                            }.call(this, _('./src/polyfills/number.js').Number)
                        },
                        './src/controller/subtitle-stream-controller.js': function (
                            t,
                            e,
                            r,
                        ) {
                            var i,
                                n =
                                    (this && this.__extends) ||
                                    ((i =
                                        Object.setPrototypeOf ||
                                        ({ __proto__: [] } instanceof Array &&
                                            function (t, e) {
                                                t.__proto__ = e
                                            }) ||
                                        function (t, e) {
                                            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                        }),
                                        function (t, e) {
                                            function r() {
                                                this.constructor = t
                                            }
                                            i(t, e),
                                                (t.prototype =
                                                    null === e
                                                        ? Object.create(e)
                                                        : ((r.prototype = e.prototype), new r()))
                                        })
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var l = r('./src/events.js')
                            r('./src/utils/logger.js')
                            var a,
                                s = r('./src/crypt/decrypter.js'),
                                u = r('./src/utils/buffer-helper.js'),
                                d = r('./src/controller/fragment-finders.js'),
                                c = r('./src/controller/fragment-tracker.js'),
                                f = r('./src/controller/base-stream-controller.js'),
                                o = r('./src/controller/level-helper.js'),
                                h = window.performance
                            function p(t, e) {
                                var r =
                                    a.call(
                                        this,
                                        t,
                                        l.default.MEDIA_ATTACHED,
                                        l.default.MEDIA_DETACHING,
                                        l.default.ERROR,
                                        l.default.KEY_LOADED,
                                        l.default.FRAG_LOADED,
                                        l.default.SUBTITLE_TRACKS_UPDATED,
                                        l.default.SUBTITLE_TRACK_SWITCH,
                                        l.default.SUBTITLE_TRACK_LOADED,
                                        l.default.SUBTITLE_FRAG_PROCESSED,
                                        l.default.LEVEL_UPDATED,
                                    ) || this
                                return (
                                    (r.fragmentTracker = e),
                                    (r.config = t.config),
                                    (r.state = f.State.STOPPED),
                                    (r.tracks = []),
                                    (r.tracksBuffered = []),
                                    (r.currentTrackId = -1),
                                    (r.decrypter = new s.default(t, t.config)),
                                    (r.lastAVStart = 0),
                                    (r._onMediaSeeking = r.onMediaSeeking.bind(r)),
                                    r
                                )
                            }
                            ; (a = f.default),
                                n(p, a),
                                (p.prototype.onSubtitleFragProcessed = function (t) {
                                    var e = t.frag
                                    if (
                                        ((t = t.success),
                                            (this.fragPrevious = e),
                                            (this.state = f.State.IDLE),
                                            (t = t && this.tracksBuffered[this.currentTrackId]))
                                    ) {
                                        for (var r, i = e.start, n = 0; n < t.length; n++)
                                            if (i >= t[n].start && i <= t[n].end) {
                                                r = t[n]
                                                break
                                            }
                                        ; (e = e.start + e.duration),
                                            r ? (r.end = e) : ((r = { start: i, end: e }), t.push(r))
                                    }
                                }),
                                (p.prototype.onMediaAttached = function (t) {
                                    ; (this.media = t = t.media),
                                        t.addEventListener('seeking', this._onMediaSeeking),
                                        (this.state = f.State.IDLE)
                                }),
                                (p.prototype.onMediaDetaching = function () {
                                    this.media.removeEventListener(
                                        'seeking',
                                        this._onMediaSeeking,
                                    ),
                                        (this.media = null),
                                        (this.state = f.State.STOPPED)
                                }),
                                (p.prototype.onError = function (t) {
                                    ; (t = t.frag) &&
                                        'subtitle' === t.type &&
                                        (this.state = f.State.IDLE)
                                }),
                                (p.prototype.onSubtitleTracksUpdated = function (t) {
                                    var e = this
                                        ; (this.tracksBuffered = []),
                                            (this.tracks = t.subtitleTracks),
                                            this.tracks.forEach(function (t) {
                                                e.tracksBuffered[t.id] = []
                                            })
                                }),
                                (p.prototype.onSubtitleTrackSwitch = function (t) {
                                    ; (this.currentTrackId = t.id),
                                        this.tracks && -1 !== this.currentTrackId
                                            ? (t = this.tracks[this.currentTrackId]) &&
                                            t.details &&
                                            this.setInterval(500)
                                            : this.clearInterval()
                                }),
                                (p.prototype.onSubtitleTrackLoaded = function (t) {
                                    var e = t.id
                                    t = t.details
                                    var r = this.currentTrackId,
                                        i = this.tracks,
                                        n = i[r]
                                    e >= i.length ||
                                        e !== r ||
                                        !n ||
                                        (t.live &&
                                            o.mergeSubtitlePlaylists(n.details, t, this.lastAVStart),
                                            (n.details = t),
                                            this.setInterval(500))
                                }),
                                (p.prototype.onKeyLoaded = function () {
                                    this.state === f.State.KEY_LOADING &&
                                        (this.state = f.State.IDLE)
                                }),
                                (p.prototype.onFragLoaded = function (t) {
                                    var r,
                                        e = this.fragCurrent,
                                        i = t.frag.decryptdata,
                                        n = t.frag,
                                        a = this.hls
                                    this.state === f.State.FRAG_LOADING &&
                                        e &&
                                        'subtitle' === t.frag.type &&
                                        e.sn === t.frag.sn &&
                                        0 < t.payload.byteLength &&
                                        i &&
                                        i.key &&
                                        'AES-128' === i.method &&
                                        ((r = h.now()),
                                            this.decrypter.decrypt(
                                                t.payload,
                                                i.key.buffer,
                                                i.iv.buffer,
                                                function (t) {
                                                    var e = h.now()
                                                    a.trigger(l.default.FRAG_DECRYPTED, {
                                                        frag: n,
                                                        payload: t,
                                                        stats: { tstart: r, tdecrypt: e },
                                                    })
                                                },
                                            ))
                                }),
                                (p.prototype.onLevelUpdated = function (t) {
                                    ; (t = t.details.fragments),
                                        (this.lastAVStart = t.length ? t[0].start : 0)
                                }),
                                (p.prototype.doTick = function () {
                                    var t, e, r, i, n, a, s, o
                                    this.media
                                        ? this.state === f.State.IDLE &&
                                        ((r = this.config),
                                            (a = this.currentTrackId),
                                            (t = this.fragmentTracker),
                                            (n = this.media),
                                            (s = this.tracks) &&
                                            s[a] &&
                                            s[a].details &&
                                            ((i = r.maxBufferHole),
                                                (e = r.maxFragLookUpTolerance),
                                                (r = Math.min(r.maxBufferLength, r.maxMaxBufferLength)),
                                                (n = (i = u.BufferHelper.bufferedInfo(
                                                    this._getBuffered(),
                                                    n.currentTime,
                                                    i,
                                                )).end),
                                                (o = (s = (a = s[a].details).fragments).length),
                                                i.len > r ||
                                                ((r = void 0),
                                                    (i = this.fragPrevious),
                                                    (r =
                                                        n < s[o - 1].start + s[o - 1].duration
                                                            ? (r =
                                                                i && a.hasProgramDateTime
                                                                    ? d.findFragmentByPDT(
                                                                        s,
                                                                        i.endProgramDateTime,
                                                                        e,
                                                                    )
                                                                    : r) || d.findFragmentByPTS(i, s, n, e)
                                                            : s[o - 1]) && r.encrypted
                                                        ? ((this.state = f.State.KEY_LOADING),
                                                            this.hls.trigger(l.default.KEY_LOADING, {
                                                                frag: r,
                                                            }))
                                                        : r &&
                                                        t.getState(r) === c.FragmentState.NOT_LOADED &&
                                                        ((this.fragCurrent = r),
                                                            (this.state = f.State.FRAG_LOADING),
                                                            this.hls.trigger(l.default.FRAG_LOADING, {
                                                                frag: r,
                                                            })))))
                                        : (this.state = f.State.IDLE)
                                }),
                                (p.prototype.stopLoad = function () {
                                    ; (this.lastAVStart = 0), a.prototype.stopLoad.call(this)
                                }),
                                (p.prototype._getBuffered = function () {
                                    return this.tracksBuffered[this.currentTrackId] || []
                                }),
                                (p.prototype.onMediaSeeking = function () {
                                    this.fragPrevious = null
                                }),
                                (e.SubtitleStreamController = p)
                        },
                        './src/controller/subtitle-track-controller.js': function (
                            t,
                            u,
                            d,
                        ) {
                            !function (i) {
                                function n(t) {
                                    for (var e = [], r = 0; r < t.length; r++) {
                                        var i = t[r]
                                        'subtitles' === i.kind && i.label && e.push(t[r])
                                    }
                                    return e
                                }
                                var a,
                                    t =
                                        (this && this.__extends) ||
                                        ((a =
                                            Object.setPrototypeOf ||
                                            ({ __proto__: [] } instanceof Array &&
                                                function (t, e) {
                                                    t.__proto__ = e
                                                }) ||
                                            function (t, e) {
                                                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                            }),
                                            function (t, e) {
                                                function r() {
                                                    this.constructor = t
                                                }
                                                a(t, e),
                                                    (t.prototype =
                                                        null === e
                                                            ? Object.create(e)
                                                            : ((r.prototype = e.prototype), new r()))
                                            })
                                Object.defineProperty(u, '__esModule', { value: !0 })
                                var s = d('./src/events.js'),
                                    e = d('./src/event-handler.js')
                                d('./src/utils/logger.js')
                                var r,
                                    o = d('./src/controller/level-helper.js'),
                                    t =
                                        ((r = e.default),
                                            t(l, r),
                                            (l.prototype.destroy = function () {
                                                e.default.prototype.destroy.call(this)
                                            }),
                                            (l.prototype.onMediaAttached = function (t) {
                                                var e = this
                                                    ; (this.media = t.media) &&
                                                        (this.queuedDefaultTrack &&
                                                            ((this.subtitleTrack = this.queuedDefaultTrack),
                                                                delete this.queuedDefaultTrack),
                                                            (this.trackChangeListener = this._onTextTracksChanged.bind(
                                                                this,
                                                            )),
                                                            (this.useTextTrackPolling = !(
                                                                this.media.textTracks &&
                                                                'onchange' in this.media.textTracks
                                                            ))
                                                                ? (this.subtitlePollingInterval = setInterval(
                                                                    function () {
                                                                        e.trackChangeListener()
                                                                    },
                                                                    500,
                                                                ))
                                                                : this.media.textTracks.addEventListener(
                                                                    'change',
                                                                    this.trackChangeListener,
                                                                ))
                                            }),
                                            (l.prototype.onMediaDetaching = function () {
                                                this.media &&
                                                    (this.useTextTrackPolling
                                                        ? clearInterval(this.subtitlePollingInterval)
                                                        : this.media.textTracks.removeEventListener(
                                                            'change',
                                                            this.trackChangeListener,
                                                        ),
                                                        (this.media = null))
                                            }),
                                            (l.prototype.onManifestLoaded = function (t) {
                                                var e = this
                                                    ; (this.tracks = t = t.subtitles || []),
                                                        this.hls.trigger(s.default.SUBTITLE_TRACKS_UPDATED, {
                                                            subtitleTracks: t,
                                                        }),
                                                        t.forEach(function (t) {
                                                            t.default &&
                                                                (e.media
                                                                    ? (e.subtitleTrack = t.id)
                                                                    : (e.queuedDefaultTrack = t.id))
                                                        })
                                            }),
                                            (l.prototype.onSubtitleTrackLoaded = function (t) {
                                                var e = this,
                                                    r = t.id,
                                                    i = t.details,
                                                    n = this.trackId,
                                                    a = this.tracks,
                                                    s = a[n]
                                                !(r >= a.length || r !== n || !s || this.stopped) &&
                                                    i.live
                                                    ? ((t = o.computeReloadInterval(
                                                        s.details,
                                                        i,
                                                        t.stats.trequest,
                                                    )),
                                                        (this.timer = setTimeout(function () {
                                                            e._loadCurrentTrack()
                                                        }, t)))
                                                    : this._clearReloadTimer()
                                            }),
                                            (l.prototype.startLoad = function () {
                                                ; (this.stopped = !1), this._loadCurrentTrack()
                                            }),
                                            (l.prototype.stopLoad = function () {
                                                ; (this.stopped = !0), this._clearReloadTimer()
                                            }),
                                            Object.defineProperty(l.prototype, 'subtitleTracks', {
                                                get: function () {
                                                    return this.tracks
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            Object.defineProperty(l.prototype, 'subtitleTrack', {
                                                get: function () {
                                                    return this.trackId
                                                },
                                                set: function (t) {
                                                    this.trackId !== t &&
                                                        (this._toggleTrackModes(t),
                                                            this._setSubtitleTrackInternal(t))
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            (l.prototype._clearReloadTimer = function () {
                                                this.timer &&
                                                    (clearTimeout(this.timer), (this.timer = null))
                                            }),
                                            (l.prototype._loadCurrentTrack = function () {
                                                var t = this.trackId,
                                                    e = this.tracks[t]
                                                t < 0 ||
                                                    !e ||
                                                    (e.details && !e.details.live) ||
                                                    this.hls.trigger(s.default.SUBTITLE_TRACK_LOADING, {
                                                        url: e.url,
                                                        id: t,
                                                    })
                                            }),
                                            (l.prototype._toggleTrackModes = function (t) {
                                                var e = this.media,
                                                    r = this.subtitleDisplay,
                                                    i = this.trackId
                                                e &&
                                                    ((e = n(e.textTracks)),
                                                        -1 === t
                                                            ? [].slice.call(e).forEach(function (t) {
                                                                t.mode = 'disabled'
                                                            })
                                                            : (i = e[i]) && (i.mode = 'disabled'),
                                                        (t = e[t]) && (t.mode = r ? 'showing' : 'hidden'))
                                            }),
                                            (l.prototype._setSubtitleTrackInternal = function (t) {
                                                var e = this.hls,
                                                    r = this.tracks
                                                !i.isFinite(t) ||
                                                    t < -1 ||
                                                    t >= r.length ||
                                                    ((this.trackId = t),
                                                        e.trigger(s.default.SUBTITLE_TRACK_SWITCH, { id: t }),
                                                        this._loadCurrentTrack())
                                            }),
                                            (l.prototype._onTextTracksChanged = function () {
                                                if (this.media) {
                                                    for (
                                                        var t = -1, e = n(this.media.textTracks), r = 0;
                                                        r < e.length;
                                                        r++
                                                    )
                                                        if ('hidden' === e[r].mode) t = r
                                                        else if ('showing' === e[r].mode) {
                                                            t = r
                                                            break
                                                        }
                                                    this.subtitleTrack = t
                                                }
                                            }),
                                            l)
                                function l(t) {
                                    return (
                                        ((t =
                                            r.call(
                                                this,
                                                t,
                                                s.default.MEDIA_ATTACHED,
                                                s.default.MEDIA_DETACHING,
                                                s.default.MANIFEST_LOADED,
                                                s.default.SUBTITLE_TRACK_LOADED,
                                            ) || this).tracks = []),
                                        (t.trackId = -1),
                                        (t.media = null),
                                        (t.stopped = !0),
                                        (t.subtitleDisplay = !0),
                                        t
                                    )
                                }
                                u.default = t
                            }.call(this, d('./src/polyfills/number.js').Number)
                        },
                        './src/controller/timeline-controller.js': function (t, c, f) {
                            !function (i) {
                                var n,
                                    t =
                                        (this && this.__extends) ||
                                        ((n =
                                            Object.setPrototypeOf ||
                                            ({ __proto__: [] } instanceof Array &&
                                                function (t, e) {
                                                    t.__proto__ = e
                                                }) ||
                                            function (t, e) {
                                                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                            }),
                                            function (t, e) {
                                                function r() {
                                                    this.constructor = t
                                                }
                                                n(t, e),
                                                    (t.prototype =
                                                        null === e
                                                            ? Object.create(e)
                                                            : ((r.prototype = e.prototype), new r()))
                                            })
                                Object.defineProperty(c, '__esModule', { value: !0 })
                                var s = f('./src/events.js'),
                                    e = f('./src/event-handler.js'),
                                    a = f('./src/utils/cea-608-parser.js'),
                                    o = f('./src/utils/output-filter.js'),
                                    l = f('./src/utils/webvtt-parser.js')
                                f('./src/utils/logger.js')
                                var u,
                                    d = f('./src/utils/texttrack-utils.js'),
                                    t =
                                        ((u = e.default),
                                            t(r, u),
                                            (r.prototype.addCues = function (t, e, r, i) {
                                                for (
                                                    var n = this.cueRanges, a = !1, s = n.length;
                                                    s--;

                                                ) {
                                                    var o = n[s],
                                                        l = Math.min(o[1], r) - Math.max(o[0], e)
                                                    if (
                                                        0 <= l &&
                                                        ((o[0] = Math.min(o[0], e)),
                                                            (o[1] = Math.max(o[1], r)),
                                                            (a = !0),
                                                            0.5 < l / (r - e))
                                                    )
                                                        return
                                                }
                                                a || n.push([e, r]),
                                                    this.Cues.newCue(this.captionsTracks[t], e, r, i)
                                            }),
                                            (r.prototype.onInitPtsFound = function (t) {
                                                var e = this
                                                'main' === t.id && (this.initPTS[t.frag.cc] = t.initPTS),
                                                    this.unparsedVttFrags.length &&
                                                    ((t = this.unparsedVttFrags),
                                                        (this.unparsedVttFrags = []),
                                                        t.forEach(function (t) {
                                                            e.onFragLoaded(t)
                                                        }))
                                            }),
                                            (r.prototype.getExistingTrack = function (t) {
                                                var e = this.media
                                                if (e)
                                                    for (var r = 0; r < e.textTracks.length; r++) {
                                                        var i = e.textTracks[r]
                                                        if (i[t]) return i
                                                    }
                                                return null
                                            }),
                                            (r.prototype.createCaptionsTrack = function (t) {
                                                var e,
                                                    r = this.captionsProperties[t],
                                                    i = r.label,
                                                    n = r.languageCode
                                                    ; (r = this.captionsTracks)[t] ||
                                                        ((e = this.getExistingTrack(t))
                                                            ? ((r[t] = e),
                                                                d.clearCurrentCues(r[t]),
                                                                d.sendAddTrackEvent(r[t], this.media))
                                                            : (i = this.createTextTrack('captions', i, n)) &&
                                                            ((i[t] = !0), (r[t] = i)))
                                            }),
                                            (r.prototype.createTextTrack = function (t, e, r) {
                                                var i = this.media
                                                if (i) return i.addTextTrack(t, e, r)
                                            }),
                                            (r.prototype.destroy = function () {
                                                e.default.prototype.destroy.call(this)
                                            }),
                                            (r.prototype.onMediaAttaching = function (t) {
                                                ; (this.media = t.media), this._cleanTracks()
                                            }),
                                            (r.prototype.onMediaDetaching = function () {
                                                var e = this.captionsTracks
                                                Object.keys(e).forEach(function (t) {
                                                    d.clearCurrentCues(e[t]), delete e[t]
                                                })
                                            }),
                                            (r.prototype.onManifestLoading = function () {
                                                ; (this.prevCC = this.lastSn = -1),
                                                    (this.vttCCs = {
                                                        ccOffset: 0,
                                                        presentationOffset: 0,
                                                        0: { start: 0, prevCC: -1, new: !1 },
                                                    }),
                                                    this._cleanTracks()
                                            }),
                                            (r.prototype._cleanTracks = function () {
                                                var t = this.media
                                                if ((t = t && t.textTracks))
                                                    for (var e = 0; e < t.length; e++)
                                                        d.clearCurrentCues(t[e])
                                            }),
                                            (r.prototype.onManifestLoaded = function (t) {
                                                var a,
                                                    s = this
                                                    ; (this.textTracks = []),
                                                        (this.unparsedVttFrags = this.unparsedVttFrags || []),
                                                        (this.initPTS = []),
                                                        (this.cueRanges = []),
                                                        this.config.enableWebVTT &&
                                                        ((this.tracks = t.subtitles || []),
                                                            (a = this.media ? this.media.textTracks : []),
                                                            this.tracks.forEach(function (t, e) {
                                                                var r
                                                                if (e < a.length) {
                                                                    e = null
                                                                    for (var i = 0; i < a.length; i++) {
                                                                        var n = a[i]
                                                                        if (
                                                                            n &&
                                                                            n.label === t.name &&
                                                                            !n.textTrack1 &&
                                                                            !n.textTrack2
                                                                        ) {
                                                                            e = a[i]
                                                                            break
                                                                        }
                                                                    }
                                                                    e && (r = e)
                                                                }
                                                                ; ((r =
                                                                    r ||
                                                                    s.createTextTrack(
                                                                        'subtitles',
                                                                        t.name,
                                                                        t.lang,
                                                                    )).mode = t.default
                                                                        ? s.hls.subtitleDisplay
                                                                            ? 'showing'
                                                                            : 'hidden'
                                                                        : 'disabled'),
                                                                    s.textTracks.push(r)
                                                            }))
                                            }),
                                            (r.prototype.onLevelSwitching = function () {
                                                this.enabled =
                                                    'NONE' !== this.hls.currentLevel.closedCaptions
                                            }),
                                            (r.prototype.onFragLoaded = function (t) {
                                                var e = t.frag,
                                                    r = t.payload
                                                'main' === e.type
                                                    ? ((e = e.sn) !== this.lastSn + 1 &&
                                                        (r = this.cea608Parser) &&
                                                        r.reset(),
                                                        (this.lastSn = e))
                                                    : 'subtitle' === e.type &&
                                                    (r.byteLength
                                                        ? i.isFinite(this.initPTS[e.cc])
                                                            ? (null != (t = e.decryptdata) &&
                                                                null != t.key &&
                                                                'AES-128' === t.method) ||
                                                            this._parseVTTs(e, r)
                                                            : (this.unparsedVttFrags.push(t),
                                                                this.initPTS.length &&
                                                                this.hls.trigger(
                                                                    s.default.SUBTITLE_FRAG_PROCESSED,
                                                                    { success: !1, frag: e },
                                                                ))
                                                        : this.hls.trigger(
                                                            s.default.SUBTITLE_FRAG_PROCESSED,
                                                            { success: !1, frag: e },
                                                        ))
                                            }),
                                            (r.prototype._parseVTTs = function (e, t) {
                                                var r = this.vttCCs
                                                r[e.cc] ||
                                                    ((r[e.cc] = {
                                                        start: e.start,
                                                        prevCC: this.prevCC,
                                                        new: !0,
                                                    }),
                                                        (this.prevCC = e.cc))
                                                var n = this.textTracks,
                                                    a = this.hls
                                                l.default.parse(
                                                    t,
                                                    this.initPTS[e.cc],
                                                    r,
                                                    e.cc,
                                                    function (t) {
                                                        var i = n[e.level]
                                                        'disabled' === i.mode
                                                            ? a.trigger(s.default.SUBTITLE_FRAG_PROCESSED, {
                                                                success: !1,
                                                                frag: e,
                                                            })
                                                            : (t.forEach(function (e) {
                                                                if (!i.cues.getCueById(e.id))
                                                                    try {
                                                                        i.addCue(e)
                                                                    } catch (t) {
                                                                        var r = new window.TextTrackCue(
                                                                            e.startTime,
                                                                            e.endTime,
                                                                            e.text,
                                                                        )
                                                                            ; (r.id = e.id), i.addCue(r)
                                                                    }
                                                            }),
                                                                a.trigger(s.default.SUBTITLE_FRAG_PROCESSED, {
                                                                    success: !0,
                                                                    frag: e,
                                                                }))
                                                    },
                                                    function (t) {
                                                        a.trigger(s.default.SUBTITLE_FRAG_PROCESSED, {
                                                            success: !1,
                                                            frag: e,
                                                        })
                                                    },
                                                )
                                            }),
                                            (r.prototype.onFragDecrypted = function (t) {
                                                var e = t.payload,
                                                    r = t.frag
                                                'subtitle' === r.type &&
                                                    (i.isFinite(this.initPTS[r.cc])
                                                        ? this._parseVTTs(r, e)
                                                        : this.unparsedVttFrags.push(t))
                                            }),
                                            (r.prototype.onFragParsingUserdata = function (t) {
                                                if (this.enabled && this.config.enableCEA708Captions)
                                                    for (var e = 0; e < t.samples.length; e++) {
                                                        var r = this.extractCea608Data(t.samples[e].bytes)
                                                        this.cea608Parser.addData(t.samples[e].pts, r)
                                                    }
                                            }),
                                            (r.prototype.extractCea608Data = function (t) {
                                                for (
                                                    var e, r, i, n, a = 31 & t[0], s = 2, o = [], l = 0;
                                                    l < a;
                                                    l++
                                                )
                                                    (e = t[s++]),
                                                        (r = 127 & t[s++]),
                                                        (i = 127 & t[s++]),
                                                        (n = 0 != (4 & e)),
                                                        (e &= 3),
                                                        (0 == r && 0 == i) ||
                                                        !n ||
                                                        0 != e ||
                                                        (o.push(r), o.push(i))
                                                return o
                                            }),
                                            r)
                                function r(t) {
                                    var e,
                                        r =
                                            u.call(
                                                this,
                                                t,
                                                s.default.MEDIA_ATTACHING,
                                                s.default.MEDIA_DETACHING,
                                                s.default.FRAG_PARSING_USERDATA,
                                                s.default.FRAG_DECRYPTED,
                                                s.default.MANIFEST_LOADING,
                                                s.default.MANIFEST_LOADED,
                                                s.default.FRAG_LOADED,
                                                s.default.LEVEL_SWITCHING,
                                                s.default.INIT_PTS_FOUND,
                                            ) || this
                                    return (
                                        (r.hls = t),
                                        (r.config = t.config),
                                        (r.enabled = !0),
                                        (r.Cues = t.config.cueHandler),
                                        (r.textTracks = []),
                                        (r.tracks = []),
                                        (r.unparsedVttFrags = []),
                                        (r.initPTS = []),
                                        (r.cueRanges = []),
                                        (r.captionsTracks = {}),
                                        (r.captionsProperties = {
                                            textTrack1: {
                                                label: r.config.captionsTextTrack1Label,
                                                languageCode: r.config.captionsTextTrack1LanguageCode,
                                            },
                                            textTrack2: {
                                                label: r.config.captionsTextTrack2Label,
                                                languageCode: r.config.captionsTextTrack2LanguageCode,
                                            },
                                        }),
                                        r.config.enableCEA708Captions &&
                                        ((t = new o.default(r, 'textTrack1')),
                                            (e = new o.default(r, 'textTrack2')),
                                            (r.cea608Parser = new a.default(0, t, e))),
                                        r
                                    )
                                }
                                c.default = t
                            }.call(this, f('./src/polyfills/number.js').Number)
                        },
                        './src/crypt/aes-crypto.js': function (t, e, r) {
                            function i(t, e) {
                                ; (this.subtle = t), (this.aesIV = e)
                            }
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (i.prototype.decrypt = function (t, e) {
                                    return this.subtle.decrypt(
                                        { name: 'AES-CBC', iv: this.aesIV },
                                        e,
                                        t,
                                    )
                                }),
                                (e.default = i)
                        },
                        './src/crypt/aes-decryptor.js': function (t, e, r) {
                            function I(t) {
                                var e = t.byteLength,
                                    r = e && new DataView(t).getUint8(e - 1)
                                return r ? t.slice(0, e - r) : t
                            }
                            function i() {
                                ; (this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]),
                                    (this.subMix = [
                                        new Uint32Array(256),
                                        new Uint32Array(256),
                                        new Uint32Array(256),
                                        new Uint32Array(256),
                                    ]),
                                    (this.invSubMix = [
                                        new Uint32Array(256),
                                        new Uint32Array(256),
                                        new Uint32Array(256),
                                        new Uint32Array(256),
                                    ]),
                                    (this.sBox = new Uint32Array(256)),
                                    (this.invSBox = new Uint32Array(256)),
                                    (this.key = new Uint32Array(0)),
                                    this.initTable()
                            }
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (e.removePadding = I),
                                (i.prototype.uint8ArrayToUint32Array_ = function (t) {
                                    t = new DataView(t)
                                    for (var e = new Uint32Array(4), r = 0; r < 4; r++)
                                        e[r] = t.getUint32(4 * r)
                                    return e
                                }),
                                (i.prototype.initTable = function () {
                                    for (
                                        var t = this.sBox,
                                        e = this.invSBox,
                                        r = (a = this.subMix)[0],
                                        i = a[1],
                                        n = a[2],
                                        a = a[3],
                                        s = (u = this.invSubMix)[0],
                                        o = u[1],
                                        l = u[2],
                                        u = u[3],
                                        d = new Uint32Array(256),
                                        c = 0,
                                        f = 0,
                                        h = 0;
                                        h < 256;
                                        h++
                                    )
                                        d[h] = h < 128 ? h << 1 : (h << 1) ^ 283
                                    for (h = 0; h < 256; h++) {
                                        var p =
                                            ((p = f ^ (f << 1) ^ (f << 2) ^ (f << 3) ^ (f << 4)) >>>
                                                8) ^
                                            (255 & p) ^
                                            99,
                                            g = d[(e[(t[c] = p)] = c)],
                                            y = d[g],
                                            m = d[y],
                                            v = (257 * d[p]) ^ (16843008 * p)
                                            ; (r[c] = (v << 24) | (v >>> 8)),
                                                (i[c] = (v << 16) | (v >>> 16)),
                                                (n[c] = (v << 8) | (v >>> 24)),
                                                (a[c] = v),
                                                (v =
                                                    (16843009 * m) ^
                                                    (65537 * y) ^
                                                    (257 * g) ^
                                                    (16843008 * c)),
                                                (s[p] = (v << 24) | (v >>> 8)),
                                                (o[p] = (v << 16) | (v >>> 16)),
                                                (l[p] = (v << 8) | (v >>> 24)),
                                                (u[p] = v),
                                                c
                                                    ? ((c = g ^ d[d[d[m ^ g]]]), (f ^= d[d[f]]))
                                                    : (c = f = 1)
                                    }
                                }),
                                (i.prototype.expandKey = function (t) {
                                    t = this.uint8ArrayToUint32Array_(t)
                                    for (var e = !0, r = 0; r < t.length && e;)
                                        (e = t[r] === this.key[r]), r++
                                    if (!e) {
                                        this.key = t
                                        var i = (this.keySize = t.length)
                                        if (4 !== i && 6 !== i && 8 !== i)
                                            throw Error('Invalid aes key size=' + i)
                                        for (
                                            var n,
                                            e = (this.ksRows = 4 * (i + 6 + 1)),
                                            r = (this.keySchedule = new Uint32Array(e)),
                                            a = (this.invKeySchedule = new Uint32Array(e)),
                                            s = this.sBox,
                                            o = this.rcon,
                                            l = (f = this.invSubMix)[0],
                                            u = f[1],
                                            d = f[2],
                                            c = f[3],
                                            f = 0;
                                            f < e;
                                            f++
                                        )
                                            f < i
                                                ? (n = r[f] = t[f])
                                                : (0 == f % i
                                                    ? ((n =
                                                        (s[(n = (n << 8) | (n >>> 24)) >>> 24] << 24) |
                                                        (s[(n >>> 16) & 255] << 16) |
                                                        (s[(n >>> 8) & 255] << 8) |
                                                        s[255 & n]),
                                                        (n ^= o[(f / i) | 0] << 24))
                                                    : 6 < i &&
                                                    4 == f % i &&
                                                    (n =
                                                        (s[n >>> 24] << 24) |
                                                        (s[(n >>> 16) & 255] << 16) |
                                                        (s[(n >>> 8) & 255] << 8) |
                                                        s[255 & n]),
                                                    (r[f] = n = (r[f - i] ^ n) >>> 0))
                                        for (t = 0; t < e; t++)
                                            (f = e - t),
                                                (n = 3 & t ? r[f] : r[f - 4]),
                                                (a[t] =
                                                    t < 4 || f <= 4
                                                        ? n
                                                        : l[s[n >>> 24]] ^
                                                        u[s[(n >>> 16) & 255]] ^
                                                        d[s[(n >>> 8) & 255]] ^
                                                        c[s[255 & n]]),
                                                (a[t] >>>= 0)
                                    }
                                }),
                                (i.prototype.networkToHostOrderSwap = function (t) {
                                    return (
                                        (t << 24) |
                                        ((65280 & t) << 8) |
                                        ((16711680 & t) >> 8) |
                                        (t >>> 24)
                                    )
                                }),
                                (i.prototype.decrypt = function (t, e, r, i) {
                                    var n = this.keySize + 6,
                                        a = this.invKeySchedule,
                                        s = this.invSBox,
                                        o = (d = this.invSubMix)[0],
                                        l = d[1],
                                        u = d[2],
                                        d = d[3]
                                    r = (h = this.uint8ArrayToUint32Array_(r))[0]
                                    var c = h[1],
                                        f = h[2],
                                        h = h[3]
                                    t = new Int32Array(t)
                                    for (
                                        var p,
                                        g,
                                        y,
                                        m,
                                        v,
                                        _,
                                        E,
                                        T,
                                        S,
                                        b,
                                        A,
                                        R,
                                        L,
                                        D = new Int32Array(t.length),
                                        O = this.networkToHostOrderSwap;
                                        e < t.length;

                                    ) {
                                        for (
                                            T = O(t[e]),
                                            S = O(t[e + 1]),
                                            b = O(t[e + 2]),
                                            A = O(t[e + 3]),
                                            v = T ^ a[0],
                                            _ = A ^ a[1],
                                            E = b ^ a[2],
                                            m = S ^ a[3],
                                            R = 4,
                                            L = 1;
                                            L < n;
                                            L++
                                        )
                                            (p =
                                                o[v >>> 24] ^
                                                l[(_ >> 16) & 255] ^
                                                u[(E >> 8) & 255] ^
                                                d[255 & m] ^
                                                a[R]),
                                                (g =
                                                    o[_ >>> 24] ^
                                                    l[(E >> 16) & 255] ^
                                                    u[(m >> 8) & 255] ^
                                                    d[255 & v] ^
                                                    a[R + 1]),
                                                (y =
                                                    o[E >>> 24] ^
                                                    l[(m >> 16) & 255] ^
                                                    u[(v >> 8) & 255] ^
                                                    d[255 & _] ^
                                                    a[R + 2]),
                                                (m =
                                                    o[m >>> 24] ^
                                                    l[(v >> 16) & 255] ^
                                                    u[(_ >> 8) & 255] ^
                                                    d[255 & E] ^
                                                    a[R + 3]),
                                                (v = p),
                                                (_ = g),
                                                (E = y),
                                                (R += 4)
                                                ; (p =
                                                    (s[v >>> 24] << 24) ^
                                                    (s[(_ >> 16) & 255] << 16) ^
                                                    (s[(E >> 8) & 255] << 8) ^
                                                    s[255 & m] ^
                                                    a[R]),
                                                    (g =
                                                        (s[_ >>> 24] << 24) ^
                                                        (s[(E >> 16) & 255] << 16) ^
                                                        (s[(m >> 8) & 255] << 8) ^
                                                        s[255 & v] ^
                                                        a[R + 1]),
                                                    (y =
                                                        (s[E >>> 24] << 24) ^
                                                        (s[(m >> 16) & 255] << 16) ^
                                                        (s[(v >> 8) & 255] << 8) ^
                                                        s[255 & _] ^
                                                        a[R + 2]),
                                                    (m =
                                                        (s[m >>> 24] << 24) ^
                                                        (s[(v >> 16) & 255] << 16) ^
                                                        (s[(_ >> 8) & 255] << 8) ^
                                                        s[255 & E] ^
                                                        a[R + 3]),
                                                    (D[e] = O(p ^ r)),
                                                    (D[e + 1] = O(m ^ c)),
                                                    (D[e + 2] = O(y ^ f)),
                                                    (D[e + 3] = O(g ^ h)),
                                                    (r = T),
                                                    (c = S),
                                                    (f = b),
                                                    (h = A),
                                                    (e += 4)
                                    }
                                    return i ? I(D.buffer) : D.buffer
                                }),
                                (i.prototype.destroy = function () {
                                    this.rcon = this.invKeySchedule = this.keySchedule = this.invSubMix = this.subMix = this.invSBox = this.sBox = this.ksRows = this.keySize = this.key = void 0
                                }),
                                (e.default = i)
                        },
                        './src/crypt/decrypter.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var o = r('./src/crypt/aes-crypto.js'),
                                l = r('./src/crypt/fast-aes-key.js'),
                                u = r('./src/crypt/aes-decryptor.js'),
                                a = r('./src/errors.js')
                            r('./src/utils/logger.js')
                            var s = r('./src/events.js'),
                                n = r('./src/utils/get-self-scope.js').getSelfScope()
                            function i(t, e, r) {
                                if (
                                    ((r =
                                        void 0 ===
                                        (r = (void 0 === r ? {} : r).removePKCS7Padding) || r),
                                        (this.logEnabled = !0),
                                        (this.observer = t),
                                        (this.config = e),
                                        (this.removePKCS7Padding = r))
                                )
                                    try {
                                        var i = n.crypto
                                        i && (this.subtle = i.subtle || i.webkitSubtle)
                                    } catch (t) { }
                                this.disableWebCrypto = !this.subtle
                            }
                            ; (i.prototype.isSync = function () {
                                return this.disableWebCrypto && this.config.enableSoftwareAES
                            }),
                                (i.prototype.decrypt = function (e, r, i, n) {
                                    var t,
                                        a,
                                        s = this
                                    this.disableWebCrypto && this.config.enableSoftwareAES
                                        ? (this.logEnabled && (this.logEnabled = !1),
                                            (t = this.decryptor) ||
                                            (this.decryptor = t = new u.default()),
                                            t.expandKey(r),
                                            n(t.decrypt(e, 0, i, this.removePKCS7Padding)))
                                        : (this.logEnabled && (this.logEnabled = !1),
                                            (a = this.subtle),
                                            this.key !== r &&
                                            ((this.key = r),
                                                (this.fastAesKey = new l.default(a, r))),
                                            this.fastAesKey
                                                .expandKey()
                                                .then(function (t) {
                                                    new o.default(a, i)
                                                        .decrypt(e, t)
                                                        .catch(function (t) {
                                                            s.onWebCryptoError(t, e, r, i, n)
                                                        })
                                                        .then(function (t) {
                                                            n(t)
                                                        })
                                                })
                                                .catch(function (t) {
                                                    s.onWebCryptoError(t, e, r, i, n)
                                                }))
                                }),
                                (i.prototype.onWebCryptoError = function (t, e, r, i, n) {
                                    this.config.enableSoftwareAES
                                        ? ((this.logEnabled = this.disableWebCrypto = !0),
                                            this.decrypt(e, r, i, n))
                                        : this.observer.trigger(s.default.ERROR, {
                                            type: a.ErrorTypes.MEDIA_ERROR,
                                            details: a.ErrorDetails.FRAG_DECRYPT_ERROR,
                                            fatal: !0,
                                            reason: t.message,
                                        })
                                }),
                                (i.prototype.destroy = function () {
                                    var t = this.decryptor
                                    t && (t.destroy(), (this.decryptor = void 0))
                                }),
                                (e.default = i)
                        },
                        './src/crypt/fast-aes-key.js': function (t, e, r) {
                            function i(t, e) {
                                ; (this.subtle = t), (this.key = e)
                            }
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (i.prototype.expandKey = function () {
                                    return this.subtle.importKey(
                                        'raw',
                                        this.key,
                                        { name: 'AES-CBC' },
                                        !1,
                                        ['encrypt', 'decrypt'],
                                    )
                                }),
                                (e.default = i)
                        },
                        './src/demux/aacdemuxer.js': function (t, r, i) {
                            !function (f) {
                                Object.defineProperty(r, '__esModule', { value: !0 })
                                var h = i('./src/demux/adts.js')
                                i('./src/utils/logger.js')
                                var p = i('./src/demux/id3.js'),
                                    t =
                                        ((e.prototype.resetInitSegment = function (t, e, r, i) {
                                            this._audioTrack = {
                                                container: 'audio/adts',
                                                type: 'audio',
                                                id: 0,
                                                sequenceNumber: 0,
                                                isAAC: !0,
                                                samples: [],
                                                len: 0,
                                                manifestCodec: e,
                                                duration: i,
                                                inputTimeScale: 9e4,
                                            }
                                        }),
                                            (e.prototype.resetTimeStamp = function () { }),
                                            (e.probe = function (t) {
                                                if (!t) return !1
                                                for (
                                                    var e = (p.default.getID3Data(t, 0) || []).length,
                                                    r = t.length;
                                                    e < r;
                                                    e++
                                                )
                                                    if (h.probe(t, e)) return !0
                                                return !1
                                            }),
                                            (e.prototype.append = function (t, e, r, i) {
                                                for (
                                                    var n = this._audioTrack,
                                                    a = p.default.getID3Data(t, 0) || [],
                                                    s = p.default.getTimeStamp(a),
                                                    o = 0,
                                                    l = (s = f.isFinite(s) ? 90 * s : 9e4 * e),
                                                    u = t.length,
                                                    d = a.length,
                                                    c = [{ pts: l, dts: l, data: a }];
                                                    d < u - 1;

                                                )
                                                    if (h.isHeader(t, d) && d + 5 < u) {
                                                        if (
                                                            (h.initTrackConfig(
                                                                n,
                                                                this.observer,
                                                                t,
                                                                d,
                                                                n.manifestCodec,
                                                            ),
                                                                !(a = h.appendFrame(n, t, d, s, o)))
                                                        )
                                                            break
                                                            ; (d += a.length), (l = a.sample.pts), o++
                                                    } else
                                                        p.default.isHeader(t, d)
                                                            ? ((a = p.default.getID3Data(t, d)),
                                                                c.push({ pts: l, dts: l, data: a }),
                                                                (d += a.length))
                                                            : d++
                                                this.remuxer.remux(
                                                    n,
                                                    { samples: [] },
                                                    { samples: c, inputTimeScale: 9e4 },
                                                    { samples: [] },
                                                    e,
                                                    r,
                                                    i,
                                                )
                                            }),
                                            (e.prototype.destroy = function () { }),
                                            e)
                                function e(t, e, r) {
                                    ; (this.observer = t), (this.config = r), (this.remuxer = e)
                                }
                                r.default = t
                            }.call(this, i('./src/polyfills/number.js').Number)
                        },
                        './src/demux/adts.js': function (t, e, r) {
                            function a(t, e, r, i) {
                                var n = navigator.userAgent.toLowerCase(),
                                    a = [
                                        96e3,
                                        88200,
                                        64e3,
                                        48e3,
                                        44100,
                                        32e3,
                                        24e3,
                                        22050,
                                        16e3,
                                        12e3,
                                        11025,
                                        8e3,
                                        7350,
                                    ],
                                    s = (60 & e[r + 2]) >>> 2
                                if (!(a.length - 1 < s))
                                    return (
                                        (t = (1 & e[r + 2]) << 2),
                                        (t |= (192 & e[r + 3]) >>> 6),
                                        (n = /firefox/i.test(n)
                                            ? 6 <= s
                                                ? ((e = 5), (r = Array(4)), s - 3)
                                                : ((e = 2), (r = Array(2)), s)
                                            : -1 !== n.indexOf('android')
                                                ? ((e = 2), (r = Array(2)), s)
                                                : ((e = 5),
                                                    (r = Array(4)),
                                                    (i &&
                                                        (-1 !== i.indexOf('mp4a.40.29') ||
                                                            -1 !== i.indexOf('mp4a.40.5'))) ||
                                                        (!i && 6 <= s)
                                                        ? s - 3
                                                        : (((i &&
                                                            -1 !== i.indexOf('mp4a.40.2') &&
                                                            ((6 <= s && 1 === t) || /vivaldi/i.test(n))) ||
                                                            (!i && 1 === t)) &&
                                                            ((e = 2), (r = Array(2))),
                                                            s))),
                                        (r[0] = e << 3),
                                        (r[0] |= (14 & s) >> 1),
                                        (r[1] |= (1 & s) << 7),
                                        (r[1] |= t << 3),
                                        5 === e &&
                                        ((r[1] |= (14 & n) >> 1),
                                            (r[2] = (1 & n) << 7),
                                            (r[2] |= 8),
                                            (r[3] = 0)),
                                        {
                                            config: r,
                                            samplerate: a[s],
                                            channelCount: t,
                                            codec: 'mp4a.40.' + e,
                                            manifestCodec: i,
                                        }
                                    )
                                t.trigger(d.default.ERROR, {
                                    type: u.ErrorTypes.MEDIA_ERROR,
                                    details: u.ErrorDetails.FRAG_PARSING_ERROR,
                                    fatal: !0,
                                    reason: 'invalid ADTS sampling index:' + s,
                                })
                            }
                            function i(t, e) {
                                return 255 === t[e] && 240 == (246 & t[e + 1])
                            }
                            function o(t, e) {
                                return 1 & t[e + 1] ? 7 : 9
                            }
                            function l(t, e) {
                                return (
                                    ((3 & t[e + 3]) << 11) |
                                    (t[e + 4] << 3) |
                                    ((224 & t[e + 5]) >>> 5)
                                )
                            }
                            function s(t, e, r, i, n) {
                                var a = t.length,
                                    s = o(t, e)
                                if (((t = l(t, e)), 0 < (t -= s) && e + s + t <= a))
                                    return { headerLength: s, frameLength: t, stamp: r + i * n }
                            }
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                r('./src/utils/logger.js')
                            var u = r('./src/errors.js'),
                                d = r('./src/events.js')
                                ; (e.getAudioConfig = a),
                                    (e.isHeaderPattern = i),
                                    (e.getHeaderLength = o),
                                    (e.getFullFrameLength = l),
                                    (e.isHeader = function (t, e) {
                                        return !!(e + 1 < t.length && i(t, e))
                                    }),
                                    (e.probe = function (t, e) {
                                        if (e + 1 < t.length && i(t, e)) {
                                            var r = o(t, e)
                                            if (
                                                (e += r = e + 5 < t.length ? l(t, e) : r) === t.length ||
                                                (e + 1 < t.length && i(t, e))
                                            )
                                                return !0
                                        }
                                        return !1
                                    }),
                                    (e.initTrackConfig = function (t, e, r, i, n) {
                                        t.samplerate ||
                                            ((e = a(e, r, i, n)),
                                                (t.config = e.config),
                                                (t.samplerate = e.samplerate),
                                                (t.channelCount = e.channelCount),
                                                (t.codec = e.codec),
                                                (t.manifestCodec = e.manifestCodec))
                                    }),
                                    (e.getFrameDuration = function (t) {
                                        return 9216e4 / t
                                    }),
                                    (e.parseFrameHeader = s),
                                    (e.appendFrame = function (t, e, r, i, n) {
                                        var a = s(e, r, i, n, 9216e4 / t.samplerate)
                                        if (a)
                                            return (
                                                (n = a.stamp),
                                                (i = a.headerLength),
                                                (a = a.frameLength),
                                                (e = {
                                                    unit: e.subarray(r + i, r + i + a),
                                                    pts: n,
                                                    dts: n,
                                                }),
                                                t.samples.push(e),
                                                (t.len += a),
                                                { sample: e, length: a + i }
                                            )
                                    })
                        },
                        './src/demux/demuxer-inline.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var T = r('./src/events.js'),
                                S = r('./src/errors.js'),
                                m = r('./src/crypt/decrypter.js'),
                                b = r('./src/demux/aacdemuxer.js'),
                                A = r('./src/demux/mp4demuxer.js'),
                                R = r('./src/demux/tsdemuxer.js'),
                                L = r('./src/demux/mp3demuxer.js'),
                                D = r('./src/remux/mp4-remuxer.js'),
                                O = r('./src/remux/passthrough-remuxer.js')
                                ; (t = r('./src/utils/get-self-scope.js')),
                                    r('./src/utils/logger.js'),
                                    (r = t.getSelfScope())
                            try {
                                var v = r.performance.now.bind(r.performance)
                            } catch (t) {
                                v = r.Date.now
                            }
                            function i(t, e, r, i) {
                                ; (this.observer = t),
                                    (this.typeSupported = e),
                                    (this.config = r),
                                    (this.vendor = i)
                            }
                            ; (i.prototype.destroy = function () {
                                var t = this.demuxer
                                t && t.destroy()
                            }),
                                (i.prototype.push = function (
                                    e,
                                    r,
                                    i,
                                    n,
                                    a,
                                    s,
                                    o,
                                    l,
                                    u,
                                    d,
                                    c,
                                    f,
                                ) {
                                    var h,
                                        p,
                                        t,
                                        g,
                                        y = this
                                    0 < e.byteLength &&
                                        null != r &&
                                        null != r.key &&
                                        'AES-128' === r.method
                                        ? (null == (h = this.decrypter) &&
                                            (h = this.decrypter = new m.default(
                                                this.observer,
                                                this.config,
                                            )),
                                            (p = v()),
                                            (y = this),
                                            (t = new Uint8Array([
                                                178,
                                                194,
                                                58,
                                                0,
                                                255,
                                                254,
                                                134,
                                                144,
                                                23,
                                                135,
                                                5,
                                                174,
                                                25,
                                                237,
                                                8,
                                                184,
                                            ])),
                                            (g = new Uint8Array([
                                                145,
                                                15,
                                                3,
                                                169,
                                                103,
                                                109,
                                                43,
                                                244,
                                                232,
                                                34,
                                                67,
                                                55,
                                                231,
                                                26,
                                                135,
                                                211,
                                            ])),
                                            16 < r.key.byteLength
                                                ? h.decrypt(r.key.buffer, t.buffer, g.buffer, function (
                                                    t,
                                                ) {
                                                    ; (r.key = t),
                                                        h.decrypt(e, t, r.iv.buffer, function (t) {
                                                            var e = v()
                                                            y.observer.trigger(T.default.FRAG_DECRYPTED, {
                                                                stats: { tstart: p, tdecrypt: e },
                                                            }),
                                                                y.pushDecrypted(
                                                                    new Uint8Array(t),
                                                                    r,
                                                                    new Uint8Array(i),
                                                                    n,
                                                                    a,
                                                                    s,
                                                                    o,
                                                                    l,
                                                                    u,
                                                                    d,
                                                                    c,
                                                                    f,
                                                                )
                                                        })
                                                })
                                                : h.decrypt(e, r.key.buffer, r.iv.buffer, function (t) {
                                                    var e = v()
                                                    y.observer.trigger(T.default.FRAG_DECRYPTED, {
                                                        stats: { tstart: p, tdecrypt: e },
                                                    }),
                                                        y.pushDecrypted(
                                                            new Uint8Array(t),
                                                            r,
                                                            new Uint8Array(i),
                                                            n,
                                                            a,
                                                            s,
                                                            o,
                                                            l,
                                                            u,
                                                            d,
                                                            c,
                                                            f,
                                                        )
                                                }))
                                        : this.pushDecrypted(
                                            new Uint8Array(e),
                                            r,
                                            new Uint8Array(i),
                                            n,
                                            a,
                                            s,
                                            o,
                                            l,
                                            u,
                                            d,
                                            c,
                                            f,
                                        )
                                }),
                                (i.prototype.pushDecrypted = function (
                                    t,
                                    e,
                                    r,
                                    i,
                                    n,
                                    a,
                                    s,
                                    o,
                                    l,
                                    u,
                                    d,
                                    c,
                                ) {
                                    var f = this.demuxer
                                    if (!f || ((s || o) && !this.probe(t))) {
                                        for (
                                            var h = this.observer,
                                            p = this.typeSupported,
                                            g = this.config,
                                            y = [
                                                { demux: R.default, remux: D.default },
                                                { demux: A.default, remux: O.default },
                                                { demux: b.default, remux: D.default },
                                                { demux: L.default, remux: D.default },
                                            ],
                                            m = 0,
                                            v = y.length;
                                            m < v;
                                            m++
                                        ) {
                                            var _ = y[m],
                                                E = _.demux.probe
                                            if (E(t)) {
                                                ; (f = this.remuxer = new _.remux(h, g, p, this.vendor)),
                                                    (f = new _.demux(h, f, g, p)),
                                                    (this.probe = E)
                                                break
                                            }
                                        }
                                        if (!f)
                                            return void h.trigger(T.default.ERROR, {
                                                type: S.ErrorTypes.MEDIA_ERROR,
                                                details: S.ErrorDetails.FRAG_PARSING_ERROR,
                                                fatal: !0,
                                                reason: 'no demux matching with content found',
                                            })
                                        this.demuxer = f
                                    }
                                    ; (h = this.remuxer),
                                        (s || o) &&
                                        (f.resetInitSegment(r, i, n, u), h.resetInitSegment()),
                                        s && (f.resetTimeStamp(c), h.resetTimeStamp(c)),
                                        'function' == typeof f.setDecryptData &&
                                        f.setDecryptData(e),
                                        f.append(t, a, l, d)
                                }),
                                (r = i),
                                (e.default = r)
                        },
                        './src/demux/demuxer-worker.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var a = r('./src/demux/demuxer-inline.js'),
                                s = r('./src/events.js')
                            r('./src/utils/logger.js')
                            var o = r(
                                './node_modules/node-libs-browser/node_modules/events/events.js',
                            )
                            e.default = function (i) {
                                var n = new o.EventEmitter()
                                    ; (n.trigger = function (t) {
                                        for (var e = [], r = 1; r < arguments.length; r++)
                                            e[r - 1] = arguments[r]
                                        n.emit.apply(n, [t, t].concat(e))
                                    }),
                                        (n.off = function (t) {
                                            for (var e = [], r = 1; r < arguments.length; r++)
                                                e[r - 1] = arguments[r]
                                            n.removeListener.apply(n, [t].concat(e))
                                        })
                                function r(t, e) {
                                    i.postMessage({ event: t, data: e })
                                }
                                i.addEventListener('message', function (t) {
                                    switch ((t = t.data).cmd) {
                                        case 'init':
                                            var e = JSON.parse(t.config)
                                                ; (i.demuxer = new a.default(
                                                    n,
                                                    t.typeSupported,
                                                    e,
                                                    t.vendor,
                                                )),
                                                    r('init', null)
                                            break
                                        case 'demux':
                                            i.demuxer.push(
                                                t.data,
                                                t.decryptdata,
                                                t.initSegment,
                                                t.audioCodec,
                                                t.videoCodec,
                                                t.timeOffset,
                                                t.discontinuity,
                                                t.trackSwitch,
                                                t.contiguous,
                                                t.duration,
                                                t.accurateTimeOffset,
                                                t.defaultInitPTS,
                                            )
                                    }
                                }),
                                    n.on(s.default.FRAG_DECRYPTED, r),
                                    n.on(s.default.FRAG_PARSING_INIT_SEGMENT, r),
                                    n.on(s.default.FRAG_PARSED, r),
                                    n.on(s.default.ERROR, r),
                                    n.on(s.default.FRAG_PARSING_METADATA, r),
                                    n.on(s.default.FRAG_PARSING_USERDATA, r),
                                    n.on(s.default.INIT_PTS_FOUND, r),
                                    n.on(s.default.FRAG_PARSING_DATA, function (t, e) {
                                        var r = []
                                            ; (t = { event: t, data: e }),
                                                e.data1 &&
                                                ((t.data1 = e.data1.buffer),
                                                    r.push(e.data1.buffer),
                                                    delete e.data1),
                                                e.data2 &&
                                                ((t.data2 = e.data2.buffer),
                                                    r.push(e.data2.buffer),
                                                    delete e.data2),
                                                i.postMessage(t, r)
                                    })
                            }
                        },
                        './src/demux/demuxer.js': function (t, i, n) {
                            !function (p) {
                                Object.defineProperty(i, '__esModule', { value: !0 })
                                var l = n('./node_modules/webworkify-webpack/index.js'),
                                    u = n('./src/events.js'),
                                    d = n('./src/demux/demuxer-inline.js')
                                n('./src/utils/logger.js')
                                var c = n('./src/errors.js'),
                                    t = n('./src/utils/mediasource-helper.js'),
                                    e = n('./src/utils/get-self-scope.js'),
                                    f = n('./src/observer.js'),
                                    h = e.getSelfScope(),
                                    g = t.getMediaSource()
                                function r(r, t) {
                                    var i = this
                                        ; (this.hls = r), (this.id = t)
                                    var e = (this.observer = new f.Observer()),
                                        n = r.config,
                                        a = function (t, e) {
                                            ; ((e = e || {}).frag = i.frag),
                                                (e.id = i.id),
                                                r.trigger(t, e)
                                        }
                                    e.on(u.default.FRAG_DECRYPTED, a),
                                        e.on(u.default.FRAG_PARSING_INIT_SEGMENT, a),
                                        e.on(u.default.FRAG_PARSING_DATA, a),
                                        e.on(u.default.FRAG_PARSED, a),
                                        e.on(u.default.ERROR, a),
                                        e.on(u.default.FRAG_PARSING_METADATA, a),
                                        e.on(u.default.FRAG_PARSING_USERDATA, a),
                                        e.on(u.default.INIT_PTS_FOUND, a)
                                    var a = {
                                        mp4: g.isTypeSupported('video/mp4'),
                                        mpeg: g.isTypeSupported('audio/mpeg'),
                                        mp3: g.isTypeSupported('audio/mp4; codecs="mp3"'),
                                    },
                                        s = navigator.vendor
                                    if (n.enableWorker && 'undefined' != typeof Worker) {
                                        var o = void 0
                                        try {
                                            ; (o = this.w = l('./src/demux/demuxer-worker.js')),
                                                (this.onwmsg = this.onWorkerMessage.bind(this)),
                                                o.addEventListener('message', this.onwmsg),
                                                (o.onerror = function (t) {
                                                    r.trigger(u.default.ERROR, {
                                                        type: c.ErrorTypes.OTHER_ERROR,
                                                        details: c.ErrorDetails.INTERNAL_EXCEPTION,
                                                        fatal: !0,
                                                        event: 'demuxerWorker',
                                                        err: {
                                                            message:
                                                                t.message +
                                                                ' (' +
                                                                t.filename +
                                                                ':' +
                                                                t.lineno +
                                                                ')',
                                                        },
                                                    })
                                                }),
                                                o.postMessage({
                                                    cmd: 'init',
                                                    typeSupported: a,
                                                    vendor: s,
                                                    id: t,
                                                    config: JSON.stringify(n),
                                                })
                                        } catch (t) {
                                            o && h.URL.revokeObjectURL(o.objectURL),
                                                (this.demuxer = new d.default(e, a, n, s)),
                                                (this.w = void 0)
                                        }
                                    } else this.demuxer = new d.default(e, a, n, s)
                                }
                                ; (r.prototype.destroy = function () {
                                    var t = this.w
                                    t
                                        ? (t.removeEventListener('message', this.onwmsg),
                                            t.terminate(),
                                            (this.w = null))
                                        : (t = this.demuxer) &&
                                        (t.destroy(), (this.demuxer = null)),
                                        (t = this.observer) &&
                                        (t.removeAllListeners(), (this.observer = null))
                                }),
                                    (r.prototype.push = function (t, e, r, i, n, a, s, o) {
                                        var l = this.w,
                                            u = p.isFinite(n.startPTS) ? n.startPTS : n.start,
                                            d = n.decryptdata,
                                            c = !((h = this.frag) && n.cc === h.cc),
                                            f = !(h && n.level === h.level),
                                            h = h && n.sn === h.sn + 1
                                            ; (h = !f && h),
                                                (this.frag = n),
                                                l
                                                    ? l.postMessage(
                                                        {
                                                            cmd: 'demux',
                                                            data: t,
                                                            decryptdata: d,
                                                            initSegment: e,
                                                            audioCodec: r,
                                                            videoCodec: i,
                                                            timeOffset: u,
                                                            discontinuity: c,
                                                            trackSwitch: f,
                                                            contiguous: h,
                                                            duration: a,
                                                            accurateTimeOffset: s,
                                                            defaultInitPTS: o,
                                                        },
                                                        t instanceof ArrayBuffer ? [t] : [],
                                                    )
                                                    : (n = this.demuxer) &&
                                                    n.push(t, d, e, r, i, u, c, f, h, a, s, o)
                                    }),
                                    (r.prototype.onWorkerMessage = function (t) {
                                        t = t.data
                                        var e = this.hls
                                        switch (t.event) {
                                            case 'init':
                                                h.URL.revokeObjectURL(this.w.objectURL)
                                                break
                                            case u.default.FRAG_PARSING_DATA:
                                                ; (t.data.data1 = new Uint8Array(t.data1)),
                                                    t.data2 && (t.data.data2 = new Uint8Array(t.data2))
                                            default:
                                                ; (t.data = t.data || {}),
                                                    (t.data.frag = this.frag),
                                                    (t.data.id = this.id),
                                                    e.trigger(t.event, t.data)
                                        }
                                    }),
                                    (t = r),
                                    (i.default = t)
                            }.call(this, n('./src/polyfills/number.js').Number)
                        },
                        './src/demux/exp-golomb.js': function (t, e, r) {
                            function i(t) {
                                ; (this.data = t),
                                    (this.bytesAvailable = t.byteLength),
                                    (this.bitsAvailable = this.word = 0)
                            }
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                r('./src/utils/logger.js'),
                                (i.prototype.loadWord = function () {
                                    var t = this.data,
                                        e = this.bytesAvailable,
                                        r = t.byteLength - e,
                                        i = new Uint8Array(4)
                                    if (0 === (e = Math.min(4, e)))
                                        throw Error('no bytes available')
                                    i.set(t.subarray(r, r + e)),
                                        (this.word = new DataView(i.buffer).getUint32(0)),
                                        (this.bitsAvailable = 8 * e),
                                        (this.bytesAvailable -= e)
                                }),
                                (i.prototype.skipBits = function (t) {
                                    var e
                                    this.bitsAvailable > t ||
                                        ((e = (t -= this.bitsAvailable) >> 3),
                                            (t -= e >> 3),
                                            (this.bytesAvailable -= e),
                                            this.loadWord()),
                                        (this.word <<= t),
                                        (this.bitsAvailable -= t)
                                }),
                                (i.prototype.readBits = function (t) {
                                    var e = Math.min(this.bitsAvailable, t),
                                        r = this.word >>> (32 - e)
                                    return (
                                        (this.bitsAvailable -= e),
                                        0 < this.bitsAvailable
                                            ? (this.word <<= e)
                                            : 0 < this.bytesAvailable && this.loadWord(),
                                        0 < (e = t - e) && this.bitsAvailable
                                            ? (r << e) | this.readBits(e)
                                            : r
                                    )
                                }),
                                (i.prototype.skipLZ = function () {
                                    for (var t = 0; t < this.bitsAvailable; ++t)
                                        if (0 != (this.word & (2147483648 >>> t)))
                                            return (this.word <<= t), (this.bitsAvailable -= t), t
                                    return this.loadWord(), t + this.skipLZ()
                                }),
                                (i.prototype.skipUEG = function () {
                                    this.skipBits(1 + this.skipLZ())
                                }),
                                (i.prototype.skipEG = function () {
                                    this.skipBits(1 + this.skipLZ())
                                }),
                                (i.prototype.readUEG = function () {
                                    var t = this.skipLZ()
                                    return this.readBits(t + 1) - 1
                                }),
                                (i.prototype.readEG = function () {
                                    var t = this.readUEG()
                                    return 1 & t ? (1 + t) >>> 1 : -1 * (t >>> 1)
                                }),
                                (i.prototype.readBoolean = function () {
                                    return 1 === this.readBits(1)
                                }),
                                (i.prototype.readUByte = function () {
                                    return this.readBits(8)
                                }),
                                (i.prototype.readUShort = function () {
                                    return this.readBits(16)
                                }),
                                (i.prototype.readUInt = function () {
                                    return this.readBits(32)
                                }),
                                (i.prototype.skipScalingList = function (t) {
                                    for (var e = 8, r = 8, i = 0; i < t; i++)
                                        e =
                                            0 ===
                                                (r = 0 !== r ? (e + (r = this.readEG()) + 256) % 256 : r)
                                                ? e
                                                : r
                                }),
                                (i.prototype.readSPS = function () {
                                    var t = 0,
                                        e = 0,
                                        r = 0,
                                        i = 0,
                                        n = this.readUByte.bind(this),
                                        a = this.readBits.bind(this),
                                        s = this.readUEG.bind(this),
                                        o = this.readBoolean.bind(this),
                                        l = this.skipBits.bind(this),
                                        u = this.skipEG.bind(this),
                                        d = this.skipUEG.bind(this),
                                        c = this.skipScalingList.bind(this)
                                    n()
                                    var f = n()
                                    if (
                                        (a(5),
                                            l(3),
                                            n(),
                                            d(),
                                            (100 === f ||
                                                110 === f ||
                                                122 === f ||
                                                244 === f ||
                                                44 === f ||
                                                83 === f ||
                                                86 === f ||
                                                118 === f ||
                                                128 === f) &&
                                            ((f = s()), 3 === f && l(1), d(), d(), l(1), o()))
                                    )
                                        for (var h = 3 !== f ? 8 : 12, f = 0; f < h; f++)
                                            o() && c(f < 6 ? 16 : 64)
                                    if ((d(), 0 === (c = s()))) s()
                                    else if (1 === c)
                                        for (l(1), u(), u(), c = s(), f = 0; f < c; f++) u()
                                    if (
                                        (d(),
                                            l(1),
                                            (u = s()),
                                            (d = s()),
                                            0 === (a = a(1)) && l(1),
                                            l(1),
                                            o() && ((t = s()), (e = s()), (r = s()), (i = s())),
                                            (s = [1, 1]),
                                            o() && o())
                                    )
                                        switch (n()) {
                                            case 1:
                                                s = [1, 1]
                                                break
                                            case 2:
                                                s = [12, 11]
                                                break
                                            case 3:
                                                s = [10, 11]
                                                break
                                            case 4:
                                                s = [16, 11]
                                                break
                                            case 5:
                                                s = [40, 33]
                                                break
                                            case 6:
                                                s = [24, 11]
                                                break
                                            case 7:
                                                s = [20, 11]
                                                break
                                            case 8:
                                                s = [32, 11]
                                                break
                                            case 9:
                                                s = [80, 33]
                                                break
                                            case 10:
                                                s = [18, 11]
                                                break
                                            case 11:
                                                s = [15, 11]
                                                break
                                            case 12:
                                                s = [64, 33]
                                                break
                                            case 13:
                                                s = [160, 99]
                                                break
                                            case 14:
                                                s = [4, 3]
                                                break
                                            case 15:
                                                s = [3, 2]
                                                break
                                            case 16:
                                                s = [2, 1]
                                                break
                                            case 255:
                                                s = [(n() << 8) | n(), (n() << 8) | n()]
                                        }
                                    return {
                                        width: Math.ceil(16 * (u + 1) - 2 * t - 2 * e),
                                        height: (2 - a) * (d + 1) * 16 - (a ? 2 : 4) * (r + i),
                                        pixelRatio: s,
                                    }
                                }),
                                (i.prototype.readSliceType = function () {
                                    return this.readUByte(), this.readUEG(), this.readUEG()
                                }),
                                (e.default = i)
                        },
                        './src/demux/id3.js': function (t, e, r) {
                            function s() { }
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (s.isHeader = function (t, e) {
                                    return (
                                        e + 10 <= t.length &&
                                        73 === t[e] &&
                                        68 === t[e + 1] &&
                                        51 === t[e + 2] &&
                                        t[e + 3] < 255 &&
                                        t[e + 4] < 255 &&
                                        t[e + 6] < 128 &&
                                        t[e + 7] < 128 &&
                                        t[e + 8] < 128 &&
                                        t[e + 9] < 128
                                    )
                                }),
                                (s.isFooter = function (t, e) {
                                    return (
                                        e + 10 <= t.length &&
                                        51 === t[e] &&
                                        68 === t[e + 1] &&
                                        73 === t[e + 2] &&
                                        t[e + 3] < 255 &&
                                        t[e + 4] < 255 &&
                                        t[e + 6] < 128 &&
                                        t[e + 7] < 128 &&
                                        t[e + 8] < 128 &&
                                        t[e + 9] < 128
                                    )
                                }),
                                (s.getID3Data = function (t, e) {
                                    for (var r = e, i = 0; s.isHeader(t, e);)
                                        (i += 10),
                                            (i += s._readSize(t, e + 6)),
                                            s.isFooter(t, e + 10) && (i += 10),
                                            (e += i)
                                    if (0 < i) return t.subarray(r, r + i)
                                }),
                                (s._readSize = function (t, e) {
                                    var r = (127 & t[e]) << 21
                                    return (
                                        (r |= (127 & t[e + 1]) << 14),
                                        (r |= (127 & t[e + 2]) << 7) | (127 & t[e + 3])
                                    )
                                }),
                                (s.getTimeStamp = function (t) {
                                    t = s.getID3Frames(t)
                                    for (var e = 0; e < t.length; e++) {
                                        var r = t[e]
                                        if (s.isTimeStampFrame(r)) return s._readTimeStamp(r)
                                    }
                                }),
                                (s.isTimeStampFrame = function (t) {
                                    return (
                                        t &&
                                        'PRIV' === t.key &&
                                        'com.apple.streaming.transportStreamTimestamp' === t.info
                                    )
                                }),
                                (s._getFrameData = function (t) {
                                    var e = String.fromCharCode(t[0], t[1], t[2], t[3]),
                                        r = s._readSize(t, 4)
                                    return { type: e, size: r, data: t.subarray(10, 10 + r) }
                                }),
                                (s.getID3Frames = function (t) {
                                    for (var e = 0, r = []; s.isHeader(t, e);) {
                                        for (
                                            var i = s._readSize(t, e + 6), i = (e += 10) + i;
                                            e + 8 < i;

                                        ) {
                                            var n = s._getFrameData(t.subarray(e)),
                                                a = s._decodeFrame(n)
                                            a && r.push(a), (e += n.size + 10)
                                        }
                                        s.isFooter(t, e) && (e += 10)
                                    }
                                    return r
                                }),
                                (s._decodeFrame = function (t) {
                                    return 'PRIV' === t.type
                                        ? s._decodePrivFrame(t)
                                        : 'T' === t.type[0]
                                            ? s._decodeTextFrame(t)
                                            : 'W' === t.type[0]
                                                ? s._decodeURLFrame(t)
                                                : void 0
                                }),
                                (s._readTimeStamp = function (t) {
                                    if (8 === t.data.byteLength) {
                                        var e = new Uint8Array(t.data)
                                        return (
                                            (t = 1 & e[3]),
                                            (e = (e[4] << 23) + (e[5] << 15) + (e[6] << 7) + e[7]),
                                            (e /= 45),
                                            t && (e += 47721858.84),
                                            Math.round(e)
                                        )
                                    }
                                }),
                                (s._decodePrivFrame = function (t) {
                                    if (!(t.size < 2)) {
                                        var e = s._utf8ArrayToStr(t.data, !0),
                                            r = new Uint8Array(t.data.subarray(e.length + 1))
                                        return { key: t.type, info: e, data: r.buffer }
                                    }
                                }),
                                (s._decodeTextFrame = function (t) {
                                    if (!(t.size < 2)) {
                                        if ('TXXX' !== t.type)
                                            return (
                                                (r = s._utf8ArrayToStr(t.data.subarray(1))),
                                                { key: t.type, data: r }
                                            )
                                        var e = 1,
                                            r = s._utf8ArrayToStr(t.data.subarray(1))
                                        return (
                                            (e += r.length + 1),
                                            (e = s._utf8ArrayToStr(t.data.subarray(e))),
                                            { key: t.type, info: r, data: e }
                                        )
                                    }
                                }),
                                (s._decodeURLFrame = function (t) {
                                    if ('WXXX' !== t.type)
                                        return (
                                            (r = s._utf8ArrayToStr(t.data)), { key: t.type, data: r }
                                        )
                                    if (!(t.size < 2)) {
                                        var e = 1,
                                            r = s._utf8ArrayToStr(t.data.subarray(1))
                                        return (
                                            (e += r.length + 1),
                                            (e = s._utf8ArrayToStr(t.data.subarray(e))),
                                            { key: t.type, info: r, data: e }
                                        )
                                    }
                                }),
                                (s._utf8ArrayToStr = function (t, e) {
                                    void 0 === e && (e = !1)
                                    for (
                                        var r, i, n, a = t.length, s = '', o = 0;
                                        o < a && (0 !== (r = t[o++]) || !e);

                                    )
                                        if (0 !== r && 3 !== r)
                                            switch (r >> 4) {
                                                case 0:
                                                case 1:
                                                case 2:
                                                case 3:
                                                case 4:
                                                case 5:
                                                case 6:
                                                case 7:
                                                    s += String.fromCharCode(r)
                                                    break
                                                case 12:
                                                case 13:
                                                    ; (i = t[o++]),
                                                        (s += String.fromCharCode(
                                                            ((31 & r) << 6) | (63 & i),
                                                        ))
                                                    break
                                                case 14:
                                                    ; (i = t[o++]),
                                                        (n = t[o++]),
                                                        (s += String.fromCharCode(
                                                            ((15 & r) << 12) |
                                                            ((63 & i) << 6) |
                                                            ((63 & n) << 0),
                                                        ))
                                            }
                                    return s
                                }),
                                (t = s),
                                (e.utf8ArrayToStr = t._utf8ArrayToStr),
                                (e.default = t)
                        },
                        './src/demux/mp3demuxer.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var f = r('./src/demux/id3.js')
                            r('./src/utils/logger.js')
                            var h = r('./src/demux/mpegaudio.js')
                            function i(t, e, r) {
                                ; (this.observer = t), (this.config = r), (this.remuxer = e)
                            }
                            ; (i.prototype.resetInitSegment = function (t, e, r, i) {
                                this._audioTrack = {
                                    container: 'audio/mpeg',
                                    type: 'audio',
                                    id: -1,
                                    sequenceNumber: 0,
                                    isAAC: !1,
                                    samples: [],
                                    len: 0,
                                    manifestCodec: e,
                                    duration: i,
                                    inputTimeScale: 9e4,
                                }
                            }),
                                (i.prototype.resetTimeStamp = function () { }),
                                (i.probe = function (t) {
                                    var e, r
                                    if (
                                        (e = f.default.getID3Data(t, 0)) &&
                                        void 0 !== f.default.getTimeStamp(e)
                                    )
                                        for (
                                            e = e.length, r = Math.min(t.length - 1, e + 100);
                                            e < r;
                                            e++
                                        )
                                            if (h.default.probe(t, e)) return !0
                                    return !1
                                }),
                                (i.prototype.append = function (t, e, r, i) {
                                    for (
                                        var n = f.default.getID3Data(t, 0),
                                        a = (a = f.default.getTimeStamp(n)) ? 90 * a : 9e4 * e,
                                        s = n.length,
                                        o = t.length,
                                        l = 0,
                                        u = 0,
                                        d = this._audioTrack,
                                        c = [{ pts: a, dts: a, data: n }];
                                        s < o;

                                    )
                                        if (h.default.isHeader(t, s)) {
                                            if (!(n = h.default.appendFrame(d, t, s, a, l))) break
                                                ; (s += n.length), (u = n.sample.pts), l++
                                        } else
                                            f.default.isHeader(t, s)
                                                ? ((n = f.default.getID3Data(t, s)),
                                                    c.push({ pts: u, dts: u, data: n }),
                                                    (s += n.length))
                                                : s++
                                    this.remuxer.remux(
                                        d,
                                        { samples: [] },
                                        { samples: c, inputTimeScale: 9e4 },
                                        { samples: [] },
                                        e,
                                        r,
                                        i,
                                    )
                                }),
                                (i.prototype.destroy = function () { }),
                                (e.default = i)
                        },
                        './src/demux/mp4demuxer.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                r('./src/utils/logger.js')
                            var s = r('./src/events.js'),
                                a = Math.pow(2, 32) - 1
                            function c(t, e) {
                                ; (this.observer = t), (this.remuxer = e)
                            }
                            ; (c.prototype.resetTimeStamp = function (t) {
                                this.initPTS = t
                            }),
                                (c.prototype.resetInitSegment = function (t, e, r, i) {
                                    var n, a
                                    t && t.byteLength
                                        ? (null == e && (e = 'mp4a.40.5'),
                                            null == r && (r = 'avc1.42e01e'),
                                            (a = {}),
                                            (n = this.initData = c.parseInitSegment(t)).audio &&
                                                n.video
                                                ? (a.audiovideo = {
                                                    container: 'video/mp4',
                                                    codec: e + ',' + r,
                                                    initSegment: i ? t : null,
                                                })
                                                : (n.audio &&
                                                    (a.audio = {
                                                        container: 'audio/mp4',
                                                        codec: e,
                                                        initSegment: i ? t : null,
                                                    }),
                                                    n.video &&
                                                    (a.video = {
                                                        container: 'video/mp4',
                                                        codec: r,
                                                        initSegment: i ? t : null,
                                                    })),
                                            this.observer.trigger(
                                                s.default.FRAG_PARSING_INIT_SEGMENT,
                                                { tracks: a },
                                            ))
                                        : (e && (this.audioCodec = e), r && (this.videoCodec = r))
                                }),
                                (c.probe = function (t) {
                                    return (
                                        0 <
                                        c.findBox(
                                            { data: t, start: 0, end: Math.min(t.length, 16384) },
                                            ['moof'],
                                        ).length
                                    )
                                }),
                                (c.bin2str = function (t) {
                                    return String.fromCharCode.apply(null, t)
                                }),
                                (c.readUint16 = function (t, e) {
                                    return (
                                        t.data && ((e += t.start), (t = t.data)),
                                        (t = (t[e] << 8) | t[e + 1]) < 0 ? 65536 + t : t
                                    )
                                }),
                                (c.readUint32 = function (t, e) {
                                    return (
                                        t.data && ((e += t.start), (t = t.data)),
                                        (t =
                                            (t[e] << 24) |
                                            (t[e + 1] << 16) |
                                            (t[e + 2] << 8) |
                                            t[e + 3]) < 0
                                            ? 4294967296 + t
                                            : t
                                    )
                                }),
                                (c.writeUint32 = function (t, e, r) {
                                    t.data && ((e += t.start), (t = t.data)),
                                        (t[e] = r >> 24),
                                        (t[e + 1] = (r >> 16) & 255),
                                        (t[e + 2] = (r >> 8) & 255),
                                        (t[e + 3] = 255 & r)
                                }),
                                (c.findBox = function (t, e) {
                                    var r,
                                        i,
                                        n = []
                                    if (
                                        (t.data
                                            ? ((r = t.start), (i = t.end), (t = t.data))
                                            : ((r = 0), (i = t.byteLength)),
                                            !e.length)
                                    )
                                        return null
                                    for (; r < i;) {
                                        var a = 1 < (a = c.readUint32(t, r)) ? r + a : i
                                        c.bin2str(t.subarray(r + 4, r + 8)) === e[0] &&
                                            (1 === e.length
                                                ? n.push({ data: t, start: r + 8, end: a })
                                                : (r = c.findBox(
                                                    { data: t, start: r + 8, end: a },
                                                    e.slice(1),
                                                )).length && (n = n.concat(r))),
                                            (r = a)
                                    }
                                    return n
                                }),
                                (c.parseSegmentIndex = function (t) {
                                    var e = (e = c.findBox(t, ['moov'])[0]) ? e.end : null
                                    if (!(t = c.findBox(t, ['sidx'])) || !t[0]) return null
                                    var r = [],
                                        i = (t = t[0]).data[0],
                                        n = c.readUint32(t, (a = 0 === i ? 8 : 16))
                                    a += 4
                                    var a = (0 === i ? a + 8 : a + 16) + 2,
                                        s = t.end + 0,
                                        o = c.readUint16(t, a)
                                    a += 2
                                    for (var l = 0; l < o; l++) {
                                        var u = c.readUint32(t, a),
                                            d = 2147483647 & u
                                        if (1 == (2147483648 & u) >>> 31) return
                                            ; (u = c.readUint32(t, (a += 4))),
                                                (a += 4),
                                                r.push({
                                                    referenceSize: d,
                                                    subsegmentDuration: u,
                                                    info: { duration: u / n, start: s, end: s + d - 1 },
                                                }),
                                                (s += d),
                                                (a += 4)
                                    }
                                    return {
                                        earliestPresentationTime: 0,
                                        timescale: n,
                                        version: i,
                                        referencesCount: o,
                                        references: r,
                                        moovEndOffset: e,
                                    }
                                }),
                                (c.parseInitSegment = function (t) {
                                    var n = []
                                    return (
                                        c.findBox(t, ['moov', 'trak']).forEach(function (t) {
                                            var e,
                                                r,
                                                i = c.findBox(t, ['tkhd'])[0]
                                            i &&
                                                ((e = i.data[i.start]),
                                                    (i = c.readUint32(i, 0 === e ? 12 : 20)),
                                                    (r = c.findBox(t, ['mdia', 'mdhd'])[0]) &&
                                                    ((e = r.data[r.start]),
                                                        (e = c.readUint32(r, 0 === e ? 12 : 20)),
                                                        (r = c.findBox(t, ['mdia', 'hdlr'])[0])) &&
                                                    (r = { soun: 'audio', vide: 'video' }[
                                                        c.bin2str(
                                                            r.data.subarray(r.start + 8, r.start + 12),
                                                        )
                                                    ]) &&
                                                    ((t = c.findBox(t, ['mdia', 'minf', 'stbl', 'stsd']))
                                                        .length &&
                                                        ((t = t[0]),
                                                            c.bin2str(
                                                                t.data.subarray(t.start + 12, t.start + 16),
                                                            )),
                                                        (n[i] = { timescale: e, type: r }),
                                                        (n[r] = { timescale: e, id: i })))
                                        }),
                                        n
                                    )
                                }),
                                (c.getStartDTS = function (r, t) {
                                    return (
                                        (t = c.findBox(t, ['moof', 'traf'])),
                                        (t = [].concat.apply(
                                            [],
                                            t.map(function (e) {
                                                return c.findBox(e, ['tfhd']).map(function (t) {
                                                    return (
                                                        (t = c.readUint32(t, 4)),
                                                        (t = r[t].timescale || 9e4),
                                                        c.findBox(e, ['tfdt']).map(function (t) {
                                                            var e = t.data[t.start],
                                                                r = c.readUint32(t, 4)
                                                            return (
                                                                1 === e &&
                                                                ((r *= Math.pow(2, 32)),
                                                                    (r += c.readUint32(t, 8))),
                                                                r
                                                            )
                                                        })[0] / t
                                                    )
                                                })
                                            }),
                                        )),
                                        (t = Math.min.apply(null, t)),
                                        isFinite(t) ? t : 0
                                    )
                                }),
                                (c.offsetStartDTS = function (r, t, n) {
                                    c.findBox(t, ['moof', 'traf']).map(function (e) {
                                        return c.findBox(e, ['tfhd']).map(function (t) {
                                            t = c.readUint32(t, 4)
                                            var i = r[t].timescale || 9e4
                                            c.findBox(e, ['tfdt']).map(function (t) {
                                                var e = t.data[t.start],
                                                    r = c.readUint32(t, 4)
                                                0 === e
                                                    ? c.writeUint32(t, 4, r - n * i)
                                                    : ((r *= Math.pow(2, 32)),
                                                        (r += c.readUint32(t, 8)),
                                                        (r -= n * i),
                                                        (r = Math.max(r, 0)),
                                                        (e = Math.floor(r % (1 + a))),
                                                        c.writeUint32(t, 4, Math.floor(r / (1 + a))),
                                                        c.writeUint32(t, 8, e))
                                            })
                                        })
                                    })
                                }),
                                (c.prototype.append = function (t, e, r, i) {
                                    var n = this.initData
                                    n ||
                                        (this.resetInitSegment(
                                            t,
                                            this.audioCodec,
                                            this.videoCodec,
                                            !1,
                                        ),
                                            (n = this.initData))
                                    var a = this.initPTS
                                    void 0 === a &&
                                        ((this.initPTS = a = c.getStartDTS(n, t) - e),
                                            this.observer.trigger(s.default.INIT_PTS_FOUND, {
                                                initPTS: a,
                                            })),
                                        c.offsetStartDTS(n, t, a),
                                        (e = c.getStartDTS(n, t)),
                                        this.remuxer.remux(n.audio, n.video, null, null, e, r, i, t)
                                }),
                                (c.prototype.destroy = function () { }),
                                (e.default = c)
                        },
                        './src/demux/mpegaudio.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var u = {
                                BitratesMap: [
                                    32,
                                    64,
                                    96,
                                    128,
                                    160,
                                    192,
                                    224,
                                    256,
                                    288,
                                    320,
                                    352,
                                    384,
                                    416,
                                    448,
                                    32,
                                    48,
                                    56,
                                    64,
                                    80,
                                    96,
                                    112,
                                    128,
                                    160,
                                    192,
                                    224,
                                    256,
                                    320,
                                    384,
                                    32,
                                    40,
                                    48,
                                    56,
                                    64,
                                    80,
                                    96,
                                    112,
                                    128,
                                    160,
                                    192,
                                    224,
                                    256,
                                    320,
                                    32,
                                    48,
                                    56,
                                    64,
                                    80,
                                    96,
                                    112,
                                    128,
                                    144,
                                    160,
                                    176,
                                    192,
                                    224,
                                    256,
                                    8,
                                    16,
                                    24,
                                    32,
                                    40,
                                    48,
                                    56,
                                    64,
                                    80,
                                    96,
                                    112,
                                    128,
                                    144,
                                    160,
                                ],
                                SamplingRateMap: [
                                    44100,
                                    48e3,
                                    32e3,
                                    22050,
                                    24e3,
                                    16e3,
                                    11025,
                                    12e3,
                                    8e3,
                                ],
                                SamplesCoefficients: [
                                    [0, 72, 144, 12],
                                    [0, 0, 0, 0],
                                    [0, 72, 144, 12],
                                    [0, 144, 144, 12],
                                ],
                                BytesInSlot: [0, 1, 1, 4],
                                appendFrame: function (t, e, r, i, n) {
                                    if (!(r + 24 > e.length)) {
                                        var a = this.parseHeader(e, r)
                                        if (a && r + a.frameLength <= e.length)
                                            return (
                                                (i += ((9e4 * a.samplesPerFrame) / a.sampleRate) * n),
                                                (e = {
                                                    unit: e.subarray(r, r + a.frameLength),
                                                    pts: i,
                                                    dts: i,
                                                }),
                                                (t.config = []),
                                                (t.channelCount = a.channelCount),
                                                (t.samplerate = a.sampleRate),
                                                t.samples.push(e),
                                                (t.len += a.frameLength),
                                                { sample: e, length: a.frameLength }
                                            )
                                    }
                                },
                                parseHeader: function (t, e) {
                                    var r = (t[e + 1] >> 3) & 3,
                                        i = (t[e + 1] >> 1) & 3,
                                        n = (t[e + 2] >> 4) & 15,
                                        a = (t[e + 2] >> 2) & 3,
                                        s = (t[e + 2] >> 1) & 1
                                    if (1 !== r && 0 != n && 15 != n && 3 !== a) {
                                        ; (a =
                                            u.SamplingRateMap[
                                            3 * (3 === r ? 0 : 2 === r ? 1 : 2) + a
                                            ]),
                                            (t = 3 == t[e + 3] >> 6 ? 1 : 2)
                                        var o = u.SamplesCoefficients[r][i],
                                            l = u.BytesInSlot[i]
                                        return (
                                            (e = 8 * o * l),
                                            {
                                                sampleRate: a,
                                                channelCount: t,
                                                frameLength: (r =
                                                    parseInt(
                                                        (1e3 *
                                                            o *
                                                            u.BitratesMap[
                                                            14 * (3 === r ? 3 - i : 3 == i ? 3 : 4) + n - 1
                                                            ]) /
                                                        a +
                                                        s,
                                                        10,
                                                    ) * l),
                                                samplesPerFrame: e,
                                            }
                                        )
                                    }
                                },
                                isHeaderPattern: function (t, e) {
                                    return (
                                        255 === t[e] &&
                                        224 == (224 & t[e + 1]) &&
                                        0 != (6 & t[e + 1])
                                    )
                                },
                                isHeader: function (t, e) {
                                    return !!(e + 1 < t.length && this.isHeaderPattern(t, e))
                                },
                                probe: function (t, e) {
                                    if (e + 1 < t.length && this.isHeaderPattern(t, e)) {
                                        var r = this.parseHeader(t, e),
                                            i = 4
                                        if (
                                            (e += i = r && r.frameLength ? r.frameLength : i) ===
                                            t.length ||
                                            (e + 1 < t.length && this.isHeaderPattern(t, e))
                                        )
                                            return !0
                                    }
                                    return !1
                                },
                            }
                            e.default = u
                        },
                        './src/demux/sample-aes.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var n = r('./src/crypt/decrypter.js')
                            function i(t, e, r, i) {
                                ; (this.decryptdata = r),
                                    (this.discardEPB = i),
                                    (this.decrypter = new n.default(t, e, {
                                        removePKCS7Padding: !1,
                                    }))
                            }
                            ; (i.prototype.decryptBuffer = function (t, e) {
                                this.decrypter.decrypt(
                                    t,
                                    this.decryptdata.key.buffer,
                                    this.decryptdata.iv.buffer,
                                    e,
                                )
                            }),
                                (i.prototype.decryptAacSample = function (e, r, i, n) {
                                    var a = e[r].unit,
                                        t = (t = a.subarray(
                                            16,
                                            a.length - (a.length % 16),
                                        )).buffer.slice(t.byteOffset, t.byteOffset + t.length),
                                        s = this
                                    this.decryptBuffer(t, function (t) {
                                        ; (t = new Uint8Array(t)),
                                            a.set(t, 16),
                                            n || s.decryptAacSamples(e, r + 1, i)
                                    })
                                }),
                                (i.prototype.decryptAacSamples = function (t, e, r) {
                                    for (; ; e++) {
                                        if (e >= t.length) {
                                            r()
                                            break
                                        }
                                        if (!(t[e].unit.length < 32)) {
                                            var i = this.decrypter.isSync()
                                            if ((this.decryptAacSample(t, e, r, i), !i)) break
                                        }
                                    }
                                }),
                                (i.prototype.getAvcEncryptedData = function (t) {
                                    for (
                                        var e = new Int8Array(
                                            16 * Math.floor((t.length - 48) / 160) + 16,
                                        ),
                                        r = 0,
                                        i = 32;
                                        i <= t.length - 16;
                                        i += 160, r += 16
                                    )
                                        e.set(t.subarray(i, i + 16), r)
                                    return e
                                }),
                                (i.prototype.getAvcDecryptedUnit = function (t, e) {
                                    e = new Uint8Array(e)
                                    for (var r = 0, i = 32; i <= t.length - 16; i += 160, r += 16)
                                        t.set(e.subarray(r, r + 16), i)
                                    return t
                                }),
                                (i.prototype.decryptAvcSample = function (e, r, i, n, a, s) {
                                    var o = this.discardEPB(a.data),
                                        t = this.getAvcEncryptedData(o),
                                        l = this
                                    this.decryptBuffer(t.buffer, function (t) {
                                        ; (a.data = l.getAvcDecryptedUnit(o, t)),
                                            s || l.decryptAvcSamples(e, r, i + 1, n)
                                    })
                                }),
                                (i.prototype.decryptAvcSamples = function (t, e, r, i) {
                                    for (; ; e++, r = 0) {
                                        if (e >= t.length) {
                                            i()
                                            break
                                        }
                                        for (var n = t[e].units; !(r >= n.length); r++) {
                                            var a = n[r]
                                            if (!(a.length <= 48 || (1 !== a.type && 5 !== a.type))) {
                                                var s = this.decrypter.isSync()
                                                if ((this.decryptAvcSample(t, e, r, i, a, s), !s))
                                                    return
                                            }
                                        }
                                    }
                                }),
                                (e.default = i)
                        },
                        './src/demux/tsdemuxer.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var d = r('./src/demux/adts.js'),
                                s = r('./src/demux/mpegaudio.js'),
                                P = r('./src/events.js'),
                                g = r('./src/demux/exp-golomb.js'),
                                i = r('./src/demux/sample-aes.js')
                            r('./src/utils/logger.js')
                            var k = r('./src/errors.js'),
                                n = { video: 1, audio: 2, id3: 3, text: 4 }
                            function w(t, e, r, i) {
                                ; (this.observer = t),
                                    (this.config = r),
                                    (this.typeSupported = i),
                                    (this.remuxer = e),
                                    (this.sampleAes = null)
                            }
                            ; (w.prototype.setDecryptData = function (t) {
                                this.sampleAes =
                                    null != t && null != t.key && 'SAMPLE-AES' === t.method
                                        ? new i.default(
                                            this.observer,
                                            this.config,
                                            t,
                                            this.discardEPB,
                                        )
                                        : null
                            }),
                                (w.probe = function (t) {
                                    return !(w._syncOffset(t) < 0)
                                }),
                                (w._syncOffset = function (t) {
                                    for (var e = Math.min(1e3, t.length - 564), r = 0; r < e;) {
                                        if (71 === t[r] && 71 === t[r + 188] && 71 === t[r + 376])
                                            return r
                                        r++
                                    }
                                    return -1
                                }),
                                (w.createTrack = function (t, e) {
                                    return {
                                        container:
                                            'video' === t || 'audio' === t ? 'video/mp2t' : void 0,
                                        type: t,
                                        id: n[t],
                                        pid: -1,
                                        inputTimeScale: 9e4,
                                        sequenceNumber: 0,
                                        samples: [],
                                        len: 0,
                                        dropped: 'video' === t ? 0 : void 0,
                                        isAAC: 'audio' === t || void 0,
                                        duration: 'audio' === t ? e : void 0,
                                    }
                                }),
                                (w.prototype.resetInitSegment = function (t, e, r, i) {
                                    ; (this.pmtParsed = !1),
                                        (this._pmtId = -1),
                                        (this._avcTrack = w.createTrack('video', i)),
                                        (this._audioTrack = w.createTrack('audio', i)),
                                        (this._id3Track = w.createTrack('id3', i)),
                                        (this._txtTrack = w.createTrack('text', i)),
                                        (this.avcSample = this.aacLastPTS = this.aacOverFlow = null),
                                        (this.audioCodec = e),
                                        (this.videoCodec = r),
                                        (this._duration = i)
                                }),
                                (w.prototype.resetTimeStamp = function () { }),
                                (w.prototype.append = function (t, e, r, i) {
                                    var n,
                                        a,
                                        s = t.length,
                                        o = !1
                                    this.contiguous = r
                                    var l = this.pmtParsed,
                                        u = this._avcTrack,
                                        d = this._audioTrack,
                                        c = this._id3Track,
                                        f = u.pid,
                                        h = d.pid,
                                        p = c.pid,
                                        g = this._pmtId,
                                        y = u.pesData,
                                        m = d.pesData,
                                        v = c.pesData,
                                        _ = this._parsePAT,
                                        E = this._parsePMT,
                                        T = this._parsePES,
                                        S = this._parseAVCPES.bind(this),
                                        b = this._parseAACPES.bind(this),
                                        A = this._parseMPEGPES.bind(this),
                                        R = this._parseID3PES.bind(this),
                                        L = w._syncOffset(t)
                                    for (s -= (s + L) % 188, n = L; n < s; n += 188)
                                        if (71 === t[n]) {
                                            var D = !!(64 & t[n + 1]),
                                                O = ((31 & t[n + 1]) << 8) + t[n + 2],
                                                I = (48 & t[n + 3]) >> 4
                                            if (1 < I) {
                                                if ((I = n + 5 + t[n + 4]) === n + 188) continue
                                            } else I = n + 4
                                            switch (O) {
                                                case f:
                                                    D &&
                                                        (y && (a = T(y)) && void 0 !== a.pts && S(a, !1),
                                                            (y = { data: [], size: 0 })),
                                                        y &&
                                                        (y.data.push(t.subarray(I, n + 188)),
                                                            (y.size += n + 188 - I))
                                                    break
                                                case h:
                                                    D &&
                                                        (m &&
                                                            (a = T(m)) &&
                                                            void 0 !== a.pts &&
                                                            (d.isAAC ? b : A)(a),
                                                            (m = { data: [], size: 0 })),
                                                        m &&
                                                        (m.data.push(t.subarray(I, n + 188)),
                                                            (m.size += n + 188 - I))
                                                    break
                                                case p:
                                                    D &&
                                                        (v && (a = T(v)) && void 0 !== a.pts && R(a),
                                                            (v = { data: [], size: 0 })),
                                                        v &&
                                                        (v.data.push(t.subarray(I, n + 188)),
                                                            (v.size += n + 188 - I))
                                                    break
                                                case 0:
                                                    D && (I += t[I] + 1), (g = this._pmtId = _(t, I))
                                                    break
                                                case g:
                                                    D && (I += t[I] + 1),
                                                        0 <
                                                        (f = (D = E(
                                                            t,
                                                            I,
                                                            !0 === this.typeSupported.mpeg ||
                                                            !0 === this.typeSupported.mp3,
                                                            null != this.sampleAes,
                                                        )).avc) && (u.pid = f),
                                                        0 < (h = D.audio) &&
                                                        ((d.pid = h), (d.isAAC = D.isAAC)),
                                                        0 < (p = D.id3) && (c.pid = p),
                                                        o && !l && ((o = !1), (n = L - 188)),
                                                        (l = this.pmtParsed = !0)
                                                    break
                                                case 17:
                                                case 8191:
                                                    break
                                                default:
                                                    o = !0
                                            }
                                        } else
                                            this.observer.trigger(P.default.ERROR, {
                                                type: k.ErrorTypes.MEDIA_ERROR,
                                                details: k.ErrorDetails.FRAG_PARSING_ERROR,
                                                fatal: !1,
                                                reason: 'TS packet did not start with 0x47',
                                            })
                                    y && (a = T(y)) && void 0 !== a.pts
                                        ? (S(a, !0), (u.pesData = null))
                                        : (u.pesData = y),
                                        m && (a = T(m)) && void 0 !== a.pts
                                            ? ((d.isAAC ? b : A)(a), (d.pesData = null))
                                            : (d.pesData = m),
                                        v && (a = T(v)) && void 0 !== a.pts
                                            ? (R(a), (c.pesData = null))
                                            : (c.pesData = v),
                                        null == this.sampleAes
                                            ? this.remuxer.remux(d, u, c, this._txtTrack, e, r, i)
                                            : this.decryptAndRemux(d, u, c, this._txtTrack, e, r, i)
                                }),
                                (w.prototype.decryptAndRemux = function (t, e, r, i, n, a, s) {
                                    var o
                                    t.samples && t.isAAC
                                        ? (o = this).sampleAes.decryptAacSamples(
                                            t.samples,
                                            0,
                                            function () {
                                                o.decryptAndRemuxAvc(t, e, r, i, n, a, s)
                                            },
                                        )
                                        : this.decryptAndRemuxAvc(t, e, r, i, n, a, s)
                                }),
                                (w.prototype.decryptAndRemuxAvc = function (
                                    t,
                                    e,
                                    r,
                                    i,
                                    n,
                                    a,
                                    s,
                                ) {
                                    var o
                                    e.samples
                                        ? (o = this).sampleAes.decryptAvcSamples(
                                            e.samples,
                                            0,
                                            0,
                                            function () {
                                                o.remuxer.remux(t, e, r, i, n, a, s)
                                            },
                                        )
                                        : this.remuxer.remux(t, e, r, i, n, a, s)
                                }),
                                (w.prototype.destroy = function () {
                                    ; (this._initPTS = this._initDTS = void 0),
                                        (this._duration = 0)
                                }),
                                (w.prototype._parsePAT = function (t, e) {
                                    return ((31 & t[e + 10]) << 8) | t[e + 11]
                                }),
                                (w.prototype._parsePMT = function (t, e, r, i) {
                                    var n = { audio: -1, avc: -1, id3: -1, isAAC: !0 },
                                        a = e + 3 + (((15 & t[e + 1]) << 8) | t[e + 2]) - 4
                                    for (
                                        e += 12 + (((15 & t[e + 10]) << 8) | t[e + 11]);
                                        e < a;

                                    ) {
                                        var s = ((31 & t[e + 1]) << 8) | t[e + 2]
                                        switch (t[e]) {
                                            case 207:
                                                if (!i) break
                                            case 15:
                                                ; -1 === n.audio && (n.audio = s)
                                                break
                                            case 21:
                                                ; -1 === n.id3 && (n.id3 = s)
                                                break
                                            case 219:
                                                if (!i) break
                                            case 27:
                                                ; -1 === n.avc && (n.avc = s)
                                                break
                                            case 3:
                                            case 4:
                                                r && -1 === n.audio && ((n.audio = s), (n.isAAC = !1))
                                        }
                                        e += 5 + (((15 & t[e + 3]) << 8) | t[e + 4])
                                    }
                                    return n
                                }),
                                (w.prototype._parsePES = function (t) {
                                    var e,
                                        r = 0,
                                        i = t.data
                                    if (!t || 0 === t.size) return null
                                    for (; i[0].length < 19 && 1 < i.length;) {
                                        var n = new Uint8Array(i[0].length + i[1].length)
                                        n.set(i[0]),
                                            n.set(i[1], i[0].length),
                                            (i[0] = n),
                                            i.splice(1, 1)
                                    }
                                    if (1 !== ((n = i[0])[0] << 16) + (n[1] << 8) + n[2])
                                        return null
                                    if ((e = (n[4] << 8) + n[5]) && e > t.size - 6) return null
                                    var a,
                                        s,
                                        o = n[7]
                                    192 & o &&
                                        (4294967295 <
                                            (a =
                                                536870912 * (14 & n[9]) +
                                                4194304 * (255 & n[10]) +
                                                16384 * (254 & n[11]) +
                                                128 * (255 & n[12]) +
                                                (254 & n[13]) / 2) && (a -= 8589934592),
                                            64 & o
                                                ? (4294967295 <
                                                    (s =
                                                        536870912 * (14 & n[14]) +
                                                        4194304 * (255 & n[15]) +
                                                        16384 * (254 & n[16]) +
                                                        128 * (255 & n[17]) +
                                                        (254 & n[18]) / 2) && (s -= 8589934592),
                                                    54e5 < a - s && (a = s))
                                                : (s = a))
                                    var l = (o = n[8]) + 9
                                        ; (t.size -= l), (t = new Uint8Array(t.size))
                                    for (var u = 0, d = i.length; u < d; u++) {
                                        var c = (n = i[u]).byteLength
                                        if (l) {
                                            if (c < l) {
                                                l -= c
                                                continue
                                            }
                                            ; (n = n.subarray(l)), (c -= l), (l = 0)
                                        }
                                        t.set(n, r), (r += c)
                                    }
                                    return e && (e -= o + 3), { data: t, pts: a, dts: s, len: e }
                                }),
                                (w.prototype.pushAccesUnit = function (t, e) {
                                    var r, i
                                    t.units.length &&
                                        t.frame &&
                                        ((i = (r = e.samples).length),
                                            !this.config.forceKeyFrameOnDiscontinuity ||
                                                !0 === t.key ||
                                                (e.sps && (i || this.contiguous))
                                                ? ((t.id = i), r.push(t))
                                                : e.dropped++)
                                }),
                                (w.prototype._parseAVCPES = function (a, t) {
                                    function s(t, e, r, i) {
                                        return { key: t, pts: e, dts: r, units: [], debug: i }
                                    }
                                    var o,
                                        l,
                                        u,
                                        d = this,
                                        c = this._avcTrack,
                                        e = this._parseAVCNALu(a.data),
                                        f = this.avcSample,
                                        h = !1,
                                        p = this.pushAccesUnit.bind(this)
                                        ; (a.data = null),
                                            f &&
                                            e.length &&
                                            !c.audFound &&
                                            (p(f, c), (f = this.avcSample = s(!1, a.pts, a.dts, ''))),
                                            e.forEach(function (t) {
                                                switch (t.type) {
                                                    case 1:
                                                        ; (l = !0),
                                                            ((f =
                                                                f ||
                                                                (d.avcSample = s(
                                                                    !0,
                                                                    a.pts,
                                                                    a.dts,
                                                                    '',
                                                                ))).frame = !0)
                                                        var e = t.data
                                                        h &&
                                                            4 < e.length &&
                                                            (2 === (e = new g.default(e).readSliceType()) ||
                                                                4 === e ||
                                                                7 === e ||
                                                                9 === e) &&
                                                            (f.key = !0)
                                                        break
                                                    case 5:
                                                        ; (l = !0),
                                                            ((f =
                                                                f ||
                                                                (d.avcSample = s(
                                                                    !0,
                                                                    a.pts,
                                                                    a.dts,
                                                                    '',
                                                                ))).key = !0),
                                                            (f.frame = !0)
                                                        break
                                                    case 6:
                                                        ; (l = !0),
                                                            (o = new g.default(
                                                                d.discardEPB(t.data),
                                                            )).readUByte(),
                                                            (e = !1)
                                                        for (var r; !e && 1 < o.bytesAvailable;) {
                                                            for (
                                                                var i = 0;
                                                                (r = o.readUByte()), (i += r), 255 === r;

                                                            );
                                                            for (
                                                                var n = 0;
                                                                (r = o.readUByte()), (n += r), 255 === r;

                                                            );
                                                            if (4 === i && 0 !== o.bytesAvailable) {
                                                                if (
                                                                    ((e = !0),
                                                                        181 === o.readUByte() &&
                                                                        49 === o.readUShort() &&
                                                                        1195456820 === o.readUInt() &&
                                                                        3 === o.readUByte())
                                                                ) {
                                                                    for (
                                                                        i = 31 & (n = o.readUByte()),
                                                                        n = [n, (r = o.readUByte())],
                                                                        u = 0;
                                                                        u < i;
                                                                        u++
                                                                    )
                                                                        n.push(o.readUByte()),
                                                                            n.push(o.readUByte()),
                                                                            n.push(o.readUByte())
                                                                    d._insertSampleInOrder(d._txtTrack.samples, {
                                                                        type: 3,
                                                                        pts: a.pts,
                                                                        bytes: n,
                                                                    })
                                                                }
                                                            } else if (n < o.bytesAvailable)
                                                                for (u = 0; u < n; u++) o.readUByte()
                                                        }
                                                        break
                                                    case 7:
                                                        if (((h = l = !0), !c.sps)) {
                                                            for (
                                                                e = (o = new g.default(t.data)).readSPS(),
                                                                c.width = e.width,
                                                                c.height = e.height,
                                                                c.pixelRatio = e.pixelRatio,
                                                                c.sps = [t.data],
                                                                c.duration = d._duration,
                                                                e = t.data.subarray(1, 4),
                                                                i = 'avc1.',
                                                                u = 0;
                                                                u < 3;
                                                                u++
                                                            )
                                                                i += n =
                                                                    (n = e[u].toString(16)).length < 2 ? '0' + n : n
                                                            c.codec = i
                                                        }
                                                        break
                                                    case 8:
                                                        ; (l = !0), c.pps || (c.pps = [t.data])
                                                        break
                                                    case 9:
                                                        ; (l = !1),
                                                            (c.audFound = !0),
                                                            f && p(f, c),
                                                            (f = d.avcSample = s(!1, a.pts, a.dts, ''))
                                                        break
                                                    case 12:
                                                        l = !1
                                                        break
                                                    default:
                                                        ; (l = !1),
                                                            f && (f.debug += 'unknown NAL ' + t.type + ' ')
                                                }
                                                f && l && f.units.push(t)
                                            }),
                                            t && f && (p(f, c), (this.avcSample = null))
                                }),
                                (w.prototype._insertSampleInOrder = function (t, e) {
                                    var r = t.length
                                    if (0 < r) {
                                        if (e.pts >= t[r - 1].pts) t.push(e)
                                        else
                                            for (--r; 0 <= r; r--)
                                                if (e.pts < t[r].pts) {
                                                    t.splice(r, 0, e)
                                                    break
                                                }
                                    } else t.push(e)
                                }),
                                (w.prototype._getLastNalUnit = function () {
                                    var t,
                                        e = this.avcSample
                                    return (t = (e =
                                        !e || 0 === e.units.length
                                            ? (e = this._avcTrack.samples)[e.length - 1]
                                            : e)
                                        ? (t = e.units)[t.length - 1]
                                        : t)
                                }),
                                (w.prototype._parseAVCNALu = function (t) {
                                    var e,
                                        r,
                                        i = 0,
                                        n = t.byteLength,
                                        a = this._avcTrack,
                                        s = (r = a.naluState || 0),
                                        o = [],
                                        l = -1
                                    for (
                                        -1 === r && ((e = 31 & t[(l = 0)]), (r = 0), (i = 1));
                                        i < n;

                                    ) {
                                        var u,
                                            d = t[i++]
                                        r = r
                                            ? 1 === r
                                                ? d
                                                    ? 0
                                                    : 2
                                                : d
                                                    ? 1 === d
                                                        ? (0 <= l
                                                            ? ((d = {
                                                                data: t.subarray(l, i - r - 1),
                                                                type: e,
                                                            }),
                                                                o.push(d))
                                                            : (d = this._getLastNalUnit()) &&
                                                            (s &&
                                                                i <= 4 - s &&
                                                                d.state &&
                                                                (d.data = d.data.subarray(
                                                                    0,
                                                                    d.data.byteLength - s,
                                                                )),
                                                                0 < (r = i - r - 1) &&
                                                                ((u = new Uint8Array(
                                                                    d.data.byteLength + r,
                                                                )).set(d.data, 0),
                                                                    u.set(t.subarray(0, r), d.data.byteLength),
                                                                    (d.data = u))),
                                                            i < n ? ((e = 31 & t[i]), (l = i), 0) : -1)
                                                        : 0
                                                    : 3
                                            : d
                                                ? 0
                                                : 1
                                    }
                                    return (
                                        0 <= l &&
                                        0 <= r &&
                                        ((d = { data: t.subarray(l, n), type: e, state: r }),
                                            o.push(d)),
                                        0 === o.length &&
                                        (d = this._getLastNalUnit()) &&
                                        ((u = new Uint8Array(
                                            d.data.byteLength + t.byteLength,
                                        )).set(d.data, 0),
                                            u.set(t, d.data.byteLength),
                                            (d.data = u)),
                                        (a.naluState = r),
                                        o
                                    )
                                }),
                                (w.prototype.discardEPB = function (t) {
                                    for (var e = t.byteLength, r = [], i = 1; i < e - 2;)
                                        0 === t[i] && 0 === t[i + 1] && 3 === t[i + 2]
                                            ? (r.push(i + 2), (i += 2))
                                            : i++
                                    if (0 === r.length) return t
                                    e -= r.length
                                    for (var n = new Uint8Array(e), a = 0, i = 0; i < e; a++, i++)
                                        a === r[0] && (a++, r.shift()), (n[i] = t[a])
                                    return n
                                }),
                                (w.prototype._parseAACPES = function (t) {
                                    var e = this._audioTrack,
                                        r = t.data
                                    t = t.pts
                                    var i,
                                        n,
                                        a = this.aacOverFlow,
                                        s = this.aacLastPTS
                                    for (
                                        a &&
                                        ((n = new Uint8Array(a.byteLength + r.byteLength)).set(
                                            a,
                                            0,
                                        ),
                                            n.set(r, a.byteLength),
                                            (r = n)),
                                        n = 0,
                                        i = r.length;
                                        n < i - 1 && !d.isHeader(r, n);
                                        n++
                                    );
                                    if (n) {
                                        var o,
                                            l =
                                                n < i - 1
                                                    ? ((o =
                                                        'AAC PES did not start with ADTS header,offset:' +
                                                        n),
                                                        !1)
                                                    : ((o = 'no ADTS header found in AAC PES'), !0)
                                        if (
                                            (this.observer.trigger(P.default.ERROR, {
                                                type: k.ErrorTypes.MEDIA_ERROR,
                                                details: k.ErrorDetails.FRAG_PARSING_ERROR,
                                                fatal: l,
                                                reason: o,
                                            }),
                                                l)
                                        )
                                            return
                                    }
                                    for (
                                        d.initTrackConfig(e, this.observer, r, n, this.audioCodec),
                                        o = 0,
                                        l = d.getFrameDuration(e.samplerate),
                                        a && s && ((a = s + l), 1 < Math.abs(a - t) && (t = a));
                                        n < i;

                                    )
                                        if (d.isHeader(r, n) && n + 5 < i) {
                                            if (!(a = d.appendFrame(e, r, n, t, o))) break
                                            n += a.length
                                            var u = a.sample.pts
                                            o++
                                        } else n++
                                            ; (this.aacOverFlow = a = n < i ? r.subarray(n, i) : null),
                                                (this.aacLastPTS = u)
                                }),
                                (w.prototype._parseMPEGPES = function (t) {
                                    var e = t.data,
                                        r = e.length,
                                        i = 0,
                                        n = 0
                                    for (t = t.pts; n < r;)
                                        if (s.default.isHeader(e, n)) {
                                            var a = s.default.appendFrame(
                                                this._audioTrack,
                                                e,
                                                n,
                                                t,
                                                i,
                                            )
                                            if (!a) break
                                                ; (n += a.length), i++
                                        } else n++
                                }),
                                (w.prototype._parseID3PES = function (t) {
                                    this._id3Track.samples.push(t)
                                }),
                                (e.default = w)
                        },
                        './src/errors.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (e.ErrorTypes = {
                                    NETWORK_ERROR: 'networkError',
                                    MEDIA_ERROR: 'mediaError',
                                    KEY_SYSTEM_ERROR: 'keySystemError',
                                    MUX_ERROR: 'muxError',
                                    OTHER_ERROR: 'otherError',
                                }),
                                (e.ErrorDetails = {
                                    KEY_SYSTEM_NO_KEYS: 'keySystemNoKeys',
                                    KEY_SYSTEM_NO_ACCESS: 'keySystemNoAccess',
                                    KEY_SYSTEM_NO_SESSION: 'keySystemNoSession',
                                    KEY_SYSTEM_LICENSE_REQUEST_FAILED:
                                        'keySystemLicenseRequestFailed',
                                    MANIFEST_LOAD_ERROR: 'manifestLoadError',
                                    MANIFEST_LOAD_TIMEOUT: 'manifestLoadTimeOut',
                                    MANIFEST_PARSING_ERROR: 'manifestParsingError',
                                    MANIFEST_INCOMPATIBLE_CODECS_ERROR:
                                        'manifestIncompatibleCodecsError',
                                    LEVEL_LOAD_ERROR: 'levelLoadError',
                                    LEVEL_LOAD_TIMEOUT: 'levelLoadTimeOut',
                                    LEVEL_SWITCH_ERROR: 'levelSwitchError',
                                    AUDIO_TRACK_LOAD_ERROR: 'audioTrackLoadError',
                                    AUDIO_TRACK_LOAD_TIMEOUT: 'audioTrackLoadTimeOut',
                                    FRAG_LOAD_ERROR: 'fragLoadError',
                                    FRAG_LOAD_TIMEOUT: 'fragLoadTimeOut',
                                    FRAG_DECRYPT_ERROR: 'fragDecryptError',
                                    FRAG_PARSING_ERROR: 'fragParsingError',
                                    REMUX_ALLOC_ERROR: 'remuxAllocError',
                                    KEY_LOAD_ERROR: 'keyLoadError',
                                    KEY_LOAD_TIMEOUT: 'keyLoadTimeOut',
                                    BUFFER_ADD_CODEC_ERROR: 'bufferAddCodecError',
                                    BUFFER_APPEND_ERROR: 'bufferAppendError',
                                    BUFFER_APPENDING_ERROR: 'bufferAppendingError',
                                    BUFFER_STALLED_ERROR: 'bufferStalledError',
                                    BUFFER_FULL_ERROR: 'bufferFullError',
                                    BUFFER_SEEK_OVER_HOLE: 'bufferSeekOverHole',
                                    BUFFER_NUDGE_ON_STALL: 'bufferNudgeOnStall',
                                    INTERNAL_EXCEPTION: 'internalException',
                                })
                        },
                        './src/event-handler.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                r('./src/utils/logger.js')
                            var i = r('./src/errors.js'),
                                n = r('./src/events.js'),
                                a = {
                                    hlsEventGeneric: !0,
                                    hlsHandlerDestroying: !0,
                                    hlsHandlerDestroyed: !0,
                                }
                            function s(t) {
                                for (var e = [], r = 1; r < arguments.length; r++)
                                    e[r - 1] = arguments[r]
                                        ; (this.hls = t),
                                            (this.onEvent = this.onEvent.bind(this)),
                                            (this.handledEvents = e),
                                            (this.useGenericHandler = !0),
                                            this.registerListeners()
                            }
                            ; (s.prototype.destroy = function () {
                                this.onHandlerDestroying(),
                                    this.unregisterListeners(),
                                    this.onHandlerDestroyed()
                            }),
                                (s.prototype.onHandlerDestroying = function () { }),
                                (s.prototype.onHandlerDestroyed = function () { }),
                                (s.prototype.isEventHandler = function () {
                                    return (
                                        'object' == typeof this.handledEvents &&
                                        this.handledEvents.length &&
                                        'function' == typeof this.onEvent
                                    )
                                }),
                                (s.prototype.registerListeners = function () {
                                    this.isEventHandler() &&
                                        this.handledEvents.forEach(function (t) {
                                            if (a[t]) throw Error('Forbidden event-name: ' + t)
                                            this.hls.on(t, this.onEvent)
                                        }, this)
                                }),
                                (s.prototype.unregisterListeners = function () {
                                    this.isEventHandler() &&
                                        this.handledEvents.forEach(function (t) {
                                            this.hls.off(t, this.onEvent)
                                        }, this)
                                }),
                                (s.prototype.onEvent = function (t, e) {
                                    this.onEventGeneric(t, e)
                                }),
                                (s.prototype.onEventGeneric = function (e, t) {
                                    try {
                                        var r = 'on' + e.replace('hls', '')
                                        if ('function' != typeof this[r])
                                            throw Error(
                                                'Event ' +
                                                e +
                                                ' has no generic handler in this ' +
                                                this.constructor.name +
                                                ' class (tried ' +
                                                r +
                                                ')',
                                            )
                                        this[r].bind(this, t).call()
                                    } catch (t) {
                                        this.hls.trigger(n.default.ERROR, {
                                            type: i.ErrorTypes.OTHER_ERROR,
                                            details: i.ErrorDetails.INTERNAL_EXCEPTION,
                                            fatal: !1,
                                            event: e,
                                            err: t,
                                        })
                                    }
                                }),
                                (e.default = s)
                        },
                        './src/events.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (e.default = {
                                    MEDIA_ATTACHING: 'hlsMediaAttaching',
                                    MEDIA_ATTACHED: 'hlsMediaAttached',
                                    MEDIA_DETACHING: 'hlsMediaDetaching',
                                    MEDIA_DETACHED: 'hlsMediaDetached',
                                    BUFFER_RESET: 'hlsBufferReset',
                                    BUFFER_CODECS: 'hlsBufferCodecs',
                                    BUFFER_CREATED: 'hlsBufferCreated',
                                    BUFFER_APPENDING: 'hlsBufferAppending',
                                    BUFFER_APPENDED: 'hlsBufferAppended',
                                    BUFFER_EOS: 'hlsBufferEos',
                                    BUFFER_FLUSHING: 'hlsBufferFlushing',
                                    BUFFER_FLUSHED: 'hlsBufferFlushed',
                                    MANIFEST_LOADING: 'hlsManifestLoading',
                                    MANIFEST_LOADED: 'hlsManifestLoaded',
                                    MANIFEST_PARSED: 'hlsManifestParsed',
                                    LEVEL_SWITCHING: 'hlsLevelSwitching',
                                    LEVEL_SWITCHED: 'hlsLevelSwitched',
                                    LEVEL_LOADING: 'hlsLevelLoading',
                                    LEVEL_LOADED: 'hlsLevelLoaded',
                                    LEVEL_UPDATED: 'hlsLevelUpdated',
                                    LEVEL_PTS_UPDATED: 'hlsLevelPtsUpdated',
                                    AUDIO_TRACKS_UPDATED: 'hlsAudioTracksUpdated',
                                    AUDIO_TRACK_SWITCHING: 'hlsAudioTrackSwitching',
                                    AUDIO_TRACK_SWITCHED: 'hlsAudioTrackSwitched',
                                    AUDIO_TRACK_LOADING: 'hlsAudioTrackLoading',
                                    AUDIO_TRACK_LOADED: 'hlsAudioTrackLoaded',
                                    SUBTITLE_TRACKS_UPDATED: 'hlsSubtitleTracksUpdated',
                                    SUBTITLE_TRACK_SWITCH: 'hlsSubtitleTrackSwitch',
                                    SUBTITLE_TRACK_LOADING: 'hlsSubtitleTrackLoading',
                                    SUBTITLE_TRACK_LOADED: 'hlsSubtitleTrackLoaded',
                                    SUBTITLE_FRAG_PROCESSED: 'hlsSubtitleFragProcessed',
                                    INIT_PTS_FOUND: 'hlsInitPtsFound',
                                    FRAG_LOADING: 'hlsFragLoading',
                                    FRAG_LOAD_PROGRESS: 'hlsFragLoadProgress',
                                    FRAG_LOAD_EMERGENCY_ABORTED: 'hlsFragLoadEmergencyAborted',
                                    FRAG_LOADED: 'hlsFragLoaded',
                                    FRAG_DECRYPTED: 'hlsFragDecrypted',
                                    FRAG_PARSING_INIT_SEGMENT: 'hlsFragParsingInitSegment',
                                    FRAG_PARSING_USERDATA: 'hlsFragParsingUserdata',
                                    FRAG_PARSING_METADATA: 'hlsFragParsingMetadata',
                                    FRAG_PARSING_DATA: 'hlsFragParsingData',
                                    FRAG_PARSED: 'hlsFragParsed',
                                    FRAG_BUFFERED: 'hlsFragBuffered',
                                    FRAG_CHANGED: 'hlsFragChanged',
                                    FPS_DROP: 'hlsFpsDrop',
                                    FPS_DROP_LEVEL_CAPPING: 'hlsFpsDropLevelCapping',
                                    ERROR: 'hlsError',
                                    DESTROYING: 'hlsDestroying',
                                    KEY_LOADING: 'hlsKeyLoading',
                                    KEY_LOADED: 'hlsKeyLoaded',
                                    STREAM_STATE_TRANSITION: 'hlsStreamStateTransition',
                                })
                        },
                        './src/hls.js': function (t, e, r) {
                            var i,
                                n =
                                    (this && this.__extends) ||
                                    ((i =
                                        Object.setPrototypeOf ||
                                        ({ __proto__: [] } instanceof Array &&
                                            function (t, e) {
                                                t.__proto__ = e
                                            }) ||
                                        function (t, e) {
                                            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                        }),
                                        function (t, e) {
                                            function r() {
                                                this.constructor = t
                                            }
                                            i(t, e),
                                                (t.prototype =
                                                    null === e
                                                        ? Object.create(e)
                                                        : ((r.prototype = e.prototype), new r()))
                                        })
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var a = r('./node_modules/url-toolkit/src/url-toolkit.js'),
                                s = r('./src/errors.js'),
                                h = r('./src/loader/playlist-loader.js'),
                                p = r('./src/loader/fragment-loader.js'),
                                g = r('./src/loader/key-loader.js'),
                                y = r('./src/controller/fragment-tracker.js'),
                                m = r('./src/controller/stream-controller.js'),
                                v = r('./src/controller/level-controller.js'),
                                _ = r('./src/controller/id3-track-controller.js'),
                                o = r('./src/is-supported.js')
                            r('./src/utils/logger.js')
                            var E,
                                l = r('./src/config.js'),
                                u = r('./src/events.js')
                            function T(t) {
                                void 0 === t && (t = {})
                                var e = E.call(this) || this,
                                    r = T.DefaultConfig
                                if (
                                    (t.liveSyncDurationCount || t.liveMaxLatencyDurationCount) &&
                                    (t.liveSyncDuration || t.liveMaxLatencyDuration)
                                )
                                    throw Error(
                                        "Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration",
                                    )
                                for (c in r) c in t || (t[c] = r[c])
                                if (
                                    void 0 !== t.liveMaxLatencyDurationCount &&
                                    t.liveMaxLatencyDurationCount <= t.liveSyncDurationCount
                                )
                                    throw Error(
                                        'Illegal hls.js config: "liveMaxLatencyDurationCount" must be gt "liveSyncDurationCount"',
                                    )
                                if (
                                    void 0 !== t.liveMaxLatencyDuration &&
                                    (t.liveMaxLatencyDuration <= t.liveSyncDuration ||
                                        void 0 === t.liveSyncDuration)
                                )
                                    throw Error(
                                        'Illegal hls.js config: "liveMaxLatencyDuration" must be gt "liveSyncDuration"',
                                    )
                                    ; (e.config = t), (e._autoLevelCapping = -1)
                                var i = (e.abrController = new t.abrController(e)),
                                    n = new t.bufferController(e),
                                    a = new t.capLevelController(e),
                                    s = new t.fpsController(e),
                                    o = new h.default(e),
                                    l = new p.default(e),
                                    u = new g.default(e),
                                    d = new _.default(e),
                                    c = (e.levelController = new v.default(e)),
                                    r = new y.FragmentTracker(e),
                                    f = (e.streamController = new m.default(e, r))
                                return (
                                    (c = [c, f]),
                                    (f = t.audioStreamController) && c.push(new f(e, r)),
                                    (e.networkControllers = c),
                                    (i = [o, l, u, i, n, a, s, d, r]),
                                    (f = t.audioTrackController) &&
                                    ((n = new f(e)), (e.audioTrackController = n), i.push(n)),
                                    (f = t.subtitleTrackController) &&
                                    ((n = new f(e)),
                                        (e.subtitleTrackController = n),
                                        c.push(n)),
                                    (f = t.emeController) &&
                                    ((n = new f(e)), (e.emeController = n), i.push(n)),
                                    (f = t.subtitleStreamController) && c.push(new f(e, r)),
                                    (f = t.timelineController) && i.push(new f(e)),
                                    (e.coreComponents = i),
                                    e
                                )
                            }
                            ; (E = r('./src/observer.js').Observer),
                                n(T, E),
                                Object.defineProperty(T, 'version', {
                                    get: function () {
                                        return '0.12.4'
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                (T.isSupported = function () {
                                    return o.isSupported()
                                }),
                                Object.defineProperty(T, 'Events', {
                                    get: function () {
                                        return u.default
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T, 'ErrorTypes', {
                                    get: function () {
                                        return s.ErrorTypes
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T, 'ErrorDetails', {
                                    get: function () {
                                        return s.ErrorDetails
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T, 'DefaultConfig', {
                                    get: function () {
                                        return T.defaultConfig || l.hlsDefaultConfig
                                    },
                                    set: function (t) {
                                        T.defaultConfig = t
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                (T.prototype.destroy = function () {
                                    this.trigger(u.default.DESTROYING),
                                        this.detachMedia(),
                                        this.coreComponents
                                            .concat(this.networkControllers)
                                            .forEach(function (t) {
                                                t.destroy()
                                            }),
                                        (this.url = null),
                                        this.removeAllListeners(),
                                        (this._autoLevelCapping = -1)
                                }),
                                (T.prototype.attachMedia = function (t) {
                                    ; (this.media = t),
                                        this.trigger(u.default.MEDIA_ATTACHING, { media: t })
                                }),
                                (T.prototype.detachMedia = function () {
                                    this.trigger(u.default.MEDIA_DETACHING), (this.media = null)
                                }),
                                (T.prototype.loadSource = function (t) {
                                    ; (this.url = t = a.buildAbsoluteURL(window.location.href, t, {
                                        alwaysNormalize: !0,
                                    })),
                                        this.trigger(u.default.MANIFEST_LOADING, { url: t })
                                }),
                                (T.prototype.startLoad = function (e) {
                                    void 0 === e && (e = -1),
                                        this.networkControllers.forEach(function (t) {
                                            t.startLoad(e)
                                        })
                                }),
                                (T.prototype.stopLoad = function () {
                                    this.networkControllers.forEach(function (t) {
                                        t.stopLoad()
                                    })
                                }),
                                (T.prototype.swapAudioCodec = function () {
                                    this.streamController.swapAudioCodec()
                                }),
                                (T.prototype.recoverMediaError = function () {
                                    var t = this.media
                                    this.detachMedia(), this.attachMedia(t)
                                }),
                                Object.defineProperty(T.prototype, 'levels', {
                                    get: function () {
                                        return this.levelController.levels
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'currentLevel', {
                                    get: function () {
                                        return this.streamController.currentLevel
                                    },
                                    set: function (t) {
                                        ; (this.loadLevel = t),
                                            this.streamController.immediateLevelSwitch()
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'nextLevel', {
                                    get: function () {
                                        return this.streamController.nextLevel
                                    },
                                    set: function (t) {
                                        ; (this.levelController.manualLevel = t),
                                            this.streamController.nextLevelSwitch()
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'loadLevel', {
                                    get: function () {
                                        return this.levelController.level
                                    },
                                    set: function (t) {
                                        this.levelController.manualLevel = t
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'nextLoadLevel', {
                                    get: function () {
                                        return this.levelController.nextLoadLevel
                                    },
                                    set: function (t) {
                                        this.levelController.nextLoadLevel = t
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'firstLevel', {
                                    get: function () {
                                        return Math.max(
                                            this.levelController.firstLevel,
                                            this.minAutoLevel,
                                        )
                                    },
                                    set: function (t) {
                                        this.levelController.firstLevel = t
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'startLevel', {
                                    get: function () {
                                        return this.levelController.startLevel
                                    },
                                    set: function (t) {
                                        ; -1 !== t && (t = Math.max(t, this.minAutoLevel)),
                                            (this.levelController.startLevel = t)
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'autoLevelCapping', {
                                    get: function () {
                                        return this._autoLevelCapping
                                    },
                                    set: function (t) {
                                        this._autoLevelCapping = t
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'autoLevelEnabled', {
                                    get: function () {
                                        return -1 === this.levelController.manualLevel
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'manualLevel', {
                                    get: function () {
                                        return this.levelController.manualLevel
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'minAutoLevel', {
                                    get: function () {
                                        for (
                                            var t = this.levels,
                                            e = this.config.minAutoBitrate,
                                            r = t ? t.length : 0,
                                            i = 0;
                                            i < r;
                                            i++
                                        )
                                            if (
                                                (t[i].realBitrate
                                                    ? Math.max(t[i].realBitrate, t[i].bitrate)
                                                    : t[i].bitrate) > e
                                            )
                                                return i
                                        return 0
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'maxAutoLevel', {
                                    get: function () {
                                        var t = this.levels,
                                            e = this.autoLevelCapping
                                        return -1 === e && t && t.length ? t.length - 1 : e
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'nextAutoLevel', {
                                    get: function () {
                                        return Math.min(
                                            Math.max(
                                                this.abrController.nextAutoLevel,
                                                this.minAutoLevel,
                                            ),
                                            this.maxAutoLevel,
                                        )
                                    },
                                    set: function (t) {
                                        this.abrController.nextAutoLevel = Math.max(
                                            this.minAutoLevel,
                                            t,
                                        )
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'audioTracks', {
                                    get: function () {
                                        var t = this.audioTrackController
                                        return t ? t.audioTracks : []
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'audioTrack', {
                                    get: function () {
                                        var t = this.audioTrackController
                                        return t ? t.audioTrack : -1
                                    },
                                    set: function (t) {
                                        var e = this.audioTrackController
                                        e && (e.audioTrack = t)
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'liveSyncPosition', {
                                    get: function () {
                                        return this.streamController.liveSyncPosition
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'subtitleTracks', {
                                    get: function () {
                                        var t = this.subtitleTrackController
                                        return t ? t.subtitleTracks : []
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'subtitleTrack', {
                                    get: function () {
                                        var t = this.subtitleTrackController
                                        return t ? t.subtitleTrack : -1
                                    },
                                    set: function (t) {
                                        var e = this.subtitleTrackController
                                        e && (e.subtitleTrack = t)
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                Object.defineProperty(T.prototype, 'subtitleDisplay', {
                                    get: function () {
                                        var t = this.subtitleTrackController
                                        return !!t && t.subtitleDisplay
                                    },
                                    set: function (t) {
                                        var e = this.subtitleTrackController
                                        e && (e.subtitleDisplay = t)
                                    },
                                    enumerable: !0,
                                    configurable: !0,
                                }),
                                (e.default = T)
                        },
                        './src/is-supported.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var i = r('./src/utils/mediasource-helper.js')
                            e.isSupported = function () {
                                var t = i.getMediaSource(),
                                    e = window.SourceBuffer || window.WebKitSourceBuffer,
                                    t =
                                        t &&
                                        'function' == typeof t.isTypeSupported &&
                                        t.isTypeSupported(
                                            'video/mp4; codecs="avc1.42E01E,mp4a.40.2"',
                                        ),
                                    e =
                                        !e ||
                                        (e.prototype &&
                                            'function' == typeof e.prototype.appendBuffer &&
                                            'function' == typeof e.prototype.remove)
                                return !!t && !!e
                            }
                        },
                        './src/loader/fragment-loader.js': function (t, l, u) {
                            !function (o) {
                                var i,
                                    t =
                                        (this && this.__extends) ||
                                        ((i =
                                            Object.setPrototypeOf ||
                                            ({ __proto__: [] } instanceof Array &&
                                                function (t, e) {
                                                    t.__proto__ = e
                                                }) ||
                                            function (t, e) {
                                                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                            }),
                                            function (t, e) {
                                                function r() {
                                                    this.constructor = t
                                                }
                                                i(t, e),
                                                    (t.prototype =
                                                        null === e
                                                            ? Object.create(e)
                                                            : ((r.prototype = e.prototype), new r()))
                                            })
                                Object.defineProperty(l, '__esModule', { value: !0 })
                                var n,
                                    a = u('./src/events.js'),
                                    e = u('./src/event-handler.js'),
                                    s = u('./src/errors.js')
                                function r(t) {
                                    return (
                                        ((t =
                                            n.call(this, t, a.default.FRAG_LOADING) ||
                                            this).loaders = {}),
                                        t
                                    )
                                }
                                u('./src/utils/logger.js'),
                                    (n = e.default),
                                    t(r, n),
                                    (r.prototype.destroy = function () {
                                        var t,
                                            e = this.loaders
                                        for (t in e) {
                                            var r = e[t]
                                            r && r.destroy()
                                        }
                                        ; (this.loaders = {}), n.prototype.destroy.call(this)
                                    }),
                                    (r.prototype.onFragLoading = function (t) {
                                        var e = t.frag,
                                            r = e.type,
                                            i = this.loaders,
                                            n = this.hls.config,
                                            a = n.fLoader,
                                            s = n.loader
                                            ; (e.loaded = 0),
                                                (t = i[r]) && t.abort(),
                                                (t = i[r] = e.loader = new (n.fLoader ? a : s)(n)),
                                                (r = {
                                                    url: e.url,
                                                    frag: e,
                                                    responseType: 'arraybuffer',
                                                    progressData: !1,
                                                }),
                                                (i = e.byteRangeStartOffset),
                                                (e = e.byteRangeEndOffset),
                                                o.isFinite(i) &&
                                                o.isFinite(e) &&
                                                ((r.rangeStart = i), (r.rangeEnd = e)),
                                                (n = {
                                                    timeout: n.fragLoadingTimeOut,
                                                    maxRetry: 0,
                                                    retryDelay: 0,
                                                    maxRetryDelay: n.fragLoadingMaxRetryTimeout,
                                                }),
                                                (e = {
                                                    onSuccess: this.loadsuccess.bind(this),
                                                    onError: this.loaderror.bind(this),
                                                    onTimeout: this.loadtimeout.bind(this),
                                                    onProgress: this.loadprogress.bind(this),
                                                }),
                                                t.load(r, n, e)
                                    }),
                                    (r.prototype.loadsuccess = function (t, e, r, i) {
                                        void 0 === i && (i = null),
                                            (t = t.data),
                                            ((r = r.frag).loader = void 0),
                                            (this.loaders[r.type] = void 0),
                                            this.hls.trigger(a.default.FRAG_LOADED, {
                                                payload: t,
                                                frag: r,
                                                stats: e,
                                                networkDetails: i,
                                            })
                                    }),
                                    (r.prototype.loaderror = function (t, e, r) {
                                        void 0 === r && (r = null)
                                        var i = e.frag,
                                            n = i.loader
                                        n && n.abort(),
                                            (this.loaders[i.type] = void 0),
                                            this.hls.trigger(a.default.ERROR, {
                                                type: s.ErrorTypes.NETWORK_ERROR,
                                                details: s.ErrorDetails.FRAG_LOAD_ERROR,
                                                fatal: !1,
                                                frag: e.frag,
                                                response: t,
                                                networkDetails: r,
                                            })
                                    }),
                                    (r.prototype.loadtimeout = function (t, e, r) {
                                        void 0 === r && (r = null)
                                        var i = (t = e.frag).loader
                                        i && i.abort(),
                                            (this.loaders[t.type] = void 0),
                                            this.hls.trigger(a.default.ERROR, {
                                                type: s.ErrorTypes.NETWORK_ERROR,
                                                details: s.ErrorDetails.FRAG_LOAD_TIMEOUT,
                                                fatal: !1,
                                                frag: e.frag,
                                                networkDetails: r,
                                            })
                                    }),
                                    (r.prototype.loadprogress = function (t, e, r, i) {
                                        void 0 === i && (i = null),
                                            ((e = e.frag).loaded = t.loaded),
                                            this.hls.trigger(a.default.FRAG_LOAD_PROGRESS, {
                                                frag: e,
                                                stats: t,
                                                networkDetails: i,
                                            })
                                    }),
                                    (e = r),
                                    (l.default = e)
                            }.call(this, u('./src/polyfills/number.js').Number)
                        },
                        './src/loader/fragment.js': function (t, a, s) {
                            !function (e) {
                                Object.defineProperty(a, '__esModule', { value: !0 })
                                var t = s('./node_modules/url-toolkit/src/url-toolkit.js'),
                                    i = s('./src/loader/level-key.js'),
                                    r =
                                        (Object.defineProperty(n, 'ElementaryStreamTypes', {
                                            get: function () {
                                                return { AUDIO: 'audio', VIDEO: 'video' }
                                            },
                                            enumerable: !0,
                                            configurable: !0,
                                        }),
                                            Object.defineProperty(n.prototype, 'url', {
                                                get: function () {
                                                    return (
                                                        !this._url &&
                                                        this.relurl &&
                                                        (this._url = t.buildAbsoluteURL(
                                                            this.baseurl,
                                                            this.relurl,
                                                            { alwaysNormalize: !0 },
                                                        )),
                                                        this._url
                                                    )
                                                },
                                                set: function (t) {
                                                    this._url = t
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            Object.defineProperty(n.prototype, 'byteRange', {
                                                get: function () {
                                                    if (!this._byteRange && !this.rawByteRange) return []
                                                    if (this._byteRange) return this._byteRange
                                                    var t,
                                                        e = []
                                                    return (
                                                        this.rawByteRange &&
                                                        ((t = this.rawByteRange.split('@', 2)),
                                                            (e[0] =
                                                                1 === t.length
                                                                    ? this.lastByteRangeEndOffset || 0
                                                                    : parseInt(t[1])),
                                                            (e[1] = parseInt(t[0]) + e[0]),
                                                            (this._byteRange = e)),
                                                        e
                                                    )
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            Object.defineProperty(n.prototype, 'byteRangeStartOffset', {
                                                get: function () {
                                                    return this.byteRange[0]
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            Object.defineProperty(n.prototype, 'byteRangeEndOffset', {
                                                get: function () {
                                                    return this.byteRange[1]
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            Object.defineProperty(n.prototype, 'decryptdata', {
                                                get: function () {
                                                    return (
                                                        this._decryptdata ||
                                                        (this._decryptdata = this.fragmentDecryptdataFromLevelkey(
                                                            this.levelkey,
                                                            this.sn,
                                                        )),
                                                        this._decryptdata
                                                    )
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            Object.defineProperty(n.prototype, 'endProgramDateTime', {
                                                get: function () {
                                                    if (!e.isFinite(this.programDateTime)) return null
                                                    var t = e.isFinite(this.duration) ? this.duration : 0
                                                    return this.programDateTime + 1e3 * t
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            Object.defineProperty(n.prototype, 'encrypted', {
                                                get: function () {
                                                    return !(
                                                        !this.decryptdata ||
                                                        null === this.decryptdata.uri ||
                                                        null !== this.decryptdata.key
                                                    )
                                                },
                                                enumerable: !0,
                                                configurable: !0,
                                            }),
                                            (n.prototype.addElementaryStream = function (t) {
                                                this._elementaryStreams[t] = !0
                                            }),
                                            (n.prototype.hasElementaryStream = function (t) {
                                                return !0 === this._elementaryStreams[t]
                                            }),
                                            (n.prototype.createInitializationVector = function (t) {
                                                for (var e = new Uint8Array(16), r = 12; r < 16; r++)
                                                    e[r] = (t >> (8 * (15 - r))) & 255
                                                return e
                                            }),
                                            (n.prototype.fragmentDecryptdataFromLevelkey = function (
                                                t,
                                                e,
                                            ) {
                                                var r = t
                                                return (
                                                    t &&
                                                    t.method &&
                                                    t.uri &&
                                                    !t.iv &&
                                                    (((r = new i.default()).method = t.method),
                                                        (r.baseuri = t.baseuri),
                                                        (r.reluri = t.reluri),
                                                        (r.iv = this.createInitializationVector(e))),
                                                    r
                                                )
                                            }),
                                            n)
                                function n() {
                                    var t
                                        ; (this._decryptdata = this._byteRange = this._url = null),
                                            (this.tagList = []),
                                            (this.rawProgramDateTime = this.programDateTime = null),
                                            (this._elementaryStreams =
                                                (((t = {})[n.ElementaryStreamTypes.AUDIO] = !1),
                                                    (t[n.ElementaryStreamTypes.VIDEO] = !1),
                                                    t))
                                }
                                a.default = r
                            }.call(this, s('./src/polyfills/number.js').Number)
                        },
                        './src/loader/key-loader.js': function (t, e, r) {
                            var i,
                                n =
                                    (this && this.__extends) ||
                                    ((i =
                                        Object.setPrototypeOf ||
                                        ({ __proto__: [] } instanceof Array &&
                                            function (t, e) {
                                                t.__proto__ = e
                                            }) ||
                                        function (t, e) {
                                            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                        }),
                                        function (t, e) {
                                            function r() {
                                                this.constructor = t
                                            }
                                            i(t, e),
                                                (t.prototype =
                                                    null === e
                                                        ? Object.create(e)
                                                        : ((r.prototype = e.prototype), new r()))
                                        })
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var a,
                                s = r('./src/events.js'),
                                o = r('./src/event-handler.js'),
                                l = r('./src/errors.js')
                            function u(t) {
                                return (
                                    ((t =
                                        a.call(this, t, s.default.KEY_LOADING) ||
                                        this).loaders = {}),
                                    (t.decryptkey = null),
                                    (t.decrypturl = null),
                                    t
                                )
                            }
                            r('./src/utils/logger.js'),
                                (a = o.default),
                                n(u, a),
                                (u.prototype.destroy = function () {
                                    for (var t in this.loaders) {
                                        t = this.loaders[t]
                                        t && t.destroy()
                                    }
                                    ; (this.loaders = {}), o.default.prototype.destroy.call(this)
                                }),
                                (u.prototype.onKeyLoading = function (t) {
                                    var e = (t = t.frag).type,
                                        r = this.loaders[e],
                                        i = t.decryptdata,
                                        n = i.uri
                                    n !== this.decrypturl || null === this.decryptkey
                                        ? ((i = this.hls.config),
                                            r && r.abort(),
                                            (t.loader = this.loaders[e] = new i.loader(i)),
                                            (this.decrypturl = n),
                                            (this.decryptkey = null),
                                            (e = { url: n, frag: t, responseType: 'arraybuffer' }),
                                            (r = {
                                                timeout: i.fragLoadingTimeOut,
                                                maxRetry: 0,
                                                retryDelay: i.fragLoadingRetryDelay,
                                                maxRetryDelay: i.fragLoadingMaxRetryTimeout,
                                            }),
                                            (n = {
                                                onSuccess: this.loadsuccess.bind(this),
                                                onError: this.loaderror.bind(this),
                                                onTimeout: this.loadtimeout.bind(this),
                                            }),
                                            t.loader.load(e, r, n))
                                        : this.decryptkey &&
                                        ((i.key = this.decryptkey),
                                            this.hls.trigger(s.default.KEY_LOADED, { frag: t }))
                                }),
                                (u.prototype.loadsuccess = function (t, e, r) {
                                    ; (e = r.frag),
                                        (this.decryptkey = e.decryptdata.key = new Uint8Array(
                                            t.data,
                                        )),
                                        (e.loader = void 0),
                                        (this.loaders[e.type] = void 0),
                                        this.hls.trigger(s.default.KEY_LOADED, { frag: e })
                                }),
                                (u.prototype.loaderror = function (t, e) {
                                    var r = e.frag,
                                        i = r.loader
                                    i && i.abort(),
                                        (this.loaders[e.type] = void 0),
                                        this.hls.trigger(s.default.ERROR, {
                                            type: l.ErrorTypes.NETWORK_ERROR,
                                            details: l.ErrorDetails.KEY_LOAD_ERROR,
                                            fatal: !1,
                                            frag: r,
                                            response: t,
                                        })
                                }),
                                (u.prototype.loadtimeout = function (t, e) {
                                    var r = (t = e.frag).loader
                                    r && r.abort(),
                                        (this.loaders[e.type] = void 0),
                                        this.hls.trigger(s.default.ERROR, {
                                            type: l.ErrorTypes.NETWORK_ERROR,
                                            details: l.ErrorDetails.KEY_LOAD_TIMEOUT,
                                            fatal: !1,
                                            frag: t,
                                        })
                                }),
                                (e.default = u)
                        },
                        './src/loader/level-key.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var i = r('./node_modules/url-toolkit/src/url-toolkit.js')
                            function n() {
                                this._uri = this.iv = this.key = this.method = null
                            }
                            Object.defineProperty(n.prototype, 'uri', {
                                get: function () {
                                    return (
                                        !this._uri &&
                                        this.reluri &&
                                        (this._uri = i.buildAbsoluteURL(
                                            this.baseuri,
                                            this.reluri,
                                            { alwaysNormalize: !0 },
                                        )),
                                        this._uri
                                    )
                                },
                                enumerable: !0,
                                configurable: !0,
                            }),
                                (e.default = n)
                        },
                        './src/loader/level.js': function (t, i, e) {
                            !function (t) {
                                Object.defineProperty(i, '__esModule', { value: !0 })
                                var e =
                                    (Object.defineProperty(r.prototype, 'hasProgramDateTime', {
                                        get: function () {
                                            return !(
                                                !this.fragments[0] ||
                                                !t.isFinite(this.fragments[0].programDateTime)
                                            )
                                        },
                                        enumerable: !0,
                                        configurable: !0,
                                    }),
                                        r)
                                function r(t) {
                                    ; (this.endSN = this.endCC = 0),
                                        (this.fragments = []),
                                        (this.initSegment = null),
                                        (this.live = !0),
                                        (this.needSidxRanges = !1),
                                        (this.startSN = this.startCC = 0),
                                        (this.startTimeOffset = null),
                                        (this.totalduration = this.targetduration = 0),
                                        (this.type = null),
                                        (this.url = t),
                                        (this.version = null)
                                }
                                i.default = e
                            }.call(this, e('./src/polyfills/number.js').Number)
                        },
                        './src/loader/m3u8-parser.js': function (t, e, i) {
                            !function (_) {
                                Object.defineProperty(e, '__esModule', { value: !0 })
                                var r = i('./node_modules/url-toolkit/src/url-toolkit.js'),
                                    E = i('./src/loader/fragment.js'),
                                    T = i('./src/loader/level.js'),
                                    S = i('./src/loader/level-key.js'),
                                    b = i('./src/utils/attr-list.js')
                                i('./src/utils/logger.js')
                                var s = i('./src/utils/codecs.js'),
                                    o = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g,
                                    l = /#EXT-X-MEDIA:(.*)/g,
                                    A = new RegExp(
                                        [
                                            /#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source,
                                            /|(?!#)([\S+ ?]+)/.source,
                                            /|#EXT-X-BYTERANGE:*(.+)/.source,
                                            /|#EXT-X-PROGRAM-DATE-TIME:(.+)/.source,
                                            /|#.*/.source,
                                        ].join(''),
                                        'g',
                                    ),
                                    R = /(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(VERSION):(\d+))|(?:#EXT-X-(MAP):(.+))|(?:(#)([^:]*):(.*))|(?:(#)(.*))(?:.*)\r?\n?/,
                                    L = /\.(mp4|m4s|m4v|m4a)$/i,
                                    t =
                                        ((u.findGroup = function (t, e) {
                                            if (!t) return null
                                            for (var r = null, i = 0; i < t.length; i++) {
                                                var n = t[i]
                                                n.id === e && (r = n)
                                            }
                                            return r
                                        }),
                                            (u.convertAVC1ToAVCOTI = function (t) {
                                                var e = t.split('.')
                                                return (
                                                    2 < e.length &&
                                                    ((t = e.shift() + '.'),
                                                        (t += parseInt(e.shift()).toString(16)),
                                                        (t += (
                                                            '000' + parseInt(e.shift()).toString(16)
                                                        ).substr(-4))),
                                                    t
                                                )
                                            }),
                                            (u.resolve = function (t, e) {
                                                return r.buildAbsoluteURL(e, t, { alwaysNormalize: !0 })
                                            }),
                                            (u.parseMasterPlaylist = function (t, e) {
                                                var r,
                                                    i = []
                                                for (o.lastIndex = 0; null != (r = o.exec(t));) {
                                                    var n = {},
                                                        a = (n.attrs = new b.default(r[1]))
                                                        ; (n.url = u.resolve(r[2], e)),
                                                            (r = a.decimalResolution('RESOLUTION')) &&
                                                            ((n.width = r.width), (n.height = r.height)),
                                                            (n.bitrate =
                                                                a.decimalInteger('AVERAGE-BANDWIDTH') ||
                                                                a.decimalInteger('BANDWIDTH')),
                                                            (n.name = a.NAME),
                                                            (function (i, n) {
                                                                ;['video', 'audio'].forEach(function (e) {
                                                                    var t,
                                                                        r = i.filter(function (t) {
                                                                            return s.isCodecType(t, e)
                                                                        })
                                                                    r.length &&
                                                                        ((t = r.filter(function (t) {
                                                                            return (
                                                                                0 === t.lastIndexOf('avc1', 0) ||
                                                                                0 === t.lastIndexOf('mp4a', 0)
                                                                            )
                                                                        })),
                                                                            (n[e + 'Codec'] = (0 < t.length ? t : r)[0]),
                                                                            (i = i.filter(function (t) {
                                                                                return -1 === r.indexOf(t)
                                                                            })))
                                                                }),
                                                                    (n.unknownCodecs = i)
                                                            })([].concat((a.CODECS || '').split(/[ ,]+/)), n),
                                                            n.videoCodec &&
                                                            -1 !== n.videoCodec.indexOf('avc1') &&
                                                            (n.videoCodec = u.convertAVC1ToAVCOTI(
                                                                n.videoCodec,
                                                            )),
                                                            i.push(n)
                                                }
                                                return i
                                            }),
                                            (u.parseMasterPlaylistMedia = function (t, e, r, i) {
                                                void 0 === i && (i = [])
                                                var n = [],
                                                    a = 0
                                                for (l.lastIndex = 0; null !== (s = l.exec(t));) {
                                                    var s,
                                                        o = {}
                                                        ; (s = new b.default(s[1])).TYPE === r &&
                                                            ((o.groupId = s['GROUP-ID']),
                                                                (o.name = s.NAME),
                                                                (o.type = r),
                                                                (o.default = 'YES' === s.DEFAULT),
                                                                (o.autoselect = 'YES' === s.AUTOSELECT),
                                                                (o.forced = 'YES' === s.FORCED),
                                                                s.URI && (o.url = u.resolve(s.URI, e)),
                                                                (o.lang = s.LANGUAGE),
                                                                o.name || (o.name = o.lang),
                                                                i.length &&
                                                                ((s = u.findGroup(i, o.groupId)),
                                                                    (o.audioCodec = (s || i[0]).codec)),
                                                                (o.id = a++),
                                                                n.push(o))
                                                }
                                                return n
                                            }),
                                            (u.parseLevelPlaylist = function (t, e, r, i, n) {
                                                var a,
                                                    s,
                                                    o,
                                                    l,
                                                    u = 0,
                                                    d = 0,
                                                    c = new T.default(e),
                                                    f = new S.default(),
                                                    h = 0,
                                                    p = null,
                                                    g = new E.default(),
                                                    y = null
                                                for (A.lastIndex = 0; null !== (a = A.exec(t));)
                                                    if ((s = a[1]))
                                                        (g.duration = parseFloat(s)),
                                                            (a = (' ' + a[2]).slice(1)),
                                                            (g.title = a || null),
                                                            g.tagList.push(a ? ['INF', s, a] : ['INF', s])
                                                    else if (a[3])
                                                        _.isFinite(g.duration) &&
                                                            ((s = u++),
                                                                (g.type = i),
                                                                (g.start = d),
                                                                (g.levelkey = f),
                                                                (g.sn = s),
                                                                (g.level = r),
                                                                (g.cc = h),
                                                                (g.urlId = n),
                                                                (g.baseurl = e),
                                                                (g.relurl = (' ' + a[3]).slice(1)),
                                                                (l = p),
                                                                (o = g).rawProgramDateTime
                                                                    ? (o.programDateTime = Date.parse(
                                                                        o.rawProgramDateTime,
                                                                    ))
                                                                    : l &&
                                                                    l.programDateTime &&
                                                                    (o.programDateTime = l.endProgramDateTime),
                                                                _.isFinite(o.programDateTime) ||
                                                                ((o.programDateTime = null),
                                                                    (o.rawProgramDateTime = null)),
                                                                c.fragments.push(g),
                                                                (d += (p = g).duration),
                                                                (g = new E.default()))
                                                    else if (a[4])
                                                        (g.rawByteRange = (' ' + a[4]).slice(1)),
                                                            p &&
                                                            (a = p.byteRangeEndOffset) &&
                                                            (g.lastByteRangeEndOffset = a)
                                                    else if (a[5])
                                                        (g.rawProgramDateTime = (' ' + a[5]).slice(1)),
                                                            g.tagList.push([
                                                                'PROGRAM-DATE-TIME',
                                                                g.rawProgramDateTime,
                                                            ]),
                                                            null === y && (y = c.fragments.length)
                                                    else {
                                                        for (
                                                            a = a[0].match(R), s = 1;
                                                            s < a.length && void 0 === a[s];
                                                            s++
                                                        );
                                                        var m = (' ' + a[s + 1]).slice(1),
                                                            v = (' ' + a[s + 2]).slice(1)
                                                        switch (a[s]) {
                                                            case '#':
                                                                g.tagList.push(v ? [m, v] : [m])
                                                                break
                                                            case 'PLAYLIST-TYPE':
                                                                c.type = m.toUpperCase()
                                                                break
                                                            case 'MEDIA-SEQUENCE':
                                                                u = c.startSN = parseInt(m)
                                                                break
                                                            case 'TARGETDURATION':
                                                                c.targetduration = parseFloat(m)
                                                                break
                                                            case 'VERSION':
                                                                c.version = parseInt(m)
                                                                break
                                                            case 'ENDLIST':
                                                                c.live = !1
                                                                break
                                                            case 'DIS':
                                                                h++, g.tagList.push(['DIS'])
                                                                break
                                                            case 'DISCONTINUITY-SEQ':
                                                                h = parseInt(m)
                                                                break
                                                            case 'KEY':
                                                                ; (a = (m = new b.default(m)).enumeratedString(
                                                                    'METHOD',
                                                                )),
                                                                    (s = m.URI),
                                                                    (m = m.hexadecimalInteger('IV')),
                                                                    a &&
                                                                    ((f = new S.default()),
                                                                        s &&
                                                                        0 <=
                                                                        [
                                                                            'AES-128',
                                                                            'SAMPLE-AES',
                                                                            'SAMPLE-AES-CENC',
                                                                        ].indexOf(a) &&
                                                                        ((f.method = a),
                                                                            (f.baseuri = e),
                                                                            (f.reluri = s),
                                                                            (f.key = null),
                                                                            (f.iv = m)))
                                                                break
                                                            case 'START':
                                                                ; (a = new b.default(m).decimalFloatingPoint(
                                                                    'TIME-OFFSET',
                                                                )),
                                                                    _.isFinite(a) && (c.startTimeOffset = a)
                                                                break
                                                            case 'MAP':
                                                                ; (a = new b.default(m)),
                                                                    (g.relurl = a.URI),
                                                                    (g.rawByteRange = a.BYTERANGE),
                                                                    (g.baseurl = e),
                                                                    (g.level = r),
                                                                    (g.type = i),
                                                                    (g.sn = 'initSegment'),
                                                                    (c.initSegment = g),
                                                                    ((g = new E.default()).rawProgramDateTime =
                                                                        c.initSegment.rawProgramDateTime)
                                                        }
                                                    }
                                                return (
                                                    (g = p) &&
                                                    !g.relurl &&
                                                    (c.fragments.pop(), (d -= g.duration)),
                                                    (c.totalduration = d),
                                                    (c.averagetargetduration = d / c.fragments.length),
                                                    (c.endSN = u - 1),
                                                    (c.startCC = c.fragments[0] ? c.fragments[0].cc : 0),
                                                    (c.endCC = h),
                                                    !c.initSegment &&
                                                    c.fragments.length &&
                                                    c.fragments.every(function (t) {
                                                        return L.test(t.relurl)
                                                    }) &&
                                                    (((g = new E.default()).relurl =
                                                        c.fragments[0].relurl),
                                                        (g.baseurl = e),
                                                        (g.level = r),
                                                        (g.type = i),
                                                        (g.sn = 'initSegment'),
                                                        (c.initSegment = g),
                                                        (c.needSidxRanges = !0)),
                                                    y &&
                                                    (function (t, e) {
                                                        var r = t[e]
                                                        for (--e; 0 <= e; e--) {
                                                            var i = t[e]
                                                                ; (i.programDateTime =
                                                                    r.programDateTime - 1e3 * i.duration),
                                                                    (r = i)
                                                        }
                                                    })(c.fragments, y),
                                                    c
                                                )
                                            }),
                                            u)
                                function u() { }
                                e.default = t
                            }.call(this, i('./src/polyfills/number.js').Number)
                        },
                        './src/loader/playlist-loader.js': function (t, o, l) {
                            !function (f) {
                                var i,
                                    t =
                                        (this && this.__extends) ||
                                        ((i =
                                            Object.setPrototypeOf ||
                                            ({ __proto__: [] } instanceof Array &&
                                                function (t, e) {
                                                    t.__proto__ = e
                                                }) ||
                                            function (t, e) {
                                                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                            }),
                                            function (t, e) {
                                                function r() {
                                                    this.constructor = t
                                                }
                                                i(t, e),
                                                    (t.prototype =
                                                        null === e
                                                            ? Object.create(e)
                                                            : ((r.prototype = e.prototype), new r()))
                                            })
                                Object.defineProperty(o, '__esModule', { value: !0 })
                                var h = l('./src/events.js'),
                                    e = l('./src/event-handler.js'),
                                    s = l('./src/errors.js')
                                l('./src/utils/logger.js')
                                var r,
                                    n = l('./src/demux/mp4demuxer.js'),
                                    p = l('./src/loader/m3u8-parser.js'),
                                    g = window.performance,
                                    y = {
                                        MANIFEST: 'manifest',
                                        LEVEL: 'level',
                                        AUDIO_TRACK: 'audioTrack',
                                        SUBTITLE_TRACK: 'subtitleTrack',
                                    },
                                    a = { MAIN: 'main', AUDIO: 'audio', SUBTITLE: 'subtitle' }
                                function m(t) {
                                    return (
                                        ((t =
                                            r.call(
                                                this,
                                                t,
                                                h.default.MANIFEST_LOADING,
                                                h.default.LEVEL_LOADING,
                                                h.default.AUDIO_TRACK_LOADING,
                                                h.default.SUBTITLE_TRACK_LOADING,
                                            ) || this).loaders = {}),
                                        t
                                    )
                                }
                                ; (r = e.default),
                                    t(m, r),
                                    Object.defineProperty(m, 'ContextType', {
                                        get: function () {
                                            return y
                                        },
                                        enumerable: !0,
                                        configurable: !0,
                                    }),
                                    Object.defineProperty(m, 'LevelType', {
                                        get: function () {
                                            return a
                                        },
                                        enumerable: !0,
                                        configurable: !0,
                                    }),
                                    (m.canHaveQualityLevels = function (t) {
                                        return t !== y.AUDIO_TRACK && t !== y.SUBTITLE_TRACK
                                    }),
                                    (m.mapContextToLevelType = function (t) {
                                        switch (t.type) {
                                            case y.AUDIO_TRACK:
                                                return a.AUDIO
                                            case y.SUBTITLE_TRACK:
                                                return a.SUBTITLE
                                            default:
                                                return a.MAIN
                                        }
                                    }),
                                    (m.getResponseUrl = function (t, e) {
                                        return (t =
                                            void 0 === (t = t.url) || 0 === t.indexOf('data:')
                                                ? e.url
                                                : t)
                                    }),
                                    (m.prototype.createInternalLoader = function (t) {
                                        var e = (r = this.hls.config).loader,
                                            r = new (r.pLoader || e)(r)
                                        return (t.loader = r), (this.loaders[t.type] = r)
                                    }),
                                    (m.prototype.getInternalLoader = function (t) {
                                        return this.loaders[t.type]
                                    }),
                                    (m.prototype.resetInternalLoader = function (t) {
                                        this.loaders[t] && delete this.loaders[t]
                                    }),
                                    (m.prototype.destroyInternalLoaders = function () {
                                        for (var t in this.loaders) {
                                            var e = this.loaders[t]
                                            e && e.destroy(), this.resetInternalLoader(t)
                                        }
                                    }),
                                    (m.prototype.destroy = function () {
                                        this.destroyInternalLoaders(),
                                            r.prototype.destroy.call(this)
                                    }),
                                    (m.prototype.onManifestLoading = function (t) {
                                        this.load(t.url, { type: y.MANIFEST, level: 0, id: null })
                                    }),
                                    (m.prototype.onLevelLoading = function (t) {
                                        this.load(t.url, {
                                            type: y.LEVEL,
                                            level: t.level,
                                            id: t.id,
                                        })
                                    }),
                                    (m.prototype.onAudioTrackLoading = function (t) {
                                        this.load(t.url, {
                                            type: y.AUDIO_TRACK,
                                            level: null,
                                            id: t.id,
                                        })
                                    }),
                                    (m.prototype.onSubtitleTrackLoading = function (t) {
                                        this.load(t.url, {
                                            type: y.SUBTITLE_TRACK,
                                            level: null,
                                            id: t.id,
                                        })
                                    }),
                                    (m.prototype.load = function (t, e) {
                                        var r = this.hls.config,
                                            i = this.getInternalLoader(e)
                                        if (i) {
                                            var n = i.context
                                            if (n && n.url === t) return !1
                                            i.abort()
                                        }
                                        switch (e.type) {
                                            case y.MANIFEST:
                                                var n = r.manifestLoadingMaxRetry,
                                                    a = r.manifestLoadingTimeOut,
                                                    s = r.manifestLoadingRetryDelay,
                                                    o = r.manifestLoadingMaxRetryTimeout
                                                break
                                            case y.LEVEL:
                                                ; (n = 0), (a = r.levelLoadingTimeOut)
                                                break
                                            default:
                                                ; (n = r.levelLoadingMaxRetry),
                                                    (a = r.levelLoadingTimeOut),
                                                    (s = r.levelLoadingRetryDelay),
                                                    (o = r.levelLoadingMaxRetryTimeout)
                                        }
                                        return (
                                            (i = this.createInternalLoader(e)),
                                            (e.url = t),
                                            (e.responseType = e.responseType || ''),
                                            (t = {
                                                timeout: a,
                                                maxRetry: n,
                                                retryDelay: s,
                                                maxRetryDelay: o,
                                            }),
                                            (r = {
                                                onSuccess: this.loadsuccess.bind(this),
                                                onError: this.loaderror.bind(this),
                                                onTimeout: this.loadtimeout.bind(this),
                                            }),
                                            i.load(e, t, r),
                                            !0
                                        )
                                    }),
                                    (m.prototype.loadsuccess = function (t, e, r, i) {
                                        var n
                                        void 0 === i && (i = null),
                                            r.isSidxRequest
                                                ? (this._handleSidxRequest(t, r),
                                                    this._handlePlaylistLoaded(t, e, r, i))
                                                : (this.resetInternalLoader(r.type),
                                                    (n = t.data),
                                                    (e.tload = g.now()),
                                                    0 !== n.indexOf('#EXTM3U')
                                                        ? this._handleManifestParsingError(
                                                            t,
                                                            r,
                                                            'no EXTM3U delimiter',
                                                            i,
                                                        )
                                                        : 0 < n.indexOf('#EXTINF:') ||
                                                            0 < n.indexOf('#EXT-X-TARGETDURATION:')
                                                            ? this._handleTrackOrLevelPlaylist(t, e, r, i)
                                                            : this._handleMasterPlaylist(t, e, r, i))
                                    }),
                                    (m.prototype.loaderror = function (t, e, r) {
                                        void 0 === r && (r = null),
                                            this._handleNetworkError(e, r, !1, t)
                                    }),
                                    (m.prototype.loadtimeout = function (t, e, r) {
                                        void 0 === r && (r = null),
                                            this._handleNetworkError(e, r, !0)
                                    }),
                                    (m.prototype._handleMasterPlaylist = function (t, e, r, i) {
                                        var n,
                                            a = this.hls,
                                            s = t.data,
                                            o = m.getResponseUrl(t, r),
                                            l = p.default.parseMasterPlaylist(s, o)
                                        l.length
                                            ? ((t = l.map(function (t) {
                                                return { id: t.attrs.AUDIO, codec: t.audioCodec }
                                            })),
                                                (t = p.default.parseMasterPlaylistMedia(
                                                    s,
                                                    o,
                                                    'AUDIO',
                                                    t,
                                                )),
                                                (s = p.default.parseMasterPlaylistMedia(
                                                    s,
                                                    o,
                                                    'SUBTITLES',
                                                )),
                                                t.length &&
                                                ((n = !1),
                                                    t.forEach(function (t) {
                                                        t.url || (n = !0)
                                                    }),
                                                    !1 === n &&
                                                    l[0].audioCodec &&
                                                    !l[0].attrs.AUDIO &&
                                                    t.unshift({ type: 'main', name: 'main' })),
                                                a.trigger(h.default.MANIFEST_LOADED, {
                                                    levels: l,
                                                    audioTracks: t,
                                                    subtitles: s,
                                                    url: o,
                                                    stats: e,
                                                    networkDetails: i,
                                                }))
                                            : this._handleManifestParsingError(
                                                t,
                                                r,
                                                'no level found in manifest',
                                                i,
                                            )
                                    }),
                                    (m.prototype._handleTrackOrLevelPlaylist = function (
                                        t,
                                        e,
                                        r,
                                        i,
                                    ) {
                                        var n = this.hls,
                                            a = r.id,
                                            s = r.level,
                                            o = r.type,
                                            l = m.getResponseUrl(t, r),
                                            u = f.isFinite(a) ? a : 0,
                                            d = f.isFinite(s) ? s : u,
                                            c = m.mapContextToLevelType(r)
                                            ; ((u = p.default.parseLevelPlaylist(
                                                t.data,
                                                l,
                                                d,
                                                c,
                                                u,
                                            )).tload = e.tload),
                                                o === y.MANIFEST &&
                                                n.trigger(h.default.MANIFEST_LOADED, {
                                                    levels: [{ url: l, details: u }],
                                                    audioTracks: [],
                                                    url: l,
                                                    stats: e,
                                                    networkDetails: i,
                                                }),
                                                (e.tparsed = g.now()),
                                                u.needSidxRanges
                                                    ? this.load(u.initSegment.url, {
                                                        isSidxRequest: !0,
                                                        type: o,
                                                        level: s,
                                                        levelDetails: u,
                                                        id: a,
                                                        rangeStart: 0,
                                                        rangeEnd: 2048,
                                                        responseType: 'arraybuffer',
                                                    })
                                                    : ((r.levelDetails = u),
                                                        this._handlePlaylistLoaded(t, e, r, i))
                                    }),
                                    (m.prototype._handleSidxRequest = function (t, e) {
                                        var r
                                            ; (t = n.default.parseSegmentIndex(
                                                new Uint8Array(t.data),
                                            )) &&
                                                ((r = e.levelDetails),
                                                    t.references.forEach(function (t, e) {
                                                        ; (t = t.info),
                                                            0 === (e = r.fragments[e]).byteRange.length &&
                                                            (e.rawByteRange =
                                                                String(1 + t.end - t.start) +
                                                                '@' +
                                                                String(t.start))
                                                    }),
                                                    (r.initSegment.rawByteRange =
                                                        String(t.moovEndOffset) + '@0'))
                                    }),
                                    (m.prototype._handleManifestParsingError = function (
                                        t,
                                        e,
                                        r,
                                        i,
                                    ) {
                                        this.hls.trigger(h.default.ERROR, {
                                            type: s.ErrorTypes.NETWORK_ERROR,
                                            details: s.ErrorDetails.MANIFEST_PARSING_ERROR,
                                            fatal: !0,
                                            url: t.url,
                                            reason: r,
                                            networkDetails: i,
                                        })
                                    }),
                                    (m.prototype._handleNetworkError = function (t, e, r, i) {
                                        void 0 === r && (r = !1), void 0 === i && (i = null)
                                        var n = this.getInternalLoader(t)
                                        switch (t.type) {
                                            case y.MANIFEST:
                                                var a = r
                                                    ? s.ErrorDetails.MANIFEST_LOAD_TIMEOUT
                                                    : s.ErrorDetails.MANIFEST_LOAD_ERROR
                                                r = !0
                                                break
                                            case y.LEVEL:
                                                ; (a = r
                                                    ? s.ErrorDetails.LEVEL_LOAD_TIMEOUT
                                                    : s.ErrorDetails.LEVEL_LOAD_ERROR),
                                                    (r = !1)
                                                break
                                            case y.AUDIO_TRACK:
                                                ; (a = r
                                                    ? s.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT
                                                    : s.ErrorDetails.AUDIO_TRACK_LOAD_ERROR),
                                                    (r = !1)
                                                break
                                            default:
                                                r = !1
                                        }
                                        n && (n.abort(), this.resetInternalLoader(t.type)),
                                            (t = {
                                                type: s.ErrorTypes.NETWORK_ERROR,
                                                details: a,
                                                fatal: r,
                                                url: n.url,
                                                loader: n,
                                                context: t,
                                                networkDetails: e,
                                            }),
                                            i && (t.response = i),
                                            this.hls.trigger(h.default.ERROR, t)
                                    }),
                                    (m.prototype._handlePlaylistLoaded = function (t, e, r, i) {
                                        var n = r.type,
                                            a = r.level,
                                            s = r.id,
                                            o = r.levelDetails
                                        if (o.targetduration)
                                            if (m.canHaveQualityLevels(r.type))
                                                this.hls.trigger(h.default.LEVEL_LOADED, {
                                                    details: o,
                                                    level: a || 0,
                                                    id: s || 0,
                                                    stats: e,
                                                    networkDetails: i,
                                                })
                                            else
                                                switch (n) {
                                                    case y.AUDIO_TRACK:
                                                        this.hls.trigger(h.default.AUDIO_TRACK_LOADED, {
                                                            details: o,
                                                            id: s,
                                                            stats: e,
                                                            networkDetails: i,
                                                        })
                                                        break
                                                    case y.SUBTITLE_TRACK:
                                                        this.hls.trigger(h.default.SUBTITLE_TRACK_LOADED, {
                                                            details: o,
                                                            id: s,
                                                            stats: e,
                                                            networkDetails: i,
                                                        })
                                                }
                                        else
                                            this._handleManifestParsingError(
                                                t,
                                                r,
                                                'invalid target duration',
                                                i,
                                            )
                                    }),
                                    (e = m),
                                    (o.default = e)
                            }.call(this, l('./src/polyfills/number.js').Number)
                        },
                        './src/observer.js': function (t, e, r) {
                            var i,
                                n,
                                a =
                                    (this && this.__extends) ||
                                    ((i =
                                        Object.setPrototypeOf ||
                                        ({ __proto__: [] } instanceof Array &&
                                            function (t, e) {
                                                t.__proto__ = e
                                            }) ||
                                        function (t, e) {
                                            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                        }),
                                        function (t, e) {
                                            function r() {
                                                this.constructor = t
                                            }
                                            i(t, e),
                                                (t.prototype =
                                                    null === e
                                                        ? Object.create(e)
                                                        : ((r.prototype = e.prototype), new r()))
                                        })
                            function s() {
                                return (null !== n && n.apply(this, arguments)) || this
                            }
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (n = r('./node_modules/eventemitter3/index.js').EventEmitter),
                                a(s, n),
                                (s.prototype.trigger = function (t) {
                                    for (var e = [], r = 1; r < arguments.length; r++)
                                        e[r - 1] = arguments[r]
                                    this.emit.apply(this, [t, t].concat(e))
                                }),
                                (e.Observer = s)
                        },
                        './src/polyfills/number.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (t = r('./src/utils/get-self-scope.js').getSelfScope().Number),
                                ((e.Number = t).isFinite =
                                    t.isFinite ||
                                    function (t) {
                                        return 'number' == typeof t && isFinite(t)
                                    })
                        },
                        './src/remux/aac-helper.js': function (t, e, r) {
                            function i() { }
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (i.getSilentFrame = function (t, e) {
                                    if ('mp4a.40.2' === t) {
                                        if (1 === e)
                                            return new Uint8Array([0, 200, 0, 128, 35, 128])
                                        if (2 === e)
                                            return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128])
                                        if (3 === e)
                                            return new Uint8Array([
                                                0,
                                                200,
                                                0,
                                                128,
                                                32,
                                                132,
                                                1,
                                                38,
                                                64,
                                                8,
                                                100,
                                                0,
                                                142,
                                            ])
                                        if (4 === e)
                                            return new Uint8Array([
                                                0,
                                                200,
                                                0,
                                                128,
                                                32,
                                                132,
                                                1,
                                                38,
                                                64,
                                                8,
                                                100,
                                                0,
                                                128,
                                                44,
                                                128,
                                                8,
                                                2,
                                                56,
                                            ])
                                        if (5 === e)
                                            return new Uint8Array([
                                                0,
                                                200,
                                                0,
                                                128,
                                                32,
                                                132,
                                                1,
                                                38,
                                                64,
                                                8,
                                                100,
                                                0,
                                                130,
                                                48,
                                                4,
                                                153,
                                                0,
                                                33,
                                                144,
                                                2,
                                                56,
                                            ])
                                        if (6 === e)
                                            return new Uint8Array([
                                                0,
                                                200,
                                                0,
                                                128,
                                                32,
                                                132,
                                                1,
                                                38,
                                                64,
                                                8,
                                                100,
                                                0,
                                                130,
                                                48,
                                                4,
                                                153,
                                                0,
                                                33,
                                                144,
                                                2,
                                                0,
                                                178,
                                                0,
                                                32,
                                                8,
                                                224,
                                            ])
                                    } else {
                                        if (1 === e)
                                            return new Uint8Array([
                                                1,
                                                64,
                                                34,
                                                128,
                                                163,
                                                78,
                                                230,
                                                128,
                                                186,
                                                8,
                                                0,
                                                0,
                                                0,
                                                28,
                                                6,
                                                241,
                                                193,
                                                10,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                94,
                                            ])
                                        if (2 === e || 3 === e)
                                            return new Uint8Array([
                                                1,
                                                64,
                                                34,
                                                128,
                                                163,
                                                94,
                                                230,
                                                128,
                                                186,
                                                8,
                                                0,
                                                0,
                                                0,
                                                0,
                                                149,
                                                0,
                                                6,
                                                241,
                                                161,
                                                10,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                90,
                                                94,
                                            ])
                                    }
                                    return null
                                }),
                                (e.default = i)
                        },
                        './src/remux/mp4-generator.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var a = Math.pow(2, 32) - 1
                            function l() { }
                            ; (l.init = function () {
                                for (var t in (l.types = {
                                    avc1: [],
                                    avcC: [],
                                    btrt: [],
                                    dinf: [],
                                    dref: [],
                                    esds: [],
                                    ftyp: [],
                                    hdlr: [],
                                    mdat: [],
                                    mdhd: [],
                                    mdia: [],
                                    mfhd: [],
                                    minf: [],
                                    moof: [],
                                    moov: [],
                                    mp4a: [],
                                    '.mp3': [],
                                    mvex: [],
                                    mvhd: [],
                                    pasp: [],
                                    sdtp: [],
                                    stbl: [],
                                    stco: [],
                                    stsc: [],
                                    stsd: [],
                                    stsz: [],
                                    stts: [],
                                    tfdt: [],
                                    tfhd: [],
                                    traf: [],
                                    trak: [],
                                    trun: [],
                                    trex: [],
                                    tkhd: [],
                                    vmhd: [],
                                    smhd: [],
                                }))
                                    l.types.hasOwnProperty(t) &&
                                        (l.types[t] = [
                                            t.charCodeAt(0),
                                            t.charCodeAt(1),
                                            t.charCodeAt(2),
                                            t.charCodeAt(3),
                                        ])
                                var t = new Uint8Array([
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    118,
                                    105,
                                    100,
                                    101,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    0,
                                    86,
                                    105,
                                    100,
                                    101,
                                    111,
                                    72,
                                    97,
                                    110,
                                    100,
                                    108,
                                    101,
                                    114,
                                    0,
                                ]),
                                    e = new Uint8Array([
                                        0,
                                        0,
                                        0,
                                        0,
                                        0,
                                        0,
                                        0,
                                        0,
                                        115,
                                        111,
                                        117,
                                        110,
                                        0,
                                        0,
                                        0,
                                        0,
                                        0,
                                        0,
                                        0,
                                        0,
                                        0,
                                        0,
                                        0,
                                        0,
                                        83,
                                        111,
                                        117,
                                        110,
                                        100,
                                        72,
                                        97,
                                        110,
                                        100,
                                        108,
                                        101,
                                        114,
                                        0,
                                    ])
                                    ; (l.HDLR_TYPES = { video: t, audio: e }),
                                        (t = new Uint8Array([
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            1,
                                            0,
                                            0,
                                            0,
                                            12,
                                            117,
                                            114,
                                            108,
                                            32,
                                            0,
                                            0,
                                            0,
                                            1,
                                        ])),
                                        (e = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])),
                                        (l.STTS = l.STSC = l.STCO = e),
                                        (l.STSZ = new Uint8Array([
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                        ])),
                                        (l.VMHD = new Uint8Array([
                                            0,
                                            0,
                                            0,
                                            1,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                        ])),
                                        (l.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0])),
                                        (l.STSD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]))
                                var e = new Uint8Array([105, 115, 111, 109]),
                                    r = new Uint8Array([97, 118, 99, 49]),
                                    i = new Uint8Array([0, 0, 0, 1])
                                    ; (l.FTYP = l.box(l.types.ftyp, e, i, e, r)),
                                        (l.DINF = l.box(l.types.dinf, l.box(l.types.dref, t)))
                            }),
                                (l.box = function (t) {
                                    for (
                                        var e,
                                        r = Array.prototype.slice.call(arguments, 1),
                                        i = 8,
                                        n = r.length,
                                        a = n;
                                        n--;

                                    )
                                        i += r[n].byteLength
                                    for (
                                        (e = new Uint8Array(i))[0] = (i >> 24) & 255,
                                        e[1] = (i >> 16) & 255,
                                        e[2] = (i >> 8) & 255,
                                        e[3] = 255 & i,
                                        e.set(t, 4),
                                        n = 0,
                                        i = 8;
                                        n < a;
                                        n++
                                    )
                                        e.set(r[n], i), (i += r[n].byteLength)
                                    return e
                                }),
                                (l.hdlr = function (t) {
                                    return l.box(l.types.hdlr, l.HDLR_TYPES[t])
                                }),
                                (l.mdat = function (t) {
                                    return l.box(l.types.mdat, t)
                                }),
                                (l.mdhd = function (t, e) {
                                    e *= t
                                    var r = Math.floor(e / (1 + a))
                                    return (
                                        (e = Math.floor(e % (1 + a))),
                                        l.box(
                                            l.types.mdhd,
                                            new Uint8Array([
                                                1,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                2,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                3,
                                                (t >> 24) & 255,
                                                (t >> 16) & 255,
                                                (t >> 8) & 255,
                                                255 & t,
                                                r >> 24,
                                                (r >> 16) & 255,
                                                (r >> 8) & 255,
                                                255 & r,
                                                e >> 24,
                                                (e >> 16) & 255,
                                                (e >> 8) & 255,
                                                255 & e,
                                                85,
                                                196,
                                                0,
                                                0,
                                            ]),
                                        )
                                    )
                                }),
                                (l.mdia = function (t) {
                                    return l.box(
                                        l.types.mdia,
                                        l.mdhd(t.timescale, t.duration),
                                        l.hdlr(t.type),
                                        l.minf(t),
                                    )
                                }),
                                (l.mfhd = function (t) {
                                    return l.box(
                                        l.types.mfhd,
                                        new Uint8Array([
                                            0,
                                            0,
                                            0,
                                            0,
                                            t >> 24,
                                            (t >> 16) & 255,
                                            (t >> 8) & 255,
                                            255 & t,
                                        ]),
                                    )
                                }),
                                (l.minf = function (t) {
                                    return 'audio' === t.type
                                        ? l.box(
                                            l.types.minf,
                                            l.box(l.types.smhd, l.SMHD),
                                            l.DINF,
                                            l.stbl(t),
                                        )
                                        : l.box(
                                            l.types.minf,
                                            l.box(l.types.vmhd, l.VMHD),
                                            l.DINF,
                                            l.stbl(t),
                                        )
                                }),
                                (l.moof = function (t, e, r) {
                                    return l.box(l.types.moof, l.mfhd(t), l.traf(r, e))
                                }),
                                (l.moov = function (t) {
                                    for (var e = t.length, r = []; e--;) r[e] = l.trak(t[e])
                                    return l.box.apply(
                                        null,
                                        [l.types.moov, l.mvhd(t[0].timescale, t[0].duration)]
                                            .concat(r)
                                            .concat(l.mvex(t)),
                                    )
                                }),
                                (l.mvex = function (t) {
                                    for (var e = t.length, r = []; e--;) r[e] = l.trex(t[e])
                                    return l.box.apply(null, [l.types.mvex].concat(r))
                                }),
                                (l.mvhd = function (t, e) {
                                    e *= t
                                    var r = Math.floor(e / (1 + a))
                                    return (
                                        (e = Math.floor(e % (1 + a))),
                                        (t = new Uint8Array([
                                            1,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            2,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            3,
                                            (t >> 24) & 255,
                                            (t >> 16) & 255,
                                            (t >> 8) & 255,
                                            255 & t,
                                            r >> 24,
                                            (r >> 16) & 255,
                                            (r >> 8) & 255,
                                            255 & r,
                                            e >> 24,
                                            (e >> 16) & 255,
                                            (e >> 8) & 255,
                                            255 & e,
                                            0,
                                            1,
                                            0,
                                            0,
                                            1,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            1,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            1,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            64,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            255,
                                            255,
                                            255,
                                            255,
                                        ])),
                                        l.box(l.types.mvhd, t)
                                    )
                                }),
                                (l.sdtp = function (t) {
                                    t = t.samples || []
                                    for (
                                        var e = new Uint8Array(4 + t.length), r = 0;
                                        r < t.length;
                                        r++
                                    ) {
                                        var i = t[r].flags
                                        e[r + 4] =
                                            (i.dependsOn << 4) |
                                            (i.isDependedOn << 2) |
                                            i.hasRedundancy
                                    }
                                    return l.box(l.types.sdtp, e)
                                }),
                                (l.stbl = function (t) {
                                    return l.box(
                                        l.types.stbl,
                                        l.stsd(t),
                                        l.box(l.types.stts, l.STTS),
                                        l.box(l.types.stsc, l.STSC),
                                        l.box(l.types.stsz, l.STSZ),
                                        l.box(l.types.stco, l.STCO),
                                    )
                                }),
                                (l.avc1 = function (t) {
                                    for (var e = [], r = [], i = 0; i < t.sps.length; i++) {
                                        var n = t.sps[i],
                                            a = n.byteLength
                                        e.push((a >>> 8) & 255),
                                            e.push(255 & a),
                                            (e = e.concat(Array.prototype.slice.call(n)))
                                    }
                                    for (i = 0; i < t.pps.length; i++)
                                        (a = (n = t.pps[i]).byteLength),
                                            r.push((a >>> 8) & 255),
                                            r.push(255 & a),
                                            (r = r.concat(Array.prototype.slice.call(n)))
                                    return (
                                        (e = l.box(
                                            l.types.avcC,
                                            new Uint8Array(
                                                [1, e[3], e[4], e[5], 255, 224 | t.sps.length]
                                                    .concat(e)
                                                    .concat([t.pps.length])
                                                    .concat(r),
                                            ),
                                        )),
                                        (r = t.width),
                                        (i = t.height),
                                        (n = t.pixelRatio[0]),
                                        (t = t.pixelRatio[1]),
                                        l.box(
                                            l.types.avc1,
                                            new Uint8Array([
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                1,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                (r >> 8) & 255,
                                                255 & r,
                                                (i >> 8) & 255,
                                                255 & i,
                                                0,
                                                72,
                                                0,
                                                0,
                                                0,
                                                72,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                1,
                                                18,
                                                100,
                                                97,
                                                105,
                                                108,
                                                121,
                                                109,
                                                111,
                                                116,
                                                105,
                                                111,
                                                110,
                                                47,
                                                104,
                                                108,
                                                115,
                                                46,
                                                106,
                                                115,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                24,
                                                17,
                                                17,
                                            ]),
                                            e,
                                            l.box(
                                                l.types.btrt,
                                                new Uint8Array([
                                                    0,
                                                    28,
                                                    156,
                                                    128,
                                                    0,
                                                    45,
                                                    198,
                                                    192,
                                                    0,
                                                    45,
                                                    198,
                                                    192,
                                                ]),
                                            ),
                                            l.box(
                                                l.types.pasp,
                                                new Uint8Array([
                                                    n >> 24,
                                                    (n >> 16) & 255,
                                                    (n >> 8) & 255,
                                                    255 & n,
                                                    t >> 24,
                                                    (t >> 16) & 255,
                                                    (t >> 8) & 255,
                                                    255 & t,
                                                ]),
                                            ),
                                        )
                                    )
                                }),
                                (l.esds = function (t) {
                                    var e = t.config.length
                                    return new Uint8Array(
                                        [
                                            0,
                                            0,
                                            0,
                                            0,
                                            3,
                                            23 + e,
                                            0,
                                            1,
                                            0,
                                            4,
                                            15 + e,
                                            64,
                                            21,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            5,
                                        ]
                                            .concat([e])
                                            .concat(t.config)
                                            .concat([6, 1, 2]),
                                    )
                                }),
                                (l.mp4a = function (t) {
                                    var e = t.samplerate
                                    return l.box(
                                        l.types.mp4a,
                                        new Uint8Array([
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            1,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            t.channelCount,
                                            0,
                                            16,
                                            0,
                                            0,
                                            0,
                                            0,
                                            (e >> 8) & 255,
                                            255 & e,
                                            0,
                                            0,
                                        ]),
                                        l.box(l.types.esds, l.esds(t)),
                                    )
                                }),
                                (l.mp3 = function (t) {
                                    var e = t.samplerate
                                    return l.box(
                                        l.types['.mp3'],
                                        new Uint8Array([
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            1,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            t.channelCount,
                                            0,
                                            16,
                                            0,
                                            0,
                                            0,
                                            0,
                                            (e >> 8) & 255,
                                            255 & e,
                                            0,
                                            0,
                                        ]),
                                    )
                                }),
                                (l.stsd = function (t) {
                                    return 'audio' === t.type
                                        ? t.isAAC || 'mp3' !== t.codec
                                            ? l.box(l.types.stsd, l.STSD, l.mp4a(t))
                                            : l.box(l.types.stsd, l.STSD, l.mp3(t))
                                        : l.box(l.types.stsd, l.STSD, l.avc1(t))
                                }),
                                (l.tkhd = function (t) {
                                    var e = t.id,
                                        r = t.duration * t.timescale,
                                        i = t.width
                                    t = t.height
                                    var n = Math.floor(r / (1 + a)),
                                        r = Math.floor(r % (1 + a))
                                    return l.box(
                                        l.types.tkhd,
                                        new Uint8Array([
                                            1,
                                            0,
                                            0,
                                            7,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            2,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            3,
                                            (e >> 24) & 255,
                                            (e >> 16) & 255,
                                            (e >> 8) & 255,
                                            255 & e,
                                            0,
                                            0,
                                            0,
                                            0,
                                            n >> 24,
                                            (n >> 16) & 255,
                                            (n >> 8) & 255,
                                            255 & n,
                                            r >> 24,
                                            (r >> 16) & 255,
                                            (r >> 8) & 255,
                                            255 & r,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            1,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            1,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            0,
                                            64,
                                            0,
                                            0,
                                            0,
                                            (i >> 8) & 255,
                                            255 & i,
                                            0,
                                            0,
                                            (t >> 8) & 255,
                                            255 & t,
                                            0,
                                            0,
                                        ]),
                                    )
                                }),
                                (l.traf = function (t, e) {
                                    var r = l.sdtp(t),
                                        i = t.id,
                                        n = Math.floor(e / (1 + a))
                                    return (
                                        (e = Math.floor(e % (1 + a))),
                                        l.box(
                                            l.types.traf,
                                            l.box(
                                                l.types.tfhd,
                                                new Uint8Array([
                                                    0,
                                                    0,
                                                    0,
                                                    0,
                                                    i >> 24,
                                                    (i >> 16) & 255,
                                                    (i >> 8) & 255,
                                                    255 & i,
                                                ]),
                                            ),
                                            l.box(
                                                l.types.tfdt,
                                                new Uint8Array([
                                                    1,
                                                    0,
                                                    0,
                                                    0,
                                                    n >> 24,
                                                    (n >> 16) & 255,
                                                    (n >> 8) & 255,
                                                    255 & n,
                                                    e >> 24,
                                                    (e >> 16) & 255,
                                                    (e >> 8) & 255,
                                                    255 & e,
                                                ]),
                                            ),
                                            l.trun(t, r.length + 16 + 20 + 8 + 16 + 8 + 8),
                                            r,
                                        )
                                    )
                                }),
                                (l.trak = function (t) {
                                    return (
                                        (t.duration = t.duration || 4294967295),
                                        l.box(l.types.trak, l.tkhd(t), l.mdia(t))
                                    )
                                }),
                                (l.trex = function (t) {
                                    return (
                                        (t = t.id),
                                        l.box(
                                            l.types.trex,
                                            new Uint8Array([
                                                0,
                                                0,
                                                0,
                                                0,
                                                t >> 24,
                                                (t >> 16) & 255,
                                                (t >> 8) & 255,
                                                255 & t,
                                                0,
                                                0,
                                                0,
                                                1,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                0,
                                                1,
                                                0,
                                                1,
                                            ]),
                                        )
                                    )
                                }),
                                (l.trun = function (t, e) {
                                    var r = (t = t.samples || []).length,
                                        i = 12 + 16 * r,
                                        n = new Uint8Array(i)
                                    for (
                                        e += 8 + i,
                                        n.set(
                                            [
                                                0,
                                                0,
                                                15,
                                                1,
                                                (r >>> 24) & 255,
                                                (r >>> 16) & 255,
                                                (r >>> 8) & 255,
                                                255 & r,
                                                (e >>> 24) & 255,
                                                (e >>> 16) & 255,
                                                (e >>> 8) & 255,
                                                255 & e,
                                            ],
                                            0,
                                        ),
                                        e = 0;
                                        e < r;
                                        e++
                                    ) {
                                        var i = (o = t[e]).duration,
                                            a = o.size,
                                            s = o.flags,
                                            o = o.cts
                                        n.set(
                                            [
                                                (i >>> 24) & 255,
                                                (i >>> 16) & 255,
                                                (i >>> 8) & 255,
                                                255 & i,
                                                (a >>> 24) & 255,
                                                (a >>> 16) & 255,
                                                (a >>> 8) & 255,
                                                255 & a,
                                                (s.isLeading << 2) | s.dependsOn,
                                                (s.isDependedOn << 6) |
                                                (s.hasRedundancy << 4) |
                                                (s.paddingValue << 1) |
                                                s.isNonSync,
                                                61440 & s.degradPrio,
                                                15 & s.degradPrio,
                                                (o >>> 24) & 255,
                                                (o >>> 16) & 255,
                                                (o >>> 8) & 255,
                                                255 & o,
                                            ],
                                            12 + 16 * e,
                                        )
                                    }
                                    return l.box(l.types.trun, n)
                                }),
                                (l.initSegment = function (t) {
                                    l.types || l.init(), (t = l.moov(t))
                                    var e = new Uint8Array(l.FTYP.byteLength + t.byteLength)
                                    return e.set(l.FTYP), e.set(t, l.FTYP.byteLength), e
                                }),
                                (e.default = l)
                        },
                        './src/remux/mp4-remuxer.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var R = r('./src/remux/aac-helper.js'),
                                L = r('./src/remux/mp4-generator.js'),
                                D = r('./src/events.js'),
                                O = r('./src/errors.js')
                            function i(t, e, r, i) {
                                ; (this.observer = t),
                                    (this.config = e),
                                    (this.typeSupported = r),
                                    (t = navigator.userAgent),
                                    (this.isSafari =
                                        i && -1 < i.indexOf('Apple') && t && !t.match('CriOS')),
                                    (this.ISGenerated = !1)
                            }
                            r('./src/utils/logger.js'),
                                (i.prototype.destroy = function () { }),
                                (i.prototype.resetTimeStamp = function (t) {
                                    this._initPTS = this._initDTS = t
                                }),
                                (i.prototype.resetInitSegment = function () {
                                    this.ISGenerated = !1
                                }),
                                (i.prototype.remux = function (t, e, r, i, n, a, s) {
                                    var o, l, u, d, c
                                    this.ISGenerated || this.generateIS(t, e, n),
                                        this.ISGenerated &&
                                        ((o = t.samples.length),
                                            (l = e.samples.length),
                                            (d = u = n),
                                            o &&
                                            l &&
                                            ((c =
                                                (t.samples[0].pts - e.samples[0].pts) /
                                                e.inputTimeScale),
                                                (u += Math.max(0, c)),
                                                (d += Math.max(0, -c))),
                                            o
                                                ? (t.timescale || this.generateIS(t, e, n),
                                                    (u = this.remuxAudio(t, u, a, s)),
                                                    l &&
                                                    ((l = void 0),
                                                        u && (l = u.endPTS - u.startPTS),
                                                        e.timescale || this.generateIS(t, e, n),
                                                        this.remuxVideo(e, d, a, l, s)))
                                                : l &&
                                                (e = this.remuxVideo(e, d, a, 0, s)) &&
                                                t.codec &&
                                                this.remuxEmptyAudio(t, u, a, e)),
                                        r.samples.length && this.remuxID3(r, n),
                                        i.samples.length && this.remuxText(i, n),
                                        this.observer.trigger(D.default.FRAG_PARSED)
                                }),
                                (i.prototype.generateIS = function (t, e, r) {
                                    var i,
                                        n,
                                        a = this.observer,
                                        s = t.samples,
                                        o = e.samples,
                                        l = this.typeSupported,
                                        u = 'audio/mp4',
                                        d = {},
                                        c = { tracks: d },
                                        f = void 0 === this._initPTS
                                    f && (i = n = 1 / 0),
                                        t.config &&
                                        s.length &&
                                        ((t.timescale = t.samplerate),
                                            t.isAAC ||
                                            (l.mpeg
                                                ? ((u = 'audio/mpeg'), (t.codec = ''))
                                                : l.mp3 && (t.codec = 'mp3')),
                                            (d.audio = {
                                                container: u,
                                                codec: t.codec,
                                                initSegment:
                                                    !t.isAAC && l.mpeg
                                                        ? new Uint8Array()
                                                        : L.default.initSegment([t]),
                                                metadata: { channelCount: t.channelCount },
                                            }),
                                            f && (i = n = s[0].pts - t.inputTimeScale * r)),
                                        e.sps &&
                                        e.pps &&
                                        o.length &&
                                        ((t = e.inputTimeScale),
                                            (e.timescale = t),
                                            (d.video = {
                                                container: 'video/mp4',
                                                codec: e.codec,
                                                initSegment: L.default.initSegment([e]),
                                                metadata: { width: e.width, height: e.height },
                                            }),
                                            f &&
                                            ((i = Math.min(i, o[0].pts - t * r)),
                                                (n = Math.min(n, o[0].dts - t * r)),
                                                this.observer.trigger(D.default.INIT_PTS_FOUND, {
                                                    initPTS: i,
                                                }))),
                                        Object.keys(d).length
                                            ? (a.trigger(D.default.FRAG_PARSING_INIT_SEGMENT, c),
                                                (this.ISGenerated = !0),
                                                f && ((this._initPTS = i), (this._initDTS = n)))
                                            : a.trigger(D.default.ERROR, {
                                                type: O.ErrorTypes.MEDIA_ERROR,
                                                details: O.ErrorDetails.FRAG_PARSING_ERROR,
                                                fatal: !1,
                                                reason: 'no audio/video samples found',
                                            })
                                }),
                                (i.prototype.remuxVideo = function (t, e, r, i, n) {
                                    var a,
                                        s = 8,
                                        o = t.timescale,
                                        l = t.samples,
                                        u = [],
                                        d = l.length,
                                        c = this._PTSNormalize,
                                        f = this._initPTS,
                                        h = this.nextAvcDts,
                                        p = this.isSafari
                                    if (0 !== d) {
                                        if (
                                            (p &&
                                                (r |=
                                                    l.length &&
                                                    h &&
                                                    ((n && Math.abs(e - h / o) < 0.1) ||
                                                        Math.abs(l[0].pts - h - f) < o / 5)),
                                                r || (h = e * o),
                                                l.forEach(function (t) {
                                                    ; (t.pts = c(t.pts - f, h)), (t.dts = c(t.dts - f, h))
                                                }),
                                                l.sort(function (t, e) {
                                                    var r = t.pts - e.pts
                                                    return t.dts - e.dts || r || t.id - e.id
                                                }),
                                                (e = l.reduce(function (t, e) {
                                                    return Math.max(Math.min(t, e.pts - e.dts), -18e3)
                                                }, 0)) < 0)
                                        )
                                            for (var g = 0; g < l.length; g++) l[g].dts += e
                                                ; (g = l[0]),
                                                    (n = Math.max(g.dts, 0)),
                                                    (e = Math.max(g.pts, 0))
                                        var y = Math.round((n - h) / 90)
                                        r &&
                                            y &&
                                            ((n = h),
                                                (l[0].dts = n),
                                                (e = Math.max(e - y, h)),
                                                (l[0].pts = e)),
                                            (g = l[l.length - 1]),
                                            (y = Math.max(g.dts, 0)),
                                            (r = Math.max(g.pts, 0, y)),
                                            p && (a = Math.round((y - n) / (l.length - 1)))
                                        for (var m = 0, v = 0, g = 0; g < d; g++) {
                                            for (
                                                var _ = l[g], E = _.units, T = E.length, S = 0, b = 0;
                                                b < T;
                                                b++
                                            )
                                                S += E[b].data.length
                                                    ; (v += S),
                                                        (m += T),
                                                        (_.length = S),
                                                        (_.dts = p ? n + g * a : Math.max(_.dts, n)),
                                                        (_.pts = Math.max(_.pts, _.dts))
                                        }
                                        g = v + 4 * m + 8
                                        try {
                                            var A = new Uint8Array(g)
                                        } catch (t) {
                                            return void this.observer.trigger(D.default.ERROR, {
                                                type: O.ErrorTypes.MUX_ERROR,
                                                details: O.ErrorDetails.REMUX_ALLOC_ERROR,
                                                fatal: !1,
                                                bytes: g,
                                                reason: 'fail allocating video mdat ' + g,
                                            })
                                        }
                                        for (
                                            (m = new DataView(A.buffer)).setUint32(0, g),
                                            A.set(L.default.types.mdat, 4),
                                            g = 0;
                                            g < d;
                                            g++
                                        ) {
                                            for (
                                                T = void (_ = 0),
                                                b = 0,
                                                T = (E = (v = l[g]).units).length;
                                                b < T;
                                                b++
                                            ) {
                                                var S = (R = E[b]).data,
                                                    R = R.data.byteLength
                                                m.setUint32(s, R),
                                                    (s += 4),
                                                    A.set(S, s),
                                                    (s += R),
                                                    (_ += 4 + R)
                                            }
                                            ; (T = p
                                                ? Math.max(0, a * Math.round((v.pts - v.dts) / a))
                                                : (g < d - 1
                                                    ? (a = l[g + 1].dts - v.dts)
                                                    : ((a = this.config),
                                                        (T = v.dts - l[0 < g ? g - 1 : g].dts),
                                                        a.stretchShortVideoTrack
                                                            ? (b =
                                                                (i ? e + i * o : this.nextAudioPts) -
                                                                v.pts) > Math.floor(a.maxBufferHole * o)
                                                                ? (a = b - T) < 0 && (a = T)
                                                                : (a = T)
                                                            : (a = T)),
                                                    Math.round(v.pts - v.dts))),
                                                u.push({
                                                    size: _,
                                                    duration: a,
                                                    cts: T,
                                                    flags: {
                                                        isLeading: 0,
                                                        isDependedOn: 0,
                                                        hasRedundancy: 0,
                                                        degradPrio: 0,
                                                        dependsOn: v.key ? 2 : 1,
                                                        isNonSync: v.key ? 0 : 1,
                                                    },
                                                })
                                        }
                                        return (
                                            (this.nextAvcDts = y + a),
                                            (i = t.dropped),
                                            (t.len = 0),
                                            (t.nbNalu = 0),
                                            (t.dropped = 0),
                                            u.length &&
                                            -1 <
                                            navigator.userAgent.toLowerCase().indexOf('chrome') &&
                                            (((s = u[0].flags).dependsOn = 2), (s.isNonSync = 0)),
                                            (t.samples = u),
                                            (s = L.default.moof(t.sequenceNumber++, n, t)),
                                            (t.samples = []),
                                            (t = {
                                                data1: s,
                                                data2: A,
                                                startPTS: e / o,
                                                endPTS: (r + a) / o,
                                                startDTS: n / o,
                                                endDTS: this.nextAvcDts / o,
                                                type: 'video',
                                                hasAudio: !1,
                                                hasVideo: !0,
                                                nb: u.length,
                                                dropped: i,
                                            }),
                                            this.observer.trigger(D.default.FRAG_PARSING_DATA, t),
                                            t
                                        )
                                    }
                                }),
                                (i.prototype.remuxAudio = function (t, e, r, i) {
                                    var n,
                                        a = t.inputTimeScale,
                                        s = a / t.timescale,
                                        o = (t.isAAC ? 1024 : 1152) * s,
                                        l = this._PTSNormalize,
                                        u = this._initPTS,
                                        d = !t.isAAC && this.typeSupported.mpeg,
                                        c = t.samples,
                                        f = [],
                                        h = this.nextAudioPts
                                    if (
                                        ((r |=
                                            c.length &&
                                            h &&
                                            ((i && Math.abs(e - h / a) < 0.1) ||
                                                Math.abs(c[0].pts - h - u) < 20 * o)),
                                            c.forEach(function (t) {
                                                t.pts = t.dts = l(t.pts - u, e * a)
                                            }),
                                            0 !==
                                            (c = c.filter(function (t) {
                                                return 0 <= t.pts
                                            })).length)
                                    ) {
                                        if ((r || (h = i ? e * a : c[0].pts), t.isAAC))
                                            for (
                                                var p = this.config.maxAudioFramesDrift, g = 0, y = h;
                                                g < c.length;

                                            ) {
                                                var m = c[g],
                                                    v = m.pts
                                                if (
                                                    ((i = v - y),
                                                        (v = Math.abs((1e3 * i) / a)),
                                                        i <= -p * o)
                                                )
                                                    c.splice(g, 1), (t.len -= m.unit.length)
                                                else {
                                                    if (p * o <= i && v < 1e4 && y)
                                                        for (v = Math.round(i / o), i = 0; i < v; i++) {
                                                            var _ = Math.max(y, 0)
                                                                ; (n = R.default.getSilentFrame(
                                                                    t.manifestCodec || t.codec,
                                                                    t.channelCount,
                                                                )) || (n = m.unit.subarray()),
                                                                    c.splice(g, 0, { unit: n, pts: _, dts: _ }),
                                                                    (t.len += n.length),
                                                                    (y += o),
                                                                    g++
                                                        }
                                                    ; (m.pts = m.dts = y), (y += o), g++
                                                }
                                            }
                                        for (i = 0, p = c.length; i < p; i++) {
                                            if (((y = (g = c[i]).unit), (v = g.pts), void 0 !== A))
                                                T.duration = Math.round((v - A) / s)
                                            else {
                                                if (
                                                    ((g = Math.round((1e3 * (v - h)) / a)),
                                                        (m = 0),
                                                        r && t.isAAC && g)
                                                ) {
                                                    if (0 < g && g < 1e4)
                                                        0 < (m = Math.round((v - h) / o)) &&
                                                            ((n = R.default.getSilentFrame(
                                                                t.manifestCodec || t.codec,
                                                                t.channelCount,
                                                            )) || (n = y.subarray()),
                                                                (t.len += m * n.length))
                                                    else if (g < -12) {
                                                        t.len -= y.byteLength
                                                        continue
                                                    }
                                                    v = h
                                                }
                                                var E = v
                                                if (!(0 < t.len)) return
                                                var T = d ? t.len : t.len + 8,
                                                    S = d ? 0 : 8
                                                try {
                                                    var b = new Uint8Array(T)
                                                } catch (t) {
                                                    return void this.observer.trigger(D.default.ERROR, {
                                                        type: O.ErrorTypes.MUX_ERROR,
                                                        details: O.ErrorDetails.REMUX_ALLOC_ERROR,
                                                        fatal: !1,
                                                        bytes: T,
                                                        reason: 'fail allocating audio mdat ' + T,
                                                    })
                                                }
                                                for (
                                                    d ||
                                                    (new DataView(b.buffer).setUint32(0, T),
                                                        b.set(L.default.types.mdat, 4)),
                                                    g = 0;
                                                    g < m;
                                                    g++
                                                )
                                                    (n = R.default.getSilentFrame(
                                                        t.manifestCodec || t.codec,
                                                        t.channelCount,
                                                    )) || (n = y.subarray()),
                                                        b.set(n, S),
                                                        (S += n.byteLength),
                                                        (T = {
                                                            size: n.byteLength,
                                                            cts: 0,
                                                            duration: 1024,
                                                            flags: {
                                                                isLeading: 0,
                                                                isDependedOn: 0,
                                                                hasRedundancy: 0,
                                                                degradPrio: 0,
                                                                dependsOn: 1,
                                                            },
                                                        }),
                                                        f.push(T)
                                            }
                                            b.set(y, S),
                                                (S += T = y.byteLength),
                                                (T = {
                                                    size: T,
                                                    cts: 0,
                                                    duration: 0,
                                                    flags: {
                                                        isLeading: 0,
                                                        isDependedOn: 0,
                                                        hasRedundancy: 0,
                                                        degradPrio: 0,
                                                        dependsOn: 1,
                                                    },
                                                }),
                                                f.push(T)
                                            var A = v
                                        }
                                        return (
                                            (h = 0),
                                            2 <= (r = f.length) &&
                                            ((h = f[r - 2].duration), (T.duration = h)),
                                            r
                                                ? ((this.nextAudioPts = h = A + s * h),
                                                    (t.len = 0),
                                                    (t.samples = f),
                                                    (s = d
                                                        ? new Uint8Array()
                                                        : L.default.moof(t.sequenceNumber++, E / s, t)),
                                                    (t.samples = []),
                                                    (b = {
                                                        data1: s,
                                                        data2: b,
                                                        startPTS: (t = E / a),
                                                        endPTS: (E = h / a),
                                                        startDTS: t,
                                                        endDTS: E,
                                                        type: 'audio',
                                                        hasAudio: !0,
                                                        hasVideo: !1,
                                                        nb: r,
                                                    }),
                                                    this.observer.trigger(D.default.FRAG_PARSING_DATA, b),
                                                    b)
                                                : null
                                        )
                                    }
                                }),
                                (i.prototype.remuxEmptyAudio = function (t, e, r, i) {
                                    var n = t.inputTimeScale,
                                        a =
                                            (void 0 !== (a = this.nextAudioPts)
                                                ? a
                                                : i.startDTS * n) + this._initDTS,
                                        s = (n / (t.samplerate || n)) * 1024
                                    if (
                                        ((i = Math.ceil((i.endDTS * n + this._initDTS - a) / s)),
                                            (n = R.default.getSilentFrame(
                                                t.manifestCodec || t.codec,
                                                t.channelCount,
                                            )))
                                    ) {
                                        for (var o = [], l = 0; l < i; l++) {
                                            var u = a + l * s
                                            o.push({ unit: n, pts: u, dts: u }), (t.len += n.length)
                                        }
                                        ; (t.samples = o), this.remuxAudio(t, e, r)
                                    }
                                }),
                                (i.prototype.remuxID3 = function (t) {
                                    var e = t.samples.length,
                                        r = t.inputTimeScale,
                                        i = this._initPTS,
                                        n = this._initDTS
                                    if (e) {
                                        for (var a = 0; a < e; a++) {
                                            var s = t.samples[a]
                                                ; (s.pts = (s.pts - i) / r), (s.dts = (s.dts - n) / r)
                                        }
                                        this.observer.trigger(D.default.FRAG_PARSING_METADATA, {
                                            samples: t.samples,
                                        })
                                    }
                                    t.samples = []
                                }),
                                (i.prototype.remuxText = function (t) {
                                    t.samples.sort(function (t, e) {
                                        return t.pts - e.pts
                                    })
                                    var e = t.samples.length,
                                        r = t.inputTimeScale,
                                        i = this._initPTS
                                    if (e) {
                                        for (var n = 0; n < e; n++) {
                                            var a = t.samples[n]
                                            a.pts = (a.pts - i) / r
                                        }
                                        this.observer.trigger(D.default.FRAG_PARSING_USERDATA, {
                                            samples: t.samples,
                                        })
                                    }
                                    t.samples = []
                                }),
                                (i.prototype._PTSNormalize = function (t, e) {
                                    var r
                                    if (void 0 === e) return t
                                    for (
                                        r = e < t ? -8589934592 : 8589934592;
                                        4294967296 < Math.abs(t - e);

                                    )
                                        t += r
                                    return t
                                }),
                                (e.default = i)
                        },
                        './src/remux/passthrough-remuxer.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var l = r('./src/events.js')
                            function i(t) {
                                this.observer = t
                            }
                            ; (i.prototype.destroy = function () { }),
                                (i.prototype.resetTimeStamp = function () { }),
                                (i.prototype.resetInitSegment = function () { }),
                                (i.prototype.remux = function (t, e, r, i, n, a, s, o) {
                                    ; (i = ''),
                                        t && (i += 'audio'),
                                        e && (i += 'video'),
                                        (r = this.observer).trigger(l.default.FRAG_PARSING_DATA, {
                                            data1: o,
                                            startPTS: n,
                                            startDTS: n,
                                            type: i,
                                            hasAudio: !!t,
                                            hasVideo: !!e,
                                            nb: 1,
                                            dropped: 0,
                                        }),
                                        r.trigger(l.default.FRAG_PARSED)
                                }),
                                (e.default = i)
                        },
                        './src/task-loop.js': function (t, e, r) {
                            var i,
                                n,
                                a =
                                    (this && this.__extends) ||
                                    ((i =
                                        Object.setPrototypeOf ||
                                        ({ __proto__: [] } instanceof Array &&
                                            function (t, e) {
                                                t.__proto__ = e
                                            }) ||
                                        function (t, e) {
                                            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
                                        }),
                                        function (t, e) {
                                            function r() {
                                                this.constructor = t
                                            }
                                            i(t, e),
                                                (t.prototype =
                                                    null === e
                                                        ? Object.create(e)
                                                        : ((r.prototype = e.prototype), new r()))
                                        })
                            function s(t) {
                                for (var e = [], r = 1; r < arguments.length; r++)
                                    e[r - 1] = arguments[r]
                                return (
                                    ((e =
                                        n.apply(this, [t].concat(e)) || this)._tickInterval = null),
                                    (e._tickTimer = null),
                                    (e._tickCallCount = 0),
                                    (e._boundTick = e.tick.bind(e)),
                                    e
                                )
                            }
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (n = r('./src/event-handler.js').default),
                                a(s, n),
                                (s.prototype.onHandlerDestroying = function () {
                                    this.clearNextTick(), this.clearInterval()
                                }),
                                (s.prototype.hasInterval = function () {
                                    return !!this._tickInterval
                                }),
                                (s.prototype.hasNextTick = function () {
                                    return !!this._tickTimer
                                }),
                                (s.prototype.setInterval = function (t) {
                                    return (
                                        !this._tickInterval &&
                                        ((this._tickInterval = setInterval(this._boundTick, t)), !0)
                                    )
                                }),
                                (s.prototype.clearInterval = function () {
                                    return (
                                        !!this._tickInterval &&
                                        (clearInterval(this._tickInterval),
                                            !(this._tickInterval = null))
                                    )
                                }),
                                (s.prototype.clearNextTick = function () {
                                    return (
                                        !!this._tickTimer &&
                                        (clearTimeout(this._tickTimer), !(this._tickTimer = null))
                                    )
                                }),
                                (s.prototype.tick = function () {
                                    this._tickCallCount++,
                                        1 === this._tickCallCount &&
                                        (this.doTick(),
                                            1 < this._tickCallCount &&
                                            (this.clearNextTick(),
                                                (this._tickTimer = setTimeout(this._boundTick, 0))),
                                            (this._tickCallCount = 0))
                                }),
                                (s.prototype.doTick = function () { }),
                                (e.default = s)
                        },
                        './src/utils/attr-list.js': function (t, a, e) {
                            !function (e) {
                                Object.defineProperty(a, '__esModule', { value: !0 })
                                var r = /^(\d+)x(\d+)$/,
                                    n = /\s*(.+?)\s*=((?:".*?")|.*?)(?:,|$)/g,
                                    t =
                                        ((i.prototype.decimalInteger = function (t) {
                                            return (t = parseInt(this[t], 10)) > e.MAX_SAFE_INTEGER
                                                ? 1 / 0
                                                : t
                                        }),
                                            (i.prototype.hexadecimalInteger = function (t) {
                                                if (this[t]) {
                                                    t =
                                                        (1 & (t = (this[t] || '0x').slice(2)).length
                                                            ? '0'
                                                            : '') + t
                                                    for (
                                                        var e = new Uint8Array(t.length / 2), r = 0;
                                                        r < t.length / 2;
                                                        r++
                                                    )
                                                        e[r] = parseInt(t.slice(2 * r, 2 * r + 2), 16)
                                                    return e
                                                }
                                                return null
                                            }),
                                            (i.prototype.hexadecimalIntegerAsNumber = function (t) {
                                                return (t = parseInt(this[t], 16)) > e.MAX_SAFE_INTEGER
                                                    ? 1 / 0
                                                    : t
                                            }),
                                            (i.prototype.decimalFloatingPoint = function (t) {
                                                return parseFloat(this[t])
                                            }),
                                            (i.prototype.enumeratedString = function (t) {
                                                return this[t]
                                            }),
                                            (i.prototype.decimalResolution = function (t) {
                                                if (null !== (t = r.exec(this[t])))
                                                    return {
                                                        width: parseInt(t[1], 10),
                                                        height: parseInt(t[2], 10),
                                                    }
                                            }),
                                            (i.parseAttrList = function (t) {
                                                var e,
                                                    r = {}
                                                for (n.lastIndex = 0; null !== (e = n.exec(t));) {
                                                    var i = e[2]
                                                    0 === i.indexOf('"') &&
                                                        i.lastIndexOf('"') === i.length - 1 &&
                                                        (i = i.slice(1, -1)),
                                                        (r[e[1]] = i)
                                                }
                                                return r
                                            }),
                                            i)
                                function i(t) {
                                    for (var e in (t =
                                        'string' == typeof t ? i.parseAttrList(t) : t))
                                        t.hasOwnProperty(e) && (this[e] = t[e])
                                }
                                a.default = t
                            }.call(this, e('./src/polyfills/number.js').Number)
                        },
                        './src/utils/binary-search.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (e.default = {
                                    search: function (t, e) {
                                        for (var r = 0, i = t.length - 1; r <= i;) {
                                            var n,
                                                a,
                                                s = e((a = t[(n = ((r + i) / 2) | 0)]))
                                            if (0 < s) r = 1 + n
                                            else {
                                                if (!(s < 0)) return a
                                                i = n - 1
                                            }
                                        }
                                        return null
                                    },
                                })
                        },
                        './src/utils/buffer-helper.js': function (t, e, r) {
                            function i() { }
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (i.isBuffered = function (t, e) {
                                    try {
                                        if (t) {
                                            var r = t.buffered
                                            for (t = 0; t < r.length; t++)
                                                if (e >= r.start(t) && e <= r.end(t)) return !0
                                        }
                                    } catch (t) { }
                                    return !1
                                }),
                                (i.bufferInfo = function (t, e, r) {
                                    try {
                                        if (t) {
                                            var i = t.buffered
                                            t = []
                                            for (var n = void 0, n = 0; n < i.length; n++)
                                                t.push({ start: i.start(n), end: i.end(n) })
                                            return this.bufferedInfo(t, e, r)
                                        }
                                    } catch (t) { }
                                    return { len: 0, start: e, end: e, nextStart: void 0 }
                                }),
                                (i.bufferedInfo = function (t, e, r) {
                                    var i,
                                        n,
                                        a,
                                        s = []
                                    for (
                                        t.sort(function (t, e) {
                                            var r = t.start - e.start
                                            return r || e.end - t.end
                                        }),
                                        n = 0;
                                        n < t.length;
                                        n++
                                    )
                                        (i = s.length)
                                            ? ((a = s[i - 1].end),
                                                t[n].start - a < r
                                                    ? t[n].end > a && (s[i - 1].end = t[n].end)
                                                    : s.push(t[n]))
                                            : s.push(t[n])
                                    for (t = n = 0, i = a = e; n < s.length; n++) {
                                        var o = s[n].start,
                                            l = s[n].end
                                        if (o <= e + r && e < l) (i = o), (t = (a = l) - e)
                                        else if (e + r < o) {
                                            var u = o
                                            break
                                        }
                                    }
                                    return { len: t, start: i, end: a, nextStart: u }
                                }),
                                (e.BufferHelper = i)
                        },
                        './src/utils/cea-608-parser.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var i = {
                                42: 225,
                                92: 233,
                                94: 237,
                                95: 243,
                                96: 250,
                                123: 231,
                                124: 247,
                                125: 209,
                                126: 241,
                                127: 9608,
                                128: 174,
                                129: 176,
                                130: 189,
                                131: 191,
                                132: 8482,
                                133: 162,
                                134: 163,
                                135: 9834,
                                136: 224,
                                137: 32,
                                138: 232,
                                139: 226,
                                140: 234,
                                141: 238,
                                142: 244,
                                143: 251,
                                144: 193,
                                145: 201,
                                146: 211,
                                147: 218,
                                148: 220,
                                149: 252,
                                150: 8216,
                                151: 161,
                                152: 42,
                                153: 8217,
                                154: 9473,
                                155: 169,
                                156: 8480,
                                157: 8226,
                                158: 8220,
                                159: 8221,
                                160: 192,
                                161: 194,
                                162: 199,
                                163: 200,
                                164: 202,
                                165: 203,
                                166: 235,
                                167: 206,
                                168: 207,
                                169: 239,
                                170: 212,
                                171: 217,
                                172: 249,
                                173: 219,
                                174: 171,
                                175: 187,
                                176: 195,
                                177: 227,
                                178: 205,
                                179: 204,
                                180: 236,
                                181: 210,
                                182: 242,
                                183: 213,
                                184: 245,
                                185: 123,
                                186: 125,
                                187: 92,
                                188: 94,
                                189: 95,
                                190: 124,
                                191: 8764,
                                192: 196,
                                193: 228,
                                194: 214,
                                195: 246,
                                196: 223,
                                197: 165,
                                198: 164,
                                199: 9475,
                                200: 197,
                                201: 229,
                                202: 216,
                                203: 248,
                                204: 9487,
                                205: 9491,
                                206: 9495,
                                207: 9499,
                            },
                                n = {
                                    17: 1,
                                    18: 3,
                                    21: 5,
                                    22: 7,
                                    23: 9,
                                    16: 11,
                                    19: 12,
                                    20: 14,
                                },
                                a = { 17: 2, 18: 4, 21: 6, 22: 8, 23: 10, 19: 13, 20: 15 },
                                s = {
                                    25: 1,
                                    26: 3,
                                    29: 5,
                                    30: 7,
                                    31: 9,
                                    24: 11,
                                    27: 12,
                                    28: 14,
                                },
                                o = { 25: 2, 26: 4, 29: 6, 30: 8, 31: 10, 27: 13, 28: 15 },
                                l = 'white green blue cyan red yellow magenta black transparent'.split(
                                    ' ',
                                ),
                                u =
                                    ((v.prototype.reset = function () {
                                        ; (this.foreground = 'white'),
                                            (this.italics = this.underline = !1),
                                            (this.background = 'black'),
                                            (this.flash = !1)
                                    }),
                                        (v.prototype.setStyles = function (t) {
                                            for (
                                                var e = [
                                                    'foreground',
                                                    'underline',
                                                    'italics',
                                                    'background',
                                                    'flash',
                                                ],
                                                r = 0;
                                                r < e.length;
                                                r++
                                            ) {
                                                var i = e[r]
                                                t.hasOwnProperty(i) && (this[i] = t[i])
                                            }
                                        }),
                                        (v.prototype.isDefault = function () {
                                            return (
                                                'white' === this.foreground &&
                                                !this.underline &&
                                                !this.italics &&
                                                'black' === this.background &&
                                                !this.flash
                                            )
                                        }),
                                        (v.prototype.equals = function (t) {
                                            return (
                                                this.foreground === t.foreground &&
                                                this.underline === t.underline &&
                                                this.italics === t.italics &&
                                                this.background === t.background &&
                                                this.flash === t.flash
                                            )
                                        }),
                                        (v.prototype.copy = function (t) {
                                            ; (this.foreground = t.foreground),
                                                (this.underline = t.underline),
                                                (this.italics = t.italics),
                                                (this.background = t.background),
                                                (this.flash = t.flash)
                                        }),
                                        (v.prototype.toString = function () {
                                            return (
                                                'color=' +
                                                this.foreground +
                                                ', underline=' +
                                                this.underline +
                                                ', italics=' +
                                                this.italics +
                                                ', background=' +
                                                this.background +
                                                ', flash=' +
                                                this.flash
                                            )
                                        }),
                                        v),
                                d =
                                    ((m.prototype.reset = function () {
                                        ; (this.uchar = ' '), this.penState.reset()
                                    }),
                                        (m.prototype.setChar = function (t, e) {
                                            ; (this.uchar = t), this.penState.copy(e)
                                        }),
                                        (m.prototype.setPenState = function (t) {
                                            this.penState.copy(t)
                                        }),
                                        (m.prototype.equals = function (t) {
                                            return (
                                                this.uchar === t.uchar && this.penState.equals(t.penState)
                                            )
                                        }),
                                        (m.prototype.copy = function (t) {
                                            ; (this.uchar = t.uchar), this.penState.copy(t.penState)
                                        }),
                                        (m.prototype.isEmpty = function () {
                                            return ' ' === this.uchar && this.penState.isDefault()
                                        }),
                                        m),
                                c =
                                    ((y.prototype.equals = function (t) {
                                        for (var e = !0, r = 0; r < 100; r++)
                                            if (!this.chars[r].equals(t.chars[r])) {
                                                e = !1
                                                break
                                            }
                                        return e
                                    }),
                                        (y.prototype.copy = function (t) {
                                            for (var e = 0; e < 100; e++) this.chars[e].copy(t.chars[e])
                                        }),
                                        (y.prototype.isEmpty = function () {
                                            for (var t = !0, e = 0; e < 100; e++)
                                                if (!this.chars[e].isEmpty()) {
                                                    t = !1
                                                    break
                                                }
                                            return t
                                        }),
                                        (y.prototype.setCursor = function (t) {
                                            this.pos !== t && (this.pos = t),
                                                this.pos < 0
                                                    ? (this.pos = 0)
                                                    : 100 < this.pos && (this.pos = 100)
                                        }),
                                        (y.prototype.moveCursor = function (t) {
                                            var e = this.pos + t
                                            if (1 < t)
                                                for (t = this.pos + 1; t < e + 1; t++)
                                                    this.chars[t].setPenState(this.currPenState)
                                            this.setCursor(e)
                                        }),
                                        (y.prototype.backSpace = function () {
                                            this.moveCursor(-1),
                                                this.chars[this.pos].setChar(' ', this.currPenState)
                                        }),
                                        (y.prototype.insertChar = function (t) {
                                            144 <= t && this.backSpace()
                                            var e = t
                                            i.hasOwnProperty(t) && (e = i[t]),
                                                (t = String.fromCharCode(e)),
                                                100 <= this.pos ||
                                                (this.chars[this.pos].setChar(t, this.currPenState),
                                                    this.moveCursor(1))
                                        }),
                                        (y.prototype.clearFromPos = function (t) {
                                            for (; t < 100; t++) this.chars[t].reset()
                                        }),
                                        (y.prototype.clear = function () {
                                            this.clearFromPos(0),
                                                (this.pos = 0),
                                                this.currPenState.reset()
                                        }),
                                        (y.prototype.clearToEndOfRow = function () {
                                            this.clearFromPos(this.pos)
                                        }),
                                        (y.prototype.getTextString = function () {
                                            for (var t = [], e = !0, r = 0; r < 100; r++) {
                                                var i = this.chars[r].uchar
                                                ' ' !== i && (e = !1), t.push(i)
                                            }
                                            return e ? '' : t.join('')
                                        }),
                                        (y.prototype.setPenStyles = function (t) {
                                            this.currPenState.setStyles(t),
                                                this.chars[this.pos].setPenState(this.currPenState)
                                        }),
                                        y),
                                f =
                                    ((g.prototype.reset = function () {
                                        for (var t = 0; t < 15; t++) this.rows[t].clear()
                                        this.currRow = 14
                                    }),
                                        (g.prototype.equals = function (t) {
                                            for (var e = !0, r = 0; r < 15; r++)
                                                if (!this.rows[r].equals(t.rows[r])) {
                                                    e = !1
                                                    break
                                                }
                                            return e
                                        }),
                                        (g.prototype.copy = function (t) {
                                            for (var e = 0; e < 15; e++) this.rows[e].copy(t.rows[e])
                                        }),
                                        (g.prototype.isEmpty = function () {
                                            for (var t = !0, e = 0; e < 15; e++)
                                                if (!this.rows[e].isEmpty()) {
                                                    t = !1
                                                    break
                                                }
                                            return t
                                        }),
                                        (g.prototype.backSpace = function () {
                                            this.rows[this.currRow].backSpace()
                                        }),
                                        (g.prototype.clearToEndOfRow = function () {
                                            this.rows[this.currRow].clearToEndOfRow()
                                        }),
                                        (g.prototype.insertChar = function (t) {
                                            this.rows[this.currRow].insertChar(t)
                                        }),
                                        (g.prototype.setPen = function (t) {
                                            this.rows[this.currRow].setPenStyles(t)
                                        }),
                                        (g.prototype.moveCursor = function (t) {
                                            this.rows[this.currRow].moveCursor(t)
                                        }),
                                        (g.prototype.setCursor = function (t) {
                                            this.rows[this.currRow].setCursor(t)
                                        }),
                                        (g.prototype.setPAC = function (t) {
                                            var e = t.row - 1
                                            if (
                                                (this.nrRollUpRows &&
                                                    e < this.nrRollUpRows - 1 &&
                                                    (e = this.nrRollUpRows - 1),
                                                    this.nrRollUpRows && this.currRow !== e)
                                            ) {
                                                for (var r = 0; r < 15; r++) this.rows[r].clear()
                                                var i = this.currRow + 1 - this.nrRollUpRows,
                                                    n = this.lastOutputScreen
                                                if (n && (r = n.rows[i].cueStartTime) && r < null)
                                                    for (r = 0; r < this.nrRollUpRows; r++)
                                                        this.rows[e - this.nrRollUpRows + r + 1].copy(
                                                            n.rows[i + r],
                                                        )
                                            }
                                            ; (this.currRow = e),
                                                (e = this.rows[this.currRow]),
                                                null !== t.indent &&
                                                ((i = Math.max(t.indent - 1, 0)),
                                                    e.setCursor(t.indent),
                                                    (t.color = e.chars[i].penState.foreground)),
                                                this.setPen({
                                                    foreground: t.color,
                                                    underline: t.underline,
                                                    italics: t.italics,
                                                    background: 'black',
                                                    flash: !1,
                                                })
                                        }),
                                        (g.prototype.setBkgData = function (t) {
                                            this.backSpace(), this.setPen(t), this.insertChar(32)
                                        }),
                                        (g.prototype.setRollUpRows = function (t) {
                                            this.nrRollUpRows = t
                                        }),
                                        (g.prototype.rollUp = function () {
                                            var t
                                            null !== this.nrRollUpRows &&
                                                ((t = this.rows.splice(
                                                    this.currRow + 1 - this.nrRollUpRows,
                                                    1,
                                                )[0]).clear(),
                                                    this.rows.splice(this.currRow, 0, t))
                                        }),
                                        (g.prototype.getDisplayText = function (t) {
                                            t = t || !1
                                            for (var e, r = [], i = '', n = 0; n < 15; n++) {
                                                var a = this.rows[n].getTextString()
                                                a &&
                                                    ((e = n + 1),
                                                        t
                                                            ? r.push('Row ' + e + ": '" + a + "'")
                                                            : r.push(a.trim()))
                                            }
                                            return (i =
                                                0 < r.length
                                                    ? t
                                                        ? '[' + r.join(' | ') + ']'
                                                        : r.join('\n')
                                                    : i)
                                        }),
                                        (g.prototype.getTextAndFormat = function () {
                                            return this.rows
                                        }),
                                        g),
                                h =
                                    ((p.prototype.reset = function () {
                                        ; (this.mode = null),
                                            this.displayedMemory.reset(),
                                            this.nonDisplayedMemory.reset(),
                                            this.lastOutputScreen.reset(),
                                            (this.currRollUpRow = this.displayedMemory.rows[14]),
                                            (this.writeScreen = this.displayedMemory),
                                            (this.lastCueEndTime = this.cueStartTime = this.mode = null)
                                    }),
                                        (p.prototype.getHandler = function () {
                                            return this.outputFilter
                                        }),
                                        (p.prototype.setHandler = function (t) {
                                            this.outputFilter = t
                                        }),
                                        (p.prototype.setPAC = function (t) {
                                            this.writeScreen.setPAC(t)
                                        }),
                                        (p.prototype.setBkgData = function (t) {
                                            this.writeScreen.setBkgData(t)
                                        }),
                                        (p.prototype.setMode = function (t) {
                                            t !== this.mode &&
                                                ((this.mode = t),
                                                    'MODE_POP-ON' === this.mode
                                                        ? (this.writeScreen = this.nonDisplayedMemory)
                                                        : ((this.writeScreen = this.displayedMemory),
                                                            this.writeScreen.reset()),
                                                    'MODE_ROLL-UP' !== this.mode &&
                                                    ((this.displayedMemory.nrRollUpRows = null),
                                                        (this.nonDisplayedMemory.nrRollUpRows = null)),
                                                    (this.mode = t))
                                        }),
                                        (p.prototype.insertChars = function (t) {
                                            for (var e = 0; e < t.length; e++)
                                                this.writeScreen.insertChar(t[e])
                                                    ; ('MODE_PAINT-ON' !== this.mode &&
                                                        'MODE_ROLL-UP' !== this.mode) ||
                                                        this.outputDataUpdate()
                                        }),
                                        (p.prototype.ccRCL = function () {
                                            this.setMode('MODE_POP-ON')
                                        }),
                                        (p.prototype.ccBS = function () {
                                            'MODE_TEXT' !== this.mode &&
                                                (this.writeScreen.backSpace(),
                                                    this.writeScreen === this.displayedMemory &&
                                                    this.outputDataUpdate())
                                        }),
                                        (p.prototype.ccAOF = function () { }),
                                        (p.prototype.ccAON = function () { }),
                                        (p.prototype.ccDER = function () {
                                            this.writeScreen.clearToEndOfRow(), this.outputDataUpdate()
                                        }),
                                        (p.prototype.ccRU = function (t) {
                                            ; (this.writeScreen = this.displayedMemory),
                                                this.setMode('MODE_ROLL-UP'),
                                                this.writeScreen.setRollUpRows(t)
                                        }),
                                        (p.prototype.ccFON = function () {
                                            this.writeScreen.setPen({ flash: !0 })
                                        }),
                                        (p.prototype.ccRDC = function () {
                                            this.setMode('MODE_PAINT-ON')
                                        }),
                                        (p.prototype.ccTR = function () {
                                            this.setMode('MODE_TEXT')
                                        }),
                                        (p.prototype.ccRTD = function () {
                                            this.setMode('MODE_TEXT')
                                        }),
                                        (p.prototype.ccEDM = function () {
                                            this.displayedMemory.reset(), this.outputDataUpdate(!0)
                                        }),
                                        (p.prototype.ccCR = function () {
                                            this.writeScreen.rollUp(), this.outputDataUpdate(!0)
                                        }),
                                        (p.prototype.ccENM = function () {
                                            this.nonDisplayedMemory.reset()
                                        }),
                                        (p.prototype.ccEOC = function () {
                                            var t
                                            'MODE_POP-ON' === this.mode &&
                                                ((t = this.displayedMemory),
                                                    (this.displayedMemory = this.nonDisplayedMemory),
                                                    (this.writeScreen = this.nonDisplayedMemory = t)),
                                                this.outputDataUpdate(!0)
                                        }),
                                        (p.prototype.ccTO = function (t) {
                                            this.writeScreen.moveCursor(t)
                                        }),
                                        (p.prototype.ccMIDROW = function (t) {
                                            var e = { flash: !1 }
                                                ; (e.underline = 1 == t % 2),
                                                    (e.italics = 46 <= t),
                                                    (e.foreground = e.italics
                                                        ? 'white'
                                                        : 'white green blue cyan red yellow magenta'.split(' ')[
                                                        Math.floor(t / 2) - 16
                                                        ]),
                                                    this.writeScreen.setPen(e)
                                        }),
                                        (p.prototype.outputDataUpdate = function (t) { }),
                                        (p.prototype.cueSplitAtTime = function (t) {
                                            this.outputFilter &&
                                                !this.displayedMemory.isEmpty() &&
                                                (this.outputFilter.newCue &&
                                                    this.outputFilter.newCue(
                                                        this.cueStartTime,
                                                        t,
                                                        this.displayedMemory,
                                                    ),
                                                    (this.cueStartTime = t))
                                        }),
                                        p)
                            function p(t, e) {
                                ; (this.chNr = t),
                                    (this.outputFilter = e),
                                    (this.mode = null),
                                    (this.verbose = 0),
                                    (this.displayedMemory = new f()),
                                    (this.nonDisplayedMemory = new f()),
                                    (this.lastOutputScreen = new f()),
                                    (this.currRollUpRow = this.displayedMemory.rows[14]),
                                    (this.writeScreen = this.displayedMemory),
                                    (this.cueStartTime = this.mode = null)
                            }
                            function g() {
                                this.rows = []
                                for (var t = 0; t < 15; t++) this.rows.push(new c())
                                    ; (this.currRow = 14), (this.nrRollUpRows = null), this.reset()
                            }
                            function y() {
                                this.chars = []
                                for (var t = 0; t < 100; t++) this.chars.push(new d())
                                    ; (this.pos = 0), (this.currPenState = new u())
                            }
                            function m(t, e, r, i, n, a) {
                                ; (this.uchar = t || ' '), (this.penState = new u(e, r, i, n, a))
                            }
                            function v(t, e, r, i, n) {
                                ; (this.foreground = t || 'white'),
                                    (this.underline = e || !1),
                                    (this.italics = r || !1),
                                    (this.background = i || 'black'),
                                    (this.flash = n || !1)
                            }
                            function _(t, e, r) {
                                ; (this.field = t || 1),
                                    (this.outputs = [e, r]),
                                    (this.channels = [new h(1, e), new h(2, r)]),
                                    (this.currChNr = -1),
                                    (this.lastCmdB = this.lastCmdA = null),
                                    (this.bufferedData = []),
                                    (this.lastTime = this.startTime = null),
                                    (this.dataCounters = {
                                        padding: 0,
                                        char: 0,
                                        cmd: 0,
                                        other: 0,
                                    })
                            }
                            ; (_.prototype.getHandler = function (t) {
                                return this.channels[t].getHandler()
                            }),
                                (_.prototype.setHandler = function (t, e) {
                                    this.channels[t].setHandler(e)
                                }),
                                (_.prototype.addData = function (t, e) {
                                    var r = !1
                                    this.lastTime = t
                                    for (var i = 0; i < e.length; i += 2) {
                                        var n = 127 & e[i],
                                            a = 127 & e[i + 1]
                                        0 == n && 0 == a
                                            ? (this.dataCounters.padding += 2)
                                            : ((t =
                                                (t =
                                                    (t = !(t = this.parseCmd(n, a))
                                                        ? this.parseMidrow(n, a)
                                                        : t) || this.parsePAC(n, a)) ||
                                                this.parseBackgroundAttributes(n, a)) ||
                                                ((r = this.parseChars(n, a)) &&
                                                    this.currChNr &&
                                                    0 <= this.currChNr &&
                                                    this.channels[this.currChNr - 1].insertChars(r)),
                                                t
                                                    ? (this.dataCounters.cmd += 2)
                                                    : r
                                                        ? (this.dataCounters.char += 2)
                                                        : (this.dataCounters.other += 2))
                                    }
                                }),
                                (_.prototype.parseCmd = function (t, e) {
                                    if (
                                        !(
                                            ((20 === t || 28 === t) && 32 <= e && e <= 47) ||
                                            ((23 === t || 31 === t) && 33 <= e && e <= 35)
                                        )
                                    )
                                        return !1
                                    if (t === this.lastCmdA && e === this.lastCmdB)
                                        return !(this.lastCmdB = this.lastCmdA = null)
                                    var r = 20 === t || 23 === t ? 1 : 2,
                                        i = this.channels[r - 1]
                                    return (
                                        20 === t || 28 === t
                                            ? 32 === e
                                                ? i.ccRCL()
                                                : 33 === e
                                                    ? i.ccBS()
                                                    : 34 === e
                                                        ? i.ccAOF()
                                                        : 35 === e
                                                            ? i.ccAON()
                                                            : 36 === e
                                                                ? i.ccDER()
                                                                : 37 === e
                                                                    ? i.ccRU(2)
                                                                    : 38 === e
                                                                        ? i.ccRU(3)
                                                                        : 39 === e
                                                                            ? i.ccRU(4)
                                                                            : 40 === e
                                                                                ? i.ccFON()
                                                                                : 41 === e
                                                                                    ? i.ccRDC()
                                                                                    : 42 === e
                                                                                        ? i.ccTR()
                                                                                        : 43 === e
                                                                                            ? i.ccRTD()
                                                                                            : 44 === e
                                                                                                ? i.ccEDM()
                                                                                                : 45 === e
                                                                                                    ? i.ccCR()
                                                                                                    : 46 === e
                                                                                                        ? i.ccENM()
                                                                                                        : 47 === e && i.ccEOC()
                                            : i.ccTO(e - 32),
                                        (this.lastCmdA = t),
                                        (this.lastCmdB = e),
                                        (this.currChNr = r),
                                        !0
                                    )
                                }),
                                (_.prototype.parseMidrow = function (t, e) {
                                    return (
                                        (17 === t || 25 === t) &&
                                        32 <= e &&
                                        e <= 47 &&
                                        (t = 17 === t ? 1 : 2) === this.currChNr &&
                                        (this.channels[t - 1].ccMIDROW(e), !0)
                                    )
                                }),
                                (_.prototype.parsePAC = function (t, e) {
                                    if (
                                        !(
                                            (((17 <= t && t <= 23) || (25 <= t && t <= 31)) &&
                                                64 <= e &&
                                                e <= 127) ||
                                            ((16 === t || 24 === t) && 64 <= e && e <= 95)
                                        )
                                    )
                                        return !1
                                    if (t === this.lastCmdA && e === this.lastCmdB)
                                        return !(this.lastCmdB = this.lastCmdA = null)
                                    var r = t <= 23 ? 1 : 2,
                                        i = this.interpretPAC(
                                            (64 <= e && e <= 95 ? (1 == r ? n : s) : 1 == r ? a : o)[
                                            t
                                            ],
                                            e,
                                        )
                                    return (
                                        this.channels[r - 1].setPAC(i),
                                        (this.lastCmdA = t),
                                        (this.lastCmdB = e),
                                        (this.currChNr = r),
                                        !0
                                    )
                                }),
                                (_.prototype.interpretPAC = function (t, e) {
                                    return (
                                        ((t = {
                                            color: null,
                                            italics: !1,
                                            indent: null,
                                            underline: !1,
                                            row: t,
                                        }).underline = 1 == (1 & (e = 95 < e ? e - 96 : e - 64))),
                                        e <= 13
                                            ? (t.color = 'white green blue cyan red yellow magenta white'.split(
                                                ' ',
                                            )[Math.floor(e / 2)])
                                            : e <= 15
                                                ? ((t.italics = !0), (t.color = 'white'))
                                                : (t.indent = 4 * Math.floor((e - 16) / 2)),
                                        t
                                    )
                                }),
                                (_.prototype.parseChars = function (t, e) {
                                    var r = null,
                                        i = 25 <= t ? t - 8 : t
                                    if (
                                        (17 <= i && i <= 19
                                            ? (r = [17 === i ? e + 80 : 18 === i ? e + 112 : e + 144])
                                            : 32 <= t && t <= 127 && (r = 0 === e ? [t] : [t, e]),
                                            r)
                                    ) {
                                        for (t = r, e = [], i = 0; i < t.length; i++)
                                            e.push(t[i].toString(16))
                                        this.lastCmdB = this.lastCmdA = null
                                    }
                                    return r
                                }),
                                (_.prototype.parseBackgroundAttributes = function (t, e) {
                                    if (
                                        !(
                                            ((16 === t || 24 === t) && 32 <= e && e <= 47) ||
                                            ((23 === t || 31 === t) && 45 <= e && e <= 47)
                                        )
                                    )
                                        return !1
                                    var r,
                                        i = {}
                                    return (
                                        16 === t || 24 === t
                                            ? ((r = Math.floor((e - 32) / 2)),
                                                (i.background = l[r]),
                                                1 == e % 2 && (i.background += '_semi'))
                                            : 45 === e
                                                ? (i.background = 'transparent')
                                                : ((i.foreground = 'black'),
                                                    47 === e && (i.underline = !0)),
                                        this.channels[(t < 24 ? 1 : 2) - 1].setBkgData(i),
                                        !(this.lastCmdB = this.lastCmdA = null)
                                    )
                                }),
                                (_.prototype.reset = function () {
                                    for (var t = 0; t < this.channels.length; t++)
                                        this.channels[t] && this.channels[t].reset()
                                    this.lastCmdB = this.lastCmdA = null
                                }),
                                (_.prototype.cueSplitAtTime = function (t) {
                                    for (var e = 0; e < this.channels.length; e++)
                                        this.channels[e] && this.channels[e].cueSplitAtTime(t)
                                }),
                                (e.default = _)
                        },
                        './src/utils/codecs.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var i = {
                                audio: {
                                    a3ds: !0,
                                    'ac-3': !0,
                                    'ac-4': !0,
                                    alac: !0,
                                    alaw: !0,
                                    dra1: !0,
                                    'dts+': !0,
                                    'dts-': !0,
                                    dtsc: !0,
                                    dtse: !0,
                                    dtsh: !0,
                                    'ec-3': !0,
                                    enca: !0,
                                    g719: !0,
                                    g726: !0,
                                    m4ae: !0,
                                    mha1: !0,
                                    mha2: !0,
                                    mhm1: !0,
                                    mhm2: !0,
                                    mlpa: !0,
                                    mp4a: !0,
                                    'raw ': !0,
                                    Opus: !0,
                                    samr: !0,
                                    sawb: !0,
                                    sawp: !0,
                                    sevc: !0,
                                    sqcp: !0,
                                    ssmv: !0,
                                    twos: !0,
                                    ulaw: !0,
                                },
                                video: {
                                    avc1: !0,
                                    avc2: !0,
                                    avc3: !0,
                                    avc4: !0,
                                    avcp: !0,
                                    drac: !0,
                                    dvav: !0,
                                    dvhe: !0,
                                    encv: !0,
                                    hev1: !0,
                                    hvc1: !0,
                                    mjp2: !0,
                                    mp4v: !0,
                                    mvc1: !0,
                                    mvc2: !0,
                                    mvc3: !0,
                                    mvc4: !0,
                                    resv: !0,
                                    rv60: !0,
                                    s263: !0,
                                    svc1: !0,
                                    svc2: !0,
                                    'vc-1': !0,
                                    vp08: !0,
                                    vp09: !0,
                                },
                            }
                                ; (e.isCodecType = function (t, e) {
                                    return !!(e = i[e]) && !0 === e[t.slice(0, 4)]
                                }),
                                    (e.isCodecSupportedInMp4 = function (t, e) {
                                        return window.MediaSource.isTypeSupported(
                                            (e || 'video') + '/mp4;codecs="' + t + '"',
                                        )
                                    })
                        },
                        './src/utils/cues.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var c = r('./src/utils/vttparser.js')
                            e.newCue = function (t, e, r, i) {
                                for (
                                    var n,
                                    a,
                                    s,
                                    o,
                                    l = window.VTTCue || window.TextTrackCue,
                                    u = 0;
                                    u < i.rows.length;
                                    u++
                                )
                                    if (
                                        ((a = !0), (s = 0), (o = ''), !(n = i.rows[u]).isEmpty())
                                    ) {
                                        for (var d = 0; d < n.chars.length; d++)
                                            n.chars[d].uchar.match(/\s/) && a
                                                ? s++
                                                : ((o += n.chars[d].uchar), (a = !1))
                                                ; (n.cueStartTime = e) === r && (r += 1e-4),
                                                    (n = new l(e, r, c.fixLineBreaks(o.trim()))),
                                                    16 <= s ? s-- : s++,
                                                    navigator.userAgent.match(/Firefox\//)
                                                        ? (n.line = u + 1)
                                                        : (n.line = 7 < u ? u - 2 : u + 1),
                                                    (n.align = 'left'),
                                                    (n.position = Math.max(
                                                        0,
                                                        Math.min(
                                                            100,
                                                            (s / 32) * 100 +
                                                            (navigator.userAgent.match(/Firefox\//) ? 50 : 0),
                                                        ),
                                                    )),
                                                    t.addCue(n)
                                    }
                            }
                        },
                        './src/utils/discontinuities.js': function (t, e, d) {
                            !function (r) {
                                function i(t, e) {
                                    for (var r = null, i = 0; i < t.length; i += 1) {
                                        var n = t[i]
                                        if (n && n.cc === e) {
                                            r = n
                                            break
                                        }
                                    }
                                    return r
                                }
                                function n(t, e, r) {
                                    var i = !1
                                    return (i =
                                        e &&
                                            e.details &&
                                            r &&
                                            (r.endCC > r.startCC || (t && t.cc < r.startCC))
                                            ? !0
                                            : i)
                                }
                                function a(t, e) {
                                    if (
                                        ((t = t.fragments),
                                            (e = e.fragments).length &&
                                            t.length &&
                                            (e = i(t, e[0].cc)) &&
                                            (!e || e.startPTS))
                                    )
                                        return e
                                }
                                function s(r, t) {
                                    t.fragments.forEach(function (t) {
                                        var e
                                        t &&
                                            ((e = t.start + r),
                                                (t.start = t.startPTS = e),
                                                (t.endPTS = e + t.duration))
                                    }),
                                        (t.PTSKnown = !0)
                                }
                                function o(t, e, r) {
                                    n(t, r, e) && (t = a(r.details, e)) && s(t.start, e)
                                }
                                function l(t, e) {
                                    e &&
                                        e.fragments.length &&
                                        t.hasProgramDateTime &&
                                        e.hasProgramDateTime &&
                                        ((e =
                                            (t.fragments[0].programDateTime -
                                                e.fragments[0].programDateTime) /
                                            1e3 +
                                            e.fragments[0].start),
                                            r.isFinite(e) && s(e, t))
                                }
                                Object.defineProperty(e, '__esModule', { value: !0 })
                                var u = d('./src/utils/binary-search.js')
                                d('./src/utils/logger.js'),
                                    (e.findFirstFragWithCC = i),
                                    (e.findFragWithCC = function (t, e) {
                                        return u.default.search(t, function (t) {
                                            return t.cc < e ? 1 : t.cc > e ? -1 : 0
                                        })
                                    }),
                                    (e.shouldAlignOnDiscontinuities = n),
                                    (e.findDiscontinuousReferenceFrag = a),
                                    (e.adjustPts = s),
                                    (e.alignStream = function (t, e, r) {
                                        o(t, r, e), !r.PTSKnown && e && l(r, e.details)
                                    }),
                                    (e.alignDiscontinuities = o),
                                    (e.alignPDT = l)
                            }.call(this, d('./src/polyfills/number.js').Number)
                        },
                        './src/utils/ewma-bandwidth-estimator.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            var n = r('./src/utils/ewma.js')
                            function i(t, e, r, i) {
                                ; (this.hls = t),
                                    (this.defaultEstimate_ = i),
                                    (this.minWeight_ = 0.001),
                                    (this.minDelayMs_ = 50),
                                    (this.slow_ = new n.default(e)),
                                    (this.fast_ = new n.default(r))
                            }
                            ; (i.prototype.sample = function (t, e) {
                                ; (e = (8e3 * e) / (t = Math.max(t, this.minDelayMs_))),
                                    (t /= 1e3),
                                    this.fast_.sample(t, e),
                                    this.slow_.sample(t, e)
                            }),
                                (i.prototype.canEstimate = function () {
                                    var t = this.fast_
                                    return t && t.getTotalWeight() >= this.minWeight_
                                }),
                                (i.prototype.getEstimate = function () {
                                    return this.canEstimate()
                                        ? Math.min(
                                            this.fast_.getEstimate(),
                                            this.slow_.getEstimate(),
                                        )
                                        : this.defaultEstimate_
                                }),
                                (i.prototype.destroy = function () { }),
                                (e.default = i)
                        },
                        './src/utils/ewma.js': function (t, e, r) {
                            function i(t) {
                                ; (this.alpha_ = t ? Math.exp(Math.log(0.5) / t) : 0),
                                    (this.totalWeight_ = this.estimate_ = 0)
                            }
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (i.prototype.sample = function (t, e) {
                                    var r = Math.pow(this.alpha_, t)
                                        ; (this.estimate_ = e * (1 - r) + r * this.estimate_),
                                            (this.totalWeight_ += t)
                                }),
                                (i.prototype.getTotalWeight = function () {
                                    return this.totalWeight_
                                }),
                                (i.prototype.getEstimate = function () {
                                    return this.alpha_
                                        ? this.estimate_ /
                                        (1 - Math.pow(this.alpha_, this.totalWeight_))
                                        : this.estimate_
                                }),
                                (e.default = i)
                        },
                        './src/utils/get-self-scope.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (e.getSelfScope = function () {
                                    return 'undefined' == typeof window ? self : window
                                })
                        },
                        './src/utils/logger.js': function (t, e, r) {
                            function n() { }
                            function i(e) {
                                for (var t = [], r = 1; r < arguments.length; r++)
                                    t[r - 1] = arguments[r]
                                t.forEach(function (t) {
                                    var r, i
                                    s[t] = e[t]
                                        ? e[t].bind(e)
                                        : ((r = t),
                                            (i = o.console[r])
                                                ? function () {
                                                    for (var t = [], e = 0; e < arguments.length; e++)
                                                        t[e] = arguments[e]
                                                    t[0] && (t[0] = '[' + r + '] > ' + t[0]),
                                                        i.apply(o.console, t)
                                                }
                                                : n)
                                })
                            }
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (t = r('./src/utils/get-self-scope.js'))
                            var a = {
                                trace: n,
                                debug: n,
                                log: n,
                                warn: n,
                                info: n,
                                error: n,
                            },
                                s = a,
                                o = t.getSelfScope()
                                ; (e.enableLogs = function (t) {
                                    if (!0 === t || 'object' == typeof t) {
                                        i(t, 'debug', 'log', 'info', 'warn', 'error')
                                        try {
                                            s.log()
                                        } catch (t) {
                                            s = a
                                        }
                                    } else s = a
                                }),
                                    (e.logger = s)
                        },
                        './src/utils/mediakeys-helper.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (t =
                                    'undefined' != typeof window &&
                                        window.navigator &&
                                        window.navigator.requestMediaKeySystemAccess
                                        ? window.navigator.requestMediaKeySystemAccess.bind(
                                            window.navigator,
                                        )
                                        : null),
                                (e.requestMediaKeySystemAccess = t)
                        },
                        './src/utils/mediasource-helper.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (e.getMediaSource = function () {
                                    if ('undefined' != typeof window)
                                        return window.MediaSource || window.WebKitMediaSource
                                })
                        },
                        './src/utils/output-filter.js': function (t, e, r) {
                            function i(t, e) {
                                ; (this.timelineController = t),
                                    (this.trackName = e),
                                    (this.screen = this.endTime = this.startTime = null)
                            }
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (i.prototype.dispatchCue = function () {
                                    null !== this.startTime &&
                                        (this.timelineController.addCues(
                                            this.trackName,
                                            this.startTime,
                                            this.endTime,
                                            this.screen,
                                        ),
                                            (this.startTime = null))
                                }),
                                (i.prototype.newCue = function (t, e, r) {
                                    ; (null === this.startTime || this.startTime > t) &&
                                        (this.startTime = t),
                                        (this.endTime = e),
                                        (this.screen = r),
                                        this.timelineController.createCaptionsTrack(this.trackName)
                                }),
                                (e.default = i)
                        },
                        './src/utils/texttrack-utils.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (e.sendAddTrackEvent = function (t, e) {
                                    var r = null
                                    try {
                                        r = new window.Event('addtrack')
                                    } catch (t) {
                                        ; (r = document.createEvent('Event')).initEvent(
                                            'addtrack',
                                            !1,
                                            !1,
                                        )
                                    }
                                    ; (r.track = t), e.dispatchEvent(r)
                                }),
                                (e.clearCurrentCues = function (t) {
                                    if (t && t.cues)
                                        for (; 0 < t.cues.length;) t.removeCue(t.cues[0])
                                })
                        },
                        './src/utils/time-ranges.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (e.default = {
                                    toString: function (t) {
                                        for (var e = '', r = t.length, i = 0; i < r; i++)
                                            e +=
                                                '[' +
                                                t.start(i).toFixed(3) +
                                                ',' +
                                                t.end(i).toFixed(3) +
                                                ']'
                                        return e
                                    },
                                })
                        },
                        './src/utils/vttcue.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                (e.default = (function () {
                                    function E(t) {
                                        return (
                                            'string' == typeof t &&
                                            !!e[t.toLowerCase()] &&
                                            t.toLowerCase()
                                        )
                                    }
                                    function T(t) {
                                        for (var e = 1; e < arguments.length; e++) {
                                            var r,
                                                i = arguments[e]
                                            for (r in i) t[r] = i[r]
                                        }
                                        return t
                                    }
                                    function t(t, e, r) {
                                        var i = this,
                                            n =
                                                'undefined' == typeof navigator
                                                    ? void 0
                                                    : /MSIE\s8\.0/.test(navigator.userAgent),
                                            a = {}
                                        n
                                            ? (i = document.createElement('custom'))
                                            : (a.enumerable = !0),
                                            (i.hasBeenReset = !1)
                                        var s = '',
                                            o = !1,
                                            l = t,
                                            u = e,
                                            d = r,
                                            c = null,
                                            f = '',
                                            h = !0,
                                            p = 'auto',
                                            g = 'start',
                                            y = 50,
                                            m = 'middle',
                                            v = 50,
                                            _ = 'middle'
                                        if (
                                            (Object.defineProperty(
                                                i,
                                                'id',
                                                T({}, a, {
                                                    get: function () {
                                                        return s
                                                    },
                                                    set: function (t) {
                                                        s = '' + t
                                                    },
                                                }),
                                            ),
                                                Object.defineProperty(
                                                    i,
                                                    'pauseOnExit',
                                                    T({}, a, {
                                                        get: function () {
                                                            return o
                                                        },
                                                        set: function (t) {
                                                            o = !!t
                                                        },
                                                    }),
                                                ),
                                                Object.defineProperty(
                                                    i,
                                                    'startTime',
                                                    T({}, a, {
                                                        get: function () {
                                                            return l
                                                        },
                                                        set: function (t) {
                                                            if ('number' != typeof t)
                                                                throw new TypeError(
                                                                    'Start time must be set to a number.',
                                                                )
                                                                ; (l = t), (this.hasBeenReset = !0)
                                                        },
                                                    }),
                                                ),
                                                Object.defineProperty(
                                                    i,
                                                    'endTime',
                                                    T({}, a, {
                                                        get: function () {
                                                            return u
                                                        },
                                                        set: function (t) {
                                                            if ('number' != typeof t)
                                                                throw new TypeError(
                                                                    'End time must be set to a number.',
                                                                )
                                                                ; (u = t), (this.hasBeenReset = !0)
                                                        },
                                                    }),
                                                ),
                                                Object.defineProperty(
                                                    i,
                                                    'text',
                                                    T({}, a, {
                                                        get: function () {
                                                            return d
                                                        },
                                                        set: function (t) {
                                                            ; (d = '' + t), (this.hasBeenReset = !0)
                                                        },
                                                    }),
                                                ),
                                                Object.defineProperty(
                                                    i,
                                                    'region',
                                                    T({}, a, {
                                                        get: function () {
                                                            return c
                                                        },
                                                        set: function (t) {
                                                            ; (c = t), (this.hasBeenReset = !0)
                                                        },
                                                    }),
                                                ),
                                                Object.defineProperty(
                                                    i,
                                                    'vertical',
                                                    T({}, a, {
                                                        get: function () {
                                                            return f
                                                        },
                                                        set: function (t) {
                                                            if (
                                                                !1 ===
                                                                (t =
                                                                    'string' == typeof t &&
                                                                    !!S[t.toLowerCase()] &&
                                                                    t.toLowerCase())
                                                            )
                                                                throw new SyntaxError(
                                                                    'An invalid or illegal string was specified.',
                                                                )
                                                                ; (f = t), (this.hasBeenReset = !0)
                                                        },
                                                    }),
                                                ),
                                                Object.defineProperty(
                                                    i,
                                                    'snapToLines',
                                                    T({}, a, {
                                                        get: function () {
                                                            return h
                                                        },
                                                        set: function (t) {
                                                            ; (h = !!t), (this.hasBeenReset = !0)
                                                        },
                                                    }),
                                                ),
                                                Object.defineProperty(
                                                    i,
                                                    'line',
                                                    T({}, a, {
                                                        get: function () {
                                                            return p
                                                        },
                                                        set: function (t) {
                                                            if ('number' != typeof t && 'auto' !== t)
                                                                throw new SyntaxError(
                                                                    'An invalid number or illegal string was specified.',
                                                                )
                                                                ; (p = t), (this.hasBeenReset = !0)
                                                        },
                                                    }),
                                                ),
                                                Object.defineProperty(
                                                    i,
                                                    'lineAlign',
                                                    T({}, a, {
                                                        get: function () {
                                                            return g
                                                        },
                                                        set: function (t) {
                                                            if (!(t = E(t)))
                                                                throw new SyntaxError(
                                                                    'An invalid or illegal string was specified.',
                                                                )
                                                                ; (g = t), (this.hasBeenReset = !0)
                                                        },
                                                    }),
                                                ),
                                                Object.defineProperty(
                                                    i,
                                                    'position',
                                                    T({}, a, {
                                                        get: function () {
                                                            return y
                                                        },
                                                        set: function (t) {
                                                            if (t < 0 || 100 < t)
                                                                throw Error('Position must be between 0 and 100.')
                                                                ; (y = t), (this.hasBeenReset = !0)
                                                        },
                                                    }),
                                                ),
                                                Object.defineProperty(
                                                    i,
                                                    'positionAlign',
                                                    T({}, a, {
                                                        get: function () {
                                                            return m
                                                        },
                                                        set: function (t) {
                                                            if (!(t = E(t)))
                                                                throw new SyntaxError(
                                                                    'An invalid or illegal string was specified.',
                                                                )
                                                                ; (m = t), (this.hasBeenReset = !0)
                                                        },
                                                    }),
                                                ),
                                                Object.defineProperty(
                                                    i,
                                                    'size',
                                                    T({}, a, {
                                                        get: function () {
                                                            return v
                                                        },
                                                        set: function (t) {
                                                            if (t < 0 || 100 < t)
                                                                throw Error('Size must be between 0 and 100.')
                                                                ; (v = t), (this.hasBeenReset = !0)
                                                        },
                                                    }),
                                                ),
                                                Object.defineProperty(
                                                    i,
                                                    'align',
                                                    T({}, a, {
                                                        get: function () {
                                                            return _
                                                        },
                                                        set: function (t) {
                                                            if (!(t = E(t)))
                                                                throw new SyntaxError(
                                                                    'An invalid or illegal string was specified.',
                                                                )
                                                                ; (_ = t), (this.hasBeenReset = !0)
                                                        },
                                                    }),
                                                ),
                                                (i.displayState = void 0),
                                                n)
                                        )
                                            return i
                                    }
                                    if ('undefined' != typeof window && window.VTTCue)
                                        return window.VTTCue
                                    var S = { '': !0, lr: !0, rl: !0 },
                                        e = { start: !0, middle: !0, end: !0, left: !0, right: !0 }
                                    return (
                                        (t.prototype.getCueAsHTML = function () {
                                            return window.WebVTT.convertCueToDOMTree(
                                                window,
                                                this.text,
                                            )
                                        }),
                                        t
                                    )
                                })())
                        },
                        './src/utils/vttparser.js': function (t, e, r) {
                            function i() {
                                ; (this.window = window),
                                    (this.state = 'INITIAL'),
                                    (this.buffer = ''),
                                    (this.decoder = new n()),
                                    (this.regionList = [])
                            }
                            function l() {
                                this.values = Object.create(null)
                            }
                            function u(t, e, r, i) {
                                for (var n in (t = i ? t.split(i) : [t]))
                                    'string' == typeof t[n] &&
                                        ((i = t[n].split(r)), 2 === i.length && e(i[0], i[1]))
                            }
                            function a(t) {
                                return t.replace(/<br(?: \/)?>/gi, '\n')
                            }
                            Object.defineProperty(e, '__esModule', { value: !0 })
                            function n() {
                                return {
                                    decode: function (t) {
                                        if (!t) return ''
                                        if ('string' != typeof t)
                                            throw Error('Error - expected string data.')
                                        return decodeURIComponent(encodeURIComponent(t))
                                    },
                                }
                            }
                            var s = r('./src/utils/vttcue.js')
                            l.prototype = {
                                set: function (t, e) {
                                    this.get(t) || '' === e || (this.values[t] = e)
                                },
                                get: function (t, e, r) {
                                    return r
                                        ? this.has(t)
                                            ? this.values[t]
                                            : e[r]
                                        : this.has(t)
                                            ? this.values[t]
                                            : e
                                },
                                has: function (t) {
                                    return t in this.values
                                },
                                alt: function (t, e, r) {
                                    for (var i = 0; i < r.length; ++i)
                                        if (e === r[i]) {
                                            this.set(t, e)
                                            break
                                        }
                                },
                                integer: function (t, e) {
                                    ; /^-?\d+$/.test(e) && this.set(t, parseInt(e, 10))
                                },
                                percent: function (t, e) {
                                    return (
                                        !!(
                                            e.match(/^([\d]{1,3})(\.[\d]*)?%$/) &&
                                            0 <= (e = parseFloat(e)) &&
                                            e <= 100
                                        ) && (this.set(t, e), !0)
                                    )
                                },
                            }
                            var d = new s.default(0, 0, 0),
                                c = 'middle' === d.align ? 'middle' : 'center'
                                ; (e.fixLineBreaks = a),
                                    (i.prototype = {
                                        parse: function (t) {
                                            function e() {
                                                for (
                                                    var t = 0, e = a((e = i.buffer));
                                                    t < e.length && '\r' !== e[t] && '\n' !== e[t];

                                                )
                                                    ++t
                                                var r = e.substr(0, t)
                                                return (
                                                    '\r' === e[t] && ++t,
                                                    '\n' === e[t] && ++t,
                                                    (i.buffer = e.substr(t)),
                                                    r
                                                )
                                            }
                                            var i = this
                                            t && (i.buffer += i.decoder.decode(t, { stream: !0 }))
                                            try {
                                                if (((t = void 0), 'INITIAL' === i.state)) {
                                                    if (!/\r\n|\n/.test(i.buffer)) return this
                                                    var r = (t = e()).match(
                                                        /^(\u00ef\u00bb\u00bf)?WEBVTT([ \t].*)?$/,
                                                    )
                                                    if (!r || !r[0])
                                                        throw Error('Malformed WebVTT signature.')
                                                    i.state = 'HEADER'
                                                }
                                                for (r = !1; i.buffer;) {
                                                    if (!/\r\n|\n/.test(i.buffer)) return this
                                                    switch ((r ? (r = !1) : (t = e()), i.state)) {
                                                        case 'HEADER':
                                                            ; /:/.test(t)
                                                                ? u(t, function (t, e) { }, /:/)
                                                                : t || (i.state = 'ID')
                                                            continue
                                                        case 'NOTE':
                                                            t || (i.state = 'ID')
                                                            continue
                                                        case 'ID':
                                                            if (/^NOTE($|[ \t])/.test(t)) {
                                                                i.state = 'NOTE'
                                                                break
                                                            }
                                                            if (!t) continue
                                                            if (
                                                                ((i.cue = new s.default(0, 0, '')),
                                                                    (i.state = 'CUE'),
                                                                    -1 === t.indexOf('--\x3e'))
                                                            ) {
                                                                i.cue.id = t
                                                                continue
                                                            }
                                                        case 'CUE':
                                                            try {
                                                                !(function (r, t, i) {
                                                                    function e() {
                                                                        var t, e
                                                                        if (
                                                                            null ===
                                                                            (e = (e = r.match(
                                                                                /^(\d+):(\d{2})(:\d{2})?\.(\d{3})/,
                                                                            ))
                                                                                ? e[3]
                                                                                    ? ((t = e[3].replace(':', '')),
                                                                                        3600 * (0 | e[1]) +
                                                                                        60 * (0 | e[2]) +
                                                                                        (0 | t) +
                                                                                        (0 | e[4]) / 1e3)
                                                                                    : 59 < e[1]
                                                                                        ? 3600 * (0 | e[1]) +
                                                                                        60 * (0 | e[2]) +
                                                                                        (0 | e[4]) / 1e3
                                                                                        : 60 * (0 | e[1]) +
                                                                                        (0 | e[2]) +
                                                                                        (0 | e[4]) / 1e3
                                                                                : null)
                                                                        )
                                                                            throw Error('Malformed timestamp: ' + o)
                                                                        return (
                                                                            (r = r.replace(/^[^\sa-zA-Z-]+/, '')), e
                                                                        )
                                                                    }
                                                                    function n() {
                                                                        r = r.replace(/^\s+/, '')
                                                                    }
                                                                    var a,
                                                                        s,
                                                                        o = r
                                                                    if (
                                                                        (n(),
                                                                            (t.startTime = e()),
                                                                            n(),
                                                                            '--\x3e' !== r.substr(0, 3))
                                                                    )
                                                                        throw Error(
                                                                            "Malformed time stamp (time stamps must be separated by '--\x3e'): " +
                                                                            o,
                                                                        )
                                                                        ; (r = r.substr(3)),
                                                                            n(),
                                                                            (t.endTime = e()),
                                                                            n(),
                                                                            (a = r),
                                                                            (t = t),
                                                                            (s = new l()),
                                                                            u(
                                                                                a,
                                                                                function (t, e) {
                                                                                    switch (t) {
                                                                                        case 'region':
                                                                                            for (
                                                                                                var r = i.length - 1;
                                                                                                0 <= r;
                                                                                                r--
                                                                                            )
                                                                                                if (i[r].id === e) {
                                                                                                    s.set(t, i[r].region)
                                                                                                    break
                                                                                                }
                                                                                            break
                                                                                        case 'vertical':
                                                                                            s.alt(t, e, ['rl', 'lr'])
                                                                                            break
                                                                                        case 'line':
                                                                                            ; (r = (e = e.split(','))[0]),
                                                                                                s.integer(t, r),
                                                                                                s.percent(t, r) &&
                                                                                                s.set('snapToLines', !1),
                                                                                                s.alt(t, r, ['auto']),
                                                                                                2 === e.length &&
                                                                                                s.alt('lineAlign', e[1], [
                                                                                                    'start',
                                                                                                    c,
                                                                                                    'end',
                                                                                                ])
                                                                                            break
                                                                                        case 'position':
                                                                                            ; (e = e.split(',')),
                                                                                                s.percent(t, e[0]),
                                                                                                2 === e.length &&
                                                                                                s.alt('positionAlign', e[1], [
                                                                                                    'start',
                                                                                                    c,
                                                                                                    'end',
                                                                                                    'line-left',
                                                                                                    'line-right',
                                                                                                    'auto',
                                                                                                ])
                                                                                            break
                                                                                        case 'size':
                                                                                            s.percent(t, e)
                                                                                            break
                                                                                        case 'align':
                                                                                            s.alt(t, e, [
                                                                                                'start',
                                                                                                c,
                                                                                                'end',
                                                                                                'left',
                                                                                                'right',
                                                                                            ])
                                                                                    }
                                                                                },
                                                                                /:/,
                                                                                /\s/,
                                                                            ),
                                                                            (t.region = s.get('region', null)),
                                                                            (t.vertical = s.get('vertical', '')),
                                                                            'auto' === (a = s.get('line', 'auto')) &&
                                                                            -1 === d.line &&
                                                                            (a = -1),
                                                                            (t.line = a),
                                                                            (t.lineAlign = s.get('lineAlign', 'start')),
                                                                            (t.snapToLines = s.get('snapToLines', !0)),
                                                                            (t.size = s.get('size', 100)),
                                                                            (t.align = s.get('align', c)),
                                                                            'auto' === (a = s.get('position', 'auto')) &&
                                                                            50 === d.position &&
                                                                            (a =
                                                                                'start' === t.align || 'left' === t.align
                                                                                    ? 0
                                                                                    : 'end' === t.align ||
                                                                                        'right' === t.align
                                                                                        ? 100
                                                                                        : 50),
                                                                            (t.position = a)
                                                                })(t, i.cue, i.regionList)
                                                            } catch (t) {
                                                                ; (i.cue = null), (i.state = 'BADCUE')
                                                                continue
                                                            }
                                                            i.state = 'CUETEXT'
                                                            continue
                                                        case 'CUETEXT':
                                                            var n = -1 !== t.indexOf('--\x3e')
                                                            if (!t || (n && (r = !0))) {
                                                                i.oncue && i.oncue(i.cue),
                                                                    (i.cue = null),
                                                                    (i.state = 'ID')
                                                                continue
                                                            }
                                                            i.cue.text && (i.cue.text += '\n'),
                                                                (i.cue.text += t)
                                                            continue
                                                        case 'BADCUE':
                                                            t || (i.state = 'ID')
                                                    }
                                                }
                                            } catch (t) {
                                                'CUETEXT' === i.state &&
                                                    i.cue &&
                                                    i.oncue &&
                                                    i.oncue(i.cue),
                                                    (i.cue = null),
                                                    (i.state =
                                                        'INITIAL' === i.state ? 'BADWEBVTT' : 'BADCUE')
                                            }
                                            return this
                                        },
                                        flush: function () {
                                            try {
                                                if (
                                                    ((this.buffer += this.decoder.decode()),
                                                        (!this.cue && 'HEADER' !== this.state) ||
                                                        ((this.buffer += '\n\n'), this.parse()),
                                                        'INITIAL' === this.state)
                                                )
                                                    throw Error('Malformed WebVTT signature.')
                                            } catch (t) {
                                                throw t
                                            }
                                            return this.onflush && this.onflush(), this
                                        },
                                    }),
                                    (e.default = i)
                        },
                        './src/utils/webvtt-parser.js': function (t, e, r) {
                            !function (y) {
                                Object.defineProperty(e, '__esModule', { value: !0 })
                                function m(t, e, r) {
                                    return t.substr(r || 0, e.length) === e
                                }
                                function v(t) {
                                    for (var e = 5381, r = t.length; r;)
                                        e = (33 * e) ^ t.charCodeAt(--r)
                                    return (e >>> 0).toString()
                                }
                                var i = r('./src/utils/vttparser.js'),
                                    n = r('./src/demux/id3.js')
                                e.default = {
                                    parse: function (t, a, s, o, e, r) {
                                        t = n
                                            .utf8ArrayToStr(new Uint8Array(t))
                                            .trim()
                                            .replace(/\r\n|\n\r|\n|\r/g, '\n')
                                            .split('\n')
                                        var l,
                                            u = '00:00.000',
                                            d = 0,
                                            c = 0,
                                            f = 0,
                                            h = [],
                                            p = !0,
                                            g = new i.default()
                                            ; (g.oncue = function (t) {
                                                var e = s[o],
                                                    r = s.ccOffset
                                                if (e && e.new)
                                                    if (void 0 !== c) r = s.ccOffset = e.start
                                                    else {
                                                        var e = f,
                                                            i = s[o],
                                                            n = s[i.prevCC]
                                                        if (!n || (!n.new && i.new))
                                                            (s.ccOffset = s.presentationOffset = i.start),
                                                                (i.new = !1)
                                                        else {
                                                            for (; n && n.new;)
                                                                (s.ccOffset += i.start - n.start),
                                                                    (i.new = !1),
                                                                    (n = s[(i = n).prevCC])
                                                            s.presentationOffset = e
                                                        }
                                                    }
                                                f && (r = f - s.presentationOffset),
                                                    (t.startTime += r - c),
                                                    (t.endTime += r - c),
                                                    (t.id =
                                                        v(t.startTime.toString()) +
                                                        v(t.endTime.toString()) +
                                                        v(t.text)),
                                                    (t.text = decodeURIComponent(
                                                        encodeURIComponent(t.text),
                                                    )),
                                                    0 < t.endTime && h.push(t)
                                            }),
                                                (g.onparsingerror = function (t) {
                                                    l = t
                                                }),
                                                (g.onflush = function () {
                                                    l && r ? r(l) : e(h)
                                                }),
                                                t.forEach(function (e) {
                                                    if (p) {
                                                        if (m(e, 'X-TIMESTAMP-MAP=')) {
                                                            ; (p = !1),
                                                                e
                                                                    .substr(16)
                                                                    .split(',')
                                                                    .forEach(function (t) {
                                                                        m(t, 'LOCAL:')
                                                                            ? (u = t.substr(6))
                                                                            : m(t, 'MPEGTS:') &&
                                                                            (d = parseInt(t.substr(7)))
                                                                    })
                                                            try {
                                                                a + (9e4 * s[o].start || 0) < 0 &&
                                                                    (a += 8589934592),
                                                                    (d -= a),
                                                                    (t = u),
                                                                    (r = parseInt(t.substr(-3))),
                                                                    (i = parseInt(t.substr(-6, 2))),
                                                                    (n = parseInt(t.substr(-9, 2))),
                                                                    (t =
                                                                        9 < t.length
                                                                            ? parseInt(t.substr(0, t.indexOf(':')))
                                                                            : 0),
                                                                    (c =
                                                                        (y.isFinite(r) &&
                                                                            y.isFinite(i) &&
                                                                            y.isFinite(n) &&
                                                                            y.isFinite(t)
                                                                            ? r + 1e3 * i + 6e4 * n + 36e5 * t
                                                                            : -1) / 1e3),
                                                                    (f = d / 9e4),
                                                                    -1 === c &&
                                                                    (l = Error('Malformed X-TIMESTAMP-MAP: ' + e))
                                                            } catch (t) {
                                                                l = Error('Malformed X-TIMESTAMP-MAP: ' + e)
                                                            }
                                                            return
                                                        }
                                                        '' === e && (p = !1)
                                                    }
                                                    var t, r, i, n
                                                    g.parse(e + '\n')
                                                }),
                                                g.flush()
                                    },
                                }
                            }.call(this, r('./src/polyfills/number.js').Number)
                        },
                        './src/utils/xhr-loader.js': function (t, e, r) {
                            Object.defineProperty(e, '__esModule', { value: !0 }),
                                r('./src/utils/logger.js')
                            var a = window.performance,
                                n = window.XMLHttpRequest
                            function i(t) {
                                t && t.xhrSetup && (this.xhrSetup = t.xhrSetup)
                            }
                            ; (i.prototype.destroy = function () {
                                this.abort(), (this.loader = null)
                            }),
                                (i.prototype.abort = function () {
                                    var t = this.loader
                                    t &&
                                        4 !== t.readyState &&
                                        ((this.stats.aborted = !0), t.abort()),
                                        window.clearTimeout(this.requestTimeout),
                                        (this.requestTimeout = null),
                                        window.clearTimeout(this.retryTimeout),
                                        (this.retryTimeout = null)
                                }),
                                (i.prototype.load = function (t, e, r) {
                                    ; (this.context = t),
                                        (this.config = e),
                                        (this.callbacks = r),
                                        (this.stats = { trequest: a.now(), retry: 0 }),
                                        (this.retryDelay = e.retryDelay),
                                        this.loadInternal()
                                }),
                                (i.prototype.loadInternal = function () {
                                    var e = this.context,
                                        r = (this.loader = new n()),
                                        i = this.stats
                                        ; (i.tfirst = 0), (i.loaded = 0), (i = this.xhrSetup)
                                    try {
                                        if (i)
                                            try {
                                                i(r, e.url)
                                            } catch (t) {
                                                r.open('GET', e.url, !0), i(r, e.url)
                                            }
                                        r.readyState || r.open('GET', e.url, !0)
                                    } catch (t) {
                                        return void this.callbacks.onError(
                                            { code: r.status, text: t.message },
                                            e,
                                            r,
                                        )
                                    }
                                    e.rangeEnd &&
                                        r.setRequestHeader(
                                            'Range',
                                            'bytes=' + e.rangeStart + '-' + (e.rangeEnd - 1),
                                        ),
                                        (r.onreadystatechange = this.readystatechange.bind(this)),
                                        (r.onprogress = this.loadprogress.bind(this)),
                                        (r.responseType = e.responseType),
                                        (this.requestTimeout = window.setTimeout(
                                            this.loadtimeout.bind(this),
                                            this.config.timeout,
                                        )),
                                        r.send()
                                }),
                                (i.prototype.readystatechange = function (t) {
                                    var e = (t = t.currentTarget).readyState,
                                        r = this.stats,
                                        i = this.context,
                                        n = this.config
                                    !r.aborted &&
                                        2 <= e &&
                                        (window.clearTimeout(this.requestTimeout),
                                            0 === r.tfirst &&
                                            (r.tfirst = Math.max(a.now(), r.trequest)),
                                            4 === e
                                                ? 200 <= (e = t.status) && e < 300
                                                    ? ((r.tload = Math.max(r.tfirst, a.now())),
                                                        (e =
                                                            'arraybuffer' === i.responseType
                                                                ? (n = t.response).byteLength
                                                                : (n = t.responseText).length),
                                                        (r.loaded = r.total = e),
                                                        this.callbacks.onSuccess(
                                                            { url: t.responseURL, data: n },
                                                            r,
                                                            i,
                                                            t,
                                                        ))
                                                    : r.retry >= n.maxRetry || (400 <= e && e < 499)
                                                        ? this.callbacks.onError(
                                                            { code: e, text: t.statusText },
                                                            i,
                                                            t,
                                                        )
                                                        : (this.destroy(),
                                                            (this.retryTimeout = window.setTimeout(
                                                                this.loadInternal.bind(this),
                                                                this.retryDelay,
                                                            )),
                                                            (this.retryDelay = Math.min(
                                                                2 * this.retryDelay,
                                                                n.maxRetryDelay,
                                                            )),
                                                            r.retry++)
                                                : (this.requestTimeout = window.setTimeout(
                                                    this.loadtimeout.bind(this),
                                                    n.timeout,
                                                )))
                                }),
                                (i.prototype.loadtimeout = function () {
                                    this.callbacks.onTimeout(this.stats, this.context, null)
                                }),
                                (i.prototype.loadprogress = function (t) {
                                    var e = t.currentTarget,
                                        r = this.stats
                                        ; (r.loaded = t.loaded),
                                            t.lengthComputable && (r.total = t.total),
                                            (t = this.callbacks.onProgress) &&
                                            t(r, this.context, null, e)
                                }),
                                (e.default = i)
                        },
                    }).default)
        }.call(this, r(3))
    },
    function (t, e) {
        var r = (function () {
            return this
        })()
        try {
            r = r || new Function('return this')()
        } catch (t) {
            'object' == typeof window && (r = window)
        }
        t.exports = r
    },
])
