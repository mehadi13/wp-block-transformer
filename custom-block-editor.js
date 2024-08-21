// This function can be used to extract the block data
function extractBlockData() {
    const { select } = wp.data;
    const blocks = select('core/block-editor').getBlocks();
    console.log(blocks);

    // For demonstration, let's log the JSON structure
    blocks.forEach(block => {
        console.log(JSON.stringify(transformBlock(block), null, 2));
    });
}

function transformBlock(block) {
    const { name, attributes, innerBlocks } = block;

    // Recursively process innerBlocks
    const transformedInnerBlocks = innerBlocks.map(transformBlock);

    // Return the transformed block structure
    return [name, attributes, transformedInnerBlocks];
}

// Extract block data when the editor is ready
wp.domReady(() => {
    extractBlockData();
});
