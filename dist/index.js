"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _components = _interopRequireDefault(require("./components"));

require("ui-picture-bd-marker/styles/bdmarker.scss");

require("./styles/index.scss");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var extractOptions = function extractOptions(config) {
  var options = config.options,
      _config$uniqueKey = config.uniqueKey,
      uniqueKey = _config$uniqueKey === void 0 ? '' : _config$uniqueKey;
  return {
    uniqueKey: uniqueKey,
    options: _objectSpread({
      blurOtherDots: false,
      blurOtherDotsShowTags: false,
      editable: true,
      trashPositionStart: 1
    }, options),
    onAnnoContextMenu: function onAnnoContextMenu(annoData, element, annoContext) {
      if (typeof config['onAnnoContextMenu'] === 'function') {
        config['onAnnoContextMenu'].call(null, annoData, element, uniqueKey);
      } // self.$emit("vmarker:onAnnoContextMenu", annoData, element, self.key);

    },
    onAnnoRemoved: function onAnnoRemoved(annoData) {
      if (typeof config['onAnnoRemoved'] === 'function') {
        return config['onAnnoRemoved'].call(null, annoData, uniqueKey);
      }

      return true;
    },
    onAnnoAdded: function onAnnoAdded(insertItem, element) {
      if (typeof config['onAnnoAdded'] === 'function') {
        config['onAnnoAdded'].call(null, insertItem, uniqueKey);
      }
    },
    onAnnoChanged: function onAnnoChanged(newValue, oldValue) {
      if (typeof config['onAnnoChanged'] === 'function') {
        config['onAnnoChanged'].call(null, newValue, oldValue, uniqueKey);
      }
    },
    onAnnoDataFullLoaded: function onAnnoDataFullLoaded() {
      if (typeof config['onAnnoDataFullLoaded'] === 'function') {
        config['onAnnoDataFullLoaded'].call(null, uniqueKey);
      }
    },
    onAnnoSelected: function onAnnoSelected(value, element) {
      if (typeof config['onAnnoSelected'] === 'function') {
        config['onAnnoSelected'].call(null, value, element, uniqueKey);
      }
    },
    onUpdated: function onUpdated(data) {
      if (typeof config['onUpdated'] === 'function') {
        config['onUpdated'].call(null, data, uniqueKey);
      }
    },
    onImageLoad: function onImageLoad(data) {
      if (typeof config['onImageLoad'] === 'function') {
        config['onImageLoad'].call(null, data, uniqueKey);
      }
    }
  };
};

var ReactPictureMarker = function ReactPictureMarker(props) {
  var empImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==";
  var _props$imgUrl = props.imgUrl,
      imgUrl = _props$imgUrl === void 0 ? empImg : _props$imgUrl,
      _props$defaultValue = props.defaultValue,
      defaultValue = _props$defaultValue === void 0 ? [] : _props$defaultValue,
      _props$onMarkerRef = props.onMarkerRef,
      onMarkerRef = _props$onMarkerRef === void 0 ? null : _props$onMarkerRef,
      uniqueKey = props.uniqueKey,
      width = props.width,
      _props$ratio = props.ratio,
      ratio = _props$ratio === void 0 ? 16 / 9 : _props$ratio,
      _props$config = props.config,
      config = _props$config === void 0 ? {} : _props$config;
  var key = uniqueKey;
  var rootClass = (0, _react.useMemo)(function () {
    return uniqueKey ? "pannel-".concat(uniqueKey) : '';
  }, [uniqueKey]);
  var finalOptions = (0, _react.useMemo)(function () {
    return extractOptions(config);
  }, [config]);
  var markerRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    //初始化Marker
    var root = document.querySelector(".vmr-ai-panel".concat(rootClass ? ".".concat(rootClass) : ''));

    if (markerRef.current == null) {
      markerRef.current = new _components.default(root.querySelector(".annotate"), //box
      root.querySelector(".draft "), //draft
      finalOptions);

      if (typeof onMarkerRef === 'function') {
        onMarkerRef(markerRef);
      }
    } else {
      markerRef.current.updateConfig(finalOptions);
    }

    if (defaultValue instanceof Array) {
      markerRef.current.renderData(defaultValue);
    } //


    return function cleanup() {
      marker = null;
    };
  }, [uniqueKey, rootClass, finalOptions, onMarkerRef, defaultValue]);
  (0, _react.useEffect)(function () {
    var root = document.querySelector(".vmr-ai-panel".concat(rootClass ? ".".concat(rootClass) : ''));
    root.addEventListener("touchmove", function (e) {
      e.preventDefault();
    }, {
      passive: false
    });
    var mWidth = width;

    if (!mWidth) {
      mWidth = "100%";
    }

    root.style.width = mWidth.endsWith("%") ? mWidth : parseInt(mWidth) + "px";
    root.style.height = root.clientWidth / ratio + "px";
    root.querySelectorAll(".vmr-g-image,.vmr-ai-raw-image,.vmr-ai-raw-image-mask").forEach(function (element) {
      element.style.width = root.style.width;
      element.style.height = parseInt(root.clientWidth) / ratio + "px";
    });
  }, [rootClass, width, ratio]);

  var eventEmitter = function eventEmitter(functionName, e) {
    var funcName = functionName;
    var options = finalOptions;

    if (typeof options[funcName] == 'function') {
      var payload = [];

      if (funcName === 'onImageLoad') {
        var rawData = {
          rawW: e.target.naturalWidth,
          rawH: e.target.naturalHeight,
          currentW: e.target.offsetWidth,
          currentH: e.target.offsetHeight
        };
        payload = [rawData];
      }

      options[funcName].apply(null, payload);
    }
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "vmr-ai-panel ".concat(rootClass)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "vmr-g-image  vmr-overflow-not vmr-relative"
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "vmr-ai-raw-image vmr-block vmr-absolute vmr-none-select",
    src: imgUrl,
    alt: "",
    onLoad: function onLoad(e) {
      return eventEmitter('onImageLoad', e);
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "annotate vmr-ai-raw-image-mask vmr-none-select vmr-absolute ",
    style: {
      cursor: 'crosshair',
      left: 0,
      top: 0
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "draft vmr-absolute vmr-none-select",
    style: {
      backgroundColor: "rgba(1,0,0,0.5)"
    }
  }))));
};

var _default = ReactPictureMarker;
exports.default = _default;