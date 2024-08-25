import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import { drafts } from '@wordpress/icons';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import readBlocks from './BlockGenerator';
import { BlockItem } from './BlockItem';

const PluginSidebarMoreMenuItemTest = () => {
    const [inputValue, setInputValue] = useState('');

    const blocks = useSelect((select) => {
        return select('core/block-editor').getBlocks();
    }, []);

    const handleButtonClick = () => {
        readBlocks(inputValue);
    };

    return (
        <>
            <PluginSidebarMoreMenuItem target="sidebar-name" icon={drafts}>
                Expanded Sidebar - More item
            </PluginSidebarMoreMenuItem>
            <PluginSidebar name="sidebar-name" icon={drafts} title="Block Generator">
                <PanelBody title='Block Filter By Name' initialOpen={true}>
                    <TextControl
                        label="Block Name"
                        value={inputValue}
                        onChange={(value) => setInputValue(value)}
                    />
                    <Button variant='secondary' onClick={handleButtonClick}>
                        Save Block
                    </Button>
                </PanelBody>

                <PanelBody title="Blocks on the Page" initialOpen={true}>

                    <ul>
                        {blocks.map((block, index) => (
                            <li key={index}>
                                <BlockItem block={block}/>
                            </li>
                        ))}
                    </ul>
                </PanelBody>
            </PluginSidebar>
        </>
    )
};

registerPlugin('plugin-sidebar-expanded-test', {
    render: PluginSidebarMoreMenuItemTest,
});
