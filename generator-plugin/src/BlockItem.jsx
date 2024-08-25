import { useState } from '@wordpress/element';
import { Button } from '@wordpress/components';

export const BlockItem = ({block}) => {

    const handleButtonClick = () => {
        
        const output = transformBlock(block);
    console.log('out', output);
    // Make an AJAX request to save the text
    fetch('/wp-json/transform/v1/block', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({template: JSON.stringify(output)}),
    })
    .then(response => response.text())  // use text() to see the raw response
    .then(data => {
        console.log('Received data:', data);

        try {
            const jsonData = JSON.parse(data);
            console.log('Parsed JSON:', jsonData);
        } catch (error) {
            console.error('Failed to parse JSON:', error);
        }
    })
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });

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