import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import PictureMarker from './components';
import "ui-picture-bd-marker/styles/bdmarker.scss";
import './styles/index.scss';

const extractOptions = (config) => {
  let { options, uniqueKey = '' } = config
  return {
    uniqueKey,
    options: {
      blurOtherDots: false,
      blurOtherDotsShowTags: false,
      editable: true,
      trashPositionStart: 1,
      ...options
    },
    onAnnoContextMenu: (annoData, element, annoContext) => {
      if (typeof config['onAnnoContextMenu'] === 'function') {
        config['onAnnoContextMenu'].call(null, annoData, element, uniqueKey)
      }
      // self.$emit("vmarker:onAnnoContextMenu", annoData, element, self.key);
    },
    onAnnoRemoved: (annoData) => {
      if (typeof config['onAnnoRemoved'] === 'function') {
        return config['onAnnoRemoved'].call(null, annoData, uniqueKey)
      }
      return true;
    },
    onAnnoAdded: (insertItem, element) => {
      if (typeof config['onAnnoAdded'] === 'function') {
        config['onAnnoAdded'].call(null, insertItem, uniqueKey)
      }
    },
    onAnnoChanged: (newValue, oldValue) => {
      if (typeof config['onAnnoChanged'] === 'function') {
        config['onAnnoChanged'].call(null, newValue, oldValue, uniqueKey)
      }
    },
    onAnnoDataFullLoaded: () => {
      if (typeof config['onAnnoDataFullLoaded'] === 'function') {
        config['onAnnoDataFullLoaded'].call(null, uniqueKey)
      }
    },
    onAnnoSelected: (value, element) => {
      if (typeof config['onAnnoSelected'] === 'function') {
        config['onAnnoSelected'].call(null, value, element, uniqueKey)
      }
    },
    onUpdated: (data) => {
      if (typeof config['onUpdated'] === 'function') {
        config['onUpdated'].call(null, data, uniqueKey)
      }
    },
    onImageLoad: (data) => {
      if (typeof config['onImageLoad'] === 'function') {
        config['onImageLoad'].call(null, data, uniqueKey)
      }
    }
  }
}

const ReactPictureMarker = (props) => {
  const empImg = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==`;
  let { imgUrl = empImg, defaultValue = [], onMarkerRef = null, uniqueKey, width, ratio = 16 / 9, config = {} } = props
  const key = uniqueKey;
  const rootClass = useMemo(() => {
    return uniqueKey ? `pannel-${uniqueKey}` : ''
  }, [uniqueKey]);
  const finalOptions = useMemo(() => {
    return extractOptions(config)
  }, [config]);
  const markerRef = useRef()
  useEffect(() => {
    //初始化Marker
    let root = document.querySelector(`.vmr-ai-panel${rootClass ? `.${rootClass}` : ''}`)
    if (markerRef.current == null) {
      markerRef.current = new PictureMarker(
        root.querySelector(`.annotate`), //box
        root.querySelector(`.draft `), //draft
        finalOptions
      );
      if (typeof onMarkerRef === 'function') {
        onMarkerRef(markerRef)
      }
    } else {
      markerRef.current.updateConfig(finalOptions)
    }
    if (defaultValue instanceof Array) {
      markerRef.current.renderData(defaultValue)
    }
    //
    return function cleanup() {
      marker = null;
    };
  }, [uniqueKey, rootClass, finalOptions, onMarkerRef, defaultValue])

  useEffect(() => {
    let root = document.querySelector(`.vmr-ai-panel${rootClass ? `.${rootClass}` : ''}`)
    root.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault();
      },
      { passive: false }
    );
    let mWidth = width
    if (!mWidth) {
      mWidth = "100%";
    }
    root.style.width = mWidth.endsWith("%") ? mWidth : parseInt(mWidth) + "px";
    root.style.height = root.clientWidth / ratio + "px";
    root
      .querySelectorAll(
        ".vmr-g-image,.vmr-ai-raw-image,.vmr-ai-raw-image-mask"
      )
      .forEach(element => {
        element.style.width = root.style.width;
        element.style.height =
          parseInt(root.clientWidth) / ratio + "px";
      });
  }, [rootClass, width, ratio])

  const eventEmitter = (functionName, e) => {
    const funcName = functionName
    let options = finalOptions
    if (typeof options[funcName] == 'function') {
      let payload = []
      if (funcName === 'onImageLoad') {
        let rawData = {
          rawW: e.target.naturalWidth,
          rawH: e.target.naturalHeight,
          currentW: e.target.offsetWidth,
          currentH: e.target.offsetHeight
        };
        payload = [rawData]
      }
      options[funcName].apply(null, payload)
    }
  }
  return <div className={`vmr-ai-panel ${rootClass}`} >
    <div className="vmr-g-image  vmr-overflow-not vmr-relative">
      <img
        className="vmr-ai-raw-image vmr-block vmr-absolute vmr-none-select"
        src={imgUrl}
        alt=""
        onLoad={e => eventEmitter('onImageLoad', e)}
      />
      <div
        className="annotate vmr-ai-raw-image-mask vmr-none-select vmr-absolute "
        style={{ cursor: 'crosshair', left: 0, top: 0 }}
      >
        <div
          className="draft vmr-absolute vmr-none-select"
          style={{ backgroundColor: "rgba(1,0,0,0.5)" }}
        ></div>
      </div>
    </div>
  </div>

}

export default ReactPictureMarker