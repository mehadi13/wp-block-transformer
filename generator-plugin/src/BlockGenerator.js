import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';

export default function readBlocks(name) {
     // Get all blocks named 'core/paragraph'
     const blockNames = ['core/paragraph'];
    
     // Use the `useSelect` hook to access the global state and get blocks by name
     const blocks = useSelect( ( select ) => {
         const { getBlocksByName } = select( 'core/block-editor' );
         return getBlocksByName( blockNames );
     }, [ blockNames ] );

     console.log(blocks);
}