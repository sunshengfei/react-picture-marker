'use strict'; // made by fred 2018年08月12日

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _uiPictureBdMarker = require("ui-picture-bd-marker");

var PictureMarker = function PictureMarker(_parentEl, _draftEl, _configs) {
  var _this = this;

  (0, _classCallCheck2.default)(this, PictureMarker);
  (0, _defineProperty2.default)(this, "_makeMarker", function (parentEl, draftEl, configs) {
    return new _uiPictureBdMarker.BdAIMarker(parentEl, draftEl, null, configs);
  });
  (0, _defineProperty2.default)(this, "updateConfig", function (configs) {
    _this.marker.setConfigOptions(configs);
  });
  (0, _defineProperty2.default)(this, "getMarker", function () {
    return _this.marker;
  });
  (0, _defineProperty2.default)(this, "setTag", function () {
    var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _this.marker.setTag(tag);
  });
  (0, _defineProperty2.default)(this, "renderData", function (data, wihe) {
    _this.marker.renderData(data, wihe);
  });
  (0, _defineProperty2.default)(this, "getData", function () {
    return _this.marker.dataSource();
  });
  (0, _defineProperty2.default)(this, "clearData", function () {
    _this.marker.clearAll();
  });
  (0, _defineProperty2.default)(this, "mapDataPercent2Real", function (dataArray, baseW, baseH) {
    return dataArray.map(function (item) {
      item.position = (0, _uiPictureBdMarker.positionP2S)(item.position, baseW, baseH);
      return item;
    });
  });
  this.marker = this._makeMarker(_parentEl, _draftEl, _configs);
};

exports.default = PictureMarker;