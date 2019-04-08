<template>
  <d2-container>
    <div ref="container" style="position:absolute;top:0;left:0;border:1px solid blue"></div>
  </d2-container>
</template>

<script>
import { mxClient, mxUtils, mxEvent, mxGraphHandler, mxGraph, mxRubberband } from './mxgraph'

export default {
  name: 'demo-graph',
  mounted () {
    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported()) {
      // Displays an error message if the browser is not supported.
      mxUtils.error('Browser is not supported!', 200, false)
    } else {
      // Disables the built-in context menu
      mxEvent.disableContextMenu(this.$refs.container)

      mxGraphHandler.prototype.guidesEnabled = true // 显示细胞位置标尺

      // Creates the graph inside the given container
      // eslint-disable-next-line new-cap
      var graph = new mxGraph(this.$refs.container)

      graph.setPanning(true) // 右键移动坐标轴
      graph.setCellsResizable(false) // 节点不可改变大小
      graph.setResizeContainer(true)
      graph.setEnabled(true) // false 为只读模式

      // Enables rubberband selection
      // eslint-disable-next-line new-cap, no-new
      new mxRubberband(graph)

      // Gets the default parent for inserting new cells. This
      // is normally the first child of the root (ie. layer 0).
      var parent = graph.getDefaultParent()

      // Adds cells to the model in a single step
      graph.getModel().beginUpdate()
      try {
        var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30)
        var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30)
        graph.insertEdge(parent, null, '', v1, v2)
      } finally {
        // Updates the display
        graph.getModel().endUpdate()
      }
    }
  }
}
</script>
