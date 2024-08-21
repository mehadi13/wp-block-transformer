function extractBlockData() {
    const { select } = wp.data;

    // Use subscribe to ensure that the data is ready
    const unsubscribe = wp.data.subscribe(() => {
        const blocks = select('core/block-editor').getBlocks();

        if (blocks.length > 0) {
            console.log('Blocks loaded:', blocks);

            // For demonstration, log the JSON structure
            // blocks.forEach(block => {
            //     console.log(JSON.stringify(transformBlock(block), null, 2));
            // });

            // Stop subscribing once the blocks have loaded
            unsubscribe();
        } 
        // else {
        //     console.log('Blocks not yet loaded');
        // }
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
