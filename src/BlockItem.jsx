import { useState } from '@wordpress/element';
import { Button } from '@wordpress/components';

const BlockItem = ({block}) => {

    const handleButtonClick = () => {
    
        const output = transformBlock(block);
        console.log(output);
        handleDownload([output]);

    };

    const handleDownload = (jsonData) => {
        // Convert JSON data to a string
        const jsonString = JSON.stringify(jsonData, null, 2);
    
        // Create a Blob from the JSON string
        const blob = new Blob([jsonString], { type: 'application/json' });
    
        // Create a link element
        const link = document.createElement('a');
    
        // Set the download attribute with a filename
        link.download = 'data.json';

    
        // Create a URL for the Blob and set it as the href attribute
        link.href = URL.createObjectURL(blob);
    
        // Append the link to the document body and trigger a click
        document.body.appendChild(link);
        link.click();
    
        // Remove the link after download
        document.body.removeChild(link);
      };

    const transformBlock = (inputBlock) => {
        const { name, attributes, innerBlocks } = inputBlock;
    
        // Recursively process innerBlocks
        const transformedInnerBlocks = innerBlocks.map(transformBlock);
        
        // Return the transformed block structure
        return [name, attributes, transformedInnerBlocks]; 
    }

    return (
        <>
            <Button variant='secondary' onClick={handleButtonClick}>
                {block.name} {block.attributes.metadata ? ' { ' + block.attributes.metadata.name + ' }' : null}
            </Button>
        </>
    )
}

export default BlockItem;