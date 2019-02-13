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

      // graph.setAutoSizeCells(true)
      graph.setPanning(true) // 右键移动坐标轴
      graph.setResizeContainer(false) // 画布是否随内容调整大小
      graph.setEnabled(true) // false 为只读模式

      // 更改风格的样式
      const style = graph.getStylesheet().getDefaultVertexStyle()
      style[mx.mxConstants.STYLE_SHAPE] = mx.mxConstants.SHAPE_ELLIPSE
      style[mx.mxConstants.STYLE_PERIMETER] = mx.mxPerimeter.EllipsePerimeter
      style[mx.mxConstants.STYLE_GRADIENTCOLOR] = 'white'
      style[mx.mxConstants.STYLE_FONTSIZE] = '12'

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

        const modules = window.$modular.modules
        const vertexs = {}
        modules.forEach(module => {
          const name = module.name
          if (name === 'modular-core') return
          const v = graph.insertVertex(parent, null, name, 0, 0, w, h)
          vertexs[name] = v
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

        // const circleLayout = new mx.mxCircleLayout(graph)

        // const fastOrganicLayout = new mx.mxFastOrganicLayout(graph)
        // fastOrganicLayout.forceConstant = 80

        // const hierarchicalLayout = new mx.mxHierarchicalLayout(graph, mx.mxConstants.DIRECTION_WEST)

        const compactTreeLayout = new mx.mxCompactTreeLayout(graph, false)
        compactTreeLayout.useBoundingBox = false
        compactTreeLayout.edgeRouting = false
        compactTreeLayout.levelDistance = 30
        compactTreeLayout.nodeDistance = 30

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
        // layout = hierarchicalLayout
        layout = compactTreeLayout
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
