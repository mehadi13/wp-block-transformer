#!/usr/bin/env node

const fs = require('fs');

function transformBlock(block) {
    const { name, attributes, innerBlocks } = block;
    
    // Recursively process innerBlocks
    const transformedInnerBlocks = innerBlocks.map(transformBlock);
    
    // Return the transformed block structure
    return [name, attributes, transformedInnerBlocks];
}

// Main function to handle the CLI input
function main() {
    // Get the input file and output file from command line arguments
    const inputFile = process.argv[2];
    const outputFile = null != process.argv[3] ? process.argv[3] : 'output.json';

    
    if (!inputFile || !outputFile) {
        console.error("Usage: ./transform.js <inputFile> <outputFile>");
        process.exit(1);
    }
    
    // Read and parse the input JSON file
    const inputData = fs.readFileSync(inputFile, 'utf-8');
    const input = JSON.parse(inputData);
    
    // Transform the block structure
    const output = transformBlock(input);
    
    // Write the output to the specified file
    fs.writeFileSync(outputFile, JSON.stringify(output, null, 2), 'utf-8');
    console.log(`Output written to ${outputFile}`);
}

// Run the main function
main();
