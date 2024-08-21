<?php
function blank_theme_enqueue_scripts() {
    // Enqueue the block editor script
    wp_enqueue_script(
        'custom-block-editor',
        get_template_directory_uri() . '/custom-block-editor.js',
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-data'),
        filemtime(get_template_directory() . '/custom-block-editor.js'),
        true
    );
}
add_action('enqueue_block_editor_assets', 'blank_theme_enqueue_scripts');
