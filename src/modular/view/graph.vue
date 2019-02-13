<template>
  <d2-container>
    <div ref="container" style="position:absolute;top:0;left:0;right:0;bottom:0;"></div>
  </d2-container>
</template>

<script>
/* eslint-disable new-cap */
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
      // eslint-disable-next-line new-cap
      const graph = new mx.mxGraph(this.$refs.container)
      // graph.gridSize = 40
      graph.setPanning(true) // 右键移动坐标轴
      graph.setCellsResizable(false) // 节点不可改变大小
      graph.setResizeContainer(false)
      graph.setEnabled(true) // false 为只读模式

      // Enables rubberband selection
      // eslint-disable-next-line new-cap, no-new
      // new mx.mxRubberband(graph)

      // Gets the default parent for inserting new cells. This
      // is normally the first child of the root (ie. layer 0).
      const parent = graph.getDefaultParent()

      // Adds cells to the model in a single step
      graph.getModel().beginUpdate()
      try {
        const w = 30
        const h = 30
        const v1 = graph.insertVertex(parent, null, 'A', 0, 0, w, h)
        const v2 = graph.insertVertex(parent, null, 'B', 0, 0, w, h)
        const v3 = graph.insertVertex(parent, null, 'C', 0, 0, w, h)
        const v4 = graph.insertVertex(parent, null, 'D', 0, 0, w, h)
        const v5 = graph.insertVertex(parent, null, 'E', 0, 0, w, h)
        const v6 = graph.insertVertex(parent, null, 'F', 0, 0, w, h)
        const v7 = graph.insertVertex(parent, null, 'G', 0, 0, w, h)
        const v8 = graph.insertVertex(parent, null, 'H', 0, 0, w, h)
        graph.insertEdge(parent, null, 'ab', v1, v2)
        graph.insertEdge(parent, null, 'ac', v1, v3)
        graph.insertEdge(parent, null, 'cd', v3, v4)
        graph.insertEdge(parent, null, 'be', v2, v5)
        graph.insertEdge(parent, null, 'cf', v3, v6)
        graph.insertEdge(parent, null, 'ag', v1, v7)
        graph.insertEdge(parent, null, 'gh', v7, v8)
        graph.insertEdge(parent, null, 'gc', v7, v3)
        graph.insertEdge(parent, null, 'gd', v7, v4)
        graph.insertEdge(parent, null, 'eh', v5, v8)

        const circleLayout = new mx.mxCircleLayout(graph)

        const fastOrganicLayout = new mx.mxFastOrganicLayout(graph)
        fastOrganicLayout.forceConstant = 80

        const hierarchicalLayout = new mx.mxHierarchicalLayout(graph, mx.mxConstants.DIRECTION_WEST)

        const compactTreeLayout = new mx.mxCompactTreeLayout(graph, false)
        compactTreeLayout.useBoundingBox = false
        compactTreeLayout.edgeRouting = false
        compactTreeLayout.levelDistance = 60
        compactTreeLayout.nodeDistance = 16

        const compositeLayout = new mx.mxCompositeLayout(
          graph,
          [
            circleLayout,
            hierarchicalLayout,
            compactTreeLayout,
            fastOrganicLayout
          ],
          hierarchicalLayout)

        let layout
        // layout = circleLayout
        // layout = fastOrganicLayout
        // layout = hierarchicalLayout
        // layout = compactTreeLayout
        layout = compositeLayout
        layout.execute(parent)
      } finally {
        // Updates the display
        graph.getModel().endUpdate()
      }
    }
  }
}
</script>
