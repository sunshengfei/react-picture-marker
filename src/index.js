import React from 'react';
import ReactDOM from 'react-dom';
import ReactPictureMarker from 'react-picture-marker';
import { defaultPositions } from 'ui-picture-bd-marker/lib/config'

let initialData = [{ "tag": "temp@05D8653C4D19ADBF", "tagName": "请选择或添加新标签", "position": { "x": "46.387%", "y": "14.342%", "x1": "60.169%", "y1": "33.464%" }, "uuid": "05D8653C4D19ADBF" }]

const defaultOptions = {
  deviceType: 'both',//both | mouse | touch
  blurOtherDots: false,//高亮当前选框，隐藏其他选框的操作点
  blurOtherDotsShowTags: false,//在blurOtherDots生效下，隐藏其他选框的标签
  editable: true,
  showTags: true,
  supportDelKey: false,//支持键盘删除键
  tagLocation: defaultPositions.bottom,//bottom|out_bottom
  trashPositionStart: 1,// 删除图标在前还是后（leading|trailing）值 ，bool值
  boundReachPercent: 0.01,//选框最大到达边界（0.01%），单位：百分比
}

let marker = null

const onMarkerRef = (ref) => {
  marker = ref.current//简单marker包装对象
  // marker.getMarker() 获取真实marker对象，api参照ui-picture-bd-marker
}

const renderData = () => {
  marker.renderData(initialData)
}

const setTag = () => {
  marker.setTag('打标签')
}

const updateConfig = (config = {}) => {
  marker.updateConfig(config)
}

ReactDOM.render(
  <React.StrictMode>
    <div style={{ width: '100%' }} >
      <div>标签操作</div>
      <button onClick={renderData}>渲染数据</button>

      <button onClick={setTag}>打标签</button>

      <div>更新配置</div>
      <br />
      <button onClick={e => updateConfig({ options: { editable: false } })}>不可编辑</button>
      <button onClick={e => updateConfig({ options: { editable: true } })}>可编辑</button>
      <br />
      <button onClick={e => updateConfig({ options: { showTags: false } })}>不显示标签</button>
      <button onClick={e => updateConfig({ options: { showTags: true } })}>显示标签</button>
      <br />
      <button onClick={e => updateConfig({ options: { deviceType: 'mouse' } })}>只允许鼠标操作</button>
      <button onClick={e => updateConfig({ options: { deviceType: 'touch' } })}>只允许触摸操作</button>
      <br />
      <button onClick={e => updateConfig({ options: { tagLocation: defaultPositions.out_bottom } })}>标签显示在底部</button>
      <button onClick={e => updateConfig({ options: { tagLocation: defaultPositions.bottom } })}>标签显示在内底部</button>
      <br />
      <button onClick={e => updateConfig({
        options: {
          ...defaultOptions
        }
      })}>重置</button>

      <ReactPictureMarker
        onMarkerRef={onMarkerRef}
        imgUrl={"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1139702265,431383255&fm=26&gp=0.jpg"}
        uniqueKey={`${+new Date()}`}
        width={'100%'} // 百分比或实际值
        ratio={16 / 9} //长宽比 默认16：9
        defaultValue={initialData}
        config={
          {
            options: {
              ...defaultOptions
            },
            onAnnoContextMenu: function (annoData, element, key) {
              console.log("🦁onAnnoContextMenu🦁 data=", annoData);
            },
            onAnnoRemoved: function (annoData, key) {
              console.log("🦁onAnnoRemoved🦁 data=", annoData);
              return true;
            },
            onAnnoAdded: function (insertItem, element, key) {
              console.log("🦁onAnnoAdded🦁 data=", insertItem);
            },
            onAnnoChanged: function (newValue, oldValue, key) {
              console.log("🦁onAnnoChanged🦁 ", newValue, oldValue);
            },
            onAnnoDataFullLoaded: function (key) {
              console.log("🦁onAnnoDataFullLoaded🦁 data=", self.key);
            },
            onAnnoSelected: function (value, element, key) {
              console.log("🦁onAnnoSelected🦁 data=", value);
            },
            onUpdated: function (data) {
              console.log("onUpdated data=", data);
            }
          }
        }
      />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);