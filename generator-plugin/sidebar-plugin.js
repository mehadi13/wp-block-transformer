const { registerPlugin } = wp.plugins;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;
const { image } = wp.icons;

const PluginSidebarMoreMenuItemTest = () => (
    <>
        <PluginSidebarMoreMenuItem target="sidebar-name" icon={ image }>
            Expanded Sidebar - More item
        </PluginSidebarMoreMenuItem>
        <PluginSidebar name="sidebar-name" icon={ image } title="My Sidebar">
            <p>Content of the sidebar</p>
        </PluginSidebar>
    </>
);

registerPlugin('plugin-sidebar-expanded-test', {
    render: PluginSidebarMoreMenuItemTest,
});
