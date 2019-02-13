<template>
  <d2-container>
    <div ref="container" style="position:absolute;top:0;left:0;right:0;bottom:0;"></div>
  </d2-container>
</template>

<script>
/* eslint-disable new-cap, no-unused-vars, no-new */
import mxgraph from 'mxgraph'

const mx = mxgraph({
  mxLoadResources: false
})

export default {
  name: 'modular-core-graph',
  mounted () {
    // Checks if the browser is supported
    if (!mx.mxClient.isBrowserSupported()) {
      // Displays an error message if the browser is not supported.
      mx.mxUtils.error('Browser is not supported!', 200, false)
    } else {
      // Disables the built-in context menu
      mx.mxEvent.disableContextMenu(this.$refs.container)

      // Creates the graph inside the given container
      const graph = new mx.mxGraph(this.$refs.container)
      graph.setCellsResizable(false) // 节点是否可改变大小
      graph.setCellsEditable(false) // 节点是否可编辑
      graph.setEdgeLabelsMovable(false) // 连线标签是否可移动
      graph.setAllowDanglingEdges(false) // 连线是否可以悬空
      graph.setCellsDisconnectable(false) // 是否允许断开连接
      // graph.setDisconnectOnMove(false) // 移动连线是是否可以断开连接
      // graph.setCellsLocked(true)

      // graph.setAutoSizeCells(true)
      graph.setPanning(true) // 右键移动坐标轴
      graph.setResizeContainer(false) // 画布是否随内容调整大小
      graph.setEnabled(true) // false 为只读模式

      // 更改默认样式
      let style = graph.getStylesheet().getDefaultVertexStyle()
      style[mx.mxConstants.STYLE_SHAPE] = mx.mxConstants.SHAPE_RECTANGLE
      style[mx.mxConstants.STYLE_PERIMETER] = mx.mxPerimeter.RectanglePerimeter
      style[mx.mxConstants.STYLE_ROUNDED] = true
      style[mx.mxConstants.STYLE_GRADIENTCOLOR] = 'white'
      style[mx.mxConstants.STYLE_FONTSIZE] = '14'

      style = graph.getStylesheet().getDefaultEdgeStyle()
      style[mx.mxConstants.STYLE_ROUNDED] = true // 圆角连线
      style[mx.mxConstants.STYLE_EDGE] = mx.mxEdgeStyle.ElbowConnector // 自己拐弯的连线

      // 创建扩展点样式
      style = {}
      style[mx.mxConstants.STYLE_SHAPE] = mx.mxConstants.SHAPE_ELLIPSE
      style[mx.mxConstants.STYLE_PERIMETER] = mx.mxPerimeter.EllipsePerimeter
      style[mx.mxConstants.STYLE_FONTCOLOR] = 'black'
      style[mx.mxConstants.STYLE_FILLCOLOR] = 'white'
      // style[mx.mxConstants.STYLE_GRADIENT_DIRECTION] = mx.mxConstants.DIRECTION_NORTH
      style[mx.mxConstants.STYLE_FONTSIZE] = '10'
      graph.getStylesheet().putCellStyle('extensionPoint', style)

      // 扩展依赖关系样式
      style = {}
      style[mx.mxConstants.STYLE_EDGE] = mx.mxEdgeStyle.SegmentConnector
      graph.getStylesheet().putCellStyle('extension', style)

      // Enables rubberband selection
      // new mx.mxRubberband(graph)

      // Gets the default parent for inserting new cells. This
      // is normally the first child of the root (ie. layer 0).
      const parent = graph.getDefaultParent()

      // Adds cells to the model in a single step
      graph.getModel().beginUpdate()
      try {
        const w = 120
        const h = 40
        const ew = 90
        const eh = 20

        const modules = window.$modular.modules
        const vertexs = {}
        const points = {}
        modules.forEach(module => {
          const name = module.name
          let style = null
          if (name === 'modular-core') {
            style = 'fillColor=green'
          }
          const v = graph.insertVertex(parent, null, name, 20, 20, w, h, style)
          vertexs[name] = v
          if (module.extensionPoints) {
            const ps = module.extensionPoints
            for (let key in ps) {
              const p = graph.insertVertex(parent, null, key, 20, 20, ew, eh, 'extensionPoint')
              graph.insertEdge(parent, null, '', p, v, 'extension')
              points[key] = p
            }
          }
          if (module.extensions) {
            const ext = module.extensions
            for (let key in ext) {
              if (points[key]) {
                graph.insertEdge(parent, null, '', v, points[key], 'extension')
              } else {
                console.log('extensionPoints 定义不存在' + key, ext[key], module)
              }
            }
          }
          if (module.dependencies && module.dependencies.length) {
            const ds = module.dependencies
            ds.forEach(d => {
              if (vertexs[d]) {
                graph.insertEdge(parent, null, '', v, vertexs[d])
              } else {
                console.log(name + ' 依赖的模块 ' + d + '不存在!')
              }
            })
          }
        })

        // style = 'shape=ellipse;perimeter=ellipsePerimeter'

        // const circleLayout = new mx.mxCircleLayout(graph)

        // const fastOrganicLayout = new mx.mxFastOrganicLayout(graph)
        // fastOrganicLayout.forceConstant = 80

        // const hierarchicalLayout = new mx.mxHierarchicalLayout(graph, mx.mxConstants.DIRECTION_WEST)
        const hierarchicalLayout = new mx.mxHierarchicalLayout(graph, mx.mxConstants.DIRECTION_NORTH)
        hierarchicalLayout.interRankCellSpacing = 50

        // const compactTreeLayout = new mx.mxCompactTreeLayout(graph, false) // 紧凑树布局算法，仅适用于单根节点情况
        // compactTreeLayout.useBoundingBox = false
        // compactTreeLayout.edgeRouting = false
        // compactTreeLayout.levelDistance = 30
        // compactTreeLayout.nodeDistance = 30

        // const edgeLabelLayout = new mx.mxEdgeLabelLayout(graph)

        // const compositeLayout = new mx.mxCompositeLayout(graph, [
        //   circleLayout,
        //   hierarchicalLayout,
        //   compactTreeLayout,
        //   fastOrganicLayout
        // ], hierarchicalLayout)

        let layout
        // layout = circleLayout
        // layout = fastOrganicLayout
        layout = hierarchicalLayout
        // layout = compactTreeLayout
        // layout = edgeLabelLayout
        // layout = compositeLayout
        layout.execute(parent)
      } finally {
        // Updates the display
        graph.getModel().endUpdate()
      }
    }
  }
}
</script>
